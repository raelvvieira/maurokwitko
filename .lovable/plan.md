

## Analysis

User has 5 requests:
1. Update "A Cura da Solidão" cover image (new edition)
2. Fix book card sizes for "20 Casos de Regressão" and "Terapia de Regressão" — covers don't match the standard format
3. Add "First access" card on login page with password reset flow + custom branded email
4. Import active users from CSV into database (migration from old platform)
5. (Future) Eduzz payment integration — just acknowledge for now

Let me investigate covers and current state.
<lov-tool-use id="toolu_vrtx_01GHjcqFqvrt9ZJADjCrTawF" name="code--exec" integration-id="code" data="{\"command\": \"head -5 /dev/null; echo \\\"checking csv\\\"\", \"user_facing_description\": \"Quick check\"}">
</lov-tool-use>

<lov-tool-use id="toolu_vrtx_017Y2kvkuefwUc6vKn6J5D3W" name="code--view" integration-id="code" data="{\"file_path\": \"user-uploads://report.csv\", \"lines\": \"1-79\"}">
</lov-tool-use>

<lov-tool-use id="toolu_vrtx_015bUnmye9kupFhxRu85iuqZ" name="code--fetch_website" integration-id="code" data="{\"url\": \"https://www.besourobox.com.br/loja/busca.php?loja=1347031&palavra_busca=mauro+kwitko\"}">
</lov-tool-use>

<lov-tool-use id="toolu_vrtx_01E8Ncdgjak8xmb8B661VVBY" name="code--view" integration-id="code" data="{\"file_path\": \"user-uploads://report.csv\", \"lines\": \"1-79\"}">
</lov-tool-use>

<lov-tool-use id="toolu_vrtx_012pgKdzyVSQdWx3rNQuPZvv" name="code--exec" integration-id="code" data="{\"command\": \"psql -c \\\"SELECT id, title, cover_url FROM ebooks WHERE title ILIKE '%solid%';\\\"\", \"user_facing_description\": \"Looking up the e-book record\"}">
</lov-tool-use>

<lov-tool-use id="toolu_vrtx_017uqDxhdsPrq4xYNSr2oGTA" name="code--view" integration-id="code" data="{\"file_path\": \"user-uploads://report.csv\", \"lines\": \"63-79\"}">
</lov-tool-use>

<lov-tool-use id="toolu_vrtx_01Ef5Ld8cgrpMNqnNiGPcafH" name="code--view" integration-id="code" data="{\"file_path\": \"src/pages/Livros.tsx\", \"lines\": \"1-60\"}">
</lov-tool-use>

<lov-tool-use id="toolu_vrtx_01JeZ5z6bU5wG4a6E8xypETV" name="code--exec" integration-id="code" data="{\"command\": \"psql -c \\\"SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_name ILIKE '%subscriber%' OR table_name ILIKE '%active_user%' OR table_name ILIKE '%legacy%';\\\"\", \"user_facing_description\": \"Checking existing tables\"}">
</lov-tool-use>
I have enough context. The other 3 books use product cover URLs (from search listing endpoint - PNG with frame). The 2 new books use detail-page URLs which render differently (white background, full image). I need a uniform source. Let me also check what cover the e-book "A Cura da Solidão" has — I need a new cover image (PDF first page) since the user replaced the PDF but the cover image wasn't updated.

<lov-plan>

## Plano: Ajustes finais + migração de usuários

### 1. Atualizar capa do e-book "A Cura da Solidão"
O PDF foi substituído, mas a `cover_url` ainda aponta para o JPG antigo (`a_cura_da_solid_o.jpg`). Vou:
- Extrair a primeira página do novo PDF como imagem (usando `pdftoppm`)
- Fazer upload da nova capa para o bucket `ebooks/covers/` substituindo o arquivo existente
- A `cover_url` no banco já aponta para esse caminho, então não precisa alterar o registro

### 2. Padronizar capas dos livros físicos
As capas de "20 Casos de Regressão" e "Terapia de Regressão: P&R" estão usando URLs de página de produto (fundo branco, imagem completa) enquanto os outros 3 usam URLs do feed de busca (com moldura/proporção fixa). Vou substituir pelas URLs equivalentes do feed de busca da BesouroBox (mesmo prefixo `90_..._1.jpg`) já presentes no array — na verdade as URLs já são as do feed, o problema é a proporção. Vou padronizar o **container** dos cards para `aspect-[2/3]` com `object-cover` ao invés de `object-contain`, garantindo que todas as capas preencham o card uniformemente. Se necessário, ajustar para `object-contain` com `bg-white` para manter limpo. Decisão: **`object-cover`** com posicionamento `center` para uniformidade visual (alguns cantos podem ser cortados, mas o resultado fica padronizado).

### 3. Card de "Primeiro Acesso" no Login + Fluxo de Reset de Senha
**No `src/pages/Login.tsx`:**
- Adicionar card destacado (gradient sutil accent/primary) acima/abaixo do form: *"É seu primeiro acesso no NOVO Clube de Estudos? Clique aqui para criar sua senha."*
- Ao clicar: abre um Dialog (shadcn) pedindo o e-mail; ao enviar, chama `supabase.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin + '/reset-password' })`
- Mostra confirmação: *"Enviamos um link para seu e-mail. Confira sua caixa de entrada (e spam)."*

**Nova página `src/pages/ResetPassword.tsx`:**
- Rota pública `/reset-password` adicionada em `App.tsx`
- Form com 2 campos: "Nova senha" e "Confirmar senha" + validação de match e mínimo 6 caracteres
- Chama `supabase.auth.updateUser({ password })` e redireciona para `/`

**E-mail customizado de redefinição (Auth Email Hook):**
- Verificar status do domínio de e-mail. Se não houver domínio configurado, mostrar o diálogo de setup.
- Após domínio configurado: scaffold do `auth-email-hook` + customização do template `recovery.tsx` em `_shared/email-templates/` com:
  - Logo do Dr. Mauro (URL já registrada na plataforma)
  - Texto amigável e simples em português
  - Botão para redefinir senha (link aponta para `/reset-password`)
- Deploy do edge function `auth-email-hook`

> **Observação sobre "senha 2x no e-mail":** o e-mail apenas leva o usuário até a página de criação de senha — a confirmação de senha (digitar 2x) acontece na página `/reset-password`, que é o padrão seguro. Não é tecnicamente possível nem seguro coletar a senha dentro do próprio e-mail.

### 4. Importar usuários ativos do CSV (migração Eduzz/Nutror)
Criar nova tabela `legacy_active_users` para registrar quem já era assinante:
```sql
CREATE TABLE public.legacy_active_users (
  id uuid primary key default gen_random_uuid(),
  external_id text,           -- "Id do Aluno" da Nutror
  name text,
  email text unique not null,
  phone text,
  enrollment_status text,
  enrolled_at timestamptz,
  last_access_at timestamptz,
  watched_percentage int,
  imported_at timestamptz default now()
);
ALTER TABLE public.legacy_active_users ENABLE ROW LEVEL SECURITY;
-- Policy: apenas admins podem ler/inserir
```
- Importar os 78 usuários únicos do `report.csv` (deduplicar e-mails repetidos como Sandra Lucia e Carmem Wichoski).
- Esta tabela serve como "lista branca" para validar quem pode resetar senha e acessar a plataforma após migração.

### 5. Conexão futura com Eduzz (mencionado para registro)
A integração direta com webhook de pagamento da Eduzz para validar pagantes ativos será feita em uma etapa posterior — por ora, a tabela `legacy_active_users` cobre a fase de transição.

### Arquivos alterados
- Storage: nova capa `ebooks/covers/a_cura_da_solid_o.jpg` (substituição)
- `src/pages/Livros.tsx` — `object-cover` para uniformizar capas
- `src/pages/Login.tsx` — card "Primeiro Acesso" + dialog de reset
- `src/pages/ResetPassword.tsx` — nova página
- `src/App.tsx` — rota `/reset-password`
- Migration SQL — criação da tabela `legacy_active_users` + RLS + insert dos 78 usuários
- `supabase/functions/auth-email-hook/` + templates customizados (recovery em PT-BR com logo)
- Setup de domínio de e-mail (se ainda não configurado)

