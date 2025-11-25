export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  const apiFetch = async (url: string, options: any = {}) => {
    const token = localStorage.getItem('token')
    const headers = {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    }

    return $fetch(`${config.public.apiBase}${url}`, { ...options, headers })
  }

  nuxtApp.provide('api', apiFetch)
})
