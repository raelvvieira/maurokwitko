

## Plano: copy do Dr. Mauro, turmas, e redução global de 25%

### 1. Hero da Home (`src/pages/public/Home.tsx`)
Substituir título e parágrafo da hero (linhas ~61-67):
- **H1:** "Psicoterapia Reencarnacionista e Investigação do Inconsciente" (mantendo "Investigação do Inconsciente" em itálico/serif primary).
- **Parágrafo:** "Há mais de três décadas, o Dr. Mauro Kwitko, médico, fundador e presidente da Associação Brasileira de Psicoterapia Reencarnacionista trabalha para integrar a Reencarnação às Instituições Oficiais de Saúde, enquanto um tema da área da saúde, não como um assunto religioso, espiritual."

### 2. Página Quem Sou Eu (`src/pages/public/QuemSouEu.tsx`)
Linha 45-46, trocar para: "Médico, fundador e presidente da Associação Brasileira de Psicoterapia Reencarnacionista (ABPR)."

### 3. Curso de Formação (`src/pages/public/Formacao.tsx`)
Array `TURMAS` (linhas 83-88): remover Ceará e Sergipe; alterar mês de Rio de Janeiro e Porto Alegre de "Abril 2026" para **"Junho 2026"**. Resultado: apenas 2 cards (Rio e Porto Alegre). O grid `sm:grid-cols-2` continua funcionando bem com 2 itens.

### 4. Curso Online (`src/pages/public/CursoOnline.tsx`)
Linha 95: trocar "ao longo dos mais de 20 anos que atuo com a psicoterapia reencarnacionista." por "ao longo dos cerca de 30 anos que atuo com a Psicoterapia Reencarnacionista."

### 5. Redução global de 25% no tamanho (zoom nativo a 75%)
Em `src/index.css`, dentro de `@layer base`, adicionar:

```css
html {
  font-size: 12px; /* equivalente a 75% do padrão 16px */
}
```

Como todo o projeto usa Tailwind (que escala em `rem`) e a fonte base é definida em `body`, mudar a `font-size` do `<html>` reduz proporcionalmente todos os textos, paddings, margens, larguras com `rem` e breakpoints baseados em `em` — equivalente ao `Ctrl+Shift+-` a 75%, mas nativo. Não afeta valores em `px` (alguns ícones e imagens), o que mantém proporções visuais saudáveis. Os `1rem = 12px` se aplicam a toda a aplicação (site público + clube de estudos + login).

### Arquivos alterados
- `src/pages/public/Home.tsx`
- `src/pages/public/QuemSouEu.tsx`
- `src/pages/public/Formacao.tsx`
- `src/pages/public/CursoOnline.tsx`
- `src/index.css`

