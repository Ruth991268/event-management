export const useAuth = () => {
  const user = ref<any>(null)
  const isAuthenticated = ref(false)

  const checkAuth = () => {
    if (process.client) {
      const token = localStorage.getItem('jwt_token')
      const userData = localStorage.getItem('user')
      
      if (token && userData && userData !== 'undefined' && userData !== 'null') {
        try {
          user.value = JSON.parse(userData)
          isAuthenticated.value = true
        } catch (e) {
          console.error('Error parsing user data:', e)
          clearAuth()
        }
      } else {
        isAuthenticated.value = false
        user.value = null
      }
    }
  }

  const setAuth = (token: string, userData: any) => {
    if (process.client) {
      localStorage.setItem('jwt_token', token)
      localStorage.setItem('user', JSON.stringify(userData))
      user.value = userData
      isAuthenticated.value = true
    }
  }

  const clearAuth = () => {
    if (process.client) {
      localStorage.removeItem('jwt_token')
      localStorage.removeItem('user')
      user.value = null
      isAuthenticated.value = false
    }
  }

  const getToken = (): string | null => {
    if (process.client) {
      return localStorage.getItem('jwt_token')
    }
    return null
  }

  // Check auth immediately
  if (process.client) {
    checkAuth()
  }

  return {
    user: readonly(user),
    isAuthenticated: readonly(isAuthenticated),
    setAuth,
    clearAuth,
    checkAuth,
    getToken
  }
}