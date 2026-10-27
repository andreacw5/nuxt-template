# nuxt-template

Nuxt 4 + Vue 3 + CSS puro, SSR Node, pnpm. Niente Vuetify, niente Pinia. Panoramica e comandi: [`README.md`](README.md).

## Regole

- **Stile**: CSS scoped nei componenti + token da `app/assets/main.css`. Mai colori hardcoded. Ogni token nuovo va sia in `:root` (dark, default) sia in `:root[data-theme='light']`.
- **i18n**: ogni stringa UI va in **entrambi** `it.json` e `en.json`. Link interni con `useLocalePath()`.
- **SEO**: ogni pagina chiama `useSeoMeta` con titolo e descrizione.
- **Stato**: `useState` / composable. Aggiungere Pinia solo se serve davvero.

## Verifica

Nessun lint, test o typecheck: il check è `pnpm build` (lo stesso della CI). Controllare dark e light, IT e EN, mobile.
