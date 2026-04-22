

## Plano: novo e-book + integração Eduzz (acessos pagantes)

### Parte 1 — Novo e-book "A Importância das Coisas"
1. Subir o PDF enviado para o bucket `ebooks` (pasta `pdfs/`).
2. Inserir um registro em `ebooks` com:
   - `title`: "A Importância das Coisas"
   - `author`: "Dr. Mauro Kwitko"
   - `description`: "Como transcender o materialismo e recordar a nossa natureza espiritual"
   - `pages`: ~120 (a confirmar)
   - `cover_url`: capa extraída da página 1 do PDF (subida em `ebooks/covers/`)
   - `url`: URL pública do PDF no bucket
3. Sem mudanças de UI — o e-book aparece automaticamente em `/app/ebooks` (botões "Ler" e "Baixar" mantidos, conforme sua resposta).

### Parte 2 — Integração Eduzz: liberação de acesso pós-pagamento

#### 2.1 — Banco de dados (migration)
Nova tabela `paid_customers`:
| coluna | tipo | observação |
|---|---|---|
| `id` | uuid PK | |
| `email` | text UNIQUE NOT NULL | sempre lowercase |
| `name` | text | |
| `phone` | text | |
| `eduzz_buyer_id` | text | |
| `last_invoice_id` | text | |
| `status` | text | `active` \| `revoked` |
| `first_paid_at` | timestamptz | |
| `revoked_at` | timestamptz | |
| `revoked_reason` | text | reembolso/chargeback/cancel |
| `created_at`, `updated_at` | timestamptz | |

Tabela `eduzz_webhook_log` (auditoria, append-only): `id`, `event`, `event_id`, `payload jsonb`, `signature_valid bool`, `processed_at`.

RLS: ambas com **acesso apenas via service_role** (sem políticas para anon/authenticated), exceto uma política `SELECT` em `paid_customers` que permite ao próprio usuário autenticado ver seu próprio registro pelo email (`auth.email() = email`).

#### 2.2 — Secret necessário
- `EDUZZ_WEBHOOK_SECRET` = `13f181121e04da464b1dab39f8958ec7a7d779d15a0e4a490ac70ce84aab0723` (vou pedir via `add_secret`).
- O `client_id` `f99edb9e-0a72-4dfb-91b3-8937d410ba85` fica documentado (não precisa ser usado para receber webhooks; só para chamadas de API saindo, que não são necessárias neste fluxo).

#### 2.3 — Edge function pública `eduzz-webhook` (sem JWT)
Recebe POST da Eduzz. Lógica:
1. Loga o payload bruto em `eduzz_webhook_log`.
2. Valida assinatura comparando o secret recebido no header da Eduzz com `EDUZZ_WEBHOOK_SECRET`. Se inválido → 401.
3. Roteia por `event`:
   - **`myeduzz.invoice_paid`** (e variantes de "completed"):
     - Extrai `data.buyer.email`, `data.buyer.name`, `data.buyer.phone`, `data.buyer.id`, `data.id`.
     - `UPSERT` em `paid_customers` (status=`active`, `first_paid_at` = now() se não existir).
     - Cria o usuário no Supabase Auth via `admin.createUser({ email, email_confirm: true, user_metadata: { name } })` — ignora erro se já existir.
     - Dispara e-mail de **definição de senha** via `admin.generateLink({ type: 'recovery', email, options: { redirectTo: <app_url>/reset-password } })`. O link cai no `auth-email-hook` e a Eduzz já confirma "primeiro acesso".
   - **`myeduzz.invoice_refunded` / `chargeback` / `subscription_canceled`**:
     - Marca `status='revoked'`, `revoked_at=now()`, `revoked_reason=event`.
4. Sempre retorna `200 ok` rapidamente após log (boa prática para webhooks).

#### 2.4 — Bloqueio de login/cadastro para não pagantes
Nova edge function pública `check-paid-access` (sem JWT) que recebe `{ email }` e retorna `{ paid: boolean, status }` consultando `paid_customers` via service_role.

Em `src/pages/Login.tsx`:
- **Antes** de `signIn`/`signUp`/reset, chamar `check-paid-access`. Se `!paid` ou `status='revoked'`:
  - Mostrar card de bloqueio com:  
    "Não encontramos seu pagamento. Para entrar no Clube de Estudos é preciso adquirir o acesso."  
    + botão **"Adquirir acesso ao Clube"** → `https://chk.eduzz.com/2445141`.
  - Não chamar Supabase Auth.
- Manter exceção para os admins (`raelvvieira@gmail.com`, `mauroabpr@gmail.com`) — sempre liberados.

#### 2.5 — Templates de e-mail Lovable Auth
Garantir que o template de **recovery** esteja com copy de "primeiro acesso ao Clube de Estudos" (não "redefinição de senha"). Se ainda não existir o auth-email-hook customizado, scaffoldar e estilizar com a paleta do clube.

### Parte 3 — Configuração na Eduzz (instruções para o Mauro)
Após deploy, vou exibir a URL do webhook (`https://khztwxgobacabfvaeves.supabase.co/functions/v1/eduzz-webhook`) e explicar como cadastrá-la no console Eduzz: Configurações → Webhooks → Nova configuração, selecionando os eventos `myeduzz.invoice_paid`, `myeduzz.invoice_refunded`, `myeduzz.invoice_chargeback` e `nutror.subscription_canceled`, usando a chave de acesso correspondente ao secret.

### Arquivos criados/alterados
- **Migration**: tabelas `paid_customers` + `eduzz_webhook_log` + RLS.
- **Insert SQL** (após upload do PDF): novo registro em `ebooks`.
- `supabase/functions/eduzz-webhook/index.ts` (novo)
- `supabase/functions/check-paid-access/index.ts` (novo)
- `supabase/config.toml` — adicionar blocos `verify_jwt = false` para as duas funções públicas.
- `src/pages/Login.tsx` — gating + card de bloqueio + botão de checkout.
- (Se necessário) scaffold do `auth-email-hook` com template de recovery customizado.

### Não muda
- Layout do `/app/ebooks`, sidebar, demais páginas, fluxo de admin.

