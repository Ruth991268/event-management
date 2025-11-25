<template>
  <form @submit.prevent="submitForm" class="bg-white p-6 rounded-2xl shadow-md grid gap-4">
    <input v-model="title" type="text" placeholder="Event title" class="border rounded-lg px-4 py-2"/>
    <textarea v-model="description" placeholder="Event description" class="border rounded-lg px-4 py-2"></textarea>
    <input v-model="price" type="number" placeholder="Price (0 for free)" class="border rounded-lg px-4 py-2"/>
    <input v-model="date" type="date" class="border rounded-lg px-4 py-2"/>
    
    <select v-model="category" class="border rounded-lg px-4 py-2">
      <option value="">Select category</option>
      <option v-for="c in categories" :key="c.id" :value="c.name">{{ c.name }}</option>
    </select>

    <input v-model="tags" placeholder="Tags (comma separated)" class="border rounded-lg px-4 py-2"/>
    
    <label class="block text-gray-700">Upload images:</label>
    <input type="file" multiple @change="handleImages" class="mb-4"/>

    <MapPicker v-model="location"/>

    <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700">Submit</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import MapPicker from './MapPicker.vue'
import categoriesList from '../events/categories.json'

const title = ref('')
const description = ref('')
const price = ref(0)
const date = ref('')
const category = ref('')
const tags = ref('')
const location = ref(null)
const images = ref([])

const categories = categoriesList

function handleImages(e) {
  images.value = Array.from(e.target.files)
}

function submitForm() {
  const eventData = { title: title.value, description: description.value, price: price.value, date: date.value, category: category.value, tags: tags.value.split(','), location: location.value, images: images.value }
  console.log('Submitting event', eventData)
  alert('Event submitted! Check console.')
}
</script>
