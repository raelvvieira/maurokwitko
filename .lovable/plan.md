# Ajustes da página /clube-de-estudos

Edita apenas `src/pages/public/ClubeDeEstudos.tsx` (e cria 1 novo asset de imagem).

## 1. Carrossel do acervo com e-books reais do Dr. Mauro
- Trocar o array `BOOKS` (capas fictícias) por dados reais via `useEbooks()` do `useSupabaseData`.
- Mapear `ebooks` → `{ img: cover_url, alt: title }`, manter loop duplicado.
- Igualar a velocidade ao carrossel de tópicos (mesma `animation duration`, 46s).
- Fallback (enquanto carrega ou se vazio): manter as 6 capas atuais para não quebrar visual.
- Remover os imports `book-*.png.asset.json` se ficarem só de fallback opcional — vou manter como fallback.

## 2. Bloco "Olá, sou Dr. Mauro" menos largo
- Reduzir largura máxima da `mentor-card`: envolver em wrapper `max-width: 880px; margin-inline: auto`.
- Ajustar grid para `minmax(180px, 240px) 1fr` e padding interno mais contido.

## 3. Espaçamento harmônico entre cards/seções
- Padronizar `.section` para `padding: 72px 0` (desktop) e `40px 0` (mobile).
- Padronizar `gap` dos grids de features para `14px`.
- Aumentar `margin-top` consistente entre `eyebrow` → `h2` (ver item 4) e entre `h2` → parágrafo (`16px`).
- Uniformizar `border-radius` dos panels em `var(--radius)` (20px).

## 4. Eyebrows (PERGUNTAS FREQUENTES, PARA QUEM É) com respiro
- Adicionar `margin-bottom: 18px` no `.eyebrow` quando seguido de `h2`.
- Nas seções audience-section e faq-section, garantir gap visual: `h2 { margin-top: 14px }`.

## 5. Header fixo + oculto com seta toggle (somente nesta página)
- O `PublicHeader` é `fixed` globalmente; nesta página ele precisa ficar **oculto por padrão** e revelado por uma setinha centralizada no topo.
- Implementação local (sem alterar `PublicHeader`):
  - Adicionar `useEffect` que injeta `<style>` global escopado por `body.clube-hide-header header` → `transform: translateY(-100%); transition: transform .3s ease;` e adiciona a classe `clube-hide-header` no `body` ao montar; remove ao desmontar.
  - Renderizar um botão `fixed top-0 left-1/2 -translate-x-1/2 z-[60]` com ícone `ChevronDown`/`ChevronUp` (lucide-react) que alterna a classe `clube-show-header` no body. Quando presente, regra CSS aplica `transform: translateY(0)` ao header.
  - Botão pequeno, glassmorphism leve, centralizado, sempre visível; gira a seta 180° quando o header está aberto.

## 6. Remover mockup de notebook — usar só a tela
- Fazer upload do screenshot do dashboard (anexo "image-75.png") como novo asset:
  `lovable-assets create --file /mnt/user-uploads/image-75.png --filename platform-screen.png > src/assets/clube/platform-screen.png.asset.json`
- Substituir `laptopMockup` por `platformScreen` na seção "Plataforma".
- Remover wrapper `.laptop-scene` (perspective/min-height) — usar `img` direta com `border-radius: 18px; box-shadow: var(--shadow); width: 100%; max-width: 720px;`.
- Deletar asset `platform-laptop-mockup.png.asset.json` com `assets--delete_asset` (não é mais usado).

## Resumo técnico
- Arquivo principal: `src/pages/public/ClubeDeEstudos.tsx`
- Novo asset: `src/assets/clube/platform-screen.png.asset.json`
- Asset removido: `src/assets/clube/platform-laptop-mockup.png.asset.json`
- Sem mudanças em `PublicHeader.tsx`, rotas, backend ou i18n.
