# nuxt-template

Nuxt 4 + Vue 3 + CSS puro, SSR Node, pnpm. Niente Vuetify, niente Pinia. Panoramica e comandi: [`README.md`](README.md).

## Nuovo progetto dal template

Se `siteUrl` in `nuxt.config.ts` è ancora `https://example.com`, il progetto non è stato inizializzato. Prima di altro lavoro:

1. `siteUrl` e `siteName` in cima a `nuxt.config.ts`
2. `name` in `package.json`, titolo in `README.md` e in questo file
3. Token colore in `app/assets/main.css` (sia dark sia light), `theme-color` in `app/app.vue`, `public/favicon.svg`
4. `public/og.png` (1200×630)
5. Registry immagine in `.github/workflows/build-image.yml`
6. Testi `home` in `i18n/locales/{it,en}.json`

## Regole

- **Stile**: CSS scoped nei componenti + token da `app/assets/main.css`. Mai colori hardcoded. Ogni token nuovo va sia in `:root` (dark, default) sia in `:root[data-theme='light']`.
- **i18n**: ogni stringa UI va in **entrambi** `it.json` e `en.json`. Link interni con `useLocalePath()`.
- **SEO**: ogni pagina chiama `useSeoMeta` con titolo e descrizione.
- **Stato**: `useState` / composable. Aggiungere Pinia solo se serve davvero.

## Verifica

Nessun lint, test o typecheck: il check è `pnpm build` (lo stesso della CI). Per la UI usare il preview `dev` di `.claude/launch.json` (porta 3210) e controllare dark e light, IT e EN, mobile.
