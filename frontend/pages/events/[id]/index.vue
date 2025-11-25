<template>
  <div class="max-w-3xl mx-auto p-6">
    <div v-if="loading">Loading...</div>
    <div v-if="error" class="text-red-500">{{ error }}</div>

    <div v-if="event" class="bg-white p-6 rounded shadow">
      <h1 class="text-2xl font-bold">{{ event.title }}</h1>
      <p class="text-gray-700 mt-2">{{ event.description }}</p>
      <p class="text-sm text-gray-500 mt-3">Location: {{ event.location }}</p>
      <p class="text-sm text-gray-500">Category: {{ event.category }}</p>
      <p class="text-sm text-gray-500">Start: {{ event.start_date }}</p>
      <p class="text-sm text-gray-500">End: {{ event.end_date }}</p>
      <p class="text-sm text-gray-500">Price: {{ event.price }}</p>

      <div class="mt-3">
        <NuxtLink :to="`/events/${event.id}/edit`" class="text-indigo-600">Edit</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
const { $api } = useNuxtApp()

const route = useRoute()
const id = route.params.id

const event = ref(null)
const loading = ref(false)
const error = ref('')

onMounted(async () => {
  loading.value = true
  try {
    const res = await $api(`/events/get?id=${id}`, { method: 'GET' })
    event.value = res
  } catch (err) {
    error.value = err?.data?.error || err?.message || 'Failed to load event'
  } finally {
    loading.value = false
  }
})
</script>
