

## Plano: padronizar tamanho da capa de "Jovens Guerreiros e Guerreiras da Luz"

### Causa
A imagem-fonte (`Jovens-1.png` do site do Dr. Mauro) vem com uma faixa branca grossa em volta da capa real. As demais capas (BesouroBox) já vêm cortadas rente. Por isso, mesmo com `object-cover` no frame `aspect-[2/3]`, esta capa "encolhe" visualmente — o miolo azul fica menor que as vizinhas.

### Solução
Adicionar uma flag opcional `coverScale` no tipo `Book` e aplicar uma transformação de escala (`scale`) só nesta capa, fazendo a imagem crescer dentro do frame e cortar a moldura branca — sem alterar as demais capas que já estão corretas.

### Implementação

**1. `src/data/books.ts`**
- Adicionar campo opcional ao tipo:
  ```ts
  export type Book = { ...; coverScale?: number; };
  ```
- No livro "Jovens Guerreiros e Guerreiras da Luz" adicionar `coverScale: 1.22` (corta a borda branca e iguala visualmente o tamanho do miolo das outras capas).

**2. `src/pages/public/LivrosEbooks.tsx`** (grade de livros físicos, ~linha 66)
- Aplicar a escala via `style` inline quando `coverScale` existe:
  ```tsx
  <img
    src={b.cover}
    alt={b.title}
    style={b.coverScale ? { transform: `scale(${b.coverScale})` } : undefined}
    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
  />
  ```
  Como o frame externo tem `overflow-hidden`, o excesso é cortado e o miolo fica do mesmo tamanho das outras capas.

**3. `src/pages/public/LivroDetalhe.tsx`** (capa grande no topo, ~linha 100)
- Mesmo tratamento na imagem principal do detalhe do livro:
  ```tsx
  <img src={cover} alt={titulo}
    style={book?.coverScale ? { transform: `scale(${book.coverScale})` } : undefined}
    className="absolute inset-0 w-full h-full object-cover" />
  ```

**4. Marquee final (mesmos arquivos, item do carrossel)**
- Mesma escala condicional no `<img>` do `renderItem` quando o item for esse livro (passar `coverScale` no objeto do `carouselItems`).

### Não muda
- Demais capas, layout dos cards, tipografia, preço, botões, hover/zoom existente (o `group-hover:scale-105` continua funcionando por cima).

### Arquivos alterados
- `src/data/books.ts` — adiciona `coverScale?: number` no tipo + valor `1.22` no livro.
- `src/pages/public/LivrosEbooks.tsx` — aplica `style transform:scale` condicional na grade e no marquee.
- `src/pages/public/LivroDetalhe.tsx` — aplica na capa principal e no marquee.

