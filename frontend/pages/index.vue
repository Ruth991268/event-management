<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center p-8">
    <div class="text-center text-white">
      <h1 class="text-8xl font-black mb-6 tracking-tight">Eventify</h1>
      <p class="text-3xl mb-12 opacity-90">Create. Discover. Celebrate.</p>

      <div v-if="auth.isLoggedIn" class="space-x-8">
        <NuxtLink to="/events" class="bg-white text-indigo-600 px-12 py-6 rounded-3xl text-3xl font-bold hover:scale-105 transition shadow-2xl">
          Go to Events
        </NuxtLink>
        <button @click="auth.logout" class="bg-red-600 px-12 py-6 rounded-3xl text-3xl font-bold hover:bg-red-700 transition shadow-2xl">
          Logout
        </button>
      </div>
      <div v-else>
        <NuxtLink to="/auth/login" class="bg-white text-indigo-600 px-16 py-8 rounded-3xl text-4xl font-black hover:scale-110 transition shadow-2xl">
          Get Started
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const auth = useAuthStore()
onMounted(() => auth.load())
</script>