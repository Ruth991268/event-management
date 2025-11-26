// stores/auth.ts
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => {
    // Auto-load from localStorage when app starts
    if (typeof window === 'undefined') {
      return { token: null, user: null }
    }
    try {
      const saved = localStorage.getItem('auth')
      if (saved) {
        const data = JSON.parse(saved)
        return { token: data.token || null, user: data.user || null }
      }
    } catch (e) {
      console.error('Failed to read auth from localStorage', e)
    }
    return { token: null, user: null }
  },

  getters: {
    isLoggedIn: (state): boolean => !!state.token && !!state.user
  },

  actions: {
    set(token: string, user: any) {
      this.token = token
      this.user = user
      localStorage.setItem('auth', JSON.stringify({ token, user }))
    },
    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('auth')
      window.location.href = '/auth/login'
    }
  }
})