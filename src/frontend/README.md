# Frontend folder

This folder contains the initial frontend structure for the Lodging Solutions demo app.

Structure created:

- `nav/` — top navigation component (`Nav.tsx`)
- `sidebar/` — sidebar component (`Sidebar.tsx`)
- `footer/` — footer component (`Footer.tsx`)
- `layouts/` — `MainLayout.tsx` that composes nav, sidebar, main content and footer
- `pages/` — starter pages: `Home.tsx`, `About.tsx`, `NotFound.tsx`
- `index.ts` — re-exports to simplify imports

How to use

Import the layout and pages from `src/frontend`:

Example (in `src/main.tsx` or a route file):

```tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { MainLayout } from './frontend';
import Home from './frontend/pages/Home';

createRoot(document.getElementById('root')!).render(
  <MainLayout>
    <Home />
  </MainLayout>
);
```

Next steps

- Wire these components into your router (React Router or other)
- Extract styles into CSS/SCSS or CSS modules
- Replace placeholder links with real navigation
