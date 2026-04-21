

## Plano: refinos na hero, curso online, hinos tocáveis e velocidade do marquee

### 1. Hero da Home (`src/pages/public/Home.tsx`)

- **Copy do título:** trocar "Ciência, Clínica e *Despertar Espiritual*" por "Ciência, Clínica e *Reencarnação*" (mantém serif itálico no último termo).
- **CTAs:** remover os 3 botões atuais e o link "Pesquisas e Artigos". Manter apenas **um** CTA: `Conheça nossa Formação` (verde `bg-emerald-600`, animação pulse igual aos botões "Saiba Mais", → `/formacao`).
- **Selo de credibilidade:** mover `CRM 5761 · UFRGS · Fundador da ABPR` da coluna de texto para **abaixo da imagem do Dr. Mauro** (coluna direita), centralizado, fonte um pouco maior (`text-sm md:text-base font-medium text-foreground/70 tracking-wide`).
- **Inscrições Abertas:** o pill "Inscrições Abertas" da seção Formação passa a ter tom verde (`bg-emerald-500/15 text-emerald-700` no light, `dark:text-emerald-400`).

### 2. Velocidade do marquee de e-books

O `<Marquee>` desloca `-50%` em `duration` segundos. Como há mais e-books (até 20) que livros (7), a faixa duplicada do marquee dos e-books fica muito maior e percorre mais distância no mesmo tempo, parecendo mais rápida. **Correção:** ajustar `duration` proporcionalmente ao número de itens em `Home.tsx`:
- Livros: `duration={60}` (7 itens → ~8.5s/item).
- E-books: `duration={Math.max(60, Math.round(ebooks.length * 8.5))}` (ex.: 20 itens → ~170s).

Resultado: cada card passa pela tela na mesma velocidade visual em ambos os carrosséis.

### 3. Curso On-line (`src/pages/public/CursoOnline.tsx`) — toda página centralizada

- **Hero:** virar layout vertical, tudo centralizado (`text-center max-w-3xl mx-auto`). Remover `grid md:grid-cols-2`.
- **VSL (vídeo Reels):** mover para **abaixo da hero**, centralizado (`max-w-[360px] mx-auto`), mantendo `aspect-[9/16]`.
- **INTRO:** já é `max-w-3xl mx-auto`, adicionar `text-center` aos parágrafos.
- **Módulos:** título já centralizado; manter grid 1/2/3 colunas.
- **Sobre o autor:** **REMOVER** completamente a seção (linhas 147-184) e todo estado relacionado (`expandBio`, `setExpandBio`, import `Award`).
- **FAQ:** **REMOVER** completamente (linhas 222-236) e remover imports `Accordion*`.
- **Avaliações:** manter, já está centralizada.
- **Imagens temáticas:** adicionar 3 imagens neutras do Unsplash distribuídas pela página, alinhadas ao tema:
  - Após a INTRO: imagem "jornada/caminho" (`https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&q=80` — pessoa em meditação).
  - Antes da seção Módulos: imagem "estudo/livros abertos" (`https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=1200&q=80`).
  - Antes do CTA final: imagem "amanhecer/recomeço" (`https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1200&q=80` — paisagem natural calma).
  - Cada imagem em container `max-w-3xl mx-auto rounded-3xl aspect-[21/9] object-cover shadow-md ring-1 ring-border/40`.

### 4. Hinos tocáveis no site público (`src/pages/public/HinosEspirituais.tsx`)

Hoje o botão "Ouvir no Clube" empurra pra `/login`. Tornar os hinos **tocáveis no próprio site** usando as playlists do YouTube já mapeadas em `Library.tsx`:

- Mapear cada playlist pública à URL embed:
  - Paz → `https://www.youtube.com/embed/videoseries?list=PLG7GxMRJ1lg1lkiGi6HLMAJhCq7NLfk7X`
  - Amor → `https://www.youtube.com/embed/videoseries?list=PLG7GxMRJ1lg2Pn2UzVXanS5k7_8beIBVy`
  - Fé → `https://www.youtube.com/embed/videoseries?list=PLG7GxMRJ1lg26AzCi0oOcrNZVir0SOc1j`
- Botão muda de "Ouvir no Clube" para **"Ouvir Agora"** e abre um `<Dialog>` com iframe do YouTube em `aspect-video`.
- Estado local `activePlaylist: { title; url } | null`. Reusa `Dialog` de `@/components/ui/dialog`.
- Capas continuam quadradas, layout intacto.

### Arquivos

**Alterados:**
- `src/pages/public/Home.tsx` — hero refinada, único CTA verde, selo abaixo da foto, duração marquee e-books proporcional, pill verde "Inscrições Abertas".
- `src/pages/public/CursoOnline.tsx` — layout 100% centralizado, VSL abaixo da hero, remoção de "Sobre o autor" e FAQ, 3 imagens temáticas.
- `src/pages/public/HinosEspirituais.tsx` — playlists tocáveis em modal, botão "Ouvir Agora".

**Sem mudanças:** Marquee component, Library.tsx (clube), header, rotas, dados.

