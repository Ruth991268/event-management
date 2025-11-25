<template>
  <div class="min-h-screen bg-gradient-to-br from-green-500 to-teal-600 p-12 text-center">
    <h1 class="text-7xl font-black text-white mb-8">Welcome, {{ auth.user?.name }}!</h1>

    <NuxtLink to="/events/create" class="inline-block bg-white text-green-600 px-20 py-10 rounded-3xl text-5xl font-black shadow-2xl hover:scale-105 transition mb-16">
      + Create New Event
    </NuxtLink>

    <div class="space-x-12 text-white text-3xl">
      <NuxtLink to="/events/my" class="underline hover:opacity-80">My Events</NuxtLink>
      <button @click="auth.logout" class="underline hover:opacity-80">Logout</button>
    </div>
  </div>
</template>

<script setup>
const auth = useAuthStore()
onMounted(() => {
  auth.load()
  if (!auth.isLoggedIn) navigateTo('/auth/login')
})
</script>