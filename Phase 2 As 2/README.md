# Bookmark Manager (React + TypeScript + Vite)

A multi-view React application demonstrating routing, Context API, custom hooks, controlled forms with validation, and component testing.

## Scripts

- `npm install`
- `npm run dev`
- `npm test`
- `npm run build`

## Routes

- `/` → bookmark list view
- `/bookmark/:id` → bookmark detail view
- `/add` → add bookmark form view

## Tech Highlights

- React Router (`Link`, `NavLink`, `useParams`)
- Context API with provider + consumer hook
- Custom hooks: `useBookmarksData`, `useLocalStorage`
- Three-state async data flow: loading / success / error
- Controlled form with single `handleChange` and validation
- Vitest + React Testing Library test suite
