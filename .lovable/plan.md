## Problema

Na página de detalhe do artigo (`/artigos/:slug`), as traduções de título e corpo já existem em `en.json` e `es.json` (sob `articleTitles` e `articleBodies`), e as variáveis `translatedTitle` e `body` (corpo traduzido com fallback) já são calculadas no topo do componente. **Mas o JSX ainda renderiza `article.title` e `article.body` direto** — por isso o conteúdo continua em português mesmo com EN/ES selecionado.

A página interna do blog autenticado (`src/pages/BlogPost.tsx`) tem o mesmo problema: nem usa `useTranslation`.

## Mudanças

### 1. `src/pages/public/ArtigoDetalhe.tsx`

Substituir nas linhas do JSX:

- `{article.title}` (linha 42) → `{translatedTitle}`
- `alt={article.title}` (linha 55) → `alt={translatedTitle}`
- `article.body.map(...)` (linha 66) → `body.map(...)` (a variável já existe e tem fallback seguro)

### 2. `src/pages/BlogPost.tsx` (área logada `/app/blog/:id`)

Aplicar a mesma localização que já existe na rota pública:

- Importar `useTranslation` e `getArrayTranslation`
- Calcular `translatedTitle` via `t(\`articleTitles.${article.slug}\`, { defaultValue: article.title })`
- Calcular `body` via `t(\`articleBodies.${article.slug}\`, { returnObjects: true })` com `getArrayTranslation` e fallback para `article.body` quando o tamanho não bater
- Trocar `{article.title}` e `article.body.map(...)` no JSX pelas versões traduzidas
- Traduzir também os textos fixos pequenos: "Voltar aos Artigos", "Artigo", "por Dr. Mauro Kwitko" e "Artigo não encontrado." reusando chaves já existentes em `artigoDetalhe.*` (e adicionando `artigoDetalhe.notFound` nos três locales se faltar)

## Resultado

Ao trocar o idioma no cabeçalho, o título, o `alt` da imagem e o corpo completo do artigo passam a refletir o idioma selecionado tanto na rota pública `/artigos/:slug` quanto na rota autenticada `/app/blog/:id`. Se algum artigo ainda não tiver corpo traduzido, o português é usado automaticamente como fallback (sem tela quebrada).
