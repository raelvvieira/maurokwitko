

## Plano: rodapé com redes reais, botão "Voltar para o Site" no clube, e Artigos unificados

### 1. Footer público (`src/components/public/PublicFooter.tsx`)
Trocar os `href="#"` dos 3 ícones sociais pelos links reais (com `target="_blank"` e `rel="noopener noreferrer"`):
- Instagram → `https://www.instagram.com/maurokwitko/`
- YouTube → `https://www.youtube.com/channel/UCrAaxlSZUbKoFNrCVgQ3uAw`
- Facebook → `https://www.facebook.com/maurokwitko`

### 2. Botão "Voltar para o Site" no header do clube (`src/components/TopBar.tsx`)
Adicionar, à esquerda do `NotificationDropdown`, um botão discreto com ícone `Home` (lucide) e texto "Voltar para o Site" (texto oculto no mobile, só ícone). Estilo: `rounded-xl px-3 py-1.5 text-sm hover:bg-secondary/60`, `onClick={() => navigate('/')}`.

### 3. "Blog" → "Artigos" dentro do clube (unificar com o site público)

**Sidebar (`src/components/GlassSidebar.tsx`):** renomear o item "Blog" para "Artigos" (manter rota `/app/blog` para não quebrar links existentes; alterar apenas o `label` e ícone se fizer sentido — manter o atual).

**Listagem (`src/pages/Blog.tsx`):** reescrever para consumir a **mesma fonte do site público** — `ARTICLES` de `src/data/articles.ts` + capas de `src/data/articleImages.ts`. Layout: grid 1/2/3 colunas glass-card com capa (`aspect-[16/10]`), título, excerpt (`line-clamp-3`) e botão "Ler artigo" → navega para `/app/blog/:slug` (mantém prefixo `/app/blog/` mas usa o slug do artigo). Título da página: "Artigos".

**Detalhe (`src/pages/BlogPost.tsx`):** reescrever para procurar o artigo em `ARTICLES` por `slug` (parâmetro da rota), renderizando título, imagem hero (mesmo `getArticleImage`), e o `content` HTML do artigo — espelhando o layout de `src/pages/public/ArtigoDetalhe.tsx`, porém envolvido pelo `AppShell` (já é). Botão "Voltar" para `/app/blog`.

**Painel admin (`src/pages/Admin.tsx`):** localizar a aba/seção "Blog" (que hoje grava em `blog_posts` no Supabase). Manter a tabela `blog_posts` intocada, **mas** adicionar uma nova aba **"Artigos"** com formulário completo espelhando os campos usados no site:
- `slug` (texto, único)
- `title`
- `excerpt` (textarea curta)
- `content` (textarea longa, aceita HTML/Markdown — mesmo formato de `articles.ts`)
- `image_url` (URL da capa, opcional — fallback para `getArticleImage(slug)`)
- `author` (default Dr. Mauro Kwitko)
- `published_at`

Como hoje os artigos são **estáticos** em `src/data/articles.ts`, criar nova tabela Supabase `articles` com migração:
```sql
create table public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text not null default '',
  content text not null default '',
  image_url text,
  author text not null default 'Dr. Mauro Kwitko',
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);
alter table public.articles enable row level security;
create policy "Public read" on public.articles for select using (true);
create policy "Admins manage" on public.articles for all using (
  auth.jwt()->>'email' in ('raelvvieira@gmail.com','mauroabpr@gmail.com')
) with check (
  auth.jwt()->>'email' in ('raelvvieira@gmail.com','mauroabpr@gmail.com')
);
```
Seed: inserir os artigos atuais de `ARTICLES` para que site e clube mostrem o mesmo conteúdo. As páginas `Artigos.tsx`, `ArtigoDetalhe.tsx`, `Blog.tsx` e `BlogPost.tsx` passam a ler de `articles` (via Supabase) e cair no `ARTICLES` estático apenas como fallback inicial.

Painel admin ganha CRUD: criar / editar / excluir artigo, com preview do HTML.

### Arquivos

**Criados:**
- migração SQL `articles` + seed dos artigos atuais
- `src/hooks/useArticles.ts` (fetch + create/update/delete)

**Alterados:**
- `src/components/public/PublicFooter.tsx` — links sociais reais.
- `src/components/TopBar.tsx` — botão "Voltar para o Site".
- `src/components/GlassSidebar.tsx` — label "Artigos".
- `src/pages/Blog.tsx` — listagem de artigos unificada.
- `src/pages/BlogPost.tsx` — detalhe por slug, layout do site.
- `src/pages/public/Artigos.tsx` e `src/pages/public/ArtigoDetalhe.tsx` — passam a ler de Supabase com fallback estático.
- `src/pages/Admin.tsx` — nova aba "Artigos" com formulário completo (slug, título, excerpt, content, capa, autor, data).
- `src/App.tsx` — rota interna `/app/blog/:slug` (já existe; confirmar param).

**Sem mudanças:** tabela `blog_posts` (mantida para compatibilidade), demais áreas do site, hinos, clube de estudos, cursos.

