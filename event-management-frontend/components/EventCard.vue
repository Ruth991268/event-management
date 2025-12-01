<template>
  <UCard class="hover:shadow-xl transition-shadow">
    <template #header>
      <div class="h-48 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-lg"></div>
    </template>
    <h3 class="text-2xl font-bold mb-2">{{ event.title }}</h3>
    <p class="text-gray-600 mb-2">{{ event.location }}</p>
    <p class="text-sm text-gray-500"><DateFormat :date="event.start_date" /></p>
    <UButton :to="`/events/${event.id}`" color="primary" variant="outline" class="w-full mt-4">View Details</UButton>
  </UCard>
</template>

<script setup lang="ts">
defineProps<{ event: any }>()
</script>
