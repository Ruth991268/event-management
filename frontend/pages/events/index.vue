<template>
  <div class="min-h-screen bg-gray-100 py-12">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-between items-center mb-10">
        <h1 class="text-4xl font-bold">All Events</h1>
        <NuxtLink v-if="auth.isLoggedIn" to="/events/create" class="bg-blue-600 text-white px-8 py-4 rounded-lg text-xl">
          + Create Event
        </NuxtLink>
      </div>

      <div v-if="loading" class="text-center py-20 text-2xl">Loading...</div>
      <div v-else-if="events.length === 0" class="text-center py-20 text-2xl text-gray-500">
        No events yet. Create one!
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="e in events" :key="e.id" class="bg-white p-6 rounded-xl shadow-lg">
          <h3 class="text-2xl font-bold mb-2">{{ e.title }}</h3>
          <p class="text-gray-600 mb-4">{{ e.description || 'No description' }}</p>
          <p><strong>Location:</strong> {{ e.location }}</p>
          <p><strong>Date:</strong> {{ format(e.start_date) }}</p>
          <p class="text-2xl font-bold text-green-600 mt-4">${{ Number(e.price).toFixed(2) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const events = ref([])
const loading = ref(true)
const auth = useAuthStore()

onMounted(async () => {
  auth.initialize()
  try {
    events.value = await $fetch('/api/events/public')
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
})

const format = (d: string) => new Date(d).toLocaleDateString()
</script>