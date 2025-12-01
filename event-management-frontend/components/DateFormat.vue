<template>
  <span>{{ formatted }}</span>
</template>

<script setup lang="ts">
const props = defineProps<{ date: string }>()

const formatted = computed(() => {
  if (!props.date) return 'Date not set'
  
  // Handle PostgreSQL format: "2025-04-05 14:30:00"
  const cleaned = props.date.replace(' ', 'T') + 'Z'
  const date = new Date(cleaned)
  
  if (isNaN(date.getTime())) return 'Invalid Date'
  
  return date.toLocaleString('en-KE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
})
</script>
