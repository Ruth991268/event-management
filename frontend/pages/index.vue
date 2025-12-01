<!-- frontend/pages/index.vue -->
<template>
  <div class="container mx-auto p-4 text-center">
    <h1 class="text-4xl font-bold mt-20 mb-8">Welcome to Event Management!</h1>
    <p class="text-xl mb-12">Discover, create, and manage amazing events.</p>
    <div class="space-x-4">
      <NuxtLink to="/events" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-xl">
        View Events
      </NuxtLink>
      <NuxtLink v-if="!auth.isLoggedIn" to="/auth/signup" class="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-xl">
        Sign Up
      </NuxtLink>
      <NuxtLink v-if="!auth.isLoggedIn" to="/auth/login" class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg text-xl">
        Login
      </NuxtLink>
      <button v-if="auth.isLoggedIn" @click="logout" class="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg text-xl">
        Logout
      </button>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore();

// Initialize auth state when component mounts (client-side)
onMounted(() => {
  auth.initialize();
});

const logout = () => {
  auth.clear();
  alert('Logged out successfully');
  navigateTo('/');
};
</script>