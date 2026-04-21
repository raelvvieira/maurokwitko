

## Plano: sinopses + vídeos, comentários de leitores, ajustes de capa e Hero em card

### 1. Atualizar sinopses + vídeos dos livros físicos (`src/data/books.ts`)
Substituir `synopsis` e adicionar `videoUrl` para cada um dos 7 livros, usando os textos e links do YouTube do Google Doc:

| Livro | Vídeo |
|---|---|
| Tratando Fobia, Pânico e Depressão | `youtu.be/fxFCwAk0T5M` |
| A Terapia da Reforma Íntima | `youtu.be/iw5a78_jvvw` |
| A Fascinante Vida de Mirta Kassov | `youtu.be/8X9dVPEx_kE` |
| Jovens Guerreiros e Guerreiras da Luz | `youtu.be/wVbWLNojlLM` |
| Como Evoluir Espiritualmente em um Mundo de Drogas | `youtu.be/LLPozeTEVQs` |
| Terapia de Regressão: Perguntas e Respostas | `youtube.com/watch?v=KWdlgytfo8U` |
| 20 Casos de Regressão | `youtube.com/watch?v=EGSdm3t09BM` |

Também:
- Trocar título de "Jovens Guerreiros e Guerreiras da Luz: para adolescentes" → **"Jovens Guerreiros e Guerreiras da Luz"**.
- Trocar a capa do "Jovens Guerreiros" pela capa oficial da BesouroBox no mesmo padrão das outras (`images.tcdn.com.br/.../jovens-guerreiros...png`) — vou buscar a URL oficial na BesouroBox durante a implementação.

### 2. Atualizar sinopses + vídeos dos e-books (banco `ebooks`)
Migration UPDATE em cada e-book existente, mapeando pelo título, com sinopses do Doc e adicionando coluna nova **`video_url text`** na tabela `ebooks`:

```sql
ALTER TABLE public.ebooks ADD COLUMN video_url text;
UPDATE public.ebooks SET description = '...', video_url = 'https://youtu.be/...' WHERE title = '...';
```

E-books cobertos pelo Doc: Doutor eu ouço vozes, Fogo Selvagem (sem vídeo no Doc), A Força Espiritual, Como Voltar a Ser Criança, A História de Betinho, A Linha do Horizonte, A Arte de Adoçar os Olhos, E Putin Reencarnou Ucraniano, Baixa Autoestima, Como Matar o Pensamento Suicida, Como Aproveitar a sua Encarnação. Os que não estão no Doc (A Cura da Solidão, Autismo e Reencarnação, Reencarnação – Desigualdade Social, Viver para Servir) ficam com a sinopse atual.

### 3. Sinopse expansível (`src/pages/public/LivroDetalhe.tsx`)
Criar componente local `<ExpandableSynopsis text={synopsis} />`:
- Mede o conteúdo; se ultrapassar ~5 linhas (clamp via `line-clamp-[5]`), mostra botão "Ler mais ↓".
- Ao expandir, libera todo o texto e troca para "Ler menos ↑".
- Usa transição de altura suave (max-height + opacity).
- Substitui o `<p>` de sinopse atual.

E também no `LivroDetalhe.tsx`, ler `videoUrl` dos e-books a partir de `ebook.video_url` (regenerar tipos do Supabase é automático).

### 4. Caixa de comentários nos livros (`comentários de leitores`)
**Banco — nova tabela `book_reviews`:**
```sql
CREATE TABLE public.book_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  book_type text NOT NULL CHECK (book_type IN ('fisico','ebook')),
  book_id text NOT NULL,        -- slug (físico) ou uuid (ebook) como string
  reader_name text NOT NULL,
  comment text NOT NULL,
  rating int NOT NULL CHECK (rating BETWEEN 1 AND 5),
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.book_reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone reads reviews" ON public.book_reviews FOR SELECT USING (true);
CREATE POLICY "anyone writes reviews" ON public.book_reviews FOR INSERT WITH CHECK (
  char_length(reader_name) BETWEEN 1 AND 80 AND
  char_length(comment) BETWEEN 1 AND 1000
);
```
Aberto a comentários públicos (sem login) já que a área pública não exige auth — validação por tamanho na policy + zod no client.

**Componente `<BookReviews bookType bookId />`** dentro do `LivroDetalhe.tsx`:
- Título: "Já leu esse livro? Deixe seu comentário sobre a leitura."
- Form: nome, comentário (textarea), seletor de 1–5 estrelas (botões com `Star` do lucide).
- Validação zod (nome 1–80, comentário 1–1000, rating 1–5).
- Envia via `supabase.from('book_reviews').insert(...)`.
- Lista comentários abaixo (mais recentes primeiro): nome, estrelas preenchidas, data relativa, texto.
- Mostra resumo no topo: média de estrelas e total ("4.7 ★ · 12 comentários").

### 5. Hero da Home dentro de um grande card (`src/pages/public/Home.tsx`)
- Envolver o `<div ref={emblaRef}>` com um wrapper card:
  ```
  rounded-[2rem] border border-border/60 ring-1 ring-border/40 bg-card/60 backdrop-blur-sm shadow-sm p-8 md:p-14 lg:p-16
  ```
- **Remover as setas** (botões prev/next desktop) — mantém só os dots.
- Aumentar a margem interna do conteúdo (padding do card já maior).
- Dots ficam fora ou dentro? Dentro do card, abaixo do conteúdo (continuam centralizados).

### Arquivos alterados
- `src/data/books.ts` — sinopses, videoUrl, título e capa de "Jovens Guerreiros".
- `src/pages/public/LivroDetalhe.tsx` — sinopse expansível, ler `video_url` de ebooks, novo bloco `<BookReviews>`.
- `src/pages/public/Home.tsx` — wrapper card no hero, remoção das setas.
- **Nova migration** — `ALTER TABLE ebooks ADD COLUMN video_url`, `UPDATE`s das sinopses, criação de `book_reviews` com RLS.

### Não muda
- Layout dos catálogos, marquees, autoplay/dots do hero (apenas removidas as setas), demais páginas.

