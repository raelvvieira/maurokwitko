

## Plano: Ajustes visuais e funcionais na plataforma

### 1. Ícone de olho no campo de senha (Login)
Adicionar estado `showPassword` e botão com ícone `Eye`/`EyeOff` do Lucide dentro do campo de senha para alternar entre `type="password"` e `type="text"`.

**Arquivo:** `src/pages/Login.tsx`

### 2. "Continue Aprendendo" com dados reais do banco
A seção usa dados hardcoded de `defaultCourses` no `AppContext`. Será substituída por dados reais das categorias de cursos do banco (já carregadas via `useCourseCategories`). O progresso será rastreado por usuário — cada vídeo assistido será registrado em uma nova tabela `user_video_views`. Se o usuário não assistiu nada, a seção fica vazia com mensagem "Nenhuma aula assistida ainda".

**Arquivos:** Migration SQL (nova tabela `user_video_views`), `src/pages/Dashboard.tsx`, `src/hooks/useSupabaseData.ts`
**Tabela:** `user_video_views (id, user_id, video_id, watched_at)` com RLS para cada usuário ver apenas seus dados.

### 3. Reduzir cards de Livros e E-books em 25%
- Em `Ebooks.tsx`: mudar `aspect-[3/4]` para `aspect-[3/4]` com container menor, ou aplicar `max-w-[75%] mx-auto` na imagem, e ajustar grid para `grid-cols-2 md:grid-cols-3 lg:grid-cols-4`.
- Em `Livros.tsx`: mesma abordagem — reduzir o aspect ratio ou o container do card.

**Arquivos:** `src/pages/Ebooks.tsx`, `src/pages/Livros.tsx`

### 4. Ranking: título "Alunos Engajados"
Trocar o texto "Ranking Geral" por "Alunos Engajados" na página de Ranking.

**Arquivo:** `src/pages/Ranking.tsx` (linha 19)

### 5. Materiais — remover dados fictícios, manter funcional
A página já busca do banco via `useApp().materialItems`. Se não há materiais no banco, já exibe "Nenhum material disponível ainda." — o que está correto. Preciso apenas confirmar que não há dados fictícios sendo injetados. Os materiais adicionados via Admin aparecerão automaticamente.

**Arquivo:** `src/pages/Materials.tsx` (verificar se precisa ajuste), `src/context/AppContext.tsx` (confirmar que não há fallback hardcoded)

### 6. Cards de cursos mais altos para títulos completos
Aumentar a altura mínima dos cards removendo `line-clamp-2` do título e aumentando `min-h` do texto. Mudar de `w-52 md:w-64` para `w-56 md:w-68` e garantir que o título tenha espaço com `min-h-[3.5rem]` ao invés de `min-h-[2.5rem]`.

**Arquivo:** `src/pages/Courses.tsx`

### Arquivos alterados
- `src/pages/Login.tsx`
- `src/pages/Dashboard.tsx`
- `src/pages/Ebooks.tsx`
- `src/pages/Livros.tsx`
- `src/pages/Ranking.tsx`
- `src/pages/Courses.tsx`
- `src/hooks/useSupabaseData.ts` (hook para video views)
- Migration SQL para `user_video_views`

