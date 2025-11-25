<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 class="text-2xl font-bold text-blue-600">Dashboard</h1>
      <nav class="flex gap-4">
        <NuxtLink to="/" class="text-gray-700 hover:text-blue-600">Home</NuxtLink>
        <NuxtLink to="/events" class="text-gray-700 hover:text-blue-600">Events</NuxtLink>
        <NuxtLink to="/create-event" class="text-gray-700 hover:text-blue-600">Create Event</NuxtLink>
      </nav>
    </header>

    <main class="max-w-7xl mx-auto py-8 px-6">
      <h2 class="text-2xl font-semibold mb-6">Your Events</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <EventCard v-for="e in userEvents" :key="e.id" :event="e" />
      </div>
    </main>

    <footer class="bg-white border-t mt-12 p-6 text-center text-gray-600">
      © 2025 Eventify. All rights reserved.
    </footer>
  </div>
</template>

<script setup>
import EventCard from '../components/EventCard.vue'
import events from '../events/events.json'

const userId = 1 // mock logged-in user id
const userEvents = events.filter(e => e.userId === userId)
</script>
