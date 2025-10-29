## Project Overview

### hiringers (Hiring Management System)

- LIVE demo (User): [https://hiringers.vercel.app/](https://hiringers.vercel.app/)
- LIVE demo (Admin): [https://hiringers.vercel.app/admin](https://hiringers.vercel.app/admin)

### Architecture

This project follows **Clean Architecture** principles with clear separation of concerns:

```
src/
├── components/          # Reusable UI components
│   ├── ui/              # Base UI components (shadcn/ui)
│   ├── common/          # Shared business components
│   └── layouts/         # Layout components
├── constants/           # Application constants
├── domains/             # Domain entities and types
├── drizzle/             # Drizzle ORM generated files (BE only)
├── features/            # Feature-based modules
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries and helpers
├── server/             # API route handlers and server-side code (BE only)
├── types/              # Global type definitions
├── useCases/           # Business logic and use cases
```

### 🛠 Tech Stack (Full in package.json)

#### Core Technologies

- **NextJS 16** - Frontend framework
- **TypeScript** - Type safety and developer experience
- **TailwindCSS** - Utility-first CSS framework
- **Mediapipe TaskVision** - Hand Gesture Recognition

#### State Management & Data Fetching

- **Axios** - HTTP client for API requests
- **TanStack React Query** - Server state management and caching
- **Zustand** - Client-side state management
- **React Hook Form** - Form state management
- **Zod** - Schema validation

#### UI Components & Styling

- **shadcn/ui** - Barebone component library
- **Radix UI** - Accessible UI primitives
- **Tanstack Table** - Data table components

#### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting

#### Backend (For Mock API)

- **Hono** - Backend framework for building APIs
- **Drizzle ORM** - ORM
- **Supabase** - Database and Storage

<hr/>

### Local Installation

#### Prerequisites

- Node.js
- pnpm (recommended) or npm

#### Setup Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd hiringers
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Environment Configuration**

   ```bash
   cp .env.example .env
   ```

   Configure your environment variables in `.env`

4. **Start development server**

   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
