<template>
  <div class="bg-white rounded-xl shadow hover:shadow-md transition p-4">
    <img :src="event.featuredImage || '/images/placeholder.jpg'" class="w-full h-48 object-cover rounded-lg mb-2"/>
    <h3 class="font-bold text-lg">{{ event.title }}</h3>
    <p class="text-sm text-gray-500">{{ event.date }}</p>
    <p class="text-sm text-gray-500">{{ event.venue }}</p>
    <p class="text-sm text-gray-500">{{ event.price === 0 ? 'Free' : '$'+event.price }}</p>
    <div class="mt-2 flex gap-2">
      <button @click="$emit('follow', event)" class="px-2 py-1 bg-gray-100 rounded">Follow</button>
      <button @click="$emit('bookmark', event)" class="px-2 py-1 bg-gray-100 rounded">Bookmark</button>
      <button @click="$emit('buyTickets', event)" class="px-2 py-1 bg-blue-600 text-white rounded">Buy Ticket</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  event: Object
})
</script>
