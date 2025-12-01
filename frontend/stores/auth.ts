// frontend/stores/auth.ts
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null as string | null,
    user: null as any,
    isAuthenticated: false,
  }),

  actions: {
    set(token: string, user: any) {
      this.token = token
      this.user = user
      this.isAuthenticated = true

      if (process.client) {
        localStorage.setItem('authToken', token)
        localStorage.setItem('authUser', JSON.stringify(user))
      }
    },

    clear() {
      this.token = null
      this.user = null
      this.isAuthenticated = false
      if (process.client) {
        localStorage.removeItem('authToken')
        localStorage.removeItem('authUser')
      }
    },

    initialize() {
      if (process.client) {
        const token = localStorage.getItem('authToken')
        const user = localStorage.getItem('authUser')

        if (token && user) {
          this.token = token
          this.user = JSON.parse(user)
          this.isAuthenticated = true
        }
      }
    }
  },

  getters: {
    isLoggedIn: (state) => state.isAuthenticated,
  }
})