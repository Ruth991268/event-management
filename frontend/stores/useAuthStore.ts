import { defineStore } from 'pinia'

interface User { id: number; name: string; email: string }

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: '',
    user: null as User | null
  }),

  getters: {
    isLoggedIn: (state): boolean => !!state.token,
    headers: (state): Record<string, string> => ({
      'Content-Type': 'application/json',
      Authorization: state.token ? `Bearer ${state.token}` : ''
    })
  },

  actions: {
    setAuth(token: string, user: User) {
      this.token = token
      this.user = user
      if (process.client) {
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
      }
    },
    load() {
      if (process.client) {
        const token = localStorage.getItem('token')
        const userStr = localStorage.getItem('user')
        if (token && userStr) {
          this.token = token
          try { this.user = JSON.parse(userStr) } catch { this.user = null }
        }
      }
    },
    logout() {
      this.token = ''
      this.user = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      navigateTo('/auth/login')
    }
  }
})