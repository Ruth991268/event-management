<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-md bg-white rounded-xl shadow-md p-8">
      <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>

      <Form @submit="onSubmit" :validation-schema="schema">
        <div class="mb-4">
          <label class="block mb-1">Email</label>
          <Field name="email" type="email" class="w-full border rounded px-3 py-2" />
          <ErrorMessage name="email" class="text-red-500 text-sm mt-1" />
        </div>

        <div class="mb-4">
          <label class="block mb-1">Password</label>
          <Field name="password" type="password" class="w-full border rounded px-3 py-2" />
          <ErrorMessage name="password" class="text-red-500 text-sm mt-1" />
        </div>

        <button type="submit" :disabled="loading" class="w-full bg-indigo-600 text-white py-2 rounded">
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>

        <p v-if="errorMessage" class="text-red-500 mt-3 text-center">{{ errorMessage }}</p>
      </Form>

      <div class="text-center mt-4">
        <NuxtLink to="/auth/signup" class="text-indigo-600">Don't have an account? Sign up</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as Yup from 'yup'

const { $api } = useNuxtApp()
const router = useRouter()

const loading = ref(false)
const errorMessage = ref('')

const schema = Yup.object({
  email: Yup.string().email().required('Email required'),
  password: Yup.string().required('Password required')
})

const onSubmit = async (values) => {
  loading.value = true
  errorMessage.value = ''
  try {
    const res = await $api('/login', { method: 'POST', body: values })
    if (res?.token) {
      localStorage.setItem('token', res.token)
      localStorage.setItem('user', JSON.stringify(res.user || {}))
      router.push('/events')
      return
    }
    errorMessage.value = res?.message || 'Login failed'
  } catch (err) {
    errorMessage.value = err?.data?.error || err?.message || 'Login failed'
  } finally {
    loading.value = false
  }
}
</script>
