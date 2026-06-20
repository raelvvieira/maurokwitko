# Ajustes finais na página /clube-de-estudos

Edita apenas `src/pages/public/ClubeDeEstudos.tsx`. Sem mudanças em rotas, backend ou `PublicHeader`.

## 1. Card de preço mais chamativo — dourado + brilho
- Trocar a borda azul atual por borda dourada com gradiente: `border: 1px solid rgba(201,168,76,.55)` + glow `box-shadow: 0 30px 80px -30px rgba(201,168,76,.55), 0 0 0 1px rgba(201,168,76,.25) inset`.
- Fundo do card: gradiente sutil `linear-gradient(180deg, #fffaf0 0%, #ffffff 55%, #f7f1e1 100%)`.
- "ASSINATURA" eyebrow em dourado (`#b8902f`).
- Preço `R$ 29` com gradiente dourado (`linear-gradient(135deg, #d4af37, #f5d77a, #b8860b)` via `background-clip: text`) e leve `drop-shadow` âmbar.
- Badge "Mais escolhido" em dourado sólido (fundo `#e9c97a`, texto escuro).
- Divisor com gradiente dourado.
- Animação `@keyframes goldShine` aplicada ao card (overlay `::after` com gradiente translúcido que cruza a cada 6s) — efeito de brilho discreto.

## 2. CTAs em verde WhatsApp
- Adicionar variável `--wa: #25D366` e `--wa-dark: #128C7E`.
- Substituir o gradiente azul de `.button.primary` (Hero, CTA final e pricing) por gradiente verde WhatsApp `linear-gradient(135deg, #25D366, #128C7E)` com hover `#20bd5a → #0e6b5e` e sombra `0 18px 40px -16px rgba(37,211,102,.55)`.

## 3. Seta do header fixa no topo
- A `.clube-header-toggle` já é `position: fixed`. Garantir `top: 8px; left: 50%; transform: translateX(-50%); z-index: 70;` e remover qualquer regra que dependa de scroll. Confirmar que nenhum ancestral cria contexto que a torna `absolute`.

## 4. Copy do hero
- Substituir headline atual por:
  > "30 anos de estudos sobre Reencarnação, Reforma Íntima e Psicoterapia Reencarnacionista reunidos em um único lugar."
- Evitar que "lugar" caia sozinho na última linha: envolver `reunidos em um único lugar` em `<span style={{ whiteSpace: 'nowrap' }}>` apenas nas palavras finais `um único lugar` (`&nbsp;` entre "um", "único" e "lugar") para forçar quebra antes.

## 5. Brilho dourado leve no headline
- Adicionar `.clube-page .hero-title .gold-glow` com:
  - `background: linear-gradient(135deg, #c9a84c 0%, #f5d77a 50%, #b8860b 100%); -webkit-background-clip: text; color: transparent;`
  - `text-shadow: 0 0 24px rgba(212,175,55,.25);`
  - animação `goldShimmer` 4s ease-in-out infinite (alterna brightness 1 → 1.15).
- Aplicar à palavra-chave "Reforma Íntima" dentro do headline para destaque sem poluir.

## 6. Pixel + UTM nesta página
- Verificado: `index.html` já carrega o Facebook Pixel global (`fbq('init', '2180807806070529')` + PageView) e o script que anexa UTM em qualquer link `https://chk.eduzz.com/...`. Como o CTA do pricing usa exatamente `https://chk.eduzz.com/2445141`, **ambos já funcionam nesta página** — nada a alterar. Vou apenas confirmar isso na resposta após o build.

## Resumo técnico
- Arquivo: `src/pages/public/ClubeDeEstudos.tsx` (CSS scoped + JSX do hero/pricing/CTAs).
- Nenhum asset novo, nenhuma dependência nova.
