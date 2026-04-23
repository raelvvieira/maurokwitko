

## Plano: ajustes mobile (hero, capas, menu, margens) + login

### 1. Hero da Home — texto cortado no mobile (`src/pages/public/Home.tsx`)
- Reduzir o padding interno do card hero no mobile, que hoje é `p-8 sm:p-10` (32–40 px) e está comendo as letras: trocar para `p-5 sm:p-8 md:p-16 lg:p-20`.
- Reduzir o tamanho do título no mobile: `text-4xl` → `text-3xl sm:text-4xl md:text-5xl lg:text-6xl` para evitar o "1" cortado em "30+".
- Quebrar palavras longas com segurança: adicionar `break-words` no `<h1>` e `hyphens-auto` no `<p>` da descrição.
- Padding lateral do contêiner externo: `px-3 md:px-6` → `px-4 md:px-6` (mais respiro).

### 2. Capas de Livros e E-books no mobile (cabem ~3 por tela)

**a) Marquees da Home** (`Home.tsx`, dois blocos `Marquee`):
- Trocar tamanho mobile dos cards de `w-[160px] h-[240px]` para `w-[112px] h-[168px]` (o `md:w-[200px]` desktop fica igual). Aplica-se ao wrapper do `<Link>` e ao `<div>` da imagem.

**b) Grade da página `/livros-e-ebooks`** (`LivrosEbooks.tsx`):
- A grade já é `grid-cols-2 md:grid-cols-3 lg:grid-cols-4`. Trocar para `grid-cols-3 md:grid-cols-3 lg:grid-cols-4` (3 colunas no mobile).
- Reduzir tipografia/padding internos do card no mobile para caber bem: `p-4 md:p-5` → `p-3 md:p-5`; título `text-sm` → `text-xs md:text-base`; preço `text-lg` → `text-base md:text-lg`; gap da grade `gap-5` → `gap-3 md:gap-6`.
- Carrossel "Todas as obras" no fim da página: mesma redução do item a) — `w-[112px] h-[168px]` no mobile.

### 3. Margens laterais maiores no mobile (textos colados na borda)
Aumentar paddings horizontais nas seções principais públicas:
- `Home.tsx`: trocar `px-4 md:px-6` por `px-5 md:px-6` nas seções "Livros", "Formação", "E-books", "Quem Sou Eu", "Artigos" e demais.
- `LivrosEbooks.tsx`: idem nas `<section>` (`px-4 md:px-6` → `px-5 md:px-6`).
- Aplicar o mesmo padrão (`px-5 md:px-6`) nas páginas `Formacao.tsx`, `QuemSouEu.tsx`, `CursoOnline.tsx`, `ClubeDeEstudos.tsx`, `Artigos.tsx`, `HinosEspirituais.tsx`, `RadioPublica.tsx`, `LivroDetalhe.tsx`, `ArtigoDetalhe.tsx`.

### 4. Menu mobile lento/com erro (`src/components/public/PublicHeader.tsx`)
Causa: o painel é renderizado dentro do `<header>` que é `fixed` com `backdrop-blur-xl` quando há scroll — o `backdrop-blur` aplicado ao container pai pesa e atrapalha a animação do drawer. Ajustes:
- Mover o overlay + drawer para **fora** do `<header>` (renderizar via `createPortal` no `document.body`) para que o `backdrop-blur` do header não recalcule a cada frame da animação do drawer.
- Reduzir a duração da animação de `0.25` → `0.2` e trocar o `type: 'tween'` por `ease: 'easeOut'` simples.
- Trocar o `backdrop-blur-sm` do overlay por opacidade pura (`bg-black/50`, sem blur) — blur duplo no mobile causa jank/erro de render.
- Trancar o scroll do body enquanto o drawer está aberto (`document.body.style.overflow = 'hidden'`) e restaurar no close — evita travamentos de gesto.
- Garantir `will-change: transform` no painel do drawer.

### 5. Página de Login (`src/pages/Login.tsx`)

**a) Card "É seu primeiro acesso no NOVO Clube..."** com efeito de zoom + brilho:
- Envelopar o `<button>` em `motion.button` com:
  - `animate={{ scale: [1, 1.025, 1] }}` em loop (`duration: 2.6, repeat: Infinity, ease: 'easeInOut'`).
- Adicionar uma camada de brilho (overlay absoluto com `bg-gradient-to-r from-transparent via-white/25 to-transparent`) animado de `x: -120% → 120%` em loop (`duration: 3.2, repeat: Infinity, ease: 'easeInOut'`), com `mix-blend-overlay` e `pointer-events-none`. O card recebe `relative overflow-hidden` para conter o brilho.
- Manter o conteúdo atual do card.

**b) Substituir "Não tem conta? Criar conta" por "Criar Nova Senha"**:
- Remover o toggle `isSignUp` e o link "Criar conta".
- No lugar, colocar: `Já possui acesso? Entre acima. Primeira vez aqui?` + botão de texto **"Criar Nova Senha"** que abre o mesmo `Dialog` de reset que já existe no arquivo (`setResetOpen(true)`).
- O fluxo já implementado faz exatamente o que foi pedido: chama `check-paid-access`, e:
  - se pagante → envia `resetPasswordForEmail` e mostra confirmação.
  - se não pagante → mostra card vermelho com texto "E-mail não encontrado" + botão **"Adquirir acesso ao Clube"** (link `https://chk.eduzz.com/2445141`).
- Limpar estados/imports não usados (`isSignUp`, `signUp`, ícone `UserPlus`).

### Não muda
- Layout desktop, conteúdo dos textos, cores da paleta, lógica de `check-paid-access`, webhook Eduzz, e-books, dados de livros.

### Arquivos alterados
- `src/pages/public/Home.tsx`
- `src/pages/public/LivrosEbooks.tsx`
- `src/components/public/PublicHeader.tsx`
- `src/pages/Login.tsx`
- Paddings laterais: `Formacao.tsx`, `QuemSouEu.tsx`, `CursoOnline.tsx`, `ClubeDeEstudos.tsx`, `Artigos.tsx`, `ArtigoDetalhe.tsx`, `HinosEspirituais.tsx`, `RadioPublica.tsx`, `LivroDetalhe.tsx`

