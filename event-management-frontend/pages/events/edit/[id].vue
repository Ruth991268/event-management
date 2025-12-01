<template>
  <div class="max-w-6xl mx-auto py-12 px-4">
    <h1 class="text-5xl font-bold text-center mb-12">Create Your Event</h1>

    <Form @submit="onSubmit" :validation-schema="schema" class="bg-white rounded-3xl shadow-2xl p-10">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Left: Form -->
        <div class="space-y-8">
          <Field name="title" type="text" placeholder="Event Title" class="input text-2xl" />
          <ErrorMessage name="title" class="text-red-600" />

          <Field as="textarea" name="description" rows="6" placeholder="Describe your event..." class="input" />
          <ErrorMessage name="description" class="text-red-600" />

          <div class="grid grid-cols-2 gap-6">
            <Field as="select" name="category" class="input">
              <option value="">Category</option>
              <option>Music</option><option>Tech</option><option>Food</option>
              <option>Art</option><option>Sports</option><option>Business</option>
            </Field>
            <Field name="location" type="text" placeholder="Venue" class="input" />
          </div>

          <div class="grid grid-cols-2 gap-6">
            <Field name="start_date" type="datetime-local" class="input" />
            <Field name="end_date" type="datetime-local" class="input" />
          </div>

          <Field name="price" type="number" placeholder="Price (KES)" class="input" />
        </div>

        <!-- Right: Images + Map -->
        <div class="space-y-8">
          <!-- Image Upload -->
          <div>
            <label class="block text-xl font-bold mb-4">Event Images</label>
            <input type="file" multiple accept="image/*" @change="e => files = Array.from(e.target.files)" class="block w-full" />
            <button type="button" @click="upload" :disabled="uploading" class="mt-4 btn btn-primary">
              {{ uploading ? 'Uploading...' : 'Upload Images' }}
            </button>
            <div class="grid grid-cols-3 gap-4 mt-6">
              <img v-for="url in uploadedUrls" :src="url" class="h-40 object-cover rounded-xl shadow" />
            </div>
          </div>

          <!-- Map -->
          <div>
            <label class="block text-xl font-bold mb-4">Pick Location on Map</label>
            <div ref="map" class="h-96 rounded-xl border-4 border-gray-300"></div>
            <p class="mt-4 text-lg">Lat: {{ lat }} | Lng: {{ lng }}</p>
          </div>
        </div>
      </div>

      <div class="text-center mt-12">
        <button type="submit" class="btn btn-primary text-2xl px-20 py-6">CREATE EVENT</button>
      </div>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useImageUpload } from '~/composables/useImageUpload'

const { files, uploading, uploadedUrls, upload } = useImageUpload()
const map = ref(null)
let leafletMap: any
const lat = ref(-1.2921)
const lng = ref(36.8219)

onMounted(() => {
  leafletMap = L.map(map.value).setView([lat.value, lng.value], 13)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(leafletMap)
  const marker = L.marker([lat.value, lng.value]).addTo(leafletMap)
  leafletMap.on('click', (e: any) => {
    lat.value = e.latlng.lat
    lng.value = e.latlng.lng
    marker.setLatLng(e.latlng)
  })
})

const schema = { /* your validation */ }
const onSubmit = async (values: any) => {
  await useApi().post('/events', {
    ...values,
    start_date: new Date(values.start_date).toISOString(),
    end_date: new Date(values.end_date).toISOString(),
    images: uploadedUrls.value,
    lat: lat.value,
    lng: lng.value
  })
  navigateTo('/events')
}
</script>
