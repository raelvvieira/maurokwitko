

## Ajuste: padronizar tamanho visual das capas nos carrosséis

As capas dos livros físicos no carrossel estão com alturas/larguras visuais diferentes porque o `object-cover` está cortando algumas e o container atual permite que a proporção real da imagem influencie o resultado quando combinada com o fundo branco. As capas BesouroBox vêm em proporções ligeiramente diferentes (algumas mais quadradas, outras mais retangulares), e isso faz parecer que uma é "maior" que a outra.

### Mudança

Em `src/pages/public/Home.tsx`, no `renderItem` do `Marquee` de **Livros** e no de **E-books**:

- Trocar o wrapper das capas para usar **dimensões fixas idênticas** (mesma largura E mesma altura para TODOS os cards) — `w-[200px] h-[300px]` no desktop / `w-[160px] h-[240px]` no mobile.
- Manter `object-cover` para preencher o card uniformemente.
- Garantir que o container externo do card também tenha largura fixa (`w-[200px]` exato, sem variação md:), para que o espaçamento entre cards seja constante.
- Remover o `flex items-center justify-center` + fundo branco que dava margem visual extra a algumas capas — substituir por um container sólido com a capa preenchendo 100% da área (`absolute inset-0` na imagem).

Resultado: todos os cards do carrossel terão exatamente o mesmo retângulo visual, como na referência da imagem (20 Casos de Regressão e Terapia de Regressão lado a lado, com mesma altura e largura).

### Arquivo

- `src/pages/public/Home.tsx` — apenas o `renderItem` dos dois `<Marquee>` (livros e e-books).

Sem mudanças em outros componentes, rotas ou Supabase.

