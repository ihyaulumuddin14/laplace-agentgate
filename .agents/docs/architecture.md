# Architecture & Folder Structure

## Structure

```text
src/
├── app/                          # Next.js App Router — routing and page composition only
├── content/                      # Static MDX documentation
├── features/                     # Business domain modules
│   └── <feature>/
│       ├── services/             # Feature-specific API calls
│       ├── hooks/                # Feature-specific hooks
│       ├── types/                # Feature-specific types
│       ├── schema/               # Feature-specific Zod schemas
│       ├── styles/               # Feature-specific styling
│       └── components/
│           ├── sections/         # Full page sections
│           └── misc/             # Small feature-specific components
├── shared/
│   ├── components/
│   │   ├── ui/                  # Generic UI primitives (Button, Input, Dialog, etc.)
│   │   ├── layout/              # Navbar, Sidebar, Footer, etc.
│   │   ├── mdx/                 # MDX components (Callout, Tabs, Steps, CodeBlock, etc.)
│   │   ├── typography/          # H1, H2, Paragraph, InlineCode, etc.
│   │   └── animations/          # Shared animation components
│   ├── providers/               # Global providers
│   ├── store/                   # Global Zustand stores
│   ├── hooks/                   # Global reusable hooks
│   ├── lib/                     # apiFetch, utilities, helpers, formatters
│   ├── constants/               # Global constants
│   ├── types/                   # Global TypeScript types
│   ├── styles/                  # Global styling
│   └── schema/                  # Global Zod schemas
├── mdx-components.tsx           # MDX component registry
```

---

## Decision Tree — Where Does This File Go?

```text
Is this code used by more than one feature?
│
├── YES → shared/
│         ├── Generic UI component?        → shared/components/ui/
│         ├── Layout component?            → shared/components/layout/
│         ├── MDX component?               → shared/components/mdx/
│         ├── Typography component?        → shared/components/typography/
│         ├── Animation component?         → shared/components/animations/
│         ├── Hook (stateful logic)?       → shared/hooks/
│         ├── Global state?                → shared/store/
│         ├── Provider?                    → shared/providers/
│         ├── Utility / apiFetch?          → shared/lib/
│         ├── Constant?                    → shared/constants/
│         ├── TypeScript type?             → shared/types/
│         └── Zod schema?                  → shared/schema/
│
└── NO  → features/<name>/
          ├── API call?                    → services/
          ├── Hook?                        → hooks/
          ├── TypeScript type?             → types/
          ├── Zod schema?                  → schema/
          ├── Styling?                     → styles/
          └── Component?
              ├── Full page section?       → components/sections/
              └── Small component?         → components/misc/
```

---

## MDX Rules

- Store all documentation pages inside `src/content/docs`.
- Register all Markdown elements and custom React components through `src/mdx-components.tsx`.
- Shared documentation components (Callout, Tabs, Steps, CodeBlock, etc.) belong in `shared/components/mdx/`.
- Typography used by Markdown (`h1`, `h2`, `p`, `blockquote`, etc.) belongs in `shared/components/typography/`.
- Do not place business logic inside MDX files.

---

## Hard Rules

- **Never** import from `features/A` into `features/B`. If multiple features need the same code, extract it into `shared/`.
- **Never** place business logic inside `app/`. Pages should only compose components and perform server-side data loading when necessary.
- Keep `page.tsx` as a **Server Component** whenever possible. If a component requires `"use client"`, move it into `features/` or `shared/components/`.
- Feature-specific API calls belong inside the corresponding `features/<name>/services/`.
- Shared utilities such as `apiFetch`, helpers, and formatters belong in `shared/lib/`.
- Store all documentation content in `src/content/`; do not mix documentation with route files.
- **Never** create a new top-level folder under `src/` without team discussion.
- Component filenames use **PascalCase**. Other files and folders use **camelCase**.
- Barrel files (`index.ts`) are allowed inside a folder but must not re-export code across different features.