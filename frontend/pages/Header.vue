<template>
  <header class="bg-white shadow">
    <div class="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
      <NuxtLink to="/" class="text-2xl font-bold text-indigo-600">Eventify</NuxtLink>

      <nav class="hidden md:flex gap-4 items-center">
        <NuxtLink to="/events" class="text-gray-700 hover:text-indigo-600">Events</NuxtLink>
        <NuxtLink to="/events/create" class="text-gray-700 hover:text-indigo-600">Create</NuxtLink>
        <NuxtLink v-if="!logged" to="/auth/login" class="px-3 py-1 rounded bg-indigo-600 text-white">Login</NuxtLink>
        <button v-else @click="logout" class="px-3 py-1 rounded bg-red-500 text-white">Logout</button>
      </nav>

      <button class="md:hidden" @click="open = !open">☰</button>
    </div>

    <div v-if="open" class="md:hidden px-4 pb-4">
      <NuxtLink to="/events" class="block py-2">Events</NuxtLink>
      <NuxtLink to="/events/create" class="block py-2">Create</NuxtLink>
      <NuxtLink v-if="!logged" to="/auth/login" class="block py-2">Login</NuxtLink>
      <button v-if="logged" @click="logout" class="block py-2 text-left w-full">Logout</button>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuth } from '~/composables/useAuth'

const open = ref(false)
const { isLoggedIn, logout } = useAuth()
const logged = computed(() => isLoggedIn.value)
</script>
