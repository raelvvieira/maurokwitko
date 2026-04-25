## Entrega Customizada Eduzz → Plataforma do Clube

### O que a Eduzz pede

No modal "Entrega de Conteúdo" (tipo: **Customizado**), você precisa colar **uma URL HTTPS** que a Eduzz vai chamar toda vez que houver uma venda nova ou remoção de acesso. A URL precisa:

1. Aceitar `POST` com o payload da venda (campos `edz_*`).
2. Validar a autenticação via `edz_cli_origin_secret` (chave do Órbita).
3. Tratar `type = "create"` (liberar acesso) e `type = "remove"` (revogar acesso).
4. Retornar **HTTP 200** em caso de sucesso.

Hoje já temos um webhook (`eduzz-webhook`) que faz exatamente esse trabalho de granted/revoked, mas ele foi desenhado para o "Webhook" da Eduzz (eventos como `myeduzz.invoice_paid`). A entrega customizada é um endpoint **diferente** e usa um payload **diferente** — então o caminho mais limpo é criar uma edge function dedicada.

---

### Plano de implementação

**1. Nova edge function `eduzz-custom-delivery`** (`supabase/functions/eduzz-custom-delivery/index.ts`)

- Endpoint público (`verify_jwt = false` no `config.toml`).
- Validação por `edz_cli_origin_secret` comparando com um novo segredo `EDUZZ_ORIGIN_SECRET`.
- Lê o payload, extrai `type`, `edz_cli_email`, `edz_cli_rsocial`, `edz_cli_cel`, `edz_cli_cod`, `edz_fat_cod`, `edz_cnt_cod`, `edz_cnt_titulo`, `edz_con_status_cod`.
- Sempre registra o evento na tabela `eduzz_webhook_log` (reaproveitada) com `event = "custom_delivery:<type>"` para auditoria.
- Comportamento:
  - `type = "create"` → mesmo fluxo do webhook atual: upsert em `paid_customers` (status `active`), cria usuário em `auth.users` (se ainda não existir, com `email_confirm: true`) e dispara `generateLink('recovery')` com `redirectTo = https://maurokwitko.com/reset-password` para o cliente definir a senha de acesso.
  - `type = "remove"` → marca `paid_customers.status = 'revoked'`, grava `revoked_at` e `revoked_reason = 'custom_delivery_remove'`. (Não apaga o usuário; só bloqueia o acesso pago — admins e legacy continuam funcionando como hoje em `check-paid-access`.)
  - Se o contrato chegar com `edz_con_status_cod` em {3 Suspenso, 4 Cancelado, 7 Atrasado, 11 Inadimplente} junto de `type = create`, tratar como remoção (defesa extra).
- Sempre retorna HTTP 200 com `{ ok: true, action }` (mesmo em "ignored"), conforme exigência da Eduzz de receber 200 em sucesso. Apenas chave inválida retorna 401.

**2. Segredo novo**
- Adicionar `EDUZZ_ORIGIN_SECRET` (valor pego em https://orbita.eduzz.com/producer/config-api). Vou usar `add_secret` para você colar a chave.

**3. `supabase/config.toml`**
- Adicionar bloco `[functions.eduzz-custom-delivery] verify_jwt = false`.

**4. Não mexer no `eduzz-webhook` existente**
- Continua funcionando em paralelo (eventos administrativos, log de fatura). A entrega customizada só substitui o ato de "liberar/remover acesso", e é idempotente — se ambos chegarem para a mesma venda, o upsert em `paid_customers` por e-mail mantém estado consistente.

**5. (Opcional, recomendado) Página de boas-vindas**
- Como o cliente vai cair direto em `/reset-password`, garantir que essa tela já cumprimente pelo nome e explique que o acesso ao Clube de Estudos foi liberado. Posso ajustar o copy se quiser — me confirme.

---

### O que você vai colar no Órbita

Depois do deploy, a URL a ser cadastrada no modal "Entrega de Conteúdo" será:

```
https://khztwxgobacabfvaeves.supabase.co/functions/v1/eduzz-custom-delivery
```

Tipo de entrega: **Customizado**. A Eduzz já injetará o `edz_cli_origin_secret` no payload — não precisa configurar header adicional.

---

### Detalhes técnicos resumidos

- Reaproveita `paid_customers`, `eduzz_webhook_log`, `legacy_active_users` e `check-paid-access` — sem migração de schema.
- Service role usado apenas dentro da edge function (nunca exposto ao cliente).
- Auth: `supabase.auth.admin.createUser` + `generateLink('recovery')` (mesmo padrão já validado no webhook atual).
- Resposta sempre 200 em sucesso (exigência Eduzz); 401 só quando `edz_cli_origin_secret` ausente/divergente.
- Logs ficam em `eduzz_webhook_log` para você auditar pelo painel admin se quiser.