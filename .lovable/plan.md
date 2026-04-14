

## Plano: Ajustar proporção A4 nas capas e logo maior centralizada

### 1. Capas dos e-books com proporção A4 (`Ebooks.tsx`)
- Linha 34: trocar `aspect-[3/4]` por `aspect-[210/297]` (proporção exata A4)
- Linha 36: trocar `object-cover` por `object-contain bg-gray-100 dark:bg-gray-800` para não cortar as capas

### 2. Logo maior e centralizada na sidebar (`GlassSidebar.tsx`)
- Linha 34: mudar para `justify-center` sempre (não só quando collapsed)
- Linha 38: aumentar tamanho — collapsed: `w-10 h-10`, expandida: `h-14`

