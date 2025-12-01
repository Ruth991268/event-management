<!-- frontend/layouts/default.vue -->
<template>
  <div>
    <header class="bg-gray-800 text-white p-4 shadow-md">
      <div class="container mx-auto flex justify-between items-center">
        <NuxtLink to="/" class="text-2xl font-bold">EventApp</NuxtLink>
        <nav>
          <ul class="flex space-x-4">
            <li><NuxtLink to="/events" class="hover:text-gray-300">Events</NuxtLink></li>
            <li v-if="auth.isLoggedIn"><NuxtLink to="/events/create" class="hover:text-gray-300">Create</NuxtLink></li>
            <li v-if="auth.isLoggedIn"><NuxtLink to="/events/my" class="hover:text-gray-300">My Events</NuxtLink></li>
            <li v-if="!auth.isLoggedIn"><NuxtLink to="/auth/signup" class="hover:text-gray-300">Sign Up</NuxtLink></li>
            <li v-if="!auth.isLoggedIn"><NuxtLink to="/auth/login" class="hover:text-gray-300">Login</NuxtLink></li>
            <li v-if="auth.isLoggedIn">
              <span class="text-gray-400">Hello, {{ auth.loggedInUser?.name }}</span>
              <button @click="logout" class="ml-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">Logout</button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
    <main class="min-h-screen">
      <slot />
    </main>
    <footer class="bg-gray-800 text-white p-4 text-center mt-8">
      &copy; 2023 EventApp. All rights reserved.
    </footer>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore();

onMounted(() => {
  auth.initialize(); // Initialize auth state when the layout mounts
});

const logout = () => {
  auth.clear();
  alert('Logged out successfully');
  navigateTo('/');
};
</script>