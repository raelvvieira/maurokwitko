

## Plano: Substituir carrossel por banner único do Curso de Formação

### Mudança única: `src/pages/Dashboard.tsx`

**Remover:**
- Array `heroSlides` (linhas 8-12)
- Estado `slide` e `useEffect` do auto-slide (linhas 17, 19-22)
- Imports não usados: `ChevronLeft`, `ChevronRight`, `useState`, `useEffect`
- Bloco do Hero Carousel inteiro (linhas 63-86)

**Adicionar no lugar** um banner estático:
- Título: "Curso de Formação em Psicoterapia Reencarnacionista"
- Subtítulo curto descritivo
- Botão CTA: "Veja próximas turmas →" abrindo `https://www.maurokwitko.com.br/curso-de-formacao/` em nova aba
- Estilo: mesmo gradiente `from-primary to-accent`, rounded-2xl, sem setas de navegação

### Arquivos editados
- `src/pages/Dashboard.tsx`

