

## Plan: Importar Conteúdos da Planilha

A planilha contém **93 vídeos de cursos** e **34 hinos** organizados assim:

### Cursos (inserir em `course_categories` + `course_videos`)
1. **LIVES GRAVADAS** — 21 vídeos (O Mapa do Ego, Releitura da Infância, etc.)
2. **AULAS GRAVADAS - LIVROS DR. MAURO** — 10 vídeos (Autismo e Reencarnação, Reforma Íntima, etc.)
3. **CURSO DE REFORMA ÍNTIMA COM DR. MAURO** — 60 vídeos (Introdução, Mapa do Ego 1-5, Releitura da Infância 1-5, etc.)

### Hinos (inserir em `albums` + `album_tracks`)
1. **HINOS DE PAZ** — 12 faixas (A Estrela da Virgem Maria, Com Paz, etc.)
2. **HINOS DE FÉ** — 12 faixas (Alma Viajante, Estrela Matutina, etc.)
3. **HINOS DE AMOR** — 10 faixas (Aqui na Luz desse Jardim, Benção do Mar, etc.)

### Implementação

1. **Limpar dados existentes (mock)** — Remover os dados de exemplo que foram inseridos como seed nas tabelas `course_categories`, `course_videos`, `albums` e `album_tracks`

2. **Inserir categorias de cursos** — 3 registros em `course_categories`

3. **Inserir vídeos de cursos** — 91 registros em `course_videos`, cada um com o YouTube ID extraído da URL (ex: `https://youtu.be/0xX9ivjPvA8` → `0xX9ivjPvA8`)

4. **Inserir álbuns de hinos** — 3 registros em `albums` com cores distintas

5. **Inserir faixas de hinos** — 34 registros em `album_tracks` com URLs do YouTube

### Detalhes Técnicos
- Todas as inserções via Supabase insert tool (dados, não schema)
- YouTube IDs extraídos automaticamente das URLs `youtu.be/XXXXX`
- Posições (`position`) atribuídas sequencialmente dentro de cada categoria/álbum
- Nenhuma alteração de código necessária — as páginas já consomem esses dados das tabelas

