## Objetivo

Acesso ao Clube de Estudos por **e-mail apenas, sem senha e sem precisar clicar em link de verificação**. A pessoa digita o e-mail → o sistema valida com o `check-paid-access` → se for pagante, ela entra **imediatamente** em `/app`. Em paralelo, recebe um e-mail informativo de boas-vindas explicando "como entrar no Clube sempre que quiser". Se não for pagante, mostramos uma mensagem amigável específica para o status (não pago, mensalidade atrasada, e-mail não encontrado, etc.) e enviamos o mesmo aviso por e-mail quando aplicável.

## Como vai funcionar para o usuário

1. Aluno entra em `/login`, digita apenas o **e-mail**.
2. Sistema chama `check-paid-access`.
3. Se for **pagante ativo / admin / legado** → cria a sessão na hora e redireciona para `/app`. Em segundo plano dispara um e-mail de "boas-vindas / como acessar".
4. Se **não for pagante** → mostra um card amigável com mensagem específica ao status, e dispara um e-mail amigável correspondente (especialmente para mensalidade atrasada).

## Mecanismo técnico do "entrar na hora"

A `auth.users` do Supabase exige autenticação. Para entrar sem senha e sem o usuário clicar em link, vamos:

- Criar uma Edge Function nova **`passwordless-login`** (verify_jwt = false) que:
  1. Recebe `{ email }`.
  2. Re-valida o pagamento via mesma lógica do `check-paid-access` (admins, `paid_customers.status = 'active'`, fallback `legacy_active_users`). Se não for válido, retorna `{ ok: false, status: '<motivo>' }` com o motivo detalhado (ver tabela abaixo).
  3. Se for válido: usa o `service_role` para garantir que o usuário existe (`auth.admin.createUser` se não existir, com `email_confirm: true` e senha aleatória) e gera um **magic link** via `auth.admin.generateLink({ type: 'magiclink' })`.
  4. Extrai do `action_link` os parâmetros `token_hash` + `type` e devolve `{ ok: true, status, token_hash, type }` para o cliente.
- No cliente (`Login.tsx`), ao receber `ok: true`, chamamos `supabase.auth.verifyOtp({ token_hash, type: 'magiclink' })` — isso cria a sessão **na hora**, sem o usuário sair da página, e em seguida `navigate('/app')`.
- Em paralelo (fire-and-forget, sem bloquear o redirect), chamamos `send-transactional-email` com o template `clube-welcome-access`.

Observações de segurança: a `passwordless-login` só gera link/sessão se `check-paid-access` retornar pagante. O `token_hash` devolvido é consumido imediatamente no front e expira muito rápido, então o risco de exposição é mínimo.

## Mensagens por status (UI + e-mail)

Vamos cobrir estes status (vindos de `check-paid-access` + um novo refinamento que o `passwordless-login` retornará):

| status               | Quando acontece                                                   | Card no Login                                                                                                                 | Envia e-mail? | Template                       |
|----------------------|-------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|---------------|--------------------------------|
| `active` / `admin` / `legacy` | Pagante ativo                                                | (entra direto, sem card)                                                                                                      | sim           | `clube-welcome-access`         |
| `not_found`          | E-mail não consta como comprador                                  | "Não encontramos seu pagamento. Use o mesmo e-mail do checkout, ou adquira o acesso." + botão para checkout Eduzz             | não           | —                              |
| `overdue`            | Existe em `paid_customers`, status diferente de `active` indicando atraso (`overdue`, `past_due`, `pending`, etc.) | "Identificamos seu cadastro, mas a última mensalidade não foi confirmada. Regularize para voltar a acessar o Clube." + botão para regularizar | sim           | `clube-payment-overdue`        |
| `revoked` / `canceled` | `status` indicando cancelamento/estorno                         | "Seu acesso ao Clube foi encerrado. Para voltar, basta refazer sua assinatura." + botão checkout                              | sim           | `clube-access-revoked`         |
| `error`              | Falha técnica                                                     | "Tivemos um problema ao validar seu acesso. Tente novamente em instantes." (sem botão de checkout)                            | não           | —                              |

Para suportar `overdue` e `revoked`, a Edge Function `check-paid-access` vai passar a retornar o `status` cru do `paid_customers` quando não for `active` (em vez de só `paid: false, status: 'not_found'`), e a `passwordless-login` mapeia para os rótulos acima.

## Templates de e-mail (transactional)

Como o app **ainda não tem infraestrutura de e-mails transacionais**, será necessário ativá-la antes (uma única vez). O domínio de e-mail já está configurado (o `auth-email-hook` está no projeto, então o domínio `notify.maurokwitko.com` está ativo).

Vou pedir para ativar a infraestrutura de e-mails do app e então criar três templates:

- **`clube-welcome-access`** — "Bem-vindo(a) de volta ao Clube de Estudos. Para acessar a qualquer momento, basta abrir o site e digitar este e-mail. Sem senhas, sem complicação."
- **`clube-payment-overdue`** — Mensagem amigável: "Olá! Tentamos confirmar sua mensalidade do Clube e parece que ela não foi paga. Para voltar a acessar todo o conteúdo, basta regularizar por aqui:" + botão "Regularizar mensalidade".
- **`clube-access-revoked`** — "Seu acesso ao Clube está pausado. Sempre que quiser voltar, basta refazer sua assinatura aqui:" + botão.

Todos seguindo o visual dos templates atuais (cor #506274, logo do Mauro).

## Mudanças no front

### `src/pages/Login.tsx`
- Remover **tudo relacionado a senha**: campo de senha, `showPassword`, ícones de olho, botão "Criar Nova Senha", `Dialog` de reset.
- Form fica com apenas o campo de e-mail + botão "**Entrar no Clube**".
- Submit:
  1. Chama `supabase.functions.invoke('passwordless-login', { body: { email } })`.
  2. Se `ok: true`: chama `supabase.auth.verifyOtp({ token_hash, type })`, dispara o e-mail de boas-vindas (sem `await`) e `navigate('/app')`.
  3. Se `ok: false`: renderiza o card de mensagem correspondente ao status.
- Card destacado inferior passa a ter o texto:
  > "Este é o seu primeiro acesso no NOVO Clube de Estudos? Simples — use o mesmo e-mail utilizado no ato da compra no checkout. Ele já é a sua chave de acesso, sem precisar de senha."

### `src/hooks/useAuth.ts`
- Remover `signIn` / `signUp` (não usamos mais senha).
- Manter `signOut`, `user`, `session`, `loading`, `isAdmin`.

### `src/App.tsx`
- Remover a rota `/reset-password` e o import correspondente (não faz mais sentido).

### `src/pages/ResetPassword.tsx`
- Apagar arquivo.

## Mudanças no backend

### Nova Edge Function `supabase/functions/passwordless-login/index.ts`
- `verify_jwt = false` em `supabase/config.toml`.
- Lógica descrita na seção "Mecanismo técnico" acima.
- CORS habilitado.

### `supabase/functions/check-paid-access/index.ts`
- Quando o e-mail existe em `paid_customers` mas `status != 'active'`, retornar `{ paid: false, status: <status_real> }` (hoje já retorna, só precisa documentar e a `passwordless-login` consome). Sem mudança estrutural — só garantir que o status cru chegue.

### `auth-email-hook` / template de magic-link
- Como não vamos mais enviar magic link por e-mail (o link é consumido no front), o template `magic-link.tsx` deixa de ser usado nesse fluxo. Não vamos removê-lo (Supabase ainda pode usar em outros contextos), mas também **não precisa ser editado** agora.

### Infra de e-mails transacionais
- Ativar a infraestrutura de e-mails do app (passo único).
- Criar os 3 templates listados acima em `supabase/functions/_shared/transactional-email-templates/`.
- Atualizar `registry.ts`.
- Implantar `send-transactional-email`.

## Memória do projeto

Atualizar `mem://auth/registration-flow` para: "Acesso passwordless. `passwordless-login` valida pagamento → cria sessão no front via `verifyOtp(token_hash)`. E-mail é apenas informativo. Mensagens diferenciadas por status: active/overdue/revoked/not_found/error."

## Resumo dos arquivos

- `src/pages/Login.tsx` — reescrita completa do form
- `src/hooks/useAuth.ts` — limpeza de helpers de senha
- `src/App.tsx` — remover rota `/reset-password`
- `src/pages/ResetPassword.tsx` — deletar
- `supabase/functions/passwordless-login/index.ts` — **novo**
- `supabase/config.toml` — adicionar `passwordless-login` com `verify_jwt = false`
- Infra de e-mails transacionais (ativação automática)
- `supabase/functions/_shared/transactional-email-templates/clube-welcome-access.tsx` — **novo**
- `supabase/functions/_shared/transactional-email-templates/clube-payment-overdue.tsx` — **novo**
- `supabase/functions/_shared/transactional-email-templates/clube-access-revoked.tsx` — **novo**
- `supabase/functions/_shared/transactional-email-templates/registry.ts` — atualizar
- `mem://auth/registration-flow` — atualizar

Aprove para eu implementar.