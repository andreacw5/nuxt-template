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
              secondary: '#546E7A',
              accent: '#0091EA',
              error: '#D32F2F',
              info: '#0288D1',
              success: '#388E3C',
              warning: '#F57C00',
              background: '#FAFAFA',
              surface: '#FFFFFF',
              'surface-variant': '#F5F5F5',
              'on-surface': '#212121',
              'on-surface-variant': '#424242',
              'on-primary': '#FFFFFF',
              'on-secondary': '#FFFFFF',
              'on-background': '#212121',
            }
          },
          dark: {
            dark: true,
            colors: {
              primary: '#BB86FC',
              'primary-darken-1': '#9965F4',
              'primary-lighten-1': '#D5AAFF',
              secondary: '#03DAC6',
              accent: '#FF6E40',
              error: '#CF6679',
              info: '#03DAC6',
              success: '#4CAF50',
              warning: '#FFC107',
              background: '#1A1A1A',
              surface: '#252525',
              'surface-variant': '#2F2F2F',
              'surface-bright': '#3A3A3A',
              'on-surface': '#E1E1E1',
              'on-surface-variant': '#C4C4C4',
              'on-primary': '#000000',
              'on-secondary': '#000000',
              'on-background': '#E1E1E1',
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
