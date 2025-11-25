<template>
  <div class="min-h-screen bg-gray-50">
    <main class="max-w-3xl mx-auto py-8 px-6">
      <h2 class="text-2xl font-semibold mb-6">Create Event</h2>
      <EventForm @submit="onSubmit" />
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import EventForm from '../components/EventForm.vue'
import baseEvents from '../events/events.json'

const router = useRouter()

// helper to read events (localStorage-backed)
function readEvents() {
  try {
    const s = localStorage.getItem('mock_events_v1')
    if (s) return JSON.parse(s)
  } catch (err) { console.error(err) }
  // fallback to base file copy
  return Array.isArray(baseEvents) ? JSON.parse(JSON.stringify(baseEvents)) : []
}

function writeEvents(list) {
  try { localStorage.setItem('mock_events_v1', JSON.stringify(list)) } catch (err) { console.error(err) }
}

function onSubmit(eventData) {
  // Build event object with id & mock user info
  const list = readEvents()
  const id = Date.now() // simple id
  const newEvent = {
    id,
    title: eventData.title,
    description: eventData.description,
    date: eventData.date || new Date().toISOString(),
    venue: eventData.venue,
    price: eventData.price || 0,
    category: eventData.category || 'General',
    tags: eventData.tags || [],
    featuredImage: eventData.featuredImage || '/images/placeholder.jpg',
    images: eventData.images || [],
    userId: 1 // mock owner id
  }

  list.unshift(newEvent) // newest first
  writeEvents(list)

  // redirect to events page where new event will be visible
  router.push('/events')
}
</script>

<style scoped>
/* nothing special */
</style>
