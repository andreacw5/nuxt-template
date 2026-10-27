# Nuxt Template

Starter Nuxt 4 minimale: CSS puro, SSR Node, pnpm. Niente UI library, niente store.

- `@nuxtjs/i18n`: IT su `/`, EN su `/en`, lingua del browser al primo accesso (cookie `lang`)
- `@nuxtjs/color-mode`: tema segue l'OS, toggle nel footer, cookie per SSR
- `@nuxtjs/sitemap` + `robots.txt`, canonical e hreflang in `app.vue`
- `@nuxtjs/google-fonts` self-hosted (Manrope + JetBrains Mono)
- Dockerfile multi-stage (solo `.output`, utente non root)
- CI: build su ogni push, immagine Docker su tag

## Da cambiare subito

1. `siteUrl` e `siteName` in cima a `nuxt.config.ts`
2. `name` in `package.json`
3. Token colore in `app/assets/main.css`, `public/favicon.svg` e `public/og.png`
4. Registry in `.github/workflows/build-image.yml` (secret `DOCKER_USERNAME` / `DOCKER_PASSWORD`)

## Comandi

```bash
pnpm install
pnpm dev
pnpm build && node .output/server/index.mjs
docker build -t app . && docker run -p 3000:3000 app
```

## Struttura

```
app/
  app.vue              # head globale: hreflang, canonical, theme-color, og default
  error.vue            # 404 / errore generico
  assets/main.css      # token (:root dark + [data-theme='light']) e stili condivisi
  components/          # SiteHeader, SiteFooter (lingua + tema)
  pages/index.vue
i18n/locales/          # it.json, en.json
server/middleware/     # bot-lang: i crawler vedono sempre la lingua di default
```
