<template>
  <div class="max-w-2xl mx-auto bg-white p-10 rounded-xl shadow-xl mt-10">
    <h1 class="text-4xl font-bold text-center mb-8">Create New Event</h1>

    <form @submit.prevent="createEvent" class="space-y-6">
      <input v-model="event.title" required placeholder="Title" class="w-full px-4 py-3 border rounded-lg" />
      <textarea v-model="event.description" placeholder="Description" rows="4" class="w-full px-4 py-3 border rounded-lg"></textarea>
      <input v-model="event.category" placeholder="Category" class="w-full px-4 py-3 border rounded-lg" />
      <input v-model="event.location" required placeholder="Location" class="w-full px-4 py-3 border rounded-lg" />
      <input v-model="event.start_date" required type="datetime-local" class="w-full px-4 py-3 border rounded-lg" />
      <input v-model="event.end_date" required type="datetime-local" class="w-full px-4 py-3 border rounded-lg" />
      <input v-model.number="event.price" type="number" step="0.01" placeholder="Price" class="w-full px-4 py-3 border rounded-lg" />

      <button type="submit" :disabled="loading" class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-lg">
        {{ loading ? 'Creating...' : 'Create Event' }}
      </button>
    </form>
  </div>
</template>

<script setup>
const auth = useAuthStore()
const loading = ref(false)

const event = ref({
  title: '', description: '', category: '', location: '',
  start_date: '', end_date: '', price: 0
})

onMounted(() => {
  auth.initialize()
  if (!auth.isLoggedIn) {
    navigateTo(`/auth/login?redirect=${encodeURIComponent('/events/create')}`)
  }
})

const createEvent = async () => {
  loading.value = true
  try {
    await $fetch('/api/events/create', {
      method: 'POST',
      headers: { Authorization: `Bearer ${auth.token}` },
      body: {
        ...event.value,
        start_date: new Date(event.value.start_date).toISOString(),
        end_date: new Date(event.value.end_date).toISOString(),
      }
    })
    alert('Event created!')
    navigateTo('/events')
  } catch (err) {
    alert('Failed to create event')
  } finally {
    loading.value = false
  }
}
</script>