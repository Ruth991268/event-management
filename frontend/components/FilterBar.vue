<template>
  <div class="flex flex-wrap gap-3 mb-6">
    <input v-model="query" type="search" placeholder="Search events..." class="flex-1 px-4 py-2 rounded-xl border focus:ring-2 focus:ring-blue-600" />
    <select v-model="selectedCategory" class="px-4 py-2 rounded-xl border">
      <option value="">All categories</option>
      <option v-for="c in categories" :key="c.id" :value="c.name">{{ c.name }}</option>
    </select>
    <input type="date" v-model="selectedDate" class="px-4 py-2 rounded-xl border" />
    <input type="number" v-model="maxPrice" placeholder="Max price" class="px-4 py-2 rounded-xl border" />
    <MapPicker v-model="location" />
  </div>
</template>

<script setup>
import { ref, watch, defineEmits } from 'vue'
import MapPicker from './MapPicker.vue'

const emit = defineEmits(['update'])

const props = defineProps({
  categories: Array
})

const query = ref('')
const selectedCategory = ref('')
const selectedDate = ref('')
const maxPrice = ref('')
const location = ref(null)

// Emit filter changes
watch([query, selectedCategory, selectedDate, maxPrice, location], () => {
  emit('update', { query: query.value, category: selectedCategory.value, date: selectedDate.value, maxPrice: maxPrice.value, location: location.value })
})
</script>
