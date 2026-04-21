

## Plano: eliminar a "linha" da imagem do slide vizinho no hero

### Causa
No carrossel da hero (`src/pages/public/Home.tsx`), os slides são `basis-full` colados lado a lado sem espaçamento. Quando o slide ativo está parado, a **borda esquerda da imagem do próximo slide** fica visível como uma linha vertical fina junto ao texto do slide atual — é o que aparece na imagem enviada.

### Correção (`src/pages/public/Home.tsx`)

**1. Adicionar gap horizontal entre slides do track**
- No track flex (linha 119): `<div className="flex">` → **`<div className="flex -ml-6 md:-ml-10">`**
- Em cada slide (linha 121-127): adicionar `pl-6 md:pl-10` ao `className`.

Esse padrão (margin negativa no pai + padding no filho) é o recomendado pelo Embla para criar espaço entre slides sem quebrar o cálculo de `basis-full`. Resultado: 24px (mobile) / 40px (desktop) de respiro entre o conteúdo de um slide e a imagem do próximo. A "linha" some porque a imagem vizinha fica deslocada para fora da área visual imediata do slide ativo.

**2. Garantir corte limpo nas bordas do card**
- Trocar `overflow-hidden` (linha 118) por **`overflow-hidden rounded-[1.5rem]`** para que qualquer pixel residual de slide vizinho seja cortado com cantos arredondados, alinhado ao card externo.

**3. Pequeno ajuste de respiro vertical interno**
- Manter padding do card como está (`p-8 sm:p-10 md:p-16 lg:p-20`) — já está bom. O problema não era o padding do card, era a falta de gap entre slides.

### Não muda
- Largura do card (`max-w-7xl`), tipografia, autoplay, dots, ordem dos slides, demais seções da Home.

### Arquivo alterado
- `src/pages/public/Home.tsx` (3 linhas)

