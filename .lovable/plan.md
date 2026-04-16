

## Plano: Atualizar e-book "A Cura da Solidão" e adicionar 2 livros físicos

### 1. Substituir o PDF do e-book "A Cura da Solidão"
O e-book já existe no banco (id `03dda85b-4134-4392-a44c-a6fe89ff0942`). Vou:
- Copiar o PDF enviado (`user-uploads://A_Cura_da_Solidão.pdf`) para o bucket `ebooks/pdfs/` no Storage com o mesmo nome do arquivo atual (`a_cura_da_solid_o.pdf`), substituindo o existente.
- A `url` na tabela `ebooks` já aponta para esse caminho, então não precisa alterar o registro.

### 2. Adicionar 2 livros físicos em `src/pages/Livros.tsx`
Adicionar ao array estático `BOOKS`:

**a) 20 Casos de Regressão (Ed. 7)**
- Preço: R$ 69,90
- Capa: `https://images.tcdn.com.br/img/img_prod/1347031/90_20_casos_de_regressao_historias_reais_de_pessoas_que_recordaram_vidas_passadas_1865_1_497b70762423fd4a00df8d2428976c1e.jpg`
- Link: `https://www.besourobox.com.br/espiritismo/20-casos-de-regressao`

**b) Terapia de Regressão: Perguntas e Respostas**
- Preço: R$ 69,90
- Capa: `https://images.tcdn.com.br/img/img_prod/1347031/90_terapia_de_regressao_perguntas_e_respostas_1997_1_75719c28e45bc5bb1d1928d3b3aadd0d.jpg`
- Link: `https://www.besourobox.com.br/autoconhecimento/terapia-de-regressao/terapia-de-regressao-perguntas-e-respostas`

### Arquivos alterados
- Storage: upload do PDF `ebooks/pdfs/a_cura_da_solid_o.pdf` (substituição)
- `src/pages/Livros.tsx` — adicionar 2 entradas ao array `BOOKS`

