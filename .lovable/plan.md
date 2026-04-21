

## Plano: card hero mais largo + botões dos hinos + copy

### 1. Card hero mais largo e com mais respiro (`src/pages/public/Home.tsx`)
- Trocar wrapper externo `max-w-6xl mx-auto px-4 md:px-6` para **`max-w-7xl mx-auto px-3 md:px-6`** — card visualmente mais largo no desktop e quase encostado nas bordas no mobile (mas com 12px de respiro mínimo).
- Aumentar padding interno do card de `p-6 md:p-12 lg:p-16` para **`p-8 sm:p-10 md:p-16 lg:p-20`** — mais distância entre conteúdo e bordas em todos os tamanhos.
- Aumentar gap entre coluna de texto e imagem de `gap-12 md:gap-16` para **`gap-10 md:gap-20`**.
- Mobile: garantir que título, parágrafo e botão respirem bem dentro do card — `space-y-6` continua, mas o padding extra resolve o aperto visto na imagem do usuário.

### 2. Hinos Espirituais — dois botões por álbum (`src/pages/public/HinosEspirituais.tsx`)
Substituir o botão único "Ouvir Agora" por **dois botões empilhados**:

- **Botão 1 — "Ver Hinos"** (primário verde, mesmo estilo atual): abre o `Dialog` do player com tracklist (comportamento atual).
- **Botão 2 — "Ouvir Álbum Completo"** (secundário, outline ou tom mais suave): abre o **mesmo Dialog**, mas o iframe carrega a playlist completa do YouTube via `https://www.youtube.com/embed/videoseries?list=<PLAYLIST_ID>&autoplay=1`, que reproduz o álbum inteiro em sequência (mesmo comportamento usado no Clube).

Adicionar `playlistId` ao `PLAYLISTS` (reaproveitando os IDs já existentes em `src/data/hinosTracks.ts`):
- Hinos de Paz → `PLG7GxMRJ1lg1lkiGi6HLMAJhCq7NLfk7X`
- Hinos de Amor → `PLG7GxMRJ1lg2Pn2UzVXanS5k7_8beIBVy`
- Hinos de Fé → `PLG7GxMRJ1lg26AzCi0oOcrNZVir0SOc1j`

Ajustes no estado/lógica:
- Novo estado `playerMode: 'tracks' | 'playlist'`.
- Quando `playlist`: `playerSrc = https://www.youtube.com/embed/videoseries?list=${playlistId}&autoplay=1` e a coluna lateral de tracklist mostra um aviso "Reproduzindo álbum completo em sequência" (ou esconde a lista e ocupa 100% no player). Decisão: manter o mesmo grid `1.6fr_1fr` para consistência visual, com a lateral mostrando mensagem clara no modo playlist.
- Botão 2 fica desabilitado se não houver `playlistId` (só por segurança).

### 3. Copy "Outras obras" → "todas as obras"
- `src/pages/public/LivrosEbooks.tsx` linha 153: `Outras obras do autor` → **`Todas as obras do autor`**.
- `src/pages/public/LivroDetalhe.tsx` linha 267: idem.

(O eyebrow acima continua "Para conhecer", como já está.)

### Arquivos alterados
- `src/pages/public/Home.tsx` — largura/padding do card hero.
- `src/pages/public/HinosEspirituais.tsx` — `playlistId` no `PLAYLISTS`, dois botões, modo `playlist` no Dialog.
- `src/pages/public/LivrosEbooks.tsx` — copy.
- `src/pages/public/LivroDetalhe.tsx` — copy.

### Não muda
- Layout do Dialog/player, design dos cards de álbum, autoplay/dots do hero, demais seções.

