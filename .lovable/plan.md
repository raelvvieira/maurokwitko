# Plano

## 1. Editor: uma única caixa de texto para todo o artigo

Substituir os blocos individuais por um único `<textarea>` grande no `ArticleEditorDrawer`.

- Parágrafos separados por **linha em branco** (`\n\n`).
- Marcadores especiais ficam visíveis como prefixo no início do parágrafo (já é o formato atual):
  - `__SUB__Subtítulo`
  - `__LIST__item 1||item 2||item 3`
  - `__QUOTE__Texto da citação||Autor`
- Ao abrir: `body_pt.join('\n\n')` preenche o textarea.
- Ao salvar: `value.split(/\n{2,}/).map(s => s.trim()).filter(Boolean)` vira o `body_pt[]`.
- Pequena legenda abaixo do campo explicando os 3 marcadores opcionais (para subtítulo/lista/citação). 99% dos casos serão só parágrafos comuns separados por linha em branco.
- Mantém Título e Resumo em campos próprios.
- Mantém botão "Restaurar versão original" e "Salvar e traduzir" (continua disparando a Edge Function `translate-article` que regera EN e ES).

## 2. Botão "Adicionar artigo"

Em `/artigos` (e dentro do clube em `/app/blog`), aparece para os admins um botão **"Adicionar artigo"** ao lado do título.

### Backend
Migration adicionando colunas em `article_overrides`:
- `is_custom boolean default false` — marca artigos criados pelo admin (sem entrada em `ARTICLES`).
- `image_url text` — capa do artigo (opcional; quando vazio, usa fallback).

Bucket público novo `article-images` com policies:
- SELECT público.
- INSERT/UPDATE/DELETE só para os 2 e-mails admin.

Edge Function `translate-article` ganha:
- Suporte a `is_custom: true` e `image_url` no payload (passa direto pro upsert).
- Para custom, `slug` é gerado no client a partir do título (`slugify`) e enviado.
- Continua traduzindo título + excerpt + body para EN/ES igual hoje.

### Frontend
Novo componente `ArticleCreatorDrawer` (mesmo visual do editor, com 1 textarea grande + título + resumo + upload de imagem):
- Upload de imagem via `supabase.storage.from('article-images').upload(...)` → guarda `image_url` público.
- Campo de slug auto-gerado a partir do título (editável).
- Salvar dispara `translate-article` com `is_custom: true`.

Hook `useArticleOverrides` retorna **lista combinada** de artigos para exibição:
- Estáticos do `ARTICLES` (com override aplicado se houver).
- Customizados: linhas de `article_overrides` com `is_custom = true` viram "Article-like" objects.

Helper `getArticleImage(slug, overrideImageUrl?)`:
- Se `overrideImageUrl` existir → usa.
- Senão cai no mapping atual / fallback.

### Páginas atualizadas
- `src/pages/public/Artigos.tsx`: lista combinada + botão "Adicionar artigo" para admin.
- `src/pages/public/ArtigoDetalhe.tsx`: aceita slug custom (busca em ARTICLES OU em overrides custom).
- `src/pages/Blog.tsx` (clube): mesma lista combinada — artigo novo aparece automaticamente para usuários logados.
- `src/pages/BlogPost.tsx` (clube): aceita slug custom + aplica override.

Tradução continua igual: a versão em PT é a fonte da verdade; EN/ES são geradas automaticamente pela Edge Function ao salvar (tanto editar quanto criar).

## 3. Capa de "Jovens Guerreiros e Guerreiras da Luz"

- Copiar `user-uploads://813aA-d7ZRL.jpg` para `src/assets/jovens-guerreiros-cover.jpg`.
- Em `src/data/books.ts`, importar a imagem e trocar o campo `cover` do livro `jovens-guerreiros-guerreiras-da-luz` para usar o asset local (em vez da URL externa do WordPress).
- Remover `coverScale: 1.22` (não necessário com a nova arte que já preenche bem).

## Detalhes técnicos

```text
article_overrides (após migration)
├── slug PK
├── title_pt / excerpt_pt / body_pt (jsonb)
├── title_en / excerpt_en / body_en
├── title_es / excerpt_es / body_es
├── is_custom boolean   ← novo
├── image_url text      ← novo
└── updated_at, updated_by

storage.buckets: article-images (public, admin-only write)
```

Fluxo de exibição:
```text
ARTICLES (estáticos) ─┐
                      ├──► merge ──► UI (Artigos.tsx, Blog.tsx)
overrides custom ─────┘            └─► aplica title/excerpt/body do idioma
                                    └─► usa image_url se existir
```

## Resultado

- Editor com **uma única caixa de texto** para todo o artigo.
- Botão **"Adicionar artigo"** (admin) em `/artigos` que cria artigo novo com **upload de imagem** e texto único; aparece também no **clube** (`/app/blog`).
- Tradução automática para EN e ES funciona igual em artigos editados e novos.
- Capa do livro **Jovens Guerreiros e Guerreiras da Luz** trocada pela imagem enviada.
