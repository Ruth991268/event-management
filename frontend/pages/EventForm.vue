<template>
  <form @submit.prevent="submitForm" class="bg-white p-6 rounded-2xl shadow-md grid gap-4">
    <h2 class="text-xl font-semibold">Event details</h2>

    <input v-model="title" type="text" placeholder="Event title" class="border rounded-lg px-4 py-2" required />

    <textarea v-model="description" placeholder="Event description" class="border rounded-lg px-4 py-2" rows="4" required></textarea>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <input v-model="date" type="date" class="border rounded-lg px-4 py-2" required />
      <input v-model="time" type="time" class="border rounded-lg px-4 py-2" />
    </div>

    <input v-model="venue" placeholder="Venue / Address" class="border rounded-lg px-4 py-2" required />

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <input v-model.number="price" type="number" min="0" placeholder="Price (0 = Free)" class="border rounded-lg px-4 py-2" />
      <select v-model="category" class="border rounded-lg px-4 py-2" required>
        <option value="" disabled>Select category</option>
        <option v-for="c in categories" :key="c.id" :value="c.name">{{ c.name }}</option>
      </select>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
      <input v-model="tags" placeholder="workshop, music, tech" class="border rounded-lg px-4 py-2 w-full" />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Location (select on map)</label>
      <MapPicker v-model="location" />
      <p v-if="location" class="text-xs text-gray-500 mt-2">Selected: {{ location.lat }}, {{ location.lng }}</p>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Upload images (choose featured)</label>
      <input type="file" multiple accept="image/*" @change="handleFiles" />
      <div v-if="imagesPreview.length" class="mt-3 flex gap-3 flex-wrap">
        <div
          v-for="(src, idx) in imagesPreview"
          :key="idx"
          class="cursor-pointer border rounded p-1"
          :class="featured === idx ? 'ring-2 ring-blue-600' : ''"
          @click="featured = idx"
        >
          <img :src="src" class="w-28 h-20 object-cover rounded" />
          <div class="text-xs text-center mt-1">{{ featured === idx ? 'Featured' : 'Use as featured' }}</div>
        </div>
      </div>
    </div>

    <div class="flex gap-2 items-center mt-2">
      <button type="submit" class="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">Save event</button>
      <button type="button" @click="resetForm" class="px-4 py-2 border rounded-lg">Reset</button>
      <div v-if="error" class="text-red-600 ml-3">{{ error }}</div>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import MapPicker from './MapPicker.vue'
import categoriesList from '../events/categories.json'

const title = ref('')
const description = ref('')
const date = ref('')
const time = ref('')
const venue = ref('')
const price = ref(0)
const category = ref('')
const tags = ref('')
const location = ref(null)
const images = ref([]) // actual File objects
const imagesPreview = ref([]) // objectURLs for preview
const featured = ref(0)
const error = ref('')
const categories = categoriesList

// handle file selection (preview only)
function handleFiles(e) {
  const files = Array.from(e.target.files || [])
  images.value = files
  // revoke old URLs
  imagesPreview.value.forEach(u => URL.revokeObjectURL(u))
  imagesPreview.value = files.map(f => URL.createObjectURL(f))
  featured.value = 0
}

function validate() {
  if (!title.value.trim()) { error.value = 'Title required'; return false }
  if (!description.value.trim()) { error.value = 'Description required'; return false }
  if (!date.value) { error.value = 'Date required'; return false }
  if (!venue.value.trim()) { error.value = 'Venue required'; return false }
  if (!category.value) { error.value = 'Category required'; return false }
  error.value = ''
  return true
}

function resetForm() {
  title.value = ''
  description.value = ''
  date.value = ''
  time.value = ''
  venue.value = ''
  price.value = 0
  category.value = ''
  tags.value = ''
  location.value = null
  images.value = []
  imagesPreview.value.forEach(u => URL.revokeObjectURL(u))
  imagesPreview.value = []
  featured.value = 0
  error.value = ''
}

import { defineEmits } from 'vue'
const emit = defineEmits(['submit'])

function submitForm() {
  if (!validate()) return

  // Build event payload. For images, we send preview URLs here (frontend-only).
  // When integrating with backend, send the actual File objects via FormData.
  const payload = {
    title: title.value.trim(),
    description: description.value.trim(),
    date: date.value + (time.value ? `T${time.value}:00` : ''),
    venue: venue.value.trim(),
    price: Number(price.value || 0),
    category: category.value,
    tags: tags.value ? tags.value.split(',').map(t => t.trim()).filter(Boolean) : [],
    location: location.value || null,
    images: imagesPreview.value.slice(), // previews for mock/demo
    featuredImage: imagesPreview.value[featured.value] || null
  }

  emit('submit', payload)
}
</script>

<style scoped>
/* a couple of small tweaks */
</style>
