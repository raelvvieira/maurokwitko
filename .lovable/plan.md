## Objetivo

Liberar o acesso ao Clube de forma mais tolerante, sem depender de API da Eduzz:

1. Considerar **pago** quem teve o último pagamento confirmado há **menos de 35 dias** (cobre o ciclo mensal de 30 dias + 5 de tolerância para a próxima fatura ser gerada/cobrada).
2. Garantir que **novos assinantes** consigam entrar imediatamente após pagar — mesmo antes do webhook chegar — através de um caminho de fallback.

## Como funciona hoje (resumo do diagnóstico)

- O login (`passwordless-login`) consulta `paid_customers`. Se `status != 'active'` o usuário é bloqueado como **overdue**, sem olhar a data do último pagamento.
- O webhook da Eduzz (`eduzz-webhook`) é a única fonte que popula `paid_customers`, e hoje a tabela está praticamente vazia (1 evento recebido, com assinatura inválida). Por isso muita gente que paga não entra.
- Existe a tabela `legacy_active_users` para assinantes antigos do clube anterior — continua valendo.

## O que vai mudar

### 1. Banco de dados
- Adicionar coluna `last_paid_at timestamptz` em `paid_customers` (data do último pagamento confirmado).
- Backfill: `last_paid_at = coalesce(first_paid_at, updated_at)` para registros existentes.
- Índice em `lower(email)` para lookup rápido.

### 2. Webhook Eduzz (`eduzz-webhook`)
- Em todo evento de pagamento (`invoice_paid`/`invoice_completed`), atualizar `last_paid_at = now()` além de marcar `status='active'`. Isso cria a "régua" de 35 dias automaticamente a cada nova fatura.
- Continuar revogando em refund/chargeback/cancelamento.

### 3. Lógica de classificação no login (`passwordless-login` + `check-paid-access`)
Nova ordem de decisão para o e-mail:

```text
1. admin hard-coded                          → active (admin)
2. legacy_active_users                       → active (legacy)
3. paid_customers.status = 'active'          → active
4. paid_customers existe E
     last_paid_at >= now() - 35 dias E
     status NÃO é revoked/canceled/refunded  → active (grace_period)
5. paid_customers existe E revogado          → revoked
6. paid_customers existe E vencido (>35d)    → overdue
7. e-mail não consta em lugar nenhum         → pending_new_subscriber  (ver passo 4)
```

A janela de 35 dias é configurável via constante (`GRACE_DAYS = 35`).

### 4. Fallback para "novo assinante" (resolve o caso que você levantou)
Quando o e-mail **não está em nenhuma tabela**, em vez de bloquear na hora:

- A função tenta um “self-claim” leve antes de barrar:
  - Procura nos `eduzz_webhook_log` dos últimos 40 dias um payload com aquele e-mail e evento de pagamento. Se encontrar, hidrata `paid_customers` na hora (`last_paid_at = data do evento`) e libera o acesso.
- Se mesmo assim não achar, retorna um novo status `pending_new_subscriber` com mensagem amigável: “Recebemos seu pagamento? Aguarde alguns minutos para a Eduzz confirmar, ou clique aqui para nos avisar.” Botão envia um e-mail para você (admin) com o e-mail informado, para liberação manual.

Isso cobre os três cenários problemáticos:
- Usuário acabou de pagar e webhook ainda não processou → entra pelo log.
- Webhook chegou mas falhou (assinatura) → você vê o pedido manual e libera.
- Pessoa sem pagamento real → continua bloqueada e direcionada ao checkout.

### 5. UI de login (`Login.tsx`)
- Novo estado `pending_new_subscriber` com card explicando "Estamos confirmando seu pagamento" + botão **“Já paguei, me avise”** (chama uma função que registra o pedido e notifica o admin por e-mail).
- Mensagem de **overdue** continua, mas só aparece quando passou de 35 dias.

## Detalhes técnicos

```text
paid_customers
  + last_paid_at timestamptz
  + idx_paid_customers_email_lower (lower(email))

passwordless-login / check-paid-access
  GRACE_DAYS = 35
  active = status='active'
        OR last_paid_at >= now() - GRACE_DAYS
  fallback: scanLatestWebhookFor(email) → upsert paid_customers
  novo status retornado: 'pending_new_subscriber'

eduzz-webhook
  on PAID:
    upsert paid_customers SET
      status='active',
      last_paid_at = now(),
      last_invoice_id = invoiceId
```

## Fora do escopo
- Integração com API da Eduzz (você confirmou que não existe API adequada).
- Mudar o fluxo de checkout ou de webhook secret (mantém o atual).
- Cron de sincronização periódica.

## Resultado esperado
- Quem pagou nos últimos 35 dias entra, mesmo se o status estiver desatualizado.
- Quem acabou de assinar entra automaticamente se o webhook já registrou (mesmo com `status` divergente), e tem um caminho claro de pedido manual se ainda não.
- Quem realmente não pagou continua sendo direcionado ao checkout.
