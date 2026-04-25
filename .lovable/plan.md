## Plano: pop-up de rádios na página /links

### Mudança em `src/pages/Links.tsx`
Substituir o atual `RadioModal` (que mostra apenas 1 link genérico para soulcast.com.br) por um modal "PROGRAMAS DE RÁDIO" com os 2 programas reais que já existem em `src/pages/public/RadioPublica.tsx`:

**Programa 1 — Paranormal.plus**
- Capa: `https://i.ibb.co/rR9yNcSP/paranormal-plus.png`
- Horários: Segunda 11h, Quarta 23h
- Link: `https://share.google/6Cy2SpzzA1ldiRcZI`

**Programa 2 — Soul Cast Plus**
- Capa: `https://i.ibb.co/qYw9jzGK/soulcast-plus.png`
- Horários: Domingo 20h, Terça 15:30
- Link: `https://share.google/6KqsdxSlcSPjlNROg`

### Layout do modal (conforme imagem de referência, adaptado à paleta do site)
- Fundo do modal: `bg-secondary/95` (azul claro suave da paleta) com `backdrop-blur-xl`, `rounded-3xl`, borda `border-white/40`.
- Título centralizado "PROGRAMAS DE RÁDIO" em `text-primary font-bold uppercase tracking-wider`, com uma linha decorativa curta abaixo (divisor `bg-primary` h-0.5 w-12 mx-auto).
- Botão X de fechar no canto superior direito (círculo branco com sombra leve).
- Grid de 2 colunas (`grid-cols-2 gap-3`) com cada programa em um card branco `rounded-2xl shadow-md overflow-hidden`:
  - Capa quadrada no topo (`aspect-square object-cover`).
  - Nome em `text-primary font-bold` (Paranormal.plus / Soul Cast Plus).
  - Linha de horário com ícone `Clock` em texto pequeno cinza (ex: "Segunda 11h, Quarta 23h").
  - Botão pílula azul `bg-primary text-primary-foreground` "ESCUTAR AGORA" com ícone `ExternalLink`, abrindo o link em nova aba.
- Largura máxima `max-w-md`, padding `p-5`, animação de entrada suave (já existente).

### Não muda
- Lista de links da página, demais variantes de botão, perfil/bio, fluxo de fechamento ao clicar no overlay.
