

## Plan: Mobile Responsive + Admin Panel + Discounts Menu

### 1. Mobile Responsive Layout with Collapsible Sidebar

**Problem:** Sidebar is fixed at 264px, no mobile adaptation. FloatingPlayer has `ml-64` hardcoded.

**Changes:**
- **`AppShell.tsx`**: Add mobile state using `useIsMobile()`. On mobile, remove `ml-64` from content area. Sidebar becomes an overlay drawer triggered by a hamburger button.
- **`GlassSidebar.tsx`**: Accept `open`/`onToggle` props. On mobile: render as a slide-in overlay with backdrop. On desktop: support collapse to icon-only (w-16) mode with a toggle button. Animate with framer-motion or CSS transitions.
- **`TopBar.tsx`**: Add hamburger menu button (visible on mobile) to toggle sidebar. Hide/shrink search bar on mobile.
- **`FloatingPlayer.tsx`**: Remove `ml-64`, make it adapt to sidebar state. On mobile, full-width with compact layout.
- **`Dashboard.tsx`**: Change `grid-cols-4` → responsive `grid-cols-2 md:grid-cols-4`, `grid-cols-5` → `grid-cols-1 md:grid-cols-5`. Fix hero text sizing.
- **Other pages** (Library, Courses, etc.): Add responsive grid adjustments (`grid-cols-1 md:grid-cols-2`).

### 2. Admin Panel with File Upload & Media Management

**New files/routes:**
- **`src/pages/Admin.tsx`**: Admin dashboard with upload interface.
  - File upload form with drag-and-drop area
  - Fields: title, description, category (Cursos/Biblioteca/Materiais), file type auto-detection
  - Support for: video files, audio files, documents, and YouTube URL input
  - List of uploaded content with edit/delete
  - Embedded audio player (`<audio>`) and video player (`<video>` / YouTube iframe)
  
- **`src/context/AppContext.tsx`**: Add `isAdmin` flag (simple state toggle for now, with note about proper auth later), add `mediaItems` state with upload/delete functions.

- **`src/components/GlassSidebar.tsx`**: Add "Admin" nav item (conditionally shown when `isAdmin` is true), add "Descontos" nav item.

- **Route in `App.tsx`**: Add `/admin` route.

**Media item structure:**
```typescript
interface MediaItem {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'audio' | 'document';
  category: 'courses' | 'library' | 'materials';
  url: string; // blob URL or YouTube URL
  youtubeId?: string;
  fileName?: string;
  createdAt: string;
}
```

**Player integration:** Library and Materials pages will render uploaded items with inline players. YouTube videos render via iframe embed. Audio uses native `<audio>` controls styled to match the glass theme.

### 3. Discounts Menu

- **`src/pages/Discounts.tsx`**: New page showing discount coupons/promotions.
  - List of discount cards with: title, percentage off, applicable courses, expiry date, coupon code
  - Admin can create/edit discounts from the Admin panel (add a "Descontos" tab in Admin)
  - Mock data for initial display

- **`src/components/GlassSidebar.tsx`**: Add "Descontos" nav item with `Tag` or `Percent` icon.

- **Route in `App.tsx`**: Add `/discounts` route.

### Technical Notes

- Admin access uses a simple `isAdmin` state in context (toggle via a hidden button on profile or a direct state). For production, this should use Supabase auth + user_roles table with RLS.
- File uploads are client-side only (blob URLs in state). For persistence, Supabase Storage integration will be needed later.
- All new pages follow existing glass-card design patterns and framer-motion animations.

