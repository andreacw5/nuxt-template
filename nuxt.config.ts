// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  routeRules: {
    '/rss.xml': { prerender: true },
  },

  app: {
    head: {
      titleTemplate: '%s - My Nuxt App',
      meta: [
        { name: 'robots', content: 'index, follow' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'alternate', type: 'application/rss+xml', title: 'RSS', href: '/rss.xml' },
      ],
    }
  },

  modules: [
    'vuetify-nuxt-module',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/seo',
    '@nuxt/content',
  ],

  i18n: {
    strategy: 'prefix_except_default',
    locales: [
      { code: 'en', iso: 'en-US', name: 'English', file: 'en.json' },
      { code: 'it', iso: 'it-IT', name: 'Italiano', file: 'it.json' },
    ],
    defaultLocale: 'en',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    }
  },

  /*site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  },*/

  robots: {
    blockNonSeoBots: true,
    blockAiBots: true,
    groups: [
      {
        userAgent: '*',
        allow: '/',
      }
    ],
  },

  vuetify: {
    moduleOptions: {
      // Opzioni del modulo
    },
    vuetifyOptions: {
      // Configurazione di Vuetify
      theme: {
        defaultTheme: 'light',
        themes: {
          light: {
            dark: false,
            colors: {
              primary: '#1976D2',
              'primary-darken-1': '#1565C0',
              'primary-lighten-1': '#42A5F5',
              secondary: '#424242',
              accent: '#82B1FF',
              error: '#FF5252',
              info: '#2196F3',
              success: '#4CAF50',
              warning: '#FFC107',
              background: '#F5F5F5',
              surface: '#FFFFFF',
            }
          }
        }
      }
    }
  },

  css: [
    '~/assets/css/main.css',
  ],

  build: {
    transpile: ['vuetify'],
  },
})
