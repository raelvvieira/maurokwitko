

## Plano: Ajustes Home, página de detalhe (livros/e-books) e nova página de Artigos

### 1. Página de detalhe `/livros-e-ebooks/:tipo/:id` (`LivroDetalhe.tsx`)

**E-books:**
- Card "Acesso gratuito para assinantes" → trocar tons slate/azul por **tons verdes** (`bg-emerald-50 border-emerald-200`, ícone/título em `text-emerald-700`, link "Conhecer o Clube" em `text-emerald-700 hover:text-emerald-800`).
- Botão **"Comprar"** → fundo verde (`bg-emerald-600 hover:bg-emerald-700 text-white`).
- Botão **"Adquirir Gratuitamente"** → manter estilo secundário, adicionar **animação de zoom suave infinita** (Framer Motion: `animate={{ scale: [1, 1.03, 1] }}`, `transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}`).

**Livros físicos:**
- Card "20% de desconto para membros do Clube" → tons verdes idem ao card dos e-books (consistência).
- Botão **"Comprar"** → fundo verde (`bg-emerald-600 hover:bg-emerald-700`).
- Botão **"Comprar com 20% de Desconto"** → **remover** o texto "cupom MAURO20" do botão (ficar só "Comprar com 20% de Desconto" + ícone tag). Aplicar mesma animação de zoom suave.
- O cupom continua sendo aplicado/mencionado apenas no card informativo ou tooltip pós-clique, **nunca no botão**.

### 2. Home (`src/pages/public/Home.tsx`)

**Trocar imagem do Hero (Mauro):**
- Substituir URL atual da foto do Mauro por: `https://i.ibb.co/mCWzv6QL/39854-adfff7a290f852480e5d85a937447885.jpg`.

**Reordenar seções** (top → bottom):
1. **Hero** (atual)
2. **Livros** (carrossel de livros físicos — atual seção "Alguns dos meus livros")
3. **Curso de Formação** (card destacado)
4. **E-books** (carrossel de e-books)
5. **Quem Sou Eu** (galeria + bio curta)
6. (mantém o que já existe depois — Artigos preview, contato, etc.)

Apenas reordenação dos blocos JSX existentes, sem alterar conteúdo interno.

### 3. Nova página `/artigos` (catálogo de artigos)

**Arquivo:** `src/pages/public/Artigos.tsx` + rota em `App.tsx` dentro do `PublicLayout`.

**Estrutura:**
- Hero curto: "Artigos do Dr. Mauro Kwitko" + subtítulo.
- Grid de cards (3 colunas desktop / 1 mobile) com lista hardcoded de artigos. Cada card: título, resumo curto (2 linhas), botão "Ler artigo" → `/artigos/:slug`.
- Por enquanto **1 artigo cadastrado**: "Transtorno do Espectro Autista" (slug `transtorno-do-espectro-autista`). Demais slots ficam ocultos (sem placeholders falsos).

### 4. Nova página de detalhe `/artigos/:slug` (`ArtigoDetalhe.tsx`)

- Layout de leitura: título grande, autor "Dr. Mauro Kwitko", corpo do artigo formatado com `prose` (Tailwind typography classes manuais já que `@tailwindcss/typography` pode não estar — usaremos espaçamento manual: `space-y-5 text-lg leading-relaxed text-slate-700`, com primeiro parágrafo em destaque).
- **Conteúdo do artigo "Transtorno do Espectro Autista" copiado integralmente, sem alterar uma palavra**, incluindo todos os parágrafos e os 3 itens (Interno / Externo / Intermediário).
- Fonte dos artigos: arquivo `src/data/articles.ts` (novo) com tipo `Article = { slug, title, excerpt, body: string[] }`.
- Link "← Voltar para Artigos" no topo.
- CTA final: "Conhecer o Clube de Estudos" → `/login`.

### 5. Atualização do header

- Em `PublicHeader.tsx`, item **"Artigos"** passa a apontar para `/artigos` (em vez de `/#artigos`).

### 6. Arquivos

**Novos:**
- `src/data/articles.ts` — lista de artigos com corpo completo do TEA.
- `src/pages/public/Artigos.tsx` — catálogo.
- `src/pages/public/ArtigoDetalhe.tsx` — leitura.

**Alterados:**
- `src/pages/public/LivroDetalhe.tsx` — cards verdes + botão Comprar verde + zoom suave + remover "cupom MAURO20" do botão.
- `src/pages/public/Home.tsx` — trocar foto Mauro + reordenar seções.
- `src/components/public/PublicHeader.tsx` — link Artigos para `/artigos`.
- `src/App.tsx` — registrar `/artigos` e `/artigos/:slug`.

**Sem mudanças:** Supabase, Clube (`/app/*`), footer, Marquee.

