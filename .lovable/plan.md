

## Plano: Ajustes Header + Página Formação + Nova página pública Livros e E-books

### 1. Header (`PublicHeader.tsx`)

- **Logo 3x maior**: `h-10 md:h-12` → `h-28 md:h-36` (mantém `w-auto object-contain`).
- **Remover** o bloco de texto ao lado ("Dr. Mauro Kwitko / Psicoterapia de Regressão").
- **Adicionar item "Home"** como primeiro item da `NAV` apontando para `/`.
- **Ajustar altura do header** (`h-20 md:h-28`) para acomodar o logo maior sem quebrar layout.
- **Trocar** "Livros e E-books" → rota `/livros-e-ebooks` (página nova).
- Mobile drawer: adiciona "Home" no topo da lista.

### 2. Página Formação (`Formacao.tsx`)

- **Imagem do hero mais vertical**: trocar `aspect-[4/3]` para `aspect-[3/4]` + `object-top` (ou `object-position: top`) para não cortar a cabeça do Mauro. Mantém a mesma URL.
- **Botão "Quero baixar o programa completo"**: trocar `mailto:` por link direto:
  `https://maurokwitko.com.br/wp-content/uploads/2022/09/PROGRAMA-DO-CURSO.pdf` (target `_blank`, `rel="noopener noreferrer"`, `download`).
- **Cards "Quem pode se inscrever"**: adicionar ícones personalizados (Lucide) por critério:
  - Saúde Oficial → `Stethoscope`
  - Saúde Alternativa → `Sparkles`
  - Estudante → `GraduationCap`
  - Religiosas → `HeartHandshake`
  - Educação → `BookOpen`
  - Cada card com ícone destacado em círculo `bg-primary/10`.
- **Cards de turmas (WhatsApp)**: 
  - Mudar visual para tom verde WhatsApp (`bg-emerald-50 border-emerald-200 hover:border-emerald-500`, ícone em `bg-emerald-500 text-white`).
  - Substituir ícone `MapPin` por ícone WhatsApp (Lucide `MessageCircle` ou SVG inline do WhatsApp — usaremos SVG inline custom para fidelidade).
  - Texto secundário: "Toque para entrar no grupo do WhatsApp".
  - Links reais por turma:
    - Rio: `https://chat.whatsapp.com/D2yhIa0pwqU789zytvfYKC`
    - Porto Alegre: `https://chat.whatsapp.com/Cx0Z343wotY9FQrhKeBnXB`
    - Ceará: `https://chat.whatsapp.com/GOh1fdZaV1o0nh3xLb8dXz`
    - Sergipe: `https://chat.whatsapp.com/LUDMdTpihjS8LZ2fV8W7bC`
  - `target="_blank"` `rel="noopener noreferrer"`.

### 3. Nova página pública: `/livros-e-ebooks` (catálogo)

**Arquivo:** `src/pages/public/LivrosEbooks.tsx` (registrar rota em `App.tsx` dentro do `PublicLayout`).

**Estrutura:**

1. **Hero curto** — título "Livros e E-books do Dr. Mauro Kwitko" + subtítulo.

2. **Seção "Livros Físicos"** — grid e-commerce (3-4 colunas no desktop, 2 no mobile):
   - Origem dos dados: lista hardcoded `BOOKS` (já existe em `src/data/books.ts` — usaremos essa única fonte). Passar a também usar em `src/pages/Livros.tsx` no clube para manter consistência (sem alterar visual do clube).
   - Cada card mostra: capa (aspect 2/3 padronizada), título, **preço** (vindo do `BOOKS`), botão "Saber mais" → navega para `/livros-e-ebooks/fisico/:slug`.

3. **Seção "Livros Digitais (E-books)"** — grid e-commerce:
   - Origem dos dados: `useEbooks()` (Supabase tabela `ebooks` — RLS pública).
   - Cada card: capa, título, autor, botão "Saber mais" → `/livros-e-ebooks/ebook/:id`.

4. **Carrossel de sugestões** no rodapé — usa o `<Marquee>` existente, exibe mistura aleatória de 6 capas (livros + ebooks) como na home.

### 4. Nova página de detalhe pública: `/livros-e-ebooks/:tipo/:id`

**Arquivo:** `src/pages/public/LivroDetalhe.tsx`. `tipo` = `fisico` ou `ebook`.

**Layout estilo e-commerce:**

- Coluna esquerda: capa grande do livro (sticky no desktop).
- Coluna direita:
  - Título grande + autor.
  - **Sinopse** (descrição). Para físicos: usaremos descrições curtas hardcoded no `src/data/books.ts` (a estender com campo `synopsis`); para ebooks, vem de `ebooks.description`.
  - **Comentário do Autor** — bloco com fundo destacado, label "Comentário do Autor" + espaço para vídeo:
    - `<iframe>` YouTube quando houver. Adicionaremos campo opcional `videoUrl` em `BOOKS` (para físicos) e usaremos um campo `video_url` que pode vir do banco para ebooks no futuro (por enquanto: placeholder "Em breve" se não houver vídeo cadastrado — sem migração nesta entrega).
  - **CTAs (variam por tipo):**
    
    **Se ebook:**
    - Botão primário: **"Comprar"** → link externo (campo `url` do ebook, se for link de venda; senão fallback para mailto/contato). 
    - Botão secundário: **"Adquirir Gratuitamente"** → leva para `/login`.
    - Card informativo abaixo: *"Assinantes do Clube de Estudos do Dr. Mauro Kwitko têm acesso gratuito a todos os e-books publicados."* + link "Conhecer o Clube".

    **Se livro físico:**
    - Botão primário: **"Comprar"** → link BesouroBox direto.
    - Botão secundário: **"Comprar com 20% de Desconto"** → mesmo link BesouroBox + abre tooltip/card com cupom `MAURO20`.
    - Card informativo abaixo: *"Membros do Clube de Estudos do Dr. Mauro Kwitko ganham 20% de desconto em todos os livros físicos com o cupom MAURO20."* + link "Conhecer o Clube".
    - Mostra **preço** em destaque.

- Abaixo: **carrossel de outros livros/ebooks** (6 itens, mesmo `<Marquee>`).

### 5. Atualização em `src/data/books.ts`

Estender o tipo `Book` com campos opcionais:
```ts
export type Book = {
  slug: string;          // novo - usado na rota
  title: string;
  price: string;
  cover: string;
  link: string;          // BesouroBox
  synopsis?: string;     // novo
  videoUrl?: string;     // novo - YouTube embed
};
```
Adicionar `slug` e `synopsis` em cada um dos 5 livros existentes (slugs derivados do título). `videoUrl` fica vazio por enquanto (mostra "Em breve" no detalhe).

### 6. Rotas adicionadas em `App.tsx`

Dentro de `<Route element={<PublicLayout />}>`:
```text
/livros-e-ebooks                    → LivrosEbooks
/livros-e-ebooks/:tipo/:id          → LivroDetalhe   (tipo = "fisico" | "ebook")
```

### 7. Arquivos

**Novos:**
- `src/pages/public/LivrosEbooks.tsx`
- `src/pages/public/LivroDetalhe.tsx`

**Alterados:**
- `src/components/public/PublicHeader.tsx` — logo maior, remover textos, adicionar "Home", trocar link "Livros e E-books" para `/livros-e-ebooks`, ajustar altura.
- `src/pages/public/Formacao.tsx` — imagem hero vertical, link real do PDF, ícones personalizados nos critérios, cards de turmas em verde com ícone WhatsApp + links reais.
- `src/data/books.ts` — adicionar `slug` e `synopsis` (e `videoUrl` opcional).
- `src/App.tsx` — registrar duas novas rotas públicas.

**Sem mudanças:** Supabase, Clube (`/app/*`), footer, Home.

### 8. Observações

- Sem migrações no Supabase nesta entrega. O catálogo de e-books usa o que já existe na tabela `ebooks` (RLS pública). O campo de vídeo de comentário do autor para ebooks pode ser adicionado depois (migração futura).
- Cards de e-commerce reaproveitam o design system slate/glass do site público.
- Carrossel reusa `<Marquee>` já existente (com scroll por toque).
- Página de detalhe é responsiva: 2 colunas no desktop, empilhada no mobile.

