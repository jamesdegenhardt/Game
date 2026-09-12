# Silver Screen Studios

## Cloudflare Pages deployment

Use these settings when connecting the repository to Cloudflare Pages:

- **Framework preset:** Vite
- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Root directory:** `/`
- **Node version:** `22`

The site must be deployed from the `dist` output created by the Vite build. Do not use the repository root as the production asset directory, because the root `index.html` points at JSX source files that browsers cannot execute directly.

For a local run:

```bash
npm install
npm run dev
```