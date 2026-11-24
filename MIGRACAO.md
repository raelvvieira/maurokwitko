# Migração Lovable → Supabase próprio + Cloudflare

## O que já foi feito

| Item | Status |
|---|---|
| Projeto Supabase `maurokwitko` (`epxuiqeauqraihrqfnkx`, São Paulo) | ✅ criado |
| Schema (tabelas, RLS, buckets, funções SQL, filas pgmq) | ✅ aplicado, idêntico ao do Lovable |
| Cron diário `subscription-lifecycle-daily` + gatilhos da fila de e-mail | ✅ apontando para o projeto novo |
| Dados: 87 usuários (com senhas), 3.4 mil linhas em 25 tabelas | ✅ copiados |
| Storage: 38 arquivos (ebooks + article-images, 49 MB) | ✅ copiados, URLs reescritas |
| Código sem dependência do Lovable (e-mail → Resend, tradução → OpenAI) | ✅ |
| Config Cloudflare (`wrangler.jsonc`, SPA) | ✅ |

## O que falta (precisa das suas credenciais)

### 1. Chave service_role no Vault (fila de e-mails)
Supabase → **Settings → API Keys** → copie a `service_role`. Depois, em **SQL Editor**:
```sql
select vault.create_secret('COLE_A_SERVICE_ROLE_AQUI', 'email_queue_service_role_key');
```

### 2. Resend (envio de e-mail)
1. Crie conta em resend.com → **Domains** → adicione `notify.maurokwitko.com` e configure os DNS que ele pedir.
2. **API Keys** → crie uma chave.
3. **Webhooks** → endpoint `https://epxuiqeauqraihrqfnkx.supabase.co/functions/v1/handle-email-suppression`, eventos `email.bounced` e `email.complained`. Copie o *signing secret*.

### 3. Secrets das Edge Functions
Supabase → **Edge Functions → Secrets**:

| Nome | Valor |
|---|---|
| `RESEND_API_KEY` | chave do Resend |
| `RESEND_WEBHOOK_SECRET` | signing secret do webhook do Resend (`whsec_...`) |
| `OPENAI_API_KEY` | chave da OpenAI (tradução de artigos) |
| `EDUZZ_WEBHOOK_SECRET` | mesmo valor de hoje no Lovable (Cloud → Secrets) |
| `EDUZZ_ORIGIN_SECRET` | mesmo valor de hoje no Lovable |
| `SEND_EMAIL_HOOK_SECRET` | gerado no passo 5 |
| `SITE_URL` | `https://maurokwitko.com` (opcional, é o padrão) |

### 4. Deploy das Edge Functions
```bash
npx supabase login
```
```bash
npx supabase functions deploy --project-ref epxuiqeauqraihrqfnkx
```

### 5. Auth
Supabase → **Authentication**:
- **URL Configuration** → Site URL `https://maurokwitko.com`; Redirect URLs: `https://maurokwitko.com/**` e `http://localhost:8080/**`.
- **Auth Hooks → Send Email Hook** → tipo HTTPS, URL `https://epxuiqeauqraihrqfnkx.supabase.co/functions/v1/auth-email-hook`. Clique em *Generate secret* e salve o valor como `SEND_EMAIL_HOOK_SECRET` (passo 3).
- Confira em **Sign In / Providers** se as opções (confirmar e-mail etc.) estão como você quer.

### 6. Cloudflare
**Opção A — Git (recomendado):** Cloudflare → Workers & Pages → Create → Import a repository → este repo.
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Variáveis de build: as 3 `VITE_SUPABASE_*` do `.env` (o `.env` já está no repo, então funciona sem configurar).

**Opção B — da sua máquina:**
```bash
npm install
```
```bash
npm run deploy
```

Depois: **Settings → Domains & Routes** → adicione `maurokwitko.com` (o DNS do domínio precisa estar no Cloudflare).

### 7. Virada (cutover)
1. Na Eduzz, troque a URL do webhook para `https://epxuiqeauqraihrqfnkx.supabase.co/functions/v1/eduzz-webhook`.
2. Aponte o domínio para o Cloudflare e despublique o projeto no Lovable.
3. Os dados foram copiados em 24/11/2026. Se entrar usuário ou pagamento novo no Lovable antes da virada, peça para o Claude refazer a sincronização dessas tabelas (a função de importação temporária já foi removida do banco).

## Mudanças no código
- `supabase/functions/_shared/resend.ts`: envio via Resend, com link de descadastro e cabeçalho `List-Unsubscribe`.
- `process-email-queue`: usa Resend no lugar de `@lovable.dev/email-js`.
- `auth-email-hook`: recebe o *Send Email Hook* nativo do Supabase (standard webhooks).
- `handle-email-suppression`: recebe bounces e reclamações do webhook do Resend.
- `translate-article`: OpenAI (`gpt-4o-mini`; dá para trocar com o secret `OPENAI_MODEL`).
- `preview-transactional-email`: removida (só existia para o painel do Lovable).
- Frontend: saíram `lovable-tagger`, os plugins `@lovable.dev/*` e o `previewAuthStorage`.
