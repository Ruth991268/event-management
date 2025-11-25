<template>
  <div class="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition">
    <h4 class="font-semibold text-primary">{{ name }}</h4>
    <p class="text-neutral-600 text-sm">{{ description }}</p>
  </div>
</template>

<script setup>
defineProps({
  name: String,
  description: String
})
</script>
