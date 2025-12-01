<template>
  <div class="bg-white p-4 rounded shadow">
    <h2 class="text-xl font-bold">{{ event.title }}</h2>
    <p>{{ event.description }}</p>
    <p>Category: {{ event.category }}</p>
    <p>Location: {{ event.location }}</p>
    <p>Start: {{ new Date(event.start_date).toLocaleString() }}</p>
    <p>Price: ${{ event.price }}</p>
    <NuxtLink :to="`/events/${event.id}`" class="text-blue-500">View</NuxtLink>
    <button v-if="token" @click="followEvent(event.id)" class="ml-2 bg-green-500 text-white p-1">Follow</button>
    <button v-if="token" @click="bookmarkEvent(event.id)" class="ml-2 bg-yellow-500 text-white p-1">Bookmark</button>
  </div>
</template>

<script setup>
defineProps(['event'])
const { token } = useAuth()
const { followEvent: doFollow, /* bookmarkEvent */ } = useEvents() // Add bookmark logic similarly

function followEvent(id) {
  doFollow({ event_id: id })
}
function bookmarkEvent(id) {
  // Implement similarly
}
</script>