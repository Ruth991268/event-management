// nuxt.config.ts
/// <reference types="@pinia/nuxt" />

import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2025-11-25',
  devtools: { enabled: true },

  css: ['~/assets/css/tailwind.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },

  modules: ['@pinia/nuxt'],

  runtimeConfig: {
    public: {
      apiBase: '/api'
    }
  },

  vite: {
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:8080',
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api/, '')
        }
      }
    }
  }
})
