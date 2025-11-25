
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/tailwind.css','~/assets/leaflet.css'],
  postcss: { plugins: { tailwindcss: {}, autoprefixer: {} } },
  modules: ['@nuxt/content',
     '@vee-validate/nuxt'
  ],
  plugins: ['~/plugins/api.ts'],
    runtimeConfig: {
    public: {
      apiBase: '/api' // proxy to Go backend
    }
  }, 
  vite: {
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:8080',
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/api/, '')
        }
      }
    }
  },
})
