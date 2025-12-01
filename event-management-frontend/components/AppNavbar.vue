<template>
  <nav class="bg-white shadow-sm border-b">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <NuxtLink to="/" class="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
            Eventify
          </NuxtLink>
        </div>

        <!-- Navigation Links -->
        <div class="flex items-center space-x-4">
          <NuxtLink 
            to="/dashboard" 
            class="text-gray-600 hover:text-purple-600 transition px-3 py-2"
            active-class="text-purple-600 font-semibold"
          >
            Dashboard
          </NuxtLink>
          
          <!-- Create Event Button -->
     <NuxtLink 
  to="/create" 
  class="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-purple-800 transition"
>
  Create Event
</NuxtLink>
          <!-- User Menu -->
          <div v-if="$isAuthenticated" class="flex items-center space-x-2">
            <span class="text-gray-700">Hello, {{ $user?.name }}</span>
            <button 
              @click="logout"
              class="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm"
            >
              Logout
            </button>
          </div>
          <div v-else class="flex items-center space-x-2">
            <NuxtLink 
              to="/login" 
              class="text-gray-600 hover:text-purple-600 transition px-3 py-2"
            >
              Login
            </NuxtLink>
            <NuxtLink 
              to="/signup" 
              class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
            >
              Sign Up
            </NuxtLink>
            
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const { $user, $isAuthenticated } = useNuxtApp()

const logout = () => {
  if (process.client) {
    localStorage.removeItem('jwt_token')
    localStorage.removeItem('user')
    window.location.href = '/login'
  }
}
</script>