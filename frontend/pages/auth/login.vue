<template>
  <div class="max-w-md mx-auto bg-white p-10 rounded shadow mt-20">
    <h1 class="text-3xl font-bold text-center mb-8">Login</h1>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" required class="w-full p-3 border mb-4 rounded" />
      <input v-model="password" type="password" placeholder="Password" required class="w-full p-3 border mb-6 rounded" />
      <button type="submit" class="w-full bg-blue-600 text-white p-4 rounded text-xl">
        Login
      </button>
    </form>
    <p class="text-center mt-4">
      No account? <NuxtLink to="/auth/signup" class="text-green-600 underline">Sign up</NuxtLink>
    </p>
  </div>
</template>

<script setup>
const email = ref('ruth@gmail.com')
const password = ref('123456')
const auth = useAuthStore()

const login = async () => {
  try {
    const res = await $fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { email: email.value, password: password.value }
    })
    auth.set(res.token, res.user)
    navigateTo('/events')
  } catch (e) {
    alert('Wrong email or password')
  }
}
</script>