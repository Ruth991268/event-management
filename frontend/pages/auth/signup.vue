<!-- frontend/pages/auth/signup.vue -->
<template>
  <div class="max-w-md mx-auto bg-white p-10 rounded shadow mt-20">
    <h1 class="text-3xl font-bold text-center mb-8">Sign Up</h1>
    <form @submit.prevent="signup">
      <input v-model="name" placeholder="Name" required class="w-full p-3 border mb-4 rounded" />
      <input v-model="email" type="email" placeholder="Email" required class="w-full p-3 border mb-4 rounded" />
      <input v-model="password" type="password" placeholder="Password" required class="w-full p-3 border mb-6 rounded" />
      <button type="submit" class="w-full bg-green-600 text-white p-4 rounded text-xl">
        Create Account
      </button>
    </form>
    <p class="text-center mt-4">
      Already have account? <NuxtLink to="/auth/login" class="text-blue-600 underline">Login</NuxtLink>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth' // Ensure this path is correct

const name = ref('')
const email = ref('')
const password = ref('')
const auth = useAuthStore()

const signup = async () => {
  try {
    const res = await $fetch('/api/signup', { // Use /api/signup for proxy
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { name: name.value, email: email.value, password: password.value }
    })
    auth.set(res.token, res.user)
    alert('Account created successfully!')
    navigateTo('/events')
  } catch (e) {
    console.error('Signup error:', e); // Log the full error

    // Improved error message extraction
    let errorMessage = 'Signup failed. Please try again.';
    if (e.response && e.response._data && e.response._data.error) {
        errorMessage = `Signup failed: ${e.response._data.error}`;
    } else if (e.message) {
        errorMessage = `Signup failed: ${e.message}`;
    }
    alert(errorMessage);
  }
}
</script>