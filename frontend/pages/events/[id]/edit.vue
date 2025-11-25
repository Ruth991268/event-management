<template>
  <div class="max-w-2xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">Edit Event</h1>

    <Form @submit="onSubmit" v-if="loaded">
      <div class="mb-4">
        <label class="block mb-1">Title</label>
        <Field v-model="form.title" name="title" class="w-full border rounded px-3 py-2" />
      </div>

      <div class="mb-4">
        <label class="block mb-1">Description</label>
        <Field v-model="form.description" name="description" as="textarea" class="w-full border rounded px-3 py-2" />
      </div>

      <div class="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label class="block mb-1">Location</label>
          <Field v-model="form.location" name="location" class="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label class="block mb-1">Category</label>
          <Field v-model="form.category" name="category" class="w-full border rounded px-3 py-2" />
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label class="block mb-1">Start</label>
          <input v-model="startLocal" type="datetime-local" class="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label class="block mb-1">End</label>
          <input v-model="endLocal" type="datetime-local" class="w-full border rounded px-3 py-2" />
        </div>
      </div>

      <div class="mb-4">
        <label class="block mb-1">Price</label>
        <Field v-model="form.price" name="price" type="number" class="w-full border rounded px-3 py-2" />
      </div>

      <button type="submit" :disabled="loading" class="bg-indigo-600 text-white py-2 px-4 rounded">
        {{ loading ? 'Updating...' : 'Update Event' }}
      </button>

      <p v-if="error" class="text-red-500 mt-3">{{ error }}</p>
      <p v-if="success" class="text-green-600 mt-3">{{ success }}</p>
    </Form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Form, Field } from 'vee-validate'
const { $api } = useNuxtApp()

const route = useRoute()
const router = useRouter()
const id = route.params.id

const loaded = ref(false)
const loading = ref(false)
const error = ref('')
const success = ref('')
const form = ref({ title: '', description: '', location: '', category: '', price: 0 })
const startLocal = ref('')
const endLocal = ref('')

const toLocalInput = (isoStr) => {
  if (!isoStr) return ''
  const d = new Date(isoStr)
  const pad = (n) => String(n).padStart(2, '0')
  const YYYY = d.getFullYear()
  const MM = pad(d.getMonth() + 1)
  const DD = pad(d.getDate())
  const hh = pad(d.getHours())
  const mm = pad(d.getMinutes())
  return `${YYYY}-${MM}-${DD}T${hh}:${mm}`
}
const toRFC3339 = (localDateStr) => (localDateStr ? new Date(localDateStr).toISOString() : '')

onMounted(async () => {
  try {
    const res = await $api(`/events/get?id=${id}`, { method: 'GET' })
    form.value.title = res.title
    form.value.description = res.description
    form.value.location = res.location
    form.value.category = res.category || ''
    form.value.price = res.price || 0
    startLocal.value = toLocalInput(res.start_date)
    endLocal.value = toLocalInput(res.end_date)
    loaded.value = true
  } catch (err) {
    error.value = err?.data?.error || err?.message || 'Failed to load event'
  }
})

const onSubmit = async () => {
  loading.value = true
  error.value = ''
  success.value = ''
  try {
    const body = {
      title: form.value.title,
      description: form.value.description,
      location: form.value.location,
      category: form.value.category,
      start_date: toRFC3339(startLocal.value),
      end_date: toRFC3339(endLocal.value),
      price: Number(form.value.price || 0)
    }
    await $api(`/events/update?id=${id}`, { method: 'PUT', body })
    success.value = 'Event updated'
    setTimeout(() => router.push('/events'), 800)
  } catch (err) {
    error.value = err?.data?.error || err?.message || 'Update failed'
  } finally {
    loading.value = false
  }
}
</script>
