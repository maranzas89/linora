# CLAUDE.md

This file provides guidance to Claude Code when working in this repository.

## Commands

```bash
npm run dev      # Start dev server at localhost:3001 (webpack mode)
npm run build    # Production build
npm run lint     # ESLint
```

No test suite is configured. Verify changes by running `npm run build`.

## Stack

- **Framework**: Next.js 16 (App Router, Webpack bundler)
- **Auth & DB**: Supabase (auth, PostgreSQL, RLS)
- **AI**: Claude API via `@anthropic-ai/sdk` — used in `src/lib/claude.ts`
- **Styling**: Tailwind CSS v4 (no tailwind.config; theme via `@theme inline` in `globals.css`)
- **Design System**: `wens-liquid-glass-design-system` — linked locally via `file:` + symlink

## Architecture

```
src/
  app/
    page.tsx              # Landing page
    login/page.tsx        # Auth (client component)
    signup/page.tsx       # Auth (client component)
    dashboard/page.tsx    # Analysis list (server component)
    dashboard/new/page.tsx # New analysis form (client component)
    results/[id]/page.tsx # Analysis detail (server component)
    api/analyze/route.ts  # POST — calls Claude API, stores result in Supabase
  components/
    score-badge.tsx       # Client wrapper for GlassBadge (needed for server component pages)
    glass-modal.tsx       # Custom modal using design system tokens
    logout-button.tsx     # Auth logout
  lib/
    claude.ts             # Claude API wrapper (analyzeJobFit)
    queries.ts            # Supabase queries (getAnalyses, insertAnalysis, getAnalysisById)
    types.ts              # Analysis, AnalysisResult, AnalyzeRequest
    prompts.ts            # Claude prompt templates
    supabase/
      client.ts           # Browser Supabase client
      server.ts           # Server-side Supabase client
      middleware.ts        # Auth middleware
```

## Local Design System Linking

This project consumes `wens-liquid-glass-design-system` from a local symlink, not npm.
Full documentation in [LOCAL_DS_LINKING.md](./LOCAL_DS_LINKING.md).

Key points:
- `package.json` uses `"file:../wens-ds-link/packages/design-system"`
- `wens-ds-link` is a symlink to `Wen's Project Liquid Glass Design System/`
- `next.config.ts` has `transpilePackages: ["wens-liquid-glass-design-system"]`
- `globals.css` imports `tokens.css`, maps `--lg-*` prefixed vars to unprefixed vars, and uses `@source` for Tailwind scanning

## Key Constraints

- **Server vs Client components**: Dashboard and results pages are async server components. Any design system component that transitively imports hooks must be wrapped in a `"use client"` file (see `score-badge.tsx` pattern).
- **CSS token prefix mismatch**: Design system `tokens.css` uses `--lg-` prefix, but components reference unprefixed vars. `globals.css` bridges this with aliases.
- **Tailwind `@source` required**: Tailwind v4 won't scan the design system package by default. The `@source` directive in `globals.css` points to the DS source directory.
- **No test framework**: Use `npm run build` to catch TypeScript and ESLint errors.

## Common Failures

| Symptom | Cause | Fix |
|---------|-------|-----|
| `useState` only works in Client Component | DS component uses hooks but missing `"use client"` | Add `"use client"` to the DS component file, or wrap in a client component |
| Component renders but no colors/styles | CSS token vars not defined | Check `globals.css` for `@import tokens.css` and var mapping |
| Tailwind classes from DS don't apply | Tailwind not scanning DS source | Check `@source` path in `globals.css` |
| `Module not found: wens-liquid-glass-design-system` | Symlink broken or deps not installed | Run `ls -la ../wens-ds-link` to check symlink, then `npm install` |
| API route returns 500 | Usually Claude API key issue (expired/no credits) | Check `.env.local` for `ANTHROPIC_API_KEY`, check Anthropic billing |
| Supabase query error on dashboard | Missing `analyses` table or RLS policy | Check Supabase SQL editor for table existence |

## Supabase

- Auth: email/password via `@supabase/ssr`
- Database: `analyses` table with RLS (users can only read/write their own rows)
- Env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local`
