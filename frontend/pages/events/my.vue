<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-600 to-pink-600 p-12">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-6xl font-black text-white text-center mb-12">My Events</h1>

      <div v-if="events.length === 0" class="text-center text-white text-4xl">
        No events yet — <NuxtLink to="/events/create" class="underline">create one!</NuxtLink>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="event in events" :key="event.id" class="bg-white rounded-3xl shadow-2xl p-8 hover:scale-105 transition">
          <h2 class="text-3xl font-bold text-purple-700 mb-4">{{ event.title }}</h2>
          <p class="text-gray-600 mb-2">{{ event.location }} • {{ formatDate(event.start_date) }}</p>
          <div class="mt-6 flex gap-4">
            <button @click="editEvent(event)" class="bg-blue-600 text-white px-6 py-3 rounded-xl">Edit</button>
            <button @click="deleteEvent(event.id)" class="bg-red-600 text-white px-6 py-3 rounded-xl">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const auth = useAuthStore()
const events = ref([])

const fetchMyEvents = async () => {
  auth.load()
  try {
    events.value = await $fetch('/api/events/followed', { headers: auth.headers })
  } catch (e) {
    console.error(e)
  }
}

const formatDate = (date) => new Date(date).toLocaleDateString()

onMounted(() => {
  auth.load()
  if (!auth.isLoggedIn) navigateTo('/auth/login')
  else fetchMyEvents()
})
</script>