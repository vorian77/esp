## Essential User Rules for AppFactory + Cursor

### 1) Read this first: AppFactory-Overview

- Purpose, scope, audience, and product positioning live in `src/.cursorContext/AppFactory-Overview.md`.
- Use it to align changes with business goals, target users, and core value props.

### 2) Project context

- AppFactory: Low-code PaaS for enterprise data management (SvelteKit + TypeScript + EdgeDB/Gel).
- Architecture: Multi-tenant (orgs/systems/users), dynamic DataObjs, form/grid framework, strict typing.
- DB: EdgeQL schema in `src/db/gel`, migrations managed via Gel; generated `edgeql-js` client is in `src/db/gel/edgeql-js`.

### 3) Asking the AI effectively

- Provide context: file path(s), line numbers/ranges, goal, expected behavior.
- Be specific: “Add field X to type Y and expose in form Z.”
- Include inputs/outputs: EdgeQL, payloads, props, example interactions.
- Prefer minimal edits: request focused diffs that match existing patterns.

### 4) Code style (TypeScript/Svelte)

- Types first: strict mode; explicit types for exported APIs and public utilities.
- Import order: SvelteKit → external → internal aliases (`$comps`, `$server`, `$utils`, `$db`, `$routes`, `$assets`).
- Svelte 5: use `$props`, `$state`, `$derived` consistently; avoid hidden side effects.
- State: keep local state minimal; derive where possible; avoid deep nesting.
- Errors: use `MethodResult` for API and query calls; fail fast with clear messages.
- Naming: PascalCase (components/types), camelCase (vars/functions); meaningful, descriptive names.

### 5) Styling

- Tailwind v4 + Skeleton: prefer utilities and existing presets (e.g., `preset-filled-primary-500`).
- Component-scoped CSS only if utilities are insufficient; keep styles minimal and local.

### 6) Paths & organization

- Components: `src/lib/components/**`
- Server: `src/lib/server/**`
- Utils: `src/lib/utils/**`
- Routes: `src/routes/**`
- DB: `src/db/gel/**` (schema, migrations, `edgeql-js`)
- Use path aliases: `$assets`, `$comps`, `$server`, `$utils`, `$routes`, `$db`, `$enhance`.

### 7) Database (EdgeQL/Gel)

- Base types: extend `sys_core::SysObj` (entities) or `sys_user::Mgmt` (audited records).
- Codes/enums: use `sys_core::SysCode`/`SysCodeType`; avoid ad‑hoc strings.
- Relations: mark `multi`/`required`; use `assert_single` for reverse links and computed backlinks.
- Triggers: consistent naming; minimize cascades; reuse existing delete guards seen in `sys_core.gel`/`sys_user.gel`.
- Constraints: add `exclusive` where uniqueness is required (match existing constraints patterns).
- Queries: prefer `clientQueryExpr` and DB helper functions (`sys_core.getCode*`, `sys_user.get*`, `getSystemPrime`, etc.).

### 8) API patterns

- Server routes (`+server.ts`): return `MethodResult`; validate inputs early; sanitize outputs.
- Client calls: use `apiFetchFunction` and `clientQueryExpr` with a clear context label string.
- Follow existing endpoints under `src/routes/api/**` for conventions and error shapes.

### 9) Components (forms/grids)

- Reuse form/grid components and DataObj patterns; don’t reimplement generic UI.
- Align props/events with existing components in `src/lib/components/**`.
- Always show loading and error states; do not swallow errors.

### 10) Security & tenancy

- Always set/propagate `ownerSys`/`ownerOrg` where applicable; respect multi-tenant boundaries.
- Use existing authz patterns and action checks; never bypass server validation in client code.
- Rely on `Mgmt` for audit fields (`createdBy/modifiedBy/At`); do not reimplement auditing.

### 11) Tooling & quality gates

- Format: `pnpm format`.
- Type-check: `pnpm check`.
- Build locally: `pnpm build` for significant changes.
- Keep lints and type errors at zero where practical before PR.

### 12) PR expectations

- Explain what/why/scope/impact; reference relevant Overview sections when user-facing.
- Keep diffs small; separate schema migrations when feasible; include migration notes.
- Provide test/manual validation steps and rollback guidance.

### 13) Safe changes with AI

- Ask for proposed edits first; review the diff before applying.
- Request mirroring of an existing, similar pattern/file when adding new features.
- Forbid unrelated edits in the same change; keep changes minimal and targeted.

Additional persistent context:

- uses these files for all relevant context
- Overview: `.context/AppFactory-Overview.md`
- Tech stack: `.context/AppFactory-Tech Stack.md`
