# Git Conventions

## Branch Naming

Use the following naming convention:

```
<type>/<short-description>
```

Examples:

```
feat/landing-page
feat/documentation-mdx
feat/demo-console
fix/sidebar-scroll
refactor/documentation-layout
docs/update-readme
chore/update-dependencies
```

Available branch types:

- `feat`
- `fix`
- `refactor`
- `docs`
- `style`
- `test`
- `chore`
- `hotfix`

---

## Commit Messages

Follow **Conventional Commits**:

```
<type>(<scope>): <short summary in imperative mood>

[optional body — explain WHY, not WHAT]
```

Examples:

```bash
# ✅ Good
feat(documentation): add MDX callout component
feat(demo-console): implement approval queue
fix(layout): prevent sidebar overflow
refactor(shared): split typography components
docs(readme): update project structure

# ❌ Bad
fixed bug
update stuff
WIP
```

**Scope** should represent the related feature or shared module, for example:

- `landing`
- `documentation`
- `demo-console`
- `dashboard`
- `shared`
- `layout`
- `ui`
- `mdx`

---

## Pull Request Rules

- Create a Pull Request for every change. Never push directly to `main`.
- Every Pull Request must be reviewed by at least **one team member** before merging.
- Resolve all review conversations before merging.
- Ensure the project builds successfully and passes lint checks before requesting a review.
- Use **Squash and Merge** to keep commit history clean.

---

## General Rules

- One logical change per commit. Do not bundle unrelated changes.
- Keep business logic inside the corresponding feature module.
- Prefer reusable components from `src/shared` before creating new ones.
- Follow the project architecture defined in `AGENTS.md` and `.agents/docs/architecture.md`.
- Do not commit:
  - `.env`
  - `node_modules/`
  - `.next/`
  - build artifacts
  - IDE configuration (`.vscode/`, `.idea/`)
- AI-assisted code must always be reviewed and understood before committing.