## Problema

Na página pública de detalhe de um **E-book** (`/livros-e-ebooks/ebook/:id`), o botão **"Comprar"** está abrindo o PDF do e-book diretamente, porque usa `ebook.url` (que aponta para o arquivo PDF). E-books só devem ser lidos por membros logados no Clube de Estudos.

Além disso, o botão **"Adquirir Gratuitamente"** já leva para `/clube-de-estudos`, o que está correto — apenas confirmar.

## Alterações

**Arquivo:** `src/pages/public/LivroDetalhe.tsx`

No bloco de CTAs do tipo `ebook` (linhas ~213-257):

1. **Botão "Comprar"** — em vez de usar `comprarLink` (que é o PDF do e-book), apontar para a página de busca da Amazon com as obras do Dr. Mauro Kwitko, abrindo em nova aba:
   - URL: `https://www.amazon.com.br/s?k=Dr.+Mauro+Kwitko`
   - (mesma URL já usada no card Amazon da página `LivrosEbooks.tsx`)

2. **Botão "Adquirir Gratuitamente"** — manter como está, já leva para `/clube-de-estudos`. ✅

3. **Remover** a variável `comprarLink` para o caso de e-book (não será mais usada nessa CTA), evitando que o link do PDF vaze para o front público.

### Observação

A página de **livro físico** continua intacta (botão "Comprar" segue indo para o link da BesouroBox via `book.link`).

Aprove para implementar.