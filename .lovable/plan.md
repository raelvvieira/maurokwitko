

## Plano: atualizar links de checkout (Clube e Curso On-Line)

### 1. Página de vendas do Clube de Estudos (`src/pages/public/ClubeDeEstudos.tsx`)
Substituir o link atual do botão "Quero me Inscrever" / CTA de inscrição por:
**`https://chk.eduzz.com/2445141`**

Aplicado em todos os CTAs de inscrição da página (hero + CTA final, se houver).

### 2. Página do Curso On-Line (`src/pages/public/CursoOnline.tsx`)
Trocar a constante `COURSE_URL` de `https://reformaintimaonline.com.br` para:
**`https://chk.eduzz.com/801EN21NW7`**

A constante já é usada nos 3 botões da página (hero, card de preço, CTA final), então um único ajuste cobre todos.

### Não muda
- Texto dos botões, design, animações, demais conteúdos das páginas.

### Arquivos alterados
- `src/pages/public/ClubeDeEstudos.tsx`
- `src/pages/public/CursoOnline.tsx`

