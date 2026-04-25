## Ajustes finos no `/links`

### 1. Brilho do botão "Clube de Estudos" — melhor qualidade
Arquivo: `src/pages/Links.tsx` (componente `LinkButton`)

Hoje o shine é uma faixa única `w-1/3` com `via-white/55`, que aparece "dura" e baixa qualidade. Vamos refinar:

- Trocar a faixa única por **duas camadas combinadas** para um efeito mais cinematográfico:
  - **Camada 1 (glow base):** gradiente radial sutil pulsando em opacidade (`opacity: [0.35, 0.6, 0.35]`) cobrindo o botão inteiro, dando um "respiro" luminoso constante.
  - **Camada 2 (shine sweep):** faixa diagonal mais larga (`w-1/2`), com gradiente multi-stop `from-transparent via-white/20 via-white/70 via-white/20 to-transparent`, `blur-sm` para suavizar bordas, `skew-x-[-25deg]`, atravessando de `-150%` a `150%` em `1.8s` com `repeatDelay: 2.4s` e easing `easeOut`.
- Aumentar levemente o ring do variant `light-blue` para `ring-1 ring-white/50` e adicionar um `inner shadow` sutil (`shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4)]`) para dar profundidade premium.
- Ajustar o gradiente base do `light-blue` para um degradê mais rico: `from-sky-300 via-sky-500 to-cyan-600` (mais contraste interno → o brilho fica mais visível).
- Reduzir levemente a amplitude do zoom para algo mais elegante: `scale: [1, 1.025, 1]` em `2.8s`.

### 2. Badge "Novo" cortado pelo arredondamento
Arquivo: `src/pages/Links.tsx` (componente `LinkButton`)

O problema: o container tem `overflow-hidden` (necessário para o shine não vazar), e o badge está posicionado em `-top-1.5 -right-1`, então o canto arredondado do botão (`rounded-full`) corta a parte superior/direita do badge.

Solução: separar o badge do botão usando um **wrapper relativo sem overflow**:

- Envolver o `<motion.a>` em uma `<div className="relative">` (sem `overflow-hidden`).
- Manter o `overflow-hidden` apenas no `<motion.a>` (botão), para o shine continuar contido.
- Mover o `{item.badge && ...}` para **fora do `<motion.a>`** e dentro do wrapper `<div>`, posicionado com `absolute -top-2 -right-2 z-10` — assim ele flutua sobre o botão sem ser cortado pelo `rounded-full` nem pelo `overflow-hidden`.
- Pequeno polimento visual no badge: `px-2.5 py-1`, `text-[10px]`, e troca de `animate-pulse` puro por uma animação framer-motion de scale sutil (`scale: [1, 1.08, 1]`) para combinar com o resto da página.

### Detalhes técnicos
- Apenas `src/pages/Links.tsx` é tocado.
- Sem mudanças em rotas, dados ou outros componentes.
- Mantém todas as variantes, ícones, modal de rádio e demais botões intactos.
