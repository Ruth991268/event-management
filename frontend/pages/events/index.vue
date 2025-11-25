<template>
  <div class="max-w-5xl mx-auto p-6">
    <h1 class="text-3xl font-bold mb-4">Events</h1>

    <div v-if="loading" class="text-gray-600">Loading...</div>
    <div v-if="error" class="text-red-500">{{ error }}</div>

    <div class="grid gap-4 md:grid-cols-2">
      <div v-for="e in events" :key="e.id" class="bg-white p-4 rounded shadow">
        <h2 class="font-semibold text-lg">{{ e.title }}</h2>
        <p class="text-sm text-gray-600">{{ e.description }}</p>
        <p class="text-xs text-gray-500 mt-2">Location: {{ e.location }} • Price: {{ e.price }}</p>
        <div class="mt-3 flex gap-2">
          <NuxtLink :to="`/events/${e.id}`" class="text-indigo-600">View</NuxtLink>
          <NuxtLink :to="`/events/${e.id}/edit`" class="text-indigo-600">Edit</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const { $api } = useNuxtApp()

const events = ref([])
const loading = ref(false)
const error = ref('')

onMounted(async () => {
  loading.value = true
  try {
    // backend uses JWTMiddleware on /events in your main, so token is required there
    const res = await $api('/events', { method: 'GET' })
    events.value = res || []
  } catch (err) {
    error.value = err?.data?.error || err?.message || 'Failed to load events'
  } finally {
    loading.value = false
  }
})
</script>
