

## Plano: Adicionar banner promocional na página de Livros

### Mudança única: `src/pages/Livros.tsx`

Inserir um banner estilizado entre o subtítulo e o grid de livros com:

- Destaque visual: fundo gradiente (accent/primary) com bordas arredondadas, ícone de desconto
- Cupom em destaque: texto `MAURO20` com estilo de código/badge para fácil identificação
- Copy reformulada e clara:
  - **Título**: "20% de desconto em todos os livros!"
  - **Instrução**: "Use o cupom **MAURO20** no checkout da BesouroBox. Basta clicar em Comprar, adicionar ao carrinho e aplicar o cupom na hora do pagamento."
- Estilo `glass-card` com borda accent para manter consistência visual

### Posição no layout
Entre a `<p>` do subtítulo (linha ~62) e o `<div className="grid ...">` (linha ~68).

