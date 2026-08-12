# Card da Feira do Livro no Hero Carousel da Home

## Objetivo
Inserir um slide promocional no primeiro carrossel da Home (hero carousel) com a capa do e-book "E Putin Reencarnou Ucraniano" e a mensagem da presença do Dr. Mauro na 72ª Feira do Livro de Porto Alegre.

## Requisitos confirmados
- **Local:** primeiro carrossel da Home (hero carousel), não nos carrosséis de livros/e-books.
- **Clique:** leva para a página do e-book `/livros-e-ebooks/ebook/<id-do-putin>`.
- **Destaque visual:** borda dourada + badge "Feira do Livro".

## Implementação

### 1. Slide promocional no hero carousel
- Em `src/pages/public/Home.tsx`, adicionar um novo item em `SLIDE_IMAGES` (ou criar um slide separado) para o e-book do Putin.
- Usar o `id` constante `PUTIN_EBOOK_ID = '6c60c3e2-087e-437c-899e-cbb2fae624a4'` já presente em `LivroDetalhe.tsx`.
- Buscar a `cover_url` do e-book no backend (ou reutilizar a URL já conhecida) para exibir a capa.
- Textos do slide:
  - Eyebrow: "Feira do Livro de Porto Alegre"
  - Título: "Dr. Mauro na 72ª Feira do Livro"
  - Descrição: informações enxutas sobre o estande (30/10 a 15/11/2026, Praça da Alfândega) e o destaque da palestra/autógrafos em 02/11 às 14h na Sala dos Jacarandás, Clube do Comércio.
  - CTA: "Comprar na Feira do Livro"
- Ao clicar no CTA ou no card, navegar para `/livros-e-ebooks/ebook/<PUTIN_EBOOK_ID>`.

### 2. Destaque visual dourado
- Aplicar no slide do Putin um anel/borda dourada (`amber-400` / `amber-500`) na imagem da capa.
- Adicionar um badge âmbar/dourado no topo da imagem com o texto "Feira do Livro".
- Manter o mesmo padrão de tipografia e espaçamento dos demais slides do hero.

### 3. Ajustes no HeroCarousel
- Garantir que o novo slide participe do loop e dos dots indicadores.
- Preservar autoplay e acessibilidade (aria-labels).

## Arquivos envolvidos
- `src/pages/public/Home.tsx`
- `src/pages/public/LivroDetalhe.tsx` (referência do `PUTIN_EBOOK_ID`)

## Resultado esperado
O hero carousel da Home ganha um slide destacado sobre a Feira do Livro, com a capa do livro do Putin, badge dourado e CTA que leva à página do e-book.
