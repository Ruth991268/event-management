<template>
  <button
    @click="$emit('click')"
    :class="['px-4 py-2 rounded-lg text-sm font-medium', selected ? 'bg-blue-600 text-white' : 'bg-white border']"
  >
    {{ category.name }}
  </button>
</template>

<script setup>
defineProps({
  category: { type: Object, required: true },
  selected: { type: Boolean, default: false }
})
</script>
