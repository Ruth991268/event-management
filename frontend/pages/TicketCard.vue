<template>
  <div class="bg-white rounded-xl shadow-md p-4 flex justify-between items-center hover:shadow-lg transition">
    <div>
      <h3 class="font-bold text-lg">{{ ticket.name }}</h3>
      <p class="text-sm text-neutral-600">Quantity: {{ ticket.quantity }}</p>
    </div>
    <div class="text-secondary font-semibold">${{ ticket.price }}</div>
  </div>
</template>

<script setup>
defineProps({
  ticket: Object
})
</script>
