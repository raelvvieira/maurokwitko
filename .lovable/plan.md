

## Plano: Leitor de PDF nativo + botão de download nos E-books

### Mudanças

**1. Nova edge function `ebook-download` (`supabase/functions/ebook-download/index.ts`)**
- Igual ao `ebook-redirect`, mas retorna o PDF com header `Content-Disposition: attachment` para forçar download
- Faz proxy do conteúdo (fetch do signed URL e retorna o body) em vez de redirect 302

**2. Nova página `EbookReader` (`src/pages/EbookReader.tsx`)**
- Recebe o ID do e-book via rota `/ebooks/:id`
- Busca a URL do PDF via edge function `ebook-redirect` (fetch com `redirect: 'manual'` para pegar a URL do header Location)
- Renderiza o PDF inline usando `<iframe>` ou `<embed>` com a URL assinada obtida
- Botão de voltar para `/ebooks`

**3. Nova rota em `src/App.tsx`**
- Adicionar `<Route path="/ebooks/:id" element={<EbookReader />} />`

**4. Atualizar `src/pages/Ebooks.tsx`**
- Botão "Ler E-book" → `navigate('/ebooks/' + book.id)` (abre leitor nativo na app)
- Novo botão "Baixar E-book" → link para edge function `ebook-download?id=...` com ícone de download

**5. Atualizar edge function `ebook-redirect`**
- Adicionar suporte a query param `?mode=url` que retorna JSON `{ url: "..." }` em vez de 302, para o leitor poder obter a URL sem redirect

### Arquivos
- `supabase/functions/ebook-redirect/index.ts` (atualizar — adicionar modo JSON)
- `src/pages/EbookReader.tsx` (novo)
- `src/pages/Ebooks.tsx` (dois botões)
- `src/App.tsx` (nova rota)

