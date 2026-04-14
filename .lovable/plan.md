

## Plan: Converter URLs do YouTube para formato embed

### Situação atual
- **`course_videos.youtube_id`**: armazena apenas o ID (ex: `0xX9ivjPvA8`) — o componente monta a URL de embed no código
- **`album_tracks.youtube_url`**: armazena URLs `youtu.be/...` (placeholders) — não está no formato embed

### Mudanças necessárias

#### 1. Migration SQL — converter dados nas duas tabelas

**`course_videos.youtube_id`**: transformar IDs puros em URLs embed completas:
```
0xX9ivjPvA8 → https://www.youtube.com/embed/0xX9ivjPvA8
```

**`album_tracks.youtube_url`**: transformar URLs `youtu.be/ID` em embed:
```
https://youtu.be/abc1paz01 → https://www.youtube.com/embed/abc1paz01
```

A migration usará `UPDATE ... SET` com expressões regex para extrair o ID e reconstruir a URL no formato embed. URLs já no formato embed serão ignoradas.

#### 2. Código — usar URL do banco diretamente

| Arquivo | Mudança |
|---------|---------|
| `src/pages/Courses.tsx` | `src` do iframe passa a ser `activeVideo` direto (sem montar URL). Thumbnail e link fallback extraem o ID da URL embed |
| `src/context/AppContext.tsx` | Tipo `CourseVideo.youtubeId` continua string — agora é URL completa |
| `src/hooks/useSupabaseData.ts` | Sem mudança na lógica de fetch (campo `youtube_id` já é mapeado) |
| `src/pages/Admin.tsx` | Ao adicionar vídeo, salvar já no formato embed (`https://www.youtube.com/embed/ID`) |

#### 3. Detalhes do iframe (conforme especificado)
```tsx
<iframe
  src={videoUrl}  // direto do banco
  title="YouTube video player"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerPolicy="strict-origin-when-cross-origin"
  allowFullScreen
  className="w-full h-full"
/>
```

Sem `width`/`height` fixos — dimensões controladas por CSS (`aspect-video` + `w-full h-full`).

