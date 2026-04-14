

## Plan: Substituir todos os dados de vídeos com os IDs corretos da planilha

### Problema
Os IDs de vídeo no banco são fabricados e não correspondem aos vídeos reais. Apenas 1 de ~90 vídeos tem o ID correto.

### Solução

#### 1. Limpar e reinserir `course_videos`

Deletar todos os registros e inserir os dados corretos da planilha, com URLs no formato embed:

- **LIVES GRAVADAS** -- 20 vídeos (linhas 7-25 da planilha)
- **AULAS GRAVADAS - LIVROS DR. MAURO** -- 10 vídeos (linhas 26-35)
- **CURSO DE REFORMA INTIMA COM DR. MAURO** -- 60 vídeos (linhas 36-95)

Cada `youtu.be/ID` sera convertido para `https://www.youtube.com/embed/ID`, removendo escapes de markdown (`\_` -> `_`).

#### 2. Limpar e reinserir `album_tracks`

- **HINOS DE PAZ** -- 11 faixas (linhas 96-106)
- **HINOS DE FE** -- 12 faixas (linhas 107-118)
- **HINOS DE AMOR** -- 10 faixas (linhas 119-128)

Mesma conversao de URL para formato embed.

#### 3. Nenhuma mudanca de codigo

O `Courses.tsx` ja usa a URL do banco diretamente no `src` do iframe. O codigo esta correto.

### Execucao tecnica

- Usar INSERT tool para DELETE + INSERT dos dados (nao migration, pois sao dados e nao schema)
- Manter os `category_id` e `album_id` existentes
- Coluna `position` seguira a ordem da planilha
- Descricoes da planilha serao preservadas; onde nao houver, string vazia

