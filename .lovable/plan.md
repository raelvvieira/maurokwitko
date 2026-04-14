

## Plano: Substituir conteudo da pagina Livros com dados reais da BesouroBox

### Mudanca unica: reescrever `src/pages/Livros.tsx`

Remover a dependencia do contexto/banco e usar um array estatico com os 7 livros. Cada livro tera: titulo, preco, URL da capa (extraida da BesouroBox), e link de compra.

**Dados completos com imagens extraidas:**

| # | Capa | Preco |
|---|------|-------|
| 1 | `...90_tratando_fobia_panico_e_depressao...cc9de4bf...png` | R$ 69,90 |
| 2 | `...doutor_eu_ouco_vozes_1747_1_277ba97f...png` | R$ 69,90 |
| 3 | `...20_casos_de_regressao...497b7076...jpg` | R$ 69,90 |
| 4 | `...terapia_de_regressao_perguntas_e_respostas_1997_1_75719c28...jpg` | R$ 69,90 |
| 5 | `...como_aproveitar_a_sua_encarnacao_1823_1_469e6467...png` | R$ 49,90 |
| 6 | `...como_evoluir_espiritualmente...1673_1_a7e92ca8...png` | R$ 64,90 |
| 7 | `...a_fascinante_vida_de_mirta_kassov...1689_1_35d6c315...png` | R$ 54,90 |

**Layout:**
- Grid: `grid-cols-2 lg:grid-cols-3`
- Card com imagem de capa (aspect-[3/4], object-contain, bg-muted), titulo, preco em destaque, botao "Comprar" abrindo em nova aba
- Estilo glass-card consistente com o resto do site
- Animacao framer-motion mantida

**Nenhuma mudanca de banco de dados** -- os dados ficam hardcoded no componente.

