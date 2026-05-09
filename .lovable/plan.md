## Problemas

### 1. Quebra de "Reencarnacionista"
No hero do `/` (slide 1), o `<h1>` em `Home.tsx` (linha 121) usa `break-words`, que aplica `overflow-wrap: anywhere` e permite que palavras longas como **Reencarnacionista** sejam cortadas no meio (sobrando só o "a" na linha de baixo). Como o título é o texto traduzido renderizado dentro de uma coluna de grid (`md:grid-cols-2`), basta deixar a palavra inteira "descer" para a próxima linha sem ser fatiada.

### 2. Edição inline de artigos só para admins
Hoje os artigos vivem hardcoded em `src/data/articles.ts` e as traduções em `src/i18n/locales/{en,es}.json` (`articleTitles`, `articleExcerpts`, `articleBodies`). Não existe forma de editar pela UI, e qualquer mudança força redeploy. Vamos criar uma camada de "override" persistida no backend que **substitui** o conteúdo dos artigos quando existe — mantendo o conteúdo hardcoded como fallback — e permitir que dois e-mails específicos editem em português, gerando traduções automáticas para EN/ES.

## Mudanças

### A) Fix do hero (1 linha)

`src/pages/public/Home.tsx`, linha 121:

- Remover `break-words` e adicionar `[overflow-wrap:normal] [word-break:normal]` para que palavras longas inteiras quebrem entre palavras, não dentro delas.

### B) Backend (Lovable Cloud)

Criar tabela `article_overrides`:

```text
- slug         text   (PK)
- title_pt     text
- excerpt_pt   text
- body_pt      jsonb  (array de strings, com markers __SUB__/__LIST__/__QUOTE__)
- title_en     text
- excerpt_en   text
- body_en      jsonb
- title_es     text
- excerpt_es   text
- body_es      jsonb
- updated_at   timestamptz default now()
- updated_by   uuid (auth.uid())
```

RLS:
- `SELECT`: público (qualquer visitante lê para renderizar).
- `INSERT/UPDATE/DELETE`: somente para `auth.email() IN ('mauroabpr@gmail.com','raelvvieira@gmail.com')`.

Edge function `translate-article` (Deno):
- Recebe `{ slug, title_pt, excerpt_pt, body_pt[] }`.
- Usa o **Lovable AI Gateway** (modelo `google/gemini-2.5-flash`) para traduzir título + excerpt + cada parágrafo do body, **preservando** os prefixos `__SUB__`, `__LIST__` (com separador `||`) e `__QUOTE__`.
- Faz `upsert` em `article_overrides` com PT, EN e ES.
- `verify_jwt = true`, e a própria função revalida que `auth.email()` está na allowlist antes de gravar.

### C) Frontend

**Hook `useArticleOverrides`** (`src/hooks/useArticleOverrides.ts`):
- Faz um `select *` em `article_overrides` na montagem e devolve um `Map<slug, override>`.
- Função utilitária `applyOverride(article, override, lang)` retorna `{ title, excerpt, body }` no idioma atual, caindo de volta para o hardcoded de `ARTICLES` + `i18n` quando o override não existir ou estiver vazio.

**`src/pages/public/Artigos.tsx`**:
- Consumir o hook e aplicar o override em cada card (substitui o `t('articleTitles.…')` e `t('articleExcerpts.…')` quando houver versão editada).
- Se `useAuth().user?.email` está na allowlist, mostrar:
  - Um pequeno badge no canto superior do card "Editar".
  - Botão "Adicionar artigo" no topo da grid (cria entrada nova com slug gerado).

**`src/pages/public/ArtigoDetalhe.tsx`**:
- Mesma lógica de override aplicada a `translatedTitle`/`body`.
- Botão flutuante "Editar este artigo" visível só para admins, abrindo o mesmo editor.

**Componente `ArticleEditorDrawer`** (`src/components/admin/ArticleEditorDrawer.tsx`):
- Drawer/modal com formulário em **português** (única língua editável):
  - Campo `title`, `excerpt`.
  - Lista ordenada de "blocos" do body. Cada bloco tem:
    - Seletor de tipo: Parágrafo, Subtítulo (`__SUB__`), Lista (`__LIST__` com itens separados por `||`), Citação (`__QUOTE__` texto + autor).
    - Textarea com o conteúdo.
    - Botões "Mover ↑/↓", "Remover".
  - Botão "Adicionar bloco".
- Ao salvar:
  1. Chama `supabase.functions.invoke('translate-article', { body: { slug, title_pt, excerpt_pt, body_pt } })`.
  2. Mostra loader ("Traduzindo para EN/ES…") e depois toast de sucesso.
  3. Reexecuta a query do hook para refletir a edição imediatamente.
- Edição é **destrutiva**: a versão PT atual é a fonte de verdade; EN/ES são sempre regerados.

**Permissão no front**: `useAuth().isAdmin` já filtra `raelvvieira@gmail.com` e `mauroabpr@gmail.com` — basta usar essa flag para mostrar/esconder os controles de edição. A segurança real fica no RLS + na edge function.

## Resultado

- O título do hero passa a quebrar entre palavras: "Psicoterapia" em uma linha, "Reencarnacionista" inteira na próxima — sem letras soltas.
- Logado como `mauroabpr@gmail.com` ou `raelvvieira@gmail.com`, na rota `/artigos` aparecem botões "Editar" em cada card e "Adicionar artigo" no topo. O editor escreve só em português; ao salvar, o sistema traduz automaticamente para inglês e espanhol e persiste tudo.
- Visitantes (logados ou não) veem o conteúdo editado no idioma selecionado, com fallback para o conteúdo original quando não houver override.
