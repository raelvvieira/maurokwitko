

## Plano: Ajustes na Home, novas páginas e melhorias visuais

### 1. Home (`src/pages/public/Home.tsx`)

**Cards de livros e e-books clicáveis para detalhe:**
- Marquee de livros físicos: trocar `<a href={book.link}>` por `<Link to={'/livros-e-ebooks/fisico/' + book.slug}>`.
- Marquee de e-books: trocar `onClick={() => navigate('/login')}` por `navigate('/livros-e-ebooks/ebook/' + eb.id)`.
- Remover o overlay "Disponível no Clube" no hover dos e-books.

**Botões "Saiba Mais" mais evidentes em verde:**
- Trocar o link discreto "Saiba Mais →" abaixo de cada livro/e-book por um botão pill verde (`bg-emerald-600 text-white hover:bg-emerald-700`), ocupando a largura do card, com leve animação de zoom-in/zoom-out (mesma já usada em LivroDetalhe).

**Reduzir espaços entre seções:**
- Trocar paddings das seções de `py-20 md:py-28` para `py-12 md:py-16` (Hero, Livros, Formação, E-books, Quem Sou Eu, Galeria, Quote, Artigos, Contato).
- Hero: de `pt-28 md:pt-36 pb-20 md:pb-28` para `pt-24 md:pt-32 pb-12 md:pb-16`.

**Melhorar destaque visual (cards e seções):**
- Adicionar a cards/seções leve gradiente/sombra: bordas com `border border-border/60`, `bg-gradient-to-br from-background to-secondary/40`, `shadow-sm hover:shadow-lg`.
- Adicionar elementos decorativos sutis: blobs com `blur-3xl` em cores primary/accent atrás das seções de Livros e E-books.
- Cards de artigos: substituir o placeholder vazio (`aspect-[16/10]` gradiente) por uma imagem ou ícone temático com overlay.
- Aumentar levemente bordas arredondadas (`rounded-3xl`) e adicionar `ring-1 ring-border/40` nas seções principais.

**Velocidade do carrossel de e-books:**
- Alterar `duration={50}` para `duration={60}` no Marquee de e-books (igualando ao de livros físicos).

### 2. Header público (`src/components/public/PublicHeader.tsx`)

- Adicionar item **"Hinos Espirituais"** apontando para `/hinos-espirituais`.
- Adicionar item **"Rádio"** com submenu (igual ao "Cursos") contendo um filho **"Rádio com Dr. Mauro"** apontando para `/radio`.
- No submenu de Cursos, o item "Curso On-line: A Psicologia da Reencarnação" passa a apontar para `/curso-online` (página nova).

### 3. Nova página pública: Hinos Espirituais (`src/pages/public/HinosEspirituais.tsx`)

- Hero com título "Hinos Espirituais" e descrição.
- 3 cards de playlists (Hinos de Paz, Hinos de Amor, Hinos de Fé) com capa/ícone e botão para "Ouvir no Clube" (CTA login) ou link YouTube.
- Layout consistente com LivrosEbooks (cards com border, hover, sombra).
- Rota registrada em `App.tsx` dentro do `PublicLayout`.

### 4. Nova página pública: Rádio (`src/pages/public/RadioPublica.tsx`)

- Reaproveitar visual da `Radio.tsx` privada (cards Paranormal.plus e Soul Cast Plus com horários e botão "Escutar Agora").
- Adaptar para o layout público (header fixo, padding-top 32, max-width 5xl, glassmorphism leve).
- Rota `/radio` registrada em `App.tsx` dentro do `PublicLayout`.

### 5. Nova página pública: Curso On-line (`src/pages/public/CursoOnline.tsx`)

- **Hero**: título "Curso On-Line com Dr. Mauro Kwitko — A Psicologia da Reencarnação" + subtítulo + CTA verde "Quero me Inscrever" → `https://reformaintimaonline.com.br`.
- **VSL em formato Reels**: container vertical (`aspect-[9/16]`) centralizado com iframe do YouTube `https://www.youtube.com/embed/eT7wOH_YkC4`, max-width ~360px, sombra e bordas arredondadas.
- **Texto introdutório** (parágrafos do briefing).
- **Módulos**: grid responsivo (2/3 colunas) com 21 cards numerados (01–20 + Bônus), cada card com número grande, título e leve hover.
- **Sobre o autor**: card com foto Dr. Mauro, nome, badge "5 Anos Hotmarter", bio completa, botão "Mostrar mais" (toggle).
- **Avaliações**: 5 cards com estrelas (5/5), data, depoimento, nome do avaliador.
- **FAQ**: accordion (componente `ui/accordion`) com as 10 perguntas listadas (respostas placeholder curtas).
- **CTA final** verde grande "Acessar o Curso On-Line".
- Rota `/curso-online` registrada em `App.tsx` dentro do `PublicLayout`.

### 6. Roteamento (`src/App.tsx`)

Adicionar dentro de `<Route element={<PublicLayout />}>`:
- `/hinos-espirituais` → `HinosEspirituais`
- `/radio` → `RadioPublica`
- `/curso-online` → `CursoOnline`

### Arquivos

**Criados:**
- `src/pages/public/HinosEspirituais.tsx`
- `src/pages/public/RadioPublica.tsx`
- `src/pages/public/CursoOnline.tsx`

**Alterados:**
- `src/pages/public/Home.tsx` — links nos cards, botões verdes, paddings reduzidos, decoração visual, duration do marquee.
- `src/components/public/PublicHeader.tsx` — Hinos Espirituais + Rádio submenu + ajuste link Curso On-line.
- `src/App.tsx` — 3 novas rotas.

**Sem mudanças:** Supabase, área do clube (`/app/*`), Marquee, Footer.

