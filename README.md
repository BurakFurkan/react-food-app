# React Food App

A modern, production-grade food ordering & discovery web application.

**Live:** https://react-food-app-burakfurkan.vercel.app/

---

## Tech Stack

- **Next.js 14** — App Router
- **React 18** — TypeScript strict mode
- **Tailwind CSS** — utility-first styling
- **Framer Motion** — animations & transitions
- **Zustand** — state management
- **React Hook Form + Zod** — form validation
- **Lucide React** — icons

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/BurakFurkan/react-food-app.git
cd react-food-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
# TheMealDB (free, no key required for public endpoints)
NEXT_PUBLIC_MEALDB_API=https://www.themealdb.com/api/json/v1/1
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type check |

---

## Project Structure

```
src/
├── app/          # Next.js App Router pages
├── components/   # Reusable UI components
├── store/        # Zustand state stores
├── types/        # TypeScript types
├── hooks/        # Custom React hooks
└── lib/          # Utilities & config
```
