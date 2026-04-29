# Plan — botão CTA + traduções restantes

## 1. Corrigir botão "Entrar no Clube" (cabeçalho)

O botão fica pequeno e quebra em 3 linhas em todos os idiomas (PT "Entrar no Clube", EN "Enter the Club", ES "Entrar en el Club"). Aplicar `whitespace-nowrap` em ambos os botões CTA do header (desktop e drawer mobile) em `src/components/public/PublicHeader.tsx`. Sem redução de fonte.

## 2. Traduzir títulos e sinopses dos livros físicos

Hoje `src/data/books.ts` tem `title` e `synopsis` fixos em PT. Vou:

- Adicionar à estrutura `Book` os campos `titleI18n` e `synopsisI18n` (chaves no JSON i18n) — opcional, com fallback ao texto PT atual.
- Criar nos JSONs (`pt-BR`, `en`, `es`) o nó `books.<slug>.title` e `books.<slug>.synopsis` para os 8 livros físicos.
- Em `LivrosEbooks.tsx` e `LivroDetalhe.tsx`, ler via `t(\`books.\${slug}.title\`, { defaultValue: book.title })` e idem para synopsis.

Resultado: título e sinopse mudam conforme o idioma. Os livros digitais (e-books) vêm do banco — esses ficarão em PT (não há infraestrutura de tradução em DB). Vou marcar isso na seção técnica.

## 3. Traduzir o card "Comentários de leitores" (BookReviews)

Em `src/components/public/BookReviews.tsx` há textos fixos em PT:
"Comentários de leitores", "Já leu esse livro?...", "Seu nome", "Sua nota", "Seu comentário", "Enviar comentário", "Seja o primeiro a comentar...", placeholders, mensagens de validação e toasts, formato de data ("pt-BR" → idioma corrente), pluralização "comentário(s)".

Adicionar nó `bookReviews.*` nos três JSONs e refatorar o componente para `useTranslation()`. A data passa a usar `i18n.language`.

## 4. Traduzir os excerpts dos artigos (home + listagem)

Os 19 artigos em `src/data/articles.ts` têm `excerpt` em PT. Vou:

- Adicionar nos JSONs o nó `articleExcerpts.<slug>` para os 19 artigos (3 idiomas).
- Em `Home.tsx` (cards "Recent Articles") e `Artigos.tsx` (listagem), trocar `art.excerpt` por `t(\`articleExcerpts.\${art.slug}\`, { defaultValue: art.excerpt })`.
- Também adicionar `articleTitles.<slug>` para traduzir o título dos cards. O corpo (`body`) do artigo permanece em PT — é muito longo e o usuário não pediu tradução do conteúdo do artigo em si.

## Resumo de arquivos alterados

- `src/components/public/PublicHeader.tsx` — `whitespace-nowrap` nos 2 CTAs.
- `src/components/public/BookReviews.tsx` — i18n completo.
- `src/pages/public/Home.tsx` — título/excerpt dos artigos via `t()`.
- `src/pages/public/Artigos.tsx` — idem.
- `src/pages/public/LivrosEbooks.tsx` — título físico via `t()`.
- `src/pages/public/LivroDetalhe.tsx` — título e sinopse via `t()`.
- `src/i18n/locales/pt-BR.json`, `en.json`, `es.json` — novos nós `books`, `articleTitles`, `articleExcerpts`, `bookReviews`.

## Notas técnicas

- E-books (vindos do banco) continuam em PT — não há coluna multilíngue. Posso adicionar isso em uma próxima iteração se desejar.
- Corpos completos dos artigos (textos longos) continuam em PT — fora do escopo deste pedido.
- Total: ~8 sinopses + 19 excerpts × 3 idiomas. Será gerado de uma vez em cada locale.
