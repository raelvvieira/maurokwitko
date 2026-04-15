

## Plano: Ajustes de menu, conteúdo e funcionalidades

### 1. Renomear "Cursos" para "Aulas" no menu lateral
Alterar o label em `src/components/GlassSidebar.tsx` (linha 9) e o título em `src/pages/Courses.tsx` (linha 30).

### 2. Renomear categoria no banco de dados
Executar migration SQL para atualizar o nome da categoria:
```sql
UPDATE course_categories SET name = 'CURSO DE REFORMA ÍNTIMA COM DR. MAURO KWITKO'
WHERE id = 'a1000000-0000-0000-0000-000000000003';
```

### 3. Adicionar "Ouvir Todas" nos álbuns de Hinos
Em `src/pages/Library.tsx`, adicionar antes da lista de faixas uma linha especial "Ouvir Todas em Sequência" com ícone de Play. Ao clicar, abre o player com a URL da playlist do YouTube correspondente. Mapeamento por título do álbum:
- HINOS DE PAZ → `https://www.youtube.com/embed/videoseries?list=PLG7GxMRJ1lg1lkiGi6HLMAJhCq7NLfk7X`
- HINOS DE AMOR → `https://www.youtube.com/embed/videoseries?list=PLG7GxMRJ1lg2Pn2UzVXanS5k7_8beIBVy`
- HINOS DE FÉ → `https://www.youtube.com/embed/videoseries?list=PLG7GxMRJ1lg26AzCi0oOcrNZVir0SOc1j`

### 4. Remover 2 livros da lista estática
Em `src/pages/Livros.tsx`, remover os objetos "Doutor, Eu Ouço Vozes!" e "Como Aproveitar a Sua Encarnação" do array `BOOKS`.

### Arquivos alterados
- `src/components/GlassSidebar.tsx` — label "Aulas"
- `src/pages/Courses.tsx` — título "Aulas"
- `src/pages/Library.tsx` — botão "Ouvir Todas" com playlists
- `src/pages/Livros.tsx` — remover 2 livros
- Migration SQL — renomear categoria

