<template>
  <div class="max-w-md mx-auto mt-32 bg-white p-10 rounded-2xl shadow-2xl">
    <h1 class="text-4xl font-bold text-center mb-8">Login</h1>
    
    <form @submit.prevent="login" class="space-y-6">
      <input v-model="email" type="email" required placeholder="Email" class="w-full px-5 py-4 border rounded-xl text-lg" />
      <input v-model="password" type="password" required placeholder="Password" class="w-full px-5 py-4 border rounded-xl text-lg" />
      
      <button type="submit" :disabled="loading" class="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white font-bold py-4 rounded-xl text-xl transition">
        {{ loading ? 'Logging in...' : 'Login' }}
      </button>
    </form>

    <p class="text-center mt-6 text-gray-600">
      No account? <NuxtLink to="/auth/signup" class="text-blue-600 font-bold underline">Sign up</NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
const auth = useAuthStore()
const route = useRoute()
const router = useRouter()
const loading = ref(false)

const email = ref('')
const password = ref('')

const login = async () => {
  loading.value = true
  try {
    const res = await $fetch('/api/auth/login', {
      method: 'POST',
      body: { email: email.value, password: password.value }
    })

    auth.set(res.token, res.user)

    // Fixed line: proper type guard
    const redirectTo = typeof route.query.redirect === 'string' 
      ? route.query.redirect 
      : '/events'

    router.push(redirectTo)
  } catch (err: any) {
    alert(err?.data?.error || 'Login failed')
  } finally {
    loading.value = false
  }
}
</script>