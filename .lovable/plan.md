

## Plan: Ajustar iframe para padrão oficial do YouTube

Atualizar o `<iframe>` em `src/pages/Courses.tsx` para usar o formato padrão de embed do YouTube:

### Mudança em `src/pages/Courses.tsx` (linhas 35-41)

**De:**
```jsx
<iframe
  src={`https://www.youtube-nocookie.com/embed/${activeVideo}?autoplay=1&rel=0`}
  allow="autoplay; encrypted-media"
  allowFullScreen
  referrerPolicy="no-referrer"
  className="w-full h-full"
/>
```

**Para:**
```jsx
<iframe
  src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0`}
  title="YouTube video player"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerPolicy="strict-origin-when-cross-origin"
  allowFullScreen
  className="w-full h-full"
/>
```

Principais mudanças:
- Domínio: `youtube-nocookie.com` → `youtube.com` (padrão oficial)
- `allow`: adicionados `accelerometer`, `clipboard-write`, `gyroscope`, `picture-in-picture`, `web-share`
- `referrerPolicy`: `no-referrer` → `strict-origin-when-cross-origin`
- Adicionados `title` e `frameBorder="0"`

