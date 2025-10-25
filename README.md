# Crooked9ine

A modern, professional task management dashboard and team collaboration app.

Quick links:
- [App.tsx](App.tsx)
- [index.html](index.html)
- [index.tsx](index.tsx)
- [package.json](package.json)
- [vite.config.ts](vite.config.ts)
- [`CreateTaskModal`](components/modals/CreateTaskModal.tsx) — [components/modals/CreateTaskModal.tsx](components/modals/CreateTaskModal.tsx)
- [`TaskCard`](components/dashboard/TaskCard.tsx) — [components/dashboard/TaskCard.tsx](components/dashboard/TaskCard.tsx)
- [`TaskColumn`](components/dashboard/TaskColumn.tsx) — [components/dashboard/TaskColumn.tsx](components/dashboard/TaskColumn.tsx)
- [`UpcomingDeadlines`](components/dashboard/UpcomingDeadlines.tsx) — [components/dashboard/UpcomingDeadlines.tsx](components/dashboard/UpcomingDeadlines.tsx)
- [`Calendar`](components/dashboard/Calendar.tsx) — [components/dashboard/Calendar.tsx](components/dashboard/Calendar.tsx)
- [`Task` / `User` / mock data](data/mockData.ts) — [data/mockData.ts](data/mockData.ts)

Features
- Responsive dashboard with columns for To Do, In Progress and Completed.
- Create new tasks via a modal: [`CreateTaskModal`](components/modals/CreateTaskModal.tsx).
- Visual task cards with assignees and category color indicators: [`TaskCard`](components/dashboard/TaskCard.tsx).
- Compact calendar view for upcoming deadlines: [`Calendar`](components/dashboard/Calendar.tsx).
- Simple mock backend via [data/mockData.ts](data/mockData.ts).

Tech stack
- React 19 (JSX)  
- Vite for dev server and build — see [vite.config.ts](vite.config.ts)
- TypeScript configuration in [tsconfig.json](tsconfig.json)
- Tailwind CSS via CDN in [index.html](index.html)

Getting started

Prerequisites
- Node.js (recommended stable LTS)

Run locally
```sh
# Install
npm install

# Run dev server (Vite)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```
