## Ajustar cor do selo "verificado" em `/links`

Arquivo: `src/pages/Links.tsx`

No bloco do avatar (logo abaixo do `<img>` do perfil), o ícone `BadgeCheck` está com fundo `bg-primary` (azul-ardósia da paleta). Trocar para o azul solicitado:

- `bg-primary` → `bg-[#007DF7]`
- `text-primary-foreground` → `text-white` (mantém o tique branco com bom contraste sobre o novo azul)

Sem outras alterações.
