## Plano — corrigir mudança de idioma nos artigos

O problema restante está na página de detalhe do artigo (`/artigos/:slug`): a listagem e a Home já usam `articleTitles` e `articleExcerpts`, mas o detalhe ainda renderiza diretamente `article.title` e `article.body`, que vêm fixos em português de `src/data/articles.ts`.

### 1. Traduzir o título no detalhe do artigo

Em `src/pages/public/ArtigoDetalhe.tsx`, trocar:

```tsx
{article.title}
```

por uma leitura via i18n:

```tsx
{t(`articleTitles.${article.slug}`, { defaultValue: article.title })}
```

Também ajustar o `alt` da imagem para usar o título traduzido.

### 2. Traduzir o corpo dos artigos

Adicionar nos arquivos de tradução (`pt-BR.json`, `en.json`, `es.json`) uma nova estrutura para o corpo completo dos artigos, por slug:

```json
"articleBodies": {
  "beneficios-contraindicacoes-da-regressao": [
    "...",
    "__SUB__...",
    "__LIST__...||..."
  ]
}
```

Manter o mesmo formato atual do `body`:

- texto comum = parágrafo
- `__SUB__` = subtítulo
- `__LIST__` com itens separados por `||` = lista
- `__QUOTE__` com autor opcional = citação

### 3. Usar o body traduzido com fallback seguro

Em `ArtigoDetalhe.tsx`, trocar o render de:

```tsx
article.body.map(...)
```

para uma variável `articleBody`, obtida com `t(..., { returnObjects: true })` e validada com `getArrayTranslation`.

Se alguma tradução do corpo ainda não existir, o componente continuará usando o `article.body` original em português, evitando tela quebrada.

### 4. Garantir o artigo atual primeiro

Como o usuário está em `/artigos/beneficios-contraindicacoes-da-regressao`, começarei garantindo a tradução completa desse artigo em inglês e espanhol. Em seguida, deixarei a estrutura preparada para todos os demais slugs, com fallback funcionando.

### Arquivos a alterar

- `src/pages/public/ArtigoDetalhe.tsx`
- `src/i18n/locales/pt-BR.json`
- `src/i18n/locales/en.json`
- `src/i18n/locales/es.json`

### Resultado esperado

Ao selecionar EN ou ES no cabeçalho, a página do artigo atual passará a atualizar título, imagem `alt` e corpo do artigo sem precisar recarregar a página, mantendo fallback em português caso algum artigo ainda não tenha corpo traduzido.