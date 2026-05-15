## Objetivo

Ligar a Eduzz ao Clube ponta a ponta: pagar libera acesso, primeiro pagamento dispara boas-vindas, atrasos avisam e bloqueiam, carrinho abandonado convida a finalizar, e cancelamento notifica os admins.

## O que vai acontecer

### 1. Quando alguém paga
- O webhook da Eduzz registra o pagamento e libera o acesso pelo email da pessoa.
- Se for o **primeiro pagamento**, ela recebe automaticamente o email "Bem-vindo(a) ao Clube" (template `clube-welcome-access` que já existe), explicando como entrar só com o email.
- Se for renovação, nada de email — só renova o acesso silenciosamente.
- A pessoa consegue logar imediatamente em https://www.maurokwitko.com.br/login.

### 2. Quando alguém abre/inicia mas não conclui o pagamento
- Eduzz envia `invoice_opened` ou `invoice_waiting_payment`.
- Disparamos um email novo "Finalize sua inscrição no Clube" (template novo `clube-cart-recovery`) com link de checkout.
- Para não encher de email, esse aviso é enviado **no máximo uma vez a cada 7 dias** por email.

### 3. Mensalidade atrasada (35 dias) e bloqueio (40 dias)
- Uma rotina diária roda automaticamente:
  - **35 dias sem novo pagamento** → marca como "atrasado" e dispara email "Sua mensalidade está pendente" (template `clube-payment-overdue` que já existe). Ainda pode acessar.
  - **40 dias sem novo pagamento** → marca como "bloqueado". Próxima tentativa de login mostra a tela "acesso pendente" e ela é orientada a regularizar (template `clube-access-revoked`).
- Se a pessoa pagar de novo a qualquer momento, volta automaticamente para "ativo".

### 4. Cancelamento, reembolso ou chargeback
- Acesso é revogado na hora.
- Você (`raelvvieira@gmail.com`) e `mauroabpr@gmail.com` recebem um email de aviso com o nome, email e motivo (cancelamento / reembolso / chargeback) — template novo `admin-subscription-canceled`.
- O cliente recebe o email "Acesso encerrado" que já existe.

---

## Detalhes técnicos (pode ignorar)

**1. Corrigir validação de assinatura**
A Eduzz envia o secret dentro do JSON em `payload.data.producer.originSecret` (não em header, não em `?secret=`). Vou ler dali e comparar com o secret `EDUZZ_ORIGIN_SECRET` que já está configurado. Mantenho o fallback dos headers/query pra não quebrar nada.

**2. Mudanças no banco** (uma migração)
Adicionar à tabela `paid_customers`:
- `welcome_sent_at timestamptz` — garante boas-vindas só no primeiro pagamento
- `overdue_notified_at timestamptz` — evita reenviar aviso de atraso
- `cart_recovery_sent_at timestamptz` (em uma tabela `eduzz_cart_recovery` por email, pois pode não existir ainda em `paid_customers`)

Nova tabela `eduzz_cart_recovery (email, last_sent_at)` pra controlar dedup do email de carrinho abandonado.

**3. Mudanças em `eduzz-webhook/index.ts`**
- `isSecretValid`: ler `body.data.producer.originSecret`, comparar com `EDUZZ_ORIGIN_SECRET` **ou** `EDUZZ_WEBHOOK_SECRET`.
- Bloquear o valor de teste fixo `originsecrettest` em produção (loga, não processa).
- PAID events: se `welcome_sent_at` for null → invoca `send-transactional-email` com `clube-welcome-access` e grava `welcome_sent_at`.
- Eventos `invoice_opened` / `invoice_waiting_payment`: se a pessoa NÃO está em `paid_customers` (ou está mas inativa) e `eduzz_cart_recovery.last_sent_at` > 7 dias → envia `clube-cart-recovery`.
- REVOKE events (`refunded`, `chargeback`, `subscription_canceled`, `invoice_canceled`): revoga + envia `admin-subscription-canceled` para os 2 admins + envia `clube-access-revoked` pro cliente.

**4. Novo edge function `subscription-lifecycle-cron`**
Roda 1x ao dia via pg_cron:
- `paid_customers` com `status='active'` e `last_paid_at < now() - 35 days` e `overdue_notified_at IS NULL` → status='overdue', envia `clube-payment-overdue`, marca `overdue_notified_at`.
- `paid_customers` com `last_paid_at < now() - 40 days` e `status IN ('active','overdue')` → status='revoked', `revoked_reason='no_payment'`, envia `clube-access-revoked`.

**5. Atualizar `check-paid-access` e `passwordless-login`**
Reduzir `GRACE_DAYS` de 35 → 40 (bloqueio efetivo). A janela 35–40 continua liberada porque o status ainda é "overdue" ou "active" quando o cron ainda não rodou; o cron passa a ser a fonte da verdade.

**6. Dois novos templates** em `_shared/transactional-email-templates/`:
- `clube-cart-recovery.tsx` — "Finalize sua inscrição"
- `admin-subscription-canceled.tsx` — aviso interno (vai para os 2 admins)
Registrar em `registry.ts` e fazer deploy de `send-transactional-email` + `eduzz-webhook` + novo cron.

---

## Ordem de execução depois da aprovação
1. Migração: colunas novas + tabela `eduzz_cart_recovery`.
2. Criar 2 templates novos + atualizar registry.
3. Reescrever `eduzz-webhook` com validação correta + dispatch de emails.
4. Criar `subscription-lifecycle-cron` + agendar via pg_cron diário.
5. Ajustar `check-paid-access` / `passwordless-login` (grace 40 dias).
6. Deploy de tudo. Você reenvia os eventos de teste pela Eduzz; eu confirmo no log que `signature_valid=true` e que o welcome saiu.

## Fora do escopo
- Não vou mexer no visual do login nem no Dashboard.
- Não vou trocar o provedor de email (continua o do Lovable Cloud).
- Carrinho abandonado: só os eventos `opened` / `waiting_payment` da Eduzz disparam — não há outra fonte de "intenção de compra".
