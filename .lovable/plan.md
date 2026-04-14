

## Plano: Ajustes gerais na plataforma (10 itens)

### 1. Logo 20% maior (`src/components/GlassSidebar.tsx`)
- Sidebar expandida: `h-14` → `h-[4.2rem]`
- Sidebar colapsada: `w-10 h-10` → `w-12 h-12`

### 2. Cards de cursos menores no mobile (`src/pages/Courses.tsx`)
- Reduzir largura do card: `w-64` → `w-52 md:w-64`
- Remover `truncate` do título, usar `line-clamp-2` para permitir wrap em 2 linhas
- Descrição: manter `line-clamp-2`

### 3. Simplificar Dashboard (`src/pages/Dashboard.tsx`)
Remover os 4 stat cards (Cursos Ativos, Posição Ranking, Streak, Score). Remover radial progress. Substituir por:
- **Progresso de aulas assistidas**: barra simples mostrando total de aulas completadas vs total
- **Ranking**: posição atual do usuário (card simples)
- **Continue Aprendendo**: manter, mas limitar a 5 itens (atualmente 3)
- **Últimos Comentários da Comunidade**: novo card mostrando os 5 posts mais recentes (da lista `posts` do contexto), com autor e trecho do conteúdo

### 4. E-books: capas menores no mobile (`src/pages/Ebooks.tsx`)
- Grid mobile: `grid-cols-1` → `grid-cols-2` com capas menores
- Aspect ratio mantido `aspect-[210/297]` mas cards ficam menores por estarem em 2 colunas

### 5. E-books: corrigir banner de desconto (`src/pages/Ebooks.tsx`)
Trocar a copy para falar de **livros físicos** (igual ao da página Livros), mencionando que o desconto é nos livros físicos do Dr. Mauro na BesouroBox. Adicionar botão CTA "Ver Livros" que navega para `/livros`.

### 6. Materiais: limpar conteúdo de exemplo (`src/pages/Materials.tsx`)
Verificar se os materiais vêm do banco de dados (via `materialItems` do contexto). Se o banco estiver vazio, a mensagem "Nenhum material disponível" já aparece. Se houver dados de exemplo no banco, limpar via query. A página já trata o estado vazio.

### 7. Ranking: simplificar (`src/pages/Ranking.tsx`)
- Título: "Ranking Global" → "Ranking Geral"
- Subtítulo: "Os participantes mais engajados com o Clube"
- Adicionar seção "Como ganhar pontos" com 4 critérios claros:
  1. Assistir aulas (10 pts por aula)
  2. Baixar e-books (5 pts por download)
  3. Publicar relatos na comunidade (15 pts por publicação)
  4. Comentar posts de outros membros (5 pts por comentário)
- Manter pódio top 3 e tabela, remover coluna "Crescimento" e "Streak" para simplificar

### 8. Comunidade funcional (`src/pages/Community.tsx`)
Requer tabelas no banco de dados para persistir posts e comentários.

**Banco de dados** — criar 2 tabelas:
- `community_posts` (id, user_id, user_name, content, likes_count, created_at)
- `community_comments` (id, post_id FK, user_id, user_name, content, created_at)

**RLS**: authenticated pode SELECT tudo, INSERT próprio, DELETE próprio (user_id = auth.uid())

**Funcionalidades**:
- Publicar relato/comentário de estudo (salva no banco com nome do usuário logado)
- Subtítulo abaixo de "Comunidade" explicando: "Compartilhe relatos, experiências e dicas dos seus estudos com os membros do clube."
- Curtir/descurtir posts (toggle, contagem atualizada)
- Comentar em posts (com nome do autor visível)
- Excluir próprios comentários/posts
- Remover ícone de compartilhar
- Remover card "Curso Recomendado" do rodapé

### 9. Blog: permitir abrir post completo (`src/pages/Blog.tsx`)
- Criar rota `/blog/:id` com página `BlogPost.tsx` que busca o post por ID e exibe conteúdo completo
- Tornar cada card clicável com `navigate(/blog/${post.id})`
- Se o banco estiver vazio de posts, a mensagem vazia já aparece

### 10. Descontos: simplificar (`src/pages/Discounts.tsx`)
Substituir toda a lógica atual por um card único estilo o banner da página de Livros, focado no desconto de 20% nos livros físicos na BesouroBox com cupom MAURO20. Incluir:
- Explicação detalhada do processo de compra
- Botão CTA "Ver Livros" navegando para `/livros`
- Remover listagem dinâmica de descontos do banco

### Arquivos editados
- `src/components/GlassSidebar.tsx`
- `src/pages/Courses.tsx`
- `src/pages/Dashboard.tsx`
- `src/pages/Ebooks.tsx`
- `src/pages/Materials.tsx` (verificação apenas)
- `src/pages/Ranking.tsx`
- `src/pages/Community.tsx`
- `src/pages/Blog.tsx`
- `src/pages/BlogPost.tsx` (novo)
- `src/pages/Discounts.tsx`
- `src/App.tsx` (nova rota /blog/:id)
- Migração SQL: tabelas `community_posts` e `community_comments`

