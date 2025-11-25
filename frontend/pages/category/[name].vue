<template>
  <div class="min-h-screen bg-gray-50 px-6 py-12 max-w-7xl mx-auto">
    <h1 class="text-3xl font-bold text-gray-900 mb-6">Category: {{ categoryName }}</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <EventCard v-for="e in filteredEvents" :key="e.id" :event="{
        title: e.title || 'Untitled Event',
        description: e.description || 'No description',
        featuredImage: e.featuredImage || '/images/placeholder.jpg',
        venue: e.venue || 'TBA',
        date: e.date || '',
        price: e.price || 0,
        category: e.category || ''
      }" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import events from '../../events/events.json'
import EventCard from '../../components/EventCard.vue'

const route = useRoute()
const categoryName = route.params.name

const filteredEvents = computed(() => events.filter(e => e && e.title && e.category === categoryName))
</script>
