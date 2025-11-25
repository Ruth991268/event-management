<template>
  <div class="bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden">
    <img :src="event.featuredImage || '/images/placeholder.jpg'" alt="Event image" class="w-full h-48 object-cover"/>
    <div class="p-4">
      <h3 class="font-semibold text-lg">{{ event.title }}</h3>
      <p class="text-gray-500 text-sm mt-1">{{ event.date | formatDate }}</p>
      <p class="text-gray-700 mt-2">{{ event.description }}</p>
      <div class="mt-3 flex justify-between items-center">
        <span class="font-semibold">{{ event.price ? `$${event.price}` : 'Free' }}</span>
        <NuxtLink :to="`/event/${event.id}`" class="text-blue-600 text-sm">View →</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  event: {
    type: Object,
    required: true
  }
})

// Simple filter for displaying date
const formatDate = (d) => {
  try { return new Date(d).toLocaleDateString() } catch { return d }
}
</script>
