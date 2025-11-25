// composables/useAuth.js
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export const useAuth = () => {
  const router = useRouter()
  const token = ref(null)
  const user = ref(null)
  const isLoggedIn = ref(false)

  onMounted(() => {
    if (process.client) {
      token.value = localStorage.getItem('token')
      const raw = localStorage.getItem('user')
      user.value = raw ? JSON.parse(raw) : null
      isLoggedIn.value = !!token.value
    }
  })

  const setAuth = (jwt, userObj) => {
    if (process.client) {
      localStorage.setItem('token', jwt)
      localStorage.setItem('user', JSON.stringify(userObj || {}))
      token.value = jwt
      user.value = userObj || null
      isLoggedIn.value = true
    }
  }

  const logout = () => {
    if (process.client) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      token.value = null
      user.value = null
      isLoggedIn.value = false
      router.push('/auth/login')
    }
  }

  const requireAuth = () => {
    if (process.client && !localStorage.getItem('token')) {
      router.push('/auth/login')
      return false
    }
    return true
  }

  return { token, user, isLoggedIn, setAuth, logout, requireAuth }
}
