<template>
  <div class="py-12 px-6">
    <h1 class="text-5xl font-bold mb-12">Published Events</h1>
    <div class="grid md:grid-cols-3 gap-8">
      <EventCard v-for="e in events" :key="e.id" :event="e" />
    </div>
  </div>
</template>

<script setup lang="ts">
const { user } = useAuth()
const events = ref([])
onMounted(async () => {
  const res = await $fetch('http://localhost:8080/events/list')
  events.value = res.filter((e: any) => e.created_by === user.value?.id)
})
</script>
