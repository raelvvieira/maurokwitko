

## Plano: Player imersivo para vídeos do YouTube (Aulas + Hinos)

Reaproveitar a página `CourseDetail` (atualmente sem uso) como **player universal** para todo conteúdo do YouTube na plataforma — Aulas (Cursos) e Hinos (faixas dos álbuns).

### Comportamento desejado

**Tela do player (layout existente reaproveitado):**
- **Esquerda (2/3):** iframe do YouTube reproduzindo o vídeo selecionado (substitui o placeholder com botão de play estático).
- **Direita (1/3):** "Próximas aulas" / "Faixas do álbum" — lista clicável dos vídeos restantes do mesmo módulo/álbum. Clicar troca o vídeo no player (sem recarregar a página) e marca como assistido.
- **Abaixo do player:** apenas a **descrição** do vídeo (se existir). Se não houver descrição, a seção é omitida — sem abas "Recursos/Comentários".
- **Botão "Marcar como Concluída"** abaixo do player; ao clicar, registra em `user_video_views` (já existe) e mostra estado "Aula Concluída".
- **Auto-avanço opcional:** após marcar concluída, destaca a próxima aula da lista para fácil acesso (sem autoplay forçado).

### Rota e navegação

Nova rota universal:
```
/watch/:source/:contextId/:videoId
```
- `source` = `course` | `album`
- `contextId` = id da categoria de curso ou id do álbum (para montar a lista lateral)
- `videoId` = id do vídeo/faixa atual

**Disparadores:**
- `src/pages/Courses.tsx`: clicar em um card de vídeo navega para `/watch/course/{categoryId}/{videoId}` (em vez de abrir o modal atual).
- `src/pages/Library.tsx`: clicar em "Play" numa faixa navega para `/watch/album/{albumId}/{trackId}` (em vez de abrir o Dialog atual).
- A opção "Ouvir Todas em Sequência" da Library continua abrindo o Dialog com playlist (comportamento mantido, pois é uma playlist agregada).

### Arquivos alterados

- `src/pages/CourseDetail.tsx` — renomear conceitualmente para "Watch": ler params `source/contextId/videoId`, buscar lista do contexto via `useApp()` (`courseCategories` ou `albums`), trocar o placeholder por iframe real, remover abas, mostrar descrição condicional, integrar `useUserVideoViews` para marcar assistido.
- `src/App.tsx` — adicionar rota `/watch/:source/:contextId/:videoId`. Manter `/courses/:id` como redirecionamento para a página de Cursos (ou remover, já que não é referenciada).
- `src/pages/Courses.tsx` — substituir o `onClick` que abre modal por `navigate(...)` para a nova rota; remover o estado `activeVideoUrl` e o modal.
- `src/pages/Library.tsx` — botão "Play" da faixa individual passa a navegar para `/watch/...`; manter Dialog apenas para "Ouvir Todas".
- `src/context/AppContext.tsx` — sem mudanças estruturais (já expõe `albums` e `courseCategories`).

### Detalhes técnicos

- O iframe usa `https://www.youtube.com/embed/{ID}?autoplay=1&rel=0` para autoplay ao trocar de faixa via lateral.
- "Marcar como concluída" usa o hook existente `useUserVideoViews.markVideoWatched` (upsert em `user_video_views`). Para Hinos (faixas de álbum), o mesmo mecanismo é usado com o `track.id` — funciona porque a tabela aceita qualquer `video_id` (string). Isso permite, no futuro, ranking unificado.
- Botão "Voltar" volta para `/courses` ou `/library` conforme o `source`.
- Layout responsivo já existente é mantido (lista vai abaixo do player no mobile).
- Bug menor de console (Outlet refs em `AppShell`/`AuthGate`) — não relacionado, ignorar nesta entrega.

