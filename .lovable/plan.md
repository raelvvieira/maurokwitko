

## Plan: Rename, Restructure Tabs & Add New Pages

### Changes Summary

1. **Rename "EduFlow" → "Clube de Estudos Dr. Mauro Kwitko"** in `GlassSidebar.tsx` (logo text)

2. **Rename current "Biblioteca" (Library) → "Hinos"** — keep the same audio tracks page at `/library`, just rename the label and heading to "Hinos"

3. **New "Biblioteca" page** (`/biblioteca`) — vertical book cards for Dr. Mauro's book catalog with cover placeholders, title, description

4. **New "Rádio" page** (`/radio`) — page with a card linking to Dr. Mauro's radio stream (opens external link on click)

5. **Courses page redesign** — vertical cards with embedded YouTube video links (thumbnail + play overlay that opens YouTube or embeds iframe)

### Files to Change

| File | Action |
|------|--------|
| `src/components/GlassSidebar.tsx` | Rename brand to "Clube de Estudos Dr. Mauro Kwitko", rename "Biblioteca" → "Hinos" at `/library`, add "Biblioteca" at `/biblioteca`, add "Rádio" at `/radio` |
| `src/pages/Library.tsx` | Rename heading from "Biblioteca de Áudio" → "Hinos", update subtitle |
| `src/pages/Biblioteca.tsx` | **New** — vertical book cards with mock catalog (cover image placeholder, title, author "Dr. Mauro Kwitko", description) |
| `src/pages/Radio.tsx` | **New** — card with radio icon and external link to Dr. Mauro's radio |
| `src/pages/Courses.tsx` | Redesign to vertical cards with YouTube video thumbnails/embeds instead of progress-based cards |
| `src/App.tsx` | Add routes for `/biblioteca` and `/radio` |
| `src/context/AppContext.tsx` | Update course data to include `youtubeUrl` field for each course |

### New Navigation Order (Sidebar)
Home → Cursos → Hinos → Biblioteca → Rádio → Materiais → Ranking → Comunidade → Blog → Descontos

### Design Details
- **Biblioteca cards**: Vertical glass-card with book cover placeholder (gradient), title, author, short description, "Ler mais" button
- **Rádio**: Single prominent card with radio wave icon, "Rádio Dr. Mauro" title, "Ouvir Agora" button opening external URL
- **Courses**: Each card shows YouTube thumbnail (derived from video ID), title, and play button. Clicking opens embedded YouTube player or external link

