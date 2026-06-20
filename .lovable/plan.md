Ajustes mobile no `/clube-de-estudos` (arquivo `src/pages/public/ClubeDeEstudos.tsx`):

1. **Hierarquia tipográfica no mobile** (em `@media (max-width: 640px)`):
   - `h1` da hero: aumentar para `clamp(2rem, 7vw, 2.4rem)` com line-height 1.2.
   - `h2` das seções: aumentar para `1.65rem` (vs `~1.4rem` atual) com line-height 1.25.
   - `.lead`, `.plain-copy`, `.library-subtitle`: manter em `1rem` para criar contraste claro com h2.
   - `.eyebrow`: manter pequeno (0.75rem).

2. **Padding interno dos cards/panels no mobile** (evitar texto colado nas bordas):
   - `.panel`, `.platform-card`, `.faq-section.panel`, `.mentor-card`, `.pricing-card`, `.price-anchor`: forçar `padding: 22px 20px` em telas ≤640px (hoje o `clamp` mínimo 22px é aplicado ao padding total via shorthand, mas o `padding-inline` em alguns blocos fica apertado).
   - `.faq-section` (painel): adicionar `padding: 24px 20px` no mobile e dar `margin-inline` interno aos `<details>` (`padding: 16px`).
   - `details summary`: garantir `padding-right: 8px` para que o "+" não cole na borda.

3. **Largura da página no mobile**: aumentar a folga lateral para `width: min(100% - 32px, 1180px)` (hoje 24px) para respirar mais.

4. **Gradiente dourado/azul nas palavras da hero (estilo da imagem anexada)**:
   - Reintroduzir spans coloridos nas palavras-chave do h1:
     - "Reencarnação" e "Reforma Íntima" com gradiente azul → `linear-gradient(135deg, #1469d9, #5aa3ff)`.
     - "Psicoterapia Reencarnacionista" com gradiente dourado suave → `linear-gradient(135deg, #c9a84c, #e8c987)`.
   - Aplicado via `background-clip: text` sem animação, sem glow forte — apenas o degradê estático como na referência enviada.

5. **Outros pequenos ajustes mobile**:
   - `.community > img`: `min-height: 280px` no mobile (hoje 360px ocupa demais).
   - `.mentor-card img`: reduzir altura no mobile para `220px`.
   - `.stat-row`: manter em 3 colunas no mobile (já está), mas reduzir `font-size` do `strong` para caber.
   - `.feature`: garantir `font-size: .95rem` e `line-height: 1.4` para não estourar.

Sem mudanças de lógica/dados — apenas CSS dentro do bloco `styles` e o JSX do `<h1>` da hero.