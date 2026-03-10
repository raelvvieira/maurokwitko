

## Plan: Major Content Restructure

### 1. Remove Upgrade Pro & Floating Player
- **`GlassSidebar.tsx`**: Remove the "Upgrade Pro" card at the bottom
- **`AppShell.tsx`**: Remove `<FloatingPlayer />` and remove `pb-20` padding
- **`FloatingPlayer.tsx`**: Can be deleted (or left unused)

### 2. Split Biblioteca into E-books + Livros
- **Remove** `/biblioteca` route, replace with `/ebooks` and `/livros`
- **`Ebooks.tsx`** (new): Vertical book cards with "Acessar o E-book" button (opens external link)
- **`Livros.tsx`** (new): Vertical book cards with "Comprar Livro" button (opens purchase link)
- **`GlassSidebar.tsx`**: Replace "Biblioteca" nav item with "E-books" and "Livros"
- **`App.tsx`**: Update routes

### 3. Hinos → CD Album Cards
- **`Library.tsx`**: Redesign as square CD cards. Each CD has a title, cover placeholder, and track list. Clicking a CD opens a modal/expandable view showing songs inside. Each song has a "Tocar" button that opens a YouTube link.
- **Data structure**: `Album { id, title, coverColor, tracks: { title, youtubeUrl }[] }`

### 4. Courses → Categories with Horizontal Carousels
- **`Courses.tsx`**: Complete redesign. Each category renders as a horizontal row with category name as header. Videos scroll horizontally (carousel). Clicking a video opens the YouTube embed modal (existing pattern).
- **Data structure**: `CourseCategory { name, videos: { title, youtubeId, description }[] }`
- Mock categories: "Cura e Libertação", "Batalha Espiritual", "Discipulado"

### 5. Admin Panel Expansion
Add new tabs/sections to `Admin.tsx` for managing:
- **Hinos (CDs + tracks)**: Add album name, tracks with YouTube URLs
- **Materiais**: Upload documents/files for the Materials page
- **Blog**: Add blog post with title, text content, and optional image upload
- **E-books/Livros**: Add book entries with external links
- **Course Categories**: Create categories and add YouTube videos to them

The admin page will use a tab system to organize all these sections.

### 6. Context Updates (`AppContext.tsx`)
Add new state arrays and handlers:
- `albums: Album[]` — for Hinos CDs
- `courseCategories: CourseCategory[]` — for categorized courses
- `blogPosts: BlogPost[]` — admin-managed blog posts
- `ebooks/livros` data arrays
- Remove `currentTrack`, `isPlaying`, `playerProgress`, `togglePlay` (player removed)

### Files Changed

| File | Action |
|------|--------|
| `src/context/AppContext.tsx` | Add albums, courseCategories, blogPosts, ebooks, livros state; remove player state |
| `src/components/AppShell.tsx` | Remove FloatingPlayer, remove pb-20 |
| `src/components/GlassSidebar.tsx` | Remove Upgrade Pro card, replace Biblioteca with E-books + Livros |
| `src/pages/Library.tsx` | Redesign as CD album grid with expandable track lists |
| `src/pages/Courses.tsx` | Redesign with category rows and horizontal video carousels |
| `src/pages/Ebooks.tsx` | New — e-book cards with "Acessar o E-book" button |
| `src/pages/Livros.tsx` | New — book cards with "Comprar Livro" button |
| `src/pages/Admin.tsx` | Add tabs for all content types (Hinos, Materiais, Blog, E-books, Livros, Categorias de Cursos) |
| `src/pages/Blog.tsx` | Render admin-managed blog posts from context |
| `src/pages/Materials.tsx` | Render admin-managed materials from context |
| `src/pages/Biblioteca.tsx` | Delete (replaced by Ebooks + Livros) |
| `src/App.tsx` | Update routes: remove /biblioteca, add /ebooks and /livros |

### Navigation Order (Updated)
Home → Cursos → Hinos → E-books → Livros → Rádio → Materiais → Ranking → Comunidade → Blog → Descontos

