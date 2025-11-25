<template>
  <div class="bg-white shadow rounded-2xl overflow-hidden hover:shadow-lg transition">
    <img :src="image || '/images/placeholder.jpg'" class="w-full h-48 object-cover" />
    <div class="p-4">
      <h3 class="font-semibold text-lg">{{ title || 'Untitled Event' }}</h3>
      <p class="text-gray-500 text-sm">{{ formatDate(date) }}</p>
      <p class="text-gray-500 text-sm">{{ location || 'Location TBA' }}</p>
      <p class="mt-2 text-gray-600">{{ description || 'No description available.' }}</p>
      <p class="mt-1 font-bold">{{ price ? '$' + price : 'Free' }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  image: String,
  title: String,
  date: String,
  location: String,
  description: String,
  price: [Number, String]
})

function formatDate(d) {
  try { return new Date(d).toLocaleString() } catch { return d }
}
</script>
