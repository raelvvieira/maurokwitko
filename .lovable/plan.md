

## Plano: limpar bordas do hero carrossel + adicionar 2 livros físicos

### 1. Carrossel da Hero — remover sombras laterais (`src/pages/public/Home.tsx`)

O usuário relatou "sombras nas laterais" mal encaixadas. Existem 3 elementos suspeitos no slide:

- O `mesh-gradient` de fundo da seção (mantém — é o gradiente geral do site).
- O **blur halo** atrás da imagem (`absolute -inset-6 bg-gradient-to-br from-primary/20 via-accent/10 ...rounded-[2.5rem] blur-2xl`) — esse halo se estende para fora e, somado ao `shadow-2xl` da imagem, cria a sensação de sombra pesada nas laterais a cada slide.
- As **setas** desktop com `bg-background/70 backdrop-blur-md border shadow-sm` posicionadas em `left-0` e `right-0` — também aparecem como "caixinhas" nas bordas.

**Ajustes:**
- Remover o div `absolute -inset-6 ... blur-2xl` (halo atrás da imagem).
- Trocar `shadow-2xl` da imagem por `shadow-lg` mais discreto, manter `ring-1 ring-border/40`.
- Setas: tirar borda + sombra, deixar só ícone com hover sutil (`bg-transparent hover:bg-background/60 border-0 shadow-none text-muted-foreground hover:text-foreground`), e afastá-las um pouco para `-left-2`/`-right-2` para não invadirem o conteúdo.
- Garantir que o container do embla (`overflow-hidden`) não corte sombra residual — adicionar pequeno padding interno se necessário.

Resultado: hero limpo, sem "moldura escura" nas laterais, mantendo gradiente de fundo geral, dots e autoplay intactos.

### 2. Adicionar 2 livros físicos novos (`src/data/books.ts`)

Adicionar ao array `BOOKS` (ficará com 7 livros, igual ao já documentado em memória):

**Livro 6 — A Terapia da Reforma Íntima**
- `slug`: `terapia-da-reforma-intima`
- `title`: `A Terapia da Reforma Íntima`
- `price`: `R$ 64,90` (a confirmar com o usuário)
- `cover`: capa oficial da BesouroBox (URL `images.tcdn.com.br` da página do produto)
- `link`: `https://www.besourobox.com.br/espiritualidade/a-terapia-da-reforma-intima`
- `synopsis`: texto curto sobre reforma íntima como caminho terapêutico e evolutivo, no tom das outras sinopses.

**Livro 7 — Jovens Guerreiros e Guerreiras da Luz**
- `slug`: `jovens-guerreiros-guerreiras-da-luz`
- `title`: `Jovens Guerreiros e Guerreiras da Luz: para adolescentes`
- `price`: `R$ 49,90` (a confirmar — Amazon não tem preço fixo equivalente ao da BesouroBox)
- `cover`: capa do produto na Amazon (ASIN 8555270901)
- `link`: `https://www.amazon.com.br/Jovens-guerreiros-guerreiras-luz-adolescentes/dp/8555270901`
- `synopsis`: obra dirigida a adolescentes sobre missão encarnatória, autoconhecimento e propósito espiritual.

Como é arquivo estático e já é usado em todas as telas (`Home`, `LivrosEbooks`, `LivroDetalhe`, marquee da home), os 2 novos cards aparecem automaticamente em todos esses lugares — sem mudanças adicionais.

**Observação:** vou buscar as URLs reais das capas durante a implementação (fetch das páginas oficiais). Se preço/sinopse precisarem ajuste depois, é só pedir.

### Arquivos alterados
- `src/pages/public/Home.tsx` — limpeza visual do `HeroCarousel`
- `src/data/books.ts` — adicionar 2 entradas

### Não muda
- Lógica do autoplay, dots, ordem dos slides, tipografia, demais seções da Home, página `LivrosEbooks` (recebe novos livros automaticamente).

