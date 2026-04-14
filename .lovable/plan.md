

## Plano: Corrigir abertura de e-books bloqueados pelo navegador

### Problema
O Chrome (ou extensão de ad blocker) está bloqueando URLs diretas do domínio `supabase.co`. Quando o usuário clica em "Ler E-book", o link aponta para um arquivo no storage do backend e o navegador bloqueia.

### Solução: Edge function proxy para download
Criar uma edge function que gera uma URL assinada temporária e redireciona o usuário, evitando que o navegador bloqueie o domínio.

### Mudanças

**1. Nova edge function `ebook-redirect`**
- Recebe o `id` do e-book como query param
- Busca a URL do arquivo no banco
- Se for uma URL do storage, gera uma signed URL temporária (1h)
- Retorna um redirect 302 para essa URL

**2. Atualizar `src/pages/Ebooks.tsx`**
- Trocar o `href={book.url}` por um link que aponta para a edge function: `${SUPABASE_URL}/functions/v1/ebook-redirect?id=${book.id}`

### Alternativa mais simples
Se os e-books forem links externos (não armazenados no storage), o problema é puramente do ad blocker do usuário. Nesse caso, podemos apenas adicionar uma mensagem de fallback orientando o usuário a desativar o bloqueador.

### Arquivos
- `supabase/functions/ebook-redirect/index.ts` (novo)
- `src/pages/Ebooks.tsx`

