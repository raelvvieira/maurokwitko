## Ajustes na página `/links`

### 1. Avatar do Dr. Mauro (corrigir imagem quebrada)
A URL atual (`i.ibb.co/RTTwXXSp/...png`) está retornando o placeholder do imgbb ("upgrade to Pro"). Trocar pela mesma imagem usada na seção "Quem sou eu" do site (referência: `mem://style/branding-logo`). Verificar `src/pages/public/QuemSouEu.tsx` para usar a foto real do Dr. Mauro já presente no projeto, ou usar uma URL estável (ex.: copiar para `src/assets/dr-mauro-avatar.jpg` se necessário). Aplicar em `PROFILE.avatar` no `src/pages/Links.tsx`.

### 2. CTA "Clube de Estudos" — azul claro com brilho e motion
- Mudar a `variant` do botão `clube` de `dark` para uma nova variant `light-blue`.
- Criar a variant `light-blue` em `variantClasses`: fundo `bg-sky-400` / `bg-[#5ec5ee]` (azul claro alinhado à paleta accent existente), texto branco, sombra suave.
- Adicionar efeito de brilho (shine sweep) com pseudo-elemento ou um `motion.span` com gradiente diagonal animado deslizando da esquerda para a direita em loop (~3s).
- Adicionar motion design de zoom in/out contínuo: usar `motion.a` com `animate={{ scale: [1, 1.03, 1] }}` e `transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}` — sutil para não distrair, mas perceptível.
- Aplicar somente ao botão do Clube de Estudos (criar um sub-componente ou prop `highlight` no `LinkButton`, ou tratar o id `clube` como caso especial).

### 3. Badge "Novo" no CTA de Rádio
- Adicionar uma pequena pílula/etiqueta "NOVO" no botão `radio`.
- Posicionar absolutamente no canto superior direito do botão (`absolute -top-1 -right-1`), com `bg-primary` (ou `bg-red-500` para mais destaque), texto branco `text-[9px]` em uppercase, padding `px-2 py-0.5`, `rounded-full`, sombra leve, e animação `animate-pulse` opcional.
- Suportar via nova propriedade opcional `badge?: string` em `LinkItem` para reuso futuro.

### Arquivos alterados
- `src/pages/Links.tsx` (única alteração de código)
- Possivelmente `src/assets/` se a foto do Dr. Mauro precisar ser hospedada localmente

### Não alterado
- Modal de rádio (já implementado), demais seções/links, layout geral, paleta global.
