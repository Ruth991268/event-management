// nuxt.config.ts
export default defineNuxtConfig({
  typescript: {
    strict: true,
  },
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:8080', // Configurable via env NUXT_PUBLIC_API_BASE
    },
  },
  compatibilityDate: '2025-11-28',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss' // Tailwind module,,
    
    
  ],
  css: [
    '~/assets/css/tailwind.css' // Your global Tailwind file
  ],
    ssr: false,

})