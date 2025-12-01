<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-7xl mx-auto px-6">
      <h1 class="text-5xl font-black text-center mb-12 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
        My Events
      </h1>
      <div v-if="events.length === 0" class="text-center py-20 text-2xl text-gray-600">
        No events yet — <NuxtLink to="/events/create" class="text-purple-600 font-bold underline">create one!</NuxtLink>
      </div>
      <div class="grid md:grid-cols-3 gap-8">
        <div v-for="event in events" :key="event.id" class="bg-white rounded-2xl shadow-xl p-6">
          <h3 class="text-2xl font-bold">{{ event.title }}</h3>
          <p class="text-gray-600">{{ event.location }}</p>
          <p class="text-purple-600 font-bold mt-4">KES {{ event.price }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
const api = useApi()
const { user } = useAuth()
const events = ref([])
onMounted(async () => {
  const all = await api.get('/events/public')
  events.value = all.filter((e: any) => e.created_by === user.value?.id)
})
</script>