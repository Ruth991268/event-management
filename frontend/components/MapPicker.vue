<template>
  <div class="w-full h-96 rounded-xl overflow-hidden border">
    <client-only>
      <div id="map" class="w-full h-full"></div>
    </client-only>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const emit = defineEmits(['locationSelected'])
const map = ref(null)
let marker = null

onMounted(async () => {
  // Load Leaflet only on client
  if (process.client) {
    const L = await import('leaflet')
    await import('leaflet/dist/leaflet.css')

    // Initialize map
    map.value = L.map('map').setView([9.03, 38.74], 13) // default: Addis Ababa

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map.value)

    // Click to select location
    map.value.on('click', e => {
      const { lat, lng } = e.latlng

      // Remove previous marker
      if (marker) map.value.removeLayer(marker)

      // Add new marker
      marker = L.marker([lat, lng]).addTo(map.value)

      // Emit to parent
      emit('locationSelected', { lat, lng })
    })
  }
})
</script>

<style scoped>
#map {
  height: 100%;
}
</style>
