
## Plano: Redesenhar página Rádio com 2 cards de programas

### Mudança única: reescrever `src/pages/Radio.tsx`

Substituir o card único pelo seguinte layout:

**Grid com 2 cards** (`grid-cols-1 md:grid-cols-2 gap-6`), cada um com:
- Imagem de capa (rounded, aspect-video ou similar)
- Nome do programa em destaque
- Horários com ícone de relógio
- Botão "Escutar Agora" abrindo link em nova aba

**Card 1 — Paranormal.plus**
- Capa: `https://i.ibb.co/rR9yNcSP/paranormal-plus.png`
- Horários: Segunda 11h, Quarta 23h
- Link: `https://share.google/6Cy2SpzzA1ldiRcZI`

**Card 2 — Soul Cast Plus**
- Capa: `https://i.ibb.co/qYw9jzGK/soulcast-plus.png`
- Horários: Domingo 20h, Terça 15:30
- Link: `https://share.google/6KqsdxSlcSPjlNROg`

Manter header da página (título + subtítulo), estilo `glass-card`, animação framer-motion com stagger nos cards.
