

## Plano: Ajustar tamanhos da capa do álbum e miniaturas dos hinos

### Mudanças em `src/pages/Library.tsx`

1. **Capa do álbum menor**: Trocar `w-full aspect-square` por um tamanho fixo menor (ex: `w-32 h-32` ou `w-40 h-40`) para que a capa não ocupe toda a largura do card. Também reduzir o ícone `Disc3` proporcionalmente.

2. **Miniaturas dos hinos maiores**: Aumentar de `w-14 h-10` para `w-20 h-14` (ou similar) nas thumbnails das faixas, dando mais destaque visual.

3. **Harmonização geral**: Centralizar melhor o layout do card quando aberto, ajustar padding e espaçamento para que capa menor + lista de faixas fiquem visualmente equilibrados.

### Detalhes técnicos

- Linha 45: `w-full aspect-square` → `w-32 h-32 mx-auto` (capa centralizada e menor)
- Linha 46: `w-16 h-16` → `w-10 h-10` (ícone menor)
- Linha 74: `w-14 h-10` → `w-20 h-14` (thumbnails maiores)

