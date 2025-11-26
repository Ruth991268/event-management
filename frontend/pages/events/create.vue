<template>
  <div class="min-h-screen bg-gray-100 p-10">
    <div class="max-w-2xl mx-auto bg-white p-10 rounded shadow">
      <h1 class="text-3xl font-bold text-center mb-8">Create Event</h1>
      <form @submit.prevent="create">
        <input v-model="title" placeholder="Title" required class="w-full p-3 border mb-4 rounded" />
        <textarea v-model="description" placeholder="Description" class="w-full p-3 border mb-4 rounded" rows="4"></textarea>
        <input v-model="location" placeholder="Location" required class="w-full p-3 border mb-4 rounded" />
        <button type="submit" class="w-full bg-green-600 text-white p-4 rounded text-xl">
          Create Event
        </button>
      </form>
      <div class="text-center mt-6">
        <NuxtLink to="/events" class="text-blue-600 underline">Back</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const title = ref('')
const description = ref('')
const location = ref('')
const auth = useAuthStore()

const create = async () => {
  try {
    await $fetch('http://localhost:8080/events/create', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${auth.token}`,
        'Content-Type': 'application/json'
      },
      body: { title: title.value, description: description.value, location: location.value }
    })
    alert('Event created!')
    navigateTo('/events')
  } catch (e) {
    alert('Failed')
  }
}
</script>