## Novo secret gerado

Use este valor (64 caracteres hex, 256 bits de entropia):

```
1eb55366b12998d48991ac5d5143028d4e013a12689a8c3bf3392c3867e5128f
```

## Onde colar

### 1. No Eduzz (painel de webhooks)
- **URL para envio dos dados:**
  `https://khztwxgobacabfvaeves.supabase.co/functions/v1/eduzz-webhook`
- **Secret / Chave:** cole o valor acima
- **Eventos:** `invoice_paid` (e, se quiser revogação automática no futuro: `invoice_refunded`, `invoice_chargeback`, `subscription_canceled`)

### 2. No Lovable Cloud
Atualizar o secret `EDUZZ_WEBHOOK_SECRET` com o mesmo valor acima. Vou abrir o formulário seguro pra você colar — assim que aprovar este plano, faço:

```text
update_secret(EDUZZ_WEBHOOK_SECRET)
```

(você cola o valor no campo seguro; eu não armazeno nem mostro o secret depois)

## Como o webhook valida o secret

A função `eduzz-webhook` aceita o secret em qualquer um destes lugares (o Eduzz manda no header):
- Header `x-eduzz-secret` (padrão Eduzz)
- Header `x-webhook-secret`, `x-signature` ou `Authorization: Bearer <secret>`
- Query string `?secret=...`
- Campo `secret` no JSON do payload

Se o Eduzz mandar o secret correto por qualquer um desses caminhos, o evento é gravado com `signature_valid = true` e o acesso é liberado automaticamente.

## Checklist pós-configuração

1. Salvar a config na Eduzz e clicar em **"Testar webhook"** (se houver) ou fazer uma compra de teste.
2. Abrir o admin/Logs e confirmar que apareceu uma linha em `eduzz_webhook_log` com `signature_valid = true`.
3. Confirmar que o e-mail do comprador entrou em `paid_customers` com `status = 'active'` e `last_paid_at` recente.
4. Tentar logar com o e-mail do comprador no `/login` — deve passar direto.

## Fora do escopo
- Mudar a URL ou a estrutura do webhook (já está estável).
- Reprocessar pagamentos antigos (esses já estão cobertos por `legacy_active_users` ou pelo fallback de auto-claim no login).
