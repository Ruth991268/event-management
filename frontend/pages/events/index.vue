<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-8">
    <div class="bg-white rounded-3xl shadow-2xl p-16 max-w-2xl w-full text-center">
      
      <h1 class="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-12">
        Welcome back,<br>{{ auth.user?.name || 'Friend' }}!
      </h1>

      <div class="space-y-10">
        <NuxtLink 
          to="/events/create" 
          class="block bg-gradient-to-r from-green-500 to-emerald-600 text-white py-10 rounded-3xl text-5xl font-bold shadow-2xl hover:scale-105 transition">
          + Create New Event
        </NuxtLink>

        <NuxtLink 
          to="/events/my" 
          class="block bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-10 rounded-3xl text-5xl font-bold shadow-2xl hover:scale-105 transition">
          My Events
        </NuxtLink>

        <button 
          @click="auth.logout" 
          class="block w-full bg-red-600 text-white py-8 rounded-3xl text-4xl font-bold hover:bg-red-700 transition shadow-xl">
          Logout
        </button>
      </div>

      <p class="mt-16 text-gray-700 text-2xl font-medium">
        You are logged in forever
      </p>
    </div>
  </div>
</template>

<script setup>
const auth = useAuthStore()
// NO onMounted() → NO flash → NO redirect → YOU STAY LOGGED IN
</script>