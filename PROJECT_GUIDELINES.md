# Project Guidelines

These guidelines define conventions for structure, code quality, security, and workflow across this portfolio project (frontend + backend). Use this as the single source of truth.

## 1) Naming Conventions

- Folders: lowercase, hyphen-separated
  - Examples: `user-controller`, `project-model`
- Files
  - React components: PascalCase
    - Example: `ProjectCard.jsx`
  - Backend routes, controllers, utils: camelCase
    - Examples: `authRoutes.js`, `dbConnect.js`
  - Config files: lowercase
    - Examples: `tailwind.config.js`, `.env`

## 2) Folder Structure

### Backend
```
src/
  config/       # DB connection, environment setup
  controllers/  # Logic for each route
  models/       # MongoDB schemas
  routes/       # API route definitions
  middleware/   # Auth & error handling
  utils/        # Helper functions
  app.js        # Express app setup
server.js       # App entry point
```

### Frontend
```
src/
  components/   # Reusable UI parts
  pages/        # Next.js pages
  layouts/      # Page layouts
  styles/       # Tailwind/global CSS
  utils/        # API helpers, constants
  hooks/        # Custom hooks
```

## 3) Git Commit Practices (Conventional Commits)

Why:
- Communicates intent clearly
- Enables automatic changelogs and tooling
- Keeps history clean and scannable

Structure:
- Format: `<type>(optional-scope): short description`
  - type: kind of change
  - scope (optional): section of project affected
  - description: imperative, present tense

Common types:

| type     | meaning                                      | example                                       |
|----------|----------------------------------------------|-----------------------------------------------|
| feat     | New feature                                   | feat(auth): add JWT login endpoint            |
| fix      | Bug fix                                       | fix(project): correct image URL bug           |
| refactor | Code changes that don’t alter behavior        | refactor(api): move DB connection to config   |
| docs     | Documentation only                            | docs(readme): add API setup instructions      |
| style    | Formatting, no logic change                   | style: format files with Prettier             |
| test     | Add/modify tests                              | test(auth): add unit tests for JWT middleware |
| chore    | Maintenance (deps, build, config)             | chore(deps): update axios to v1.5             |
| perf     | Performance improvement                       | perf(projects): optimize image loading        |

Rules:
- One logical change per commit
- Branch naming:
  - `feature/<short-topic>` (e.g., `feature/auth-login`)
  - `bugfix/<short-topic>` (e.g., `bugfix/project-images`)

## 4) Security Practices

### Backend
- Store all secrets in `.env` and never commit it
- Use `helmet` for HTTP security headers
- Use `express-rate-limit` for sensitive routes
- Hash passwords with `bcrypt` (≥ 10 salt rounds)
- Validate all user input (`express-validator` or `joi`)
- Hide stack traces in production error messages
- Prefer JWT in HTTP-only cookies when possible

### Frontend
- Escape dynamic content
- Use HTTPS in production
- Avoid storing sensitive data in `localStorage`

## 5) Code Quality

- Install and configure ESLint + Prettier
- Keep functions under ~50 lines when practical
- Reuse components and utilities
- Comment “why”, not “what”
- Use constants for repeated values

## 6) Dependency Management

- Remove unused packages
- Run `npm audit` regularly
- Pin versions in `package.json` for stability

## 7) Deployment

- Use environment variables on hosting platforms
- Enable HTTPS
- Don’t log sensitive info in production

---

Tips for Markdown (.md):
- `#` creates headings, `-` creates bullet lists, backticks make `inline code`, and triple backticks make code blocks.
- VS Code: Toggle preview with Ctrl+Shift+V; split preview with Ctrl+K then V.




























