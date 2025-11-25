<template>
  <div class="max-w-2xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">Create Event</h1>

    <Form @submit="onSubmit" :validation-schema="schema">
      <div class="mb-4">
        <label class="block mb-1">Title</label>
        <Field name="title" class="w-full border rounded px-3 py-2" />
        <ErrorMessage name="title" class="text-red-500 text-sm mt-1" />
      </div>

      <div class="mb-4">
        <label class="block mb-1">Description</label>
        <Field name="description" as="textarea" class="w-full border rounded px-3 py-2" />
        <ErrorMessage name="description" class="text-red-500 text-sm mt-1" />
      </div>

      <div class="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label class="block mb-1">Location</label>
          <Field name="location" class="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label class="block mb-1">Category</label>
          <Field name="category" class="w-full border rounded px-3 py-2" />
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label class="block mb-1">Start (local)</label>
          <input v-model="startLocal" type="datetime-local" class="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label class="block mb-1">End (local)</label>
          <input v-model="endLocal" type="datetime-local" class="w-full border rounded px-3 py-2" />
        </div>
      </div>

      <div class="mb-4">
        <label class="block mb-1">Price</label>
        <Field name="price" type="number" class="w-full border rounded px-3 py-2" />
      </div>

      <button type="submit" :disabled="loading" class="bg-indigo-600 text-white py-2 px-4 rounded">
        {{ loading ? 'Creating...' : 'Create Event' }}
      </button>

      <p v-if="error" class="text-red-500 mt-3">{{ error }}</p>
      <p v-if="success" class="text-green-600 mt-3">{{ success }}</p>
    </Form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as Yup from 'yup'
import { useRouter } from 'vue-router'
const { $api } = useNuxtApp()

const router = useRouter()
const loading = ref(false)
const error = ref('')
const success = ref('')
const startLocal = ref('')
const endLocal = ref('')

const schema = Yup.object({
  title: Yup.string().required(),
  description: Yup.string().required(),
  location: Yup.string().required(),
  category: Yup.string().required(),
  price: Yup.number().required()
})

const toRFC3339 = (localDateStr) => localDateStr ? new Date(localDateStr).toISOString() : ''

const onSubmit = async (values) => {
  loading.value = true
  error.value = ''
  success.value = ''
  try {
    const body = {
      title: values.title,
      description: values.description,
      location: values.location,
      category: values.category,
      start_date: toRFC3339(startLocal.value),
      end_date: toRFC3339(endLocal.value),
      price: Number(values.price || 0)
    }

    await $api('/events/create', { method: 'POST', body })
    success.value = 'Event created'
    setTimeout(() => router.push('/events'), 700)
  } catch (err) {
    error.value = err?.data?.error || err?.message || 'Create failed'
  } finally {
    loading.value = false
  }
}
</script>
