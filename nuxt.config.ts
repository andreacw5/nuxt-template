// Change these two first: they feed canonical, hreflang, og:url and the sitemap.
const siteUrl = 'https://example.com'
const siteName = 'Nuxt Template'

export default defineNuxtConfig({
  compatibilityDate: '2026-09-01',
  devtools: { enabled: false },
  modules: ['@nuxtjs/google-fonts', '@nuxtjs/i18n', '@nuxtjs/sitemap', '@nuxtjs/color-mode'],
  // Follows the OS (dark when there is none); the footer toggle overrides it and the cookie keeps SSR in sync.
  colorMode: {
    preference: 'system',
    fallback: 'dark',
    dataValue: 'theme',
    classSuffix: '',
    storage: 'cookie',
  },
  css: ['~/assets/main.css'],
  // Inline every stylesheet: small site, no render-blocking CSS fetch on first paint.
  features: { inlineStyles: true },
  googleFonts: {
    families: { Manrope: [400, 500, 600, 700, 800], 'JetBrains Mono': [400, 600] },
    display: 'swap',
    download: true,
  },
  // Vite inlines files under 4KB as data: URIs: small font subsets would land in every page's HTML. Fonts stay files.
  vite: { build: { assetsInlineLimit: (file: string) => (file.endsWith('.woff2') ? false : undefined) } },
  site: { url: siteUrl, name: siteName },
  i18n: {
    locales: [
      { code: 'it', language: 'it-IT', name: 'Italiano', file: 'it.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
    ],
    defaultLocale: 'it',
    // Italian stays on /, English lives under /en.
    strategy: 'prefix_except_default',
    baseUrl: siteUrl,
    // First visit to / follows the browser; the choice sticks in a cookie. Unsupported or missing language (crawlers) stays Italian.
    detectBrowserLanguage: { useCookie: true, cookieKey: 'lang', redirectOn: 'root', fallbackLocale: 'it' },
  },
  runtimeConfig: {
    public: { siteUrl, siteName },
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      titleTemplate: `%s · ${siteName}`,
      meta: [{ name: 'color-scheme', content: 'dark light' }],
    },
  },
})
