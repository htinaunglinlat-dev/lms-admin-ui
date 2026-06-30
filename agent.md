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

## File Naming Conventions

To align with Next.js standards, the project strictly uses **lowercase and kebab-case** for ALL files and directory names (excluding standard routing files like `layout.tsx`, `page.tsx`, etc.). 

- **No camelCase or PascalCase filenames are allowed.**
- **Hooks**: Must start with `use-` and use kebab-case (e.g. `use-auth.ts`, `use-course.ts`, `use-mobile.ts`).
- **Components**: Must use lowercase and kebab-case (e.g. `tooltip-button.tsx`, `discount-type-badge.tsx`, `edit-course-form.tsx`).
- **API Files**: Must use kebab-case (e.g. `axios-instance.ts`, `student.ts`, `enrollment.ts`).
- **Stores**: Must use kebab-case (e.g. `use-auth-store.ts`).
- **Types**: Must use kebab-case (e.g. `query-type.d.ts`, `response-model.d.ts`).
- **Validations**: Must use kebab-case (e.g. `course.schema.ts`).

---

## Project Structure

```
lms-admin-ui/
├── api/                    # Axios API functions (one file per domain)
│   ├── axios-instance.ts   # Axios instance with token refresh interceptor
│   ├── auth.ts
│   ├── course.ts
│   ├── student.ts
│   ├── payment.ts
│   ├── blog.ts
│   ├── enrollment.ts
│   ├── upload.ts
│   ├── order.ts
│   ├── section.ts
│   ├── tag.ts
│   ├── lesson.ts
│   ├── admin.ts
│   ├── category.ts
│   ├── product.ts
│   └── coupon.ts
│
├── app/                    # Next.js App Router pages
│   ├── globals.css         # Global styles + Tailwind CSS v4 imports
│   ├── layout.tsx          # Root layout
│   ├── provider.tsx        # Client providers (QueryClient, Theme, etc.)
│   │
│   ├── (auth)/             # Public auth routes (e.g. login)
│   │   ├── login/page.tsx
│   │   └── ...
│   │
│   └── (root)/             # Authenticated routes (with sidebar)
│       ├── layout.tsx      # Sidebar/Header layout wrapper
│       ├── (dashboard)/    # Dashboard home
│       │   ├── page.tsx
│       │   └── layout.tsx
│       ├── (courses)/courses/     # Courses CRUD
│       ├── (payments)/payments/   # Payments CRUD
│       ├── (tags)/tags/           # Tags CRUD
│       ├── (enrollments)/enrollments/ # Enrollments CRUD
│       ├── (students)/students/   # Students CRUD
│       ├── (categories)/categories/ # Categories CRUD
│       ├── (blogs)/blogs/         # Blogs CRUD
│       ├── (orders)/orders/       # Orders CRUD
│       ├── (admins)/admins/       # Admins CRUD
│       ├── (products)/products/   # Products CRUD
│       └── (coupons)/coupons/     # Coupons CRUD
│
├── components/
│   ├── ui/                # shadcn/ui primitives (button, dialog, table, etc.)
│   ├── layout/            # Common layout components (page-heading, app-layout-wrapper)
│   ├── sitebar/           # Sidebar navigation wrapper, header, etc.
│   ├── custom/            # Shared custom components
│   │   ├── badge/         # Status, active, published, etc. badges
│   │   ├── tiptap/        # Text editor integration
│   │   ├── table-action-menu/ # Action menu component
│   │   ├── elements/      # Custom fields (tooltip-button, select components, etc.)
│   │   ├── table/         # Generic DataTable, sortable header, etc.
│   │   └── card/          # Custom profile, payment, order cards
│   └── provider/          # Context providers (theme-provider)
│
├── config/
│   └── config.ts          # App configuration (API URL, environment config)
│
├── hooks/                 # React Query & utility hooks (kebab-case)
│   ├── use-auth.ts
│   ├── use-course.ts
│   ├── use-category.ts
│   ├── use-blog.ts
│   ├── use-mobile.ts
│   └── ...
│
├── lib/
│   ├── date.ts
│   ├── utils.ts           # Class merger cn()
│   ├── currency.ts
│   └── error.ts           # API error handlers
│
├── store/                 # Zustand stores (kebab-case)
│   └── use-auth-store.ts  # Persisted authentication state
│
├── types/                 # TypeScript interfaces (kebab-case)
│   ├── query-type.d.ts
│   ├── response-model.d.ts
│   └── ...
│
└── validations/           # Zod schemas (kebab-case)
    ├── course.schema.ts
    ├── auth.schema.ts
    └── ...
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
└── (components)/             # Local page components (kebab-case)
    ├── resource-form.tsx
    ├── resource-card.tsx
    └── table/
        ├── columns.tsx
        └── resource-list-table.tsx
```

- Pages under `(auth)` are public (no sidebar).
- Pages under `(root)` require authentication and render inside the sidebar layout.
- Route groups (parentheses) are used for logical grouping without affecting the URL path.

---

## Data Flow Pattern

```
1. types/*.d.ts        → Define API response interfaces (global exported interfaces)
2. validations/*.ts    → Define Zod schemas + inferred form types
3. api/*.ts            → Axios functions calling backend endpoints
4. hooks/*.ts          → TanStack Query wrappers (useQuery / useMutation)
5. app/**/page.tsx     → Page component uses hooks, passes data to UI components
```

### API Layer (`api/`)
- Each function returns `Promise<BaseResponse<T>>`.
- Use `axiosInstance` (with interceptors) imported from `@/api/axios-instance` for all requests.
- Pass `params` to `axiosInstance.get()` for query parameters.
- For file uploads, set `headers: { "Content-Type": "multipart/form-data" }`.

### Hooks Layer (`hooks/`)
- Export hooks for queries and mutations (e.g., in `hooks/use-course.ts`).
- Use `useQuery` for fetches, `useMutation` for writes.
- Invalidate related query keys on mutation success.
- Mutations accept an object `{ id, data }` pattern for updates.

### Forms
- Use React Hook Form with `@hookform/resolvers/zod`.
- Apply server errors via the `applyServerErrors` helper from `lib/utils.ts`.

---

## Type Declarations

Global types in the `types/` folder MUST use `export` for their interfaces and types rather than `declare interface` or `declare namespace` to maintain consistency across the codebase.

### Example: Query parameters definition (`types/query-type.d.ts`)

```typescript
export interface QueryType<T> {
  page?: number;
  limit?: number;
  search?: string;
  sort_direction?: SortDirectionEnum;
  sort_by?: T;
  start_date?: string;
  end_date?: string;
}

export type SortDirectionEnum = 'asc' | 'desc';

// Course-specific query parameters
export interface CourseQueryType extends QueryType<CourseSortableField> {
  level?: CourseLevelEnum;
  is_published?: boolean;
}

export type CourseLevelEnum = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
export type CourseSortableField = "id" | "title" | "slug" | "level" | "language" | "is_published" | "sort_order" | "created_at" | "updated_at";
```

### Example: API Response wrapping (`types/response-model.d.ts`)

```typescript
export interface BaseResponse<T> {
  status_code: number;
  message: string;
  data: T;
}

export interface PaginationReponse<T> extends BaseResponse<T> {
  meta: MetaData;
}

export interface MetaData {
  total: number;
  page: number;
  limit: number;
  total_page: number;
}

export interface ErrorResponse {
  status_code: number;
  message: string[];
  error: string;
  timestamp: string;
  path: string;
}
```

---

## State Management

### Server State (TanStack Query)
- `QueryClient` initialized in `app/provider.tsx`.
- Query keys follow the pattern: `[resource]` for lists, `[resource, id]` for details.
- Mutations invalidate list queries on success.

### Client State (Zustand)
- `useAuthStore` — persisted auth state defined in `store/use-auth-store.ts` (user, isAuthenticated, login, logout, setAccessToken).
- Zustand stores use the `persist` middleware for auth (localStorage).

---

## Axios Interceptors

The `axios-instance.ts` includes:
1. **Request interceptor** — Attaches cookies / Bearer token from the auth store.
2. **Response interceptor** — Handles 401 errors by attempting a token refresh via `/auth/admin/refresh`. On refresh failure, logs out and redirects to `/login`.

---

## Authentication Flow

1. `app/provider.tsx` wraps children with `QueryClientProvider`.
2. `AppLayoutWrapper` (in `components/layout/app-layout-wrapper.tsx`) checks authentication.
3. Authenticated routes fetch `/auth/admin/me` on layout mount.
4. On success, stores user in `useAuthStore`.
5. On error (401), clears auth store.
6. Login page uses a login mutation → stores user and tokens → redirects.

---

## Styling Conventions

- Use `cn()` from `lib/utils.ts` for conditional class merging.
- Follow Tailwind CSS v4 conventions.
- shadcn/ui components use Radix primitives (configured in `components.json`).
- Page wrapper: `flex flex-col gap-4 h-full`.

---

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_BASE_URL=https://api.example.com/api
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

1. [ ] Define types in `types/<resource>.d.ts` (using `export interface` pattern)
2. [ ] Create Zod schema in `validations/<resource>.schema.ts`
3. [ ] Create API functions in `api/<resource>.ts`
4. [ ] Create TanStack Query hooks in `hooks/use-<resource>.ts` (kebab-case!)
5. [ ] Create page components in `app/(root)/(<domain>)/<resource>/`
6. [ ] Add sidebar link in `components/sitebar/app-sidebar.tsx`
7. [ ] Wire up navigation links in list/edit/create pages

---

## API Documentation

Backend API endpoint specs are documented in `.agent` at the project root. Each entry includes HTTP method, path, query parameters, request body shape, and response schemas.

---

## Notes

- **No `export default` for global types** — use `export interface` or `export type` in `.d.ts` files under `types/`.
- **No barrel exports** — import directly from the file.
- **Local components** live in `(components)/` directory within the route folder, not in the global `components/` directory.
- **shadcn/ui components** are added via `pnpm dlx shadcn@latest add <component>`.
- **Framer Motion** is available for page transitions and animations.
- **File casing**: Filenames must be lowercase and kebab-case only.
