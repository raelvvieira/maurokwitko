## Goals
1. Header: prevent menu items from wrapping (e.g. "Quién Soy", "Libros y E-books"), and increase spacing between menu items.
2. Replace `BR` / `US` / `ES` country code labels in the language switcher with small flag icons (both in trigger button and dropdown list).
3. Make language switching feel instant, and finish translating pages still showing hardcoded Portuguese (Livros e E-books, Detalhe do Livro, Artigos, Formação, Curso Online, Quem Sou Eu).

---

## 1. Header — no line breaks + better spacing
**File:** `src/components/public/PublicHeader.tsx`

- On the desktop `<nav>`: bump gap from `gap-7` to `gap-8 xl:gap-10` and add `whitespace-nowrap` to each link/button.
- Long labels like "Training in Reincarnationist Psychotherapy" must never appear in the top nav — keep using the short labels (`header.menu.cursos`, `header.menu.radio`) for the trigger and only show the long names inside the dropdown. Verify current code already does this (it does).
- Shorten the Spanish/English short labels for top-level items where needed in `en.json` / `es.json`:
  - `header.menu.quemSouEu`: ES "Quién Soy" → keep but `whitespace-nowrap` solves the break.
  - `header.menu.livros`: ES "Libros y E-books" → wraps at narrow viewports; add `whitespace-nowrap` on the link.

So the fix is **CSS-only**: every nav `<Link>` and dropdown trigger gets `whitespace-nowrap`, and the parent gets a larger gap.

## 2. Language switcher — flags instead of `BR / US / ES`
**File:** `src/components/public/LanguageSwitcher.tsx` (+ create `src/components/public/Flags.tsx` if not present)

- Replace the `<span>{current.short}</span>` text in the trigger button with the inline SVG flag component (`FlagBR / FlagUS / FlagES`), sized `w-5 h-3.5 rounded-sm overflow-hidden`.
- In the dropdown list, replace the leading emoji + label with: SVG flag icon + full language label. Drop the `short` prefix (`BR`, `US`, `ES`) entirely.
- Keep the chevron caret on the trigger.
- Result on header: `[🇪🇸 ▼]` (flag only, no "ES ES" text).

If `Flags.tsx` already exists from prior work, just import and use it. Otherwise create it with three small inline SVGs (BR / US / ES) following the snippet from earlier sessions.

## 3. Faster + more complete translations

### 3a. Speed
**File:** `src/i18n/index.ts`

- Set `react.useSuspense: false` (already done) and ensure resources are loaded synchronously at boot (already done — JSON is `import`ed). The actual perceived delay is from React re-rendering large pages; nothing else is fetched. Add `partialBundledLanguages: true` and remove `load: 'all'` (it forces extra lookups). Switching language will then be instant since all 3 bundles are already in memory.

### 3b. Translate the remaining pages
Add new sections to all three JSON files (`pt-BR.json`, `en.json`, `es.json`) and wire `useTranslation` into:

- `src/pages/public/LivrosEbooks.tsx` → keys under `livros.*` (eyebrow Catálogo, title, desc, sections "Edições impressas/Livros Físicos", "Edições digitais/Livros Digitais (E-books)", empty state, Amazon card title/desc/CTA, "Saber mais", carousel headings).
- `src/pages/public/LivroDetalhe.tsx` → keys under `livroDetalhe.*` (Voltar ao catálogo, Livro Físico/E-book label, "por", Sinopse, Comentário do Autor, "Vídeo de apresentação em breve.", Comprar, "Comprar com 20% de Desconto", "Adquirir Gratuitamente", member discount/free callouts, "Você também pode gostar", "Todas as obras do autor").
- `src/pages/public/Artigos.tsx` → keys under `artigos.*` (eyebrow "Reflexões e Pesquisas", title with accent split, desc, "Ler artigo").
- `src/pages/public/Formacao.tsx`, `src/pages/public/CursoOnline.tsx`, `src/pages/public/QuemSouEu.tsx` → keys under `formacao.*`, `cursoOnline.*`, `quemSouEu.*` for every visible string (titles, eyebrows, paragraphs, list items via `getArrayTranslation`, CTAs).

For long static blocks (article body content, book synopses pulled from `BOOKS` data and Supabase ebooks) we **do not** translate — those are user/author content that only exists in Portuguese. We will note this clearly: only UI chrome (titles, labels, buttons, section headings) gets translated. Article bodies and book/ebook descriptions stay in their source language.

### 3c. Cache i18n init across reloads
- Confirm `localStorage` detection caches the choice (already configured) so page refreshes pick the saved language without flashing PT first.

---

## Out of scope
- Translating article body text in `src/data/` and Supabase-stored ebook descriptions (these are author content, not UI).
- Internal admin/app pages under `/app/*` (the language switcher is for the public site).

## Files to edit
- `src/components/public/PublicHeader.tsx` (spacing + `whitespace-nowrap`)
- `src/components/public/LanguageSwitcher.tsx` (use flag SVGs, drop short codes)
- `src/components/public/Flags.tsx` (create if missing)
- `src/i18n/index.ts` (drop `load: 'all'`, add `partialBundledLanguages`)
- `src/i18n/locales/pt-BR.json`, `en.json`, `es.json` (add `livros`, `livroDetalhe`, `artigos`, `formacao`, `cursoOnline`, `quemSouEu` sections)
- `src/pages/public/LivrosEbooks.tsx`
- `src/pages/public/LivroDetalhe.tsx`
- `src/pages/public/Artigos.tsx`
- `src/pages/public/Formacao.tsx`
- `src/pages/public/CursoOnline.tsx`
- `src/pages/public/QuemSouEu.tsx`
