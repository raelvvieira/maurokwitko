

## Ajuste: Logo nos e-mails de autenticação

O logo nos templates de e-mail está sendo renderizado com dimensões quadradas (120×120), o que comprime/distorce a imagem original que tem proporção retangular (mais larga do que alta, conforme o original anexado).

### Mudança
Atualizar as dimensões da tag `<Img>` em todos os 6 templates de e-mail para preservar a proporção original do logo (~260×120, proporção ~2.17:1).

### Arquivos alterados
- `supabase/functions/_shared/email-templates/signup.tsx`
- `supabase/functions/_shared/email-templates/recovery.tsx`
- `supabase/functions/_shared/email-templates/magic-link.tsx`
- `supabase/functions/_shared/email-templates/invite.tsx`
- `supabase/functions/_shared/email-templates/email-change.tsx`
- `supabase/functions/_shared/email-templates/reauthentication.tsx`

Em cada arquivo:
- `width="120"` → `width="240"`
- `height="120"` → `height="110"`
- Remover `borderRadius: '16px'` do estilo `logo` (não é necessário para o logo retangular original)

### Deploy
Após a edição, redeploy do edge function `auth-email-hook` para que os novos templates entrem em vigor.

