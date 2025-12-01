
<template>
  <div v-if="loading" class="text-center py-32">
    <div class="inline-block animate-spin rounded-full h-20 w-20 border-8 border-blue-600 border-t-transparent"></div>
  </div>

  <div v-else-if="!event" class="text-center py-32 text-4xl text-red-600 font-bold">
    Event not found
  </div>

  <div v-else class="max-w-7xl mx-auto py-12 px-6">
    <div class="relative h-96 rounded-3xl overflow-hidden shadow-2xl mb-12">
      <img v-if="event.images?.[0]" :src="event.images[0]" class="w-full h-full object-cover" />
      <div v-else class="w-full h-full bg-gradient-to-br from-purple-600 to-blue-700"></div>
      <div class="absolute inset-0 bg-black bg-opacity-50 flex items-end p-10">
        <h1 class="text-6xl font-bold text-white drop-shadow-2xl">{{ event.title }}</h1>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <div class="lg:col-span-2 space-y-10">
        <div class="bg-white rounded-3xl shadow-2xl p-10">
          <h2 class="text-4xl font-bold mb-8">About This Event</h2>
          <p class="text-xl leading-relaxed text-gray-700">{{ event.description || 'No description' }}</p>
        </div>
      </div>

      <div class="space-y-8">
        <div class="bg-white rounded-3xl shadow-2xl p-10">
          <div class="space-y-8">
            <div><p class="text-gray-500 text-xl">When</p><p class="text-3xl font-bold"><DateFormat :date="event.start_date" /></p></div>
            <div><p class="text-gray-500 text-xl">Where</p><p class="text-3xl font-bold">{{ event.location }}</p></div>
            <div><p class="text-gray-500 text-xl">Price</p><p class="text-5xl font-bold text-green-600">{{ event.price > 0 ? 'KES ' + event.price : 'FREE' }}</p></div>
          </div>

          <div class="mt-12 flex gap-6">
            <button @click="handleFollow" class="flex-1 py-5 rounded-2xl text-white font-bold text-2xl"
              :class="event.is_followed ? 'bg-gray-700' : 'bg-blue-600 hover:bg-blue-700'">
              {{ event.is_followed ? 'Following' : 'Follow Event' }}
            </button>
            <button @click="handleBookmark" class="flex-1 py-5 rounded-2xl font-bold text-2xl"
              :class="event.is_bookmarked ? 'bg-yellow-600' : 'bg-gray-300 hover:bg-gray-400'">
              {{ event.is_bookmarked ? 'Bookmarked' : 'Bookmark' }}
            </button>
          </div>
        </div>

        <ClientOnly v-if="event.lat && event.lng">
          <div class="bg-white rounded-3xl shadow-2xl p-8">
            <h3 class="text-3xl font-bold mb-6">Location</h3>
            <div ref="mapContainer" class="h-96 rounded-2xl overflow-hidden"></div>
          </div>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { useApi } from '~/composables/useApi'
import { useEvents } from '~/composables/useEvents'
import DateFormat from '~/components/DateFormat.vue'

const route = useRoute()
const api = useApi()
const { toggleFollow, toggleBookmark } = useEvents()

const event = ref<any>(null)
const loading = ref(true)
const mapContainer = ref(null)

onMounted(async () => {
  try {
    const res = await api.get('/events', { params: { id: route.params.id } })
    event.value = res.data
    if (event.value) {
      const [f, b] = await Promise.all([
        api.get('/events/followed').catch(() => ({data: []})),
        api.get('/events/bookmarked').catch(() => ({data: []}))
      ])
      event.value.is_followed = f.data.some((e: any) => e.id === event.value.id)
      event.value.is_bookmarked = b.data.some((e: any) => e.id === event.value.id)
    }
  } catch (e) { event.value = null } finally { loading.value = false }

  await nextTick()
  if (mapContainer.value && event.value?.lat) {
    const L = await import('leaflet')
    L.default.map(mapContainer.value).setView([event.value.lat, event.value.lng], 15)
      .addLayer(L.default.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'))
      .addLayer(L.default.marker([event.value.lat, event.value.lng]))
  }
})

const handleFollow = () => toggleFollow(event.value.id, event.value.is_followed).then(() => event.value.is_followed = !event.value.is_followed)
const handleBookmark = () => toggleBookmark(event.value.id, event.value.is_bookmarked).then(() => event.value.is_bookmarked = !event.value.is_bookmarked)
</script>
