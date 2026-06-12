# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Pure static site — no build tool, no package manager, no bundler. Single entry point: `index.html`. Serve locally with any static file server, e.g.:

```bash
npx serve .
# or
python3 -m http.server 8080
```

Open `http://localhost:8080` in a browser. No tests, no lint scripts.

## Architecture

All JS modules are IIFE singletons loaded via `<script>` tags in `index.html` in this order — each depends on the ones before it:

1. **`config.js`** — exports frozen `CONFIG` with `API_BASE_URL` and `ENDPOINTS`
2. **`api.js`** — exports `ApiService` (`getPoems`, `getMemories`, `getFeaturedPoem`); all calls are GET to the external Vercel API at `CONFIG.API_BASE_URL`
3. **`particles.js`** — exports `ParticlesEngine`; canvas-based floating hearts background
4. **`petals.js`** — exports `PetalsEngine`; DOM emoji petals falling via CSS animation
5. **`poems.js`** — exports `PoemsModule`; builds the home page DOM (`buildHomePage`) and poems list page (`buildPoemsPage`), both return a `Promise<HTMLElement>` consumed by SwipeRouter
6. **`memories.js`** — exports `MemoriesModule`; builds memories grid page (`buildMemoriesPage`) and manages the fullscreen photo modal (`bindModal`)
7. **`router.js`** — exports `SwipeRouter`; horizontal swipe navigation — pages are registered via `addPage({id, label, loader})` then lazy-loaded on first visit; adjacent pages pre-load 800 ms after navigation
8. **`app.js`** — orchestrator; runs envelope open animation, then calls `SwipeRouter.addPage` for `home`, `poems`, `memories` in order, then `SwipeRouter.init()`

### Page flow

Intro envelope screen → user clicks "Abrir com carinho" → intro fades out → `_initSite()` registers 3 pages and initializes SwipeRouter → pages load on demand from the API.

### Adding a new page

1. Write a module in `public/js/` that exports a `buildXPage()` returning `Promise<HTMLElement>`
2. Add `<script>` tag in `index.html` before `app.js`
3. Call `SwipeRouter.addPage({ id, label, loader })` inside `_initSite()` in `app.js`

### API contract

External backend: `https://ts-mariana-api-nu.vercel.app`

- `GET /poems` → `{ id, title, body, type: "poem"|"quote"|"letter", featured, created_at }[]`
- `GET /poems/featured` → single poem object
- `GET /memories` → `{ id, title, description, image_base64, date, created_at }[]`

Images come as base64 data URIs directly in the API response.

## Language

UI text is in Brazilian Portuguese (`pt-BR`). Dates formatted with `toLocaleDateString('pt-BR', ...)`.
