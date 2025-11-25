<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center p-8">
    <div class="bg-white rounded-3xl shadow-2xl p-12 w-full max-w-md">
      <h1 class="text-6xl font-black text-center text-indigo-600 mb-12">Login</h1>

      <!-- Debug info -->
      <div class="mb-6 p-4 bg-yellow-100 text-yellow-800 rounded-xl text-center font-bold">
        Trying: {{ email }} → {{ password }}
      </div>

      <form @submit.prevent="login" class="space-y-8">
        <input v-model="email" type="email" placeholder="Email" required class="w-full px-8 py-6 border-2 rounded-2xl text-xl focus:border-indigo-500" />
        <input v-model="password" type="password" placeholder="Password" required class="w-full px-8 py-6 border-2 rounded-2xl text-xl focus:border-indigo-500" />

        <button type="submit" :disabled="loading" class="w-full bg-indigo-600 text-white py-6 rounded-2xl text-3xl font-black hover:bg-indigo-700 disabled:opacity-60">
          {{ loading ? 'Logging in...' : 'Login Now' }}
        </button>
      </form>

      <p class="text-center mt-8 text-xl">
        No account? <NuxtLink to="/auth/signup" class="text-indigo-600 font-bold hover:underline">Sign up</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
const email = ref('ruth@gmail.com')
const password = ref('123456')
const loading = ref(false)
const auth = useAuthStore()

const login = async () => {
  loading.value = true

  try {
    // THIS LINE FIXES EVERYTHING — USES YOUR PERFECT PROXY
    const res = await $fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { email: email.value, password: password.value }
    })

    auth.setAuth(res.token, res.user)
    alert('Login successful! Welcome ' + res.user.name)
    navigateTo('/events')

  } catch (e) {
    console.error('Login error:', e)
    // Show real error from backend
    alert('Login failed: ' + (e?.data?.error || e?.message || 'Check email/password'))
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  auth.load()
  if (auth.isLoggedIn) navigateTo('/events')
})
</script>