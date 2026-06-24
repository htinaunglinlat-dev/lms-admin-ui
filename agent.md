# LMS Admin UI — Project Guide

## Overview

LMS Admin UI is a Next.js-based admin dashboard for managing a Learning Management System (LMS). It provides CRUD interfaces for courses, users, categories, blogs, and other platform resources.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 + `tw-animate-css` |
| UI Library | shadcn/ui (Radix UI primitives) |
| Icons | lucide-react |
| Font | Geist (via next/font) |
| State (Server) | TanStack React Query v5 |
| State (Client) | Zustand v5 |
| HTTP Client | Axios (with interceptors) |
| Forms | React Hook Form + Zod validation |
| Notifications | sonner |
| Date Handling | date-fns + react-day-picker |
| Animation | framer-motion |
| Theme | next-themes |

---

## Project Structure

```
lms-admin-ui/
├── api/                    # Axios API functions (one file per domain)
│   ├── axiosInstance.ts    # Axios instance with token refresh interceptor
│   ├── auth.ts
│   ├── courses.ts
│   ├── users.ts
│   ├── categories.ts
│   ├── blogs.ts
│   └── profile.ts
│
├── app/                    # Next.js App Router pages
│   ├── globals.css         # Global styles + Tailwind imports
│   ├── layout.tsx          # Root layout (fonts, providers)
│   ├── page.tsx            # Home / redirect
│   ├── providers.tsx       # Client providers (QueryClient, Theme, etc.)
│   │
│   ├── (auth)/             # Public auth routes
│   │   ├── layout.tsx
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   │
│   └── (root)/             # Authenticated routes (with sidebar)
│       ├── layout.tsx      # Wraps with AppLayoutWrapper
│       ├── (dashboard)/page.tsx
│       ├── (courses)/
│       │   └── courses/
│       │       ├── page.tsx              # List
│       │       ├── create/page.tsx       # Create
│       │       ├── [id]/page.tsx         # Detail
│       │       ├── [id]/edit/page.tsx    # Edit
│       │       ├── layout.tsx            # (optional) sub-layout
│       │       └── (components)/         # Local page components
│       │           ├── CourseForm.tsx
│       │           ├── CourseCard.tsx
│       │           └── table/
│       │               ├── Columns.tsx
│       │               └── CourseListTable.tsx
│       ├── (users)/users/      # Same pattern
│       ├── (blogs)/blogs/      # Same pattern
│       ├── (categories)/categories/
│       └── (settings)/settings/
│
├── components/
│   ├── ui/                # shadcn/ui primitives (button, dialog, table, etc.)
│   ├── layout/            # AppLayoutWrapper, AppSideBar, AppTopBar, PageHeading
│   ├── custom/            # Shared custom components
│   │   ├── ActionButton.tsx
│   │   ├── DateRange.tsx
│   │   ├── loader.tsx
│   │   └── table/
│   │       ├── DataTable.tsx        # Generic data table wrapper
│   │       ├── PaginationTable.tsx  # Pagination component
│   │       └── Sorting.tsx          # Sort indicator
│   └── form/              # Form-specific shared components
│
├── config/
│   └── config.ts          # App configuration (API base URL from env)
│
├── hooks/                 # TanStack Query hooks (one per domain)
│   ├── useAuth.ts         # Auth session hydration
│   ├── useLogin.ts        # Login mutation
│   ├── useLogout.ts
│   ├── useMe.ts           # Fetch current user
│   ├── useCourses.ts      # Course queries + mutations
│   ├── useUsers.ts
│   ├── useCategories.ts
│   ├── useBlogs.ts
│   ├── useProfile.ts
│   └── use-mobile.ts      # shadcn sidebar helper
│
├── lib/
│   ├── utils.ts           # cn(), date helpers, server error handling
│   ├── utils/
│   │   ├── formatUser.ts
│   │   └── searchParamsHandler.ts
│   └── prisma.ts          # (if using server-side DB)
│
├── store/                  # Zustand stores
│   ├── useAuthStore.ts    # Auth state (user, isAuthenticated)
│   └── useUIStore.ts      # UI state (sidebar collapsed, etc.)
│
├── types/                  # Global TypeScript declarations
│   ├── commonType.d.ts    # QueryType, BaseResponse<T>
│   ├── user.d.ts
│   ├── course.d.ts
│   ├── category.d.ts
│   ├── blog.d.ts
│   └── ...
│
├── validations/            # Zod schemas
│   ├── auth.schema.ts
│   ├── course.schema.ts
│   ├── user.schema.ts
│   ├── category.schema.ts
│   ├── blog.schema.ts
│   └── profile.schema.ts
│
├── public/                 # Static assets
│
├── .agent                  # API endpoint documentation (markdown/json)
├── agent.md                # This file — project guide
├── components.json         # shadcn/ui config
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── pnpm-lock.yaml
```

---

## Route Structure Convention

Each feature domain follows a consistent pattern inside the `(root)` route group:

```
(root)/(domain)/resource/
├── page.tsx                  # List page (uses DataTable + filters)
├── create/page.tsx           # Create form page
├── [id]/page.tsx             # Detail view page
├── [id]/edit/page.tsx        # Edit form page
├── layout.tsx                # (optional) sub-layout
└── (components)/             # Local components
    ├── ResourceForm.tsx
    ├── ResourceCard.tsx
    └── table/
        ├── Columns.tsx
        └── ResourceListTable.tsx
```

- Pages under `(auth)` are public (no sidebar).
- Pages under `(root)` require authentication and render inside the sidebar layout.
- Route groups (parentheses) are used for logical grouping without affecting the URL path.

---

## Data Flow Pattern

```
1. types/*.d.ts        → Define API response interfaces (global `declare interface`)
2. validations/*.ts    → Define Zod schemas + inferred form types
3. api/*.ts            → Axios functions calling backend endpoints
4. hooks/*.ts          → TanStack Query wrappers (useQuery / useMutation)
5. app/**/page.tsx     → Page component uses hooks, passes data to UI components
```

### API Layer (`api/`)
- Each function returns `Promise<BaseResponse<T>>`.
- Use `axiosInstance` (with interceptors) for all requests.
- Pass `params` to `axiosInstance.get()` for query parameters.
- For file uploads, set `headers: { "Content-Type": "multipart/form-data" }`.

### Hooks Layer (`hooks/`)
- Export a single hook object per domain (e.g., `useCourses()` returns all course-related queries/mutations).
- Use `useQuery` for fetches, `useMutation` for writes.
- Invalidate related query keys on mutation success.
- Mutations accept an object `{ id, data }` pattern for updates.

### Forms
- Use React Hook Form with `@hookform/resolvers/zod`.
- Apply server errors via the `applyServerErrors` helper from `lib/utils.ts`.
- File inputs use `handleImageCompress` for client-side compression.

---

## Type Declarations

All global types use `declare interface` (no `export`) in `.d.ts` files under `types/`:

```typescript
// types/commonType.d.ts
declare interface QueryType {
  search?: string;
  page?: number;
  per_page?: number;
  start_date?: string;
  end_date?: string;
  sort_by?: string;
  sort_order?: string;
}

declare interface BaseResponse<T> {
  message: string;
  data: T;
  total: number;
}
```

Resource types are declared similarly in their respective files.

---

## State Management

### Server State (TanStack Query)
- `QueryClient` initialized in `app/providers.tsx`.
- Query keys follow the pattern: `[resource]` for lists, `[resource, id]` for details.
- Mutations invalidate list queries on success.

### Client State (Zustand)
- `useAuthStore` — persisted auth state (user, isAuthenticated, login, logout).
- `useUIStore` — UI preferences (sidebar collapsed, etc.).
- Zustand stores use the `persist` middleware for auth (localStorage).

---

## Axios Interceptors

The `axiosInstance` includes:
1. **Request interceptor** — Attaches cookies from `next/headers` on the server side.
2. **Response interceptor** — Handles 401 errors by attempting a token refresh via `/v1/admin/refresh`. Queues concurrent requests during refresh. On refresh failure, redirects to `/login`.

---

## Authentication Flow

1. `app/providers.tsx` wraps children with `QueryClientProvider`.
2. `AppLayoutWrapper` calls `useAuth()` hook on mount.
3. `useAuth()` fetches `/v1/admin/me` via `useMe()` hook.
4. On success, stores user in `useAuthStore`.
5. On error (401), clears auth store.
6. Login page uses `useLogin()` mutation → stores user → redirects to `/`.

---

## Styling Conventions

- Use `cn()` from `lib/utils.ts` for conditional class merging.
- Follow Tailwind CSS v4 conventions.
- shadcn/ui components use Radix Vega style (configured in `components.json`).
- Consistent spacing: `gap-4`, `px-5`, `py-[17px]` for toolbar areas.
- Page wrapper: `flex flex-col gap-4 h-full`.
- Loading state: `<div className="w-full h-screen flex items-center justify-center">loading...</div>`.
- Error state: `<div>Error: {JSON.stringify(error)}</div>`.

---

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_BASE_URL=https://api.example.com/api
# or
NEXT_PUBLIC_PROTOTYPE_API_BASE_URL=https://prototype-api.example.com/api
```

The base URL is read in `config/config.ts`.

---

## Available Scripts

```bash
pnpm dev        # Start development server
pnpm build      # Production build
pnpm start      # Start production server
pnpm lint       # Run ESLint
```

---

## Adding a New Feature (Checklist)

1. [ ] Define types in `types/<resource>.d.ts`
2. [ ] Create Zod schema in `validations/<resource>.schema.ts`
3. [ ] Create API functions in `api/<resource>.ts`
4. [ ] Create TanStack Query hooks in `hooks/use<Resource>.ts`
5. [ ] Create page components in `app/(root)/(<domain>)/<resource>/`
6. [ ] Add sidebar link in `components/layout/AppSideBar.tsx`
7. [ ] Wire up navigation links in list/edit/create pages

---

## API Documentation

Backend API endpoint specs are documented in `.agent` at the project root. Each entry includes HTTP method, path, query parameters, request body shape, and response schemas (including error responses).

```
- /api/v1/admin/courses - GET
    - Query Parameters: search, category_id, level, status, page, per_page, sort_by, sort_order, start_date, end_date
    - Responses: 200 (paginated list), 500

- /api/v1/admin/courses - POST
    - Request Body: title (required), description, thumbnail (file), duration, level, original_price, discount_price, status, category_ids
    - Responses: 201, 422, 500
```

---

## Notes

- **No `export default` for global types** — use `declare interface` in `.d.ts` files.
- **No barrel exports** — import directly from the file.
- **Local components** live in `(components)/` directory within the route folder, not in the global `components/` directory.
- **shadcn/ui components** are added via `pnpm dlx shadcn@latest add <component>`.
- **Framer Motion** is available for page transitions and animations.
