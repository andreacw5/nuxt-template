// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap'
        }
      ]
    }
  },

  modules: ['vuetify-nuxt-module', '@pinia/nuxt'],

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
