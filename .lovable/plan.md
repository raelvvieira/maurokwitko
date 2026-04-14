

## Plano: Ajustar faixas dos Hinos no mobile

### Mudança única: `src/pages/Library.tsx`

**1. Título da faixa visível por completo**
- Linha 78: trocar `truncate` por `break-words` para o título fazer wrap em várias linhas no mobile

**2. Simplificar ações: apenas ícone Play**
- Linhas 80-100: remover o texto "Tocar", remover o link/ícone `ExternalLink` do YouTube
- Manter apenas o botão com ícone `Play` (tamanho `w-4 h-4`) que abre o player

- Remover import de `ExternalLink` (linha 3)

