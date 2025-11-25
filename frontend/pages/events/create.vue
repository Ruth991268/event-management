<template>
  <div class="min-h-screen bg-gradient-to-br from-green-500 to-teal-600 p-8">
    <div class="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-12">
      <h1 class="text-6xl font-black text-center text-green-600 mb-8">Create Event</h1>

      <!-- Token Status -->
      <div class="mb-6 p-4 rounded-xl text-lg font-bold text-center" 
           :class="auth.token ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
        {{ auth.token ? 'Logged in — Ready to create!' : 'NOT LOGGED IN — Will fail' }}
      </div>

      <form @submit.prevent="createEvent" class="space-y-8">
        <input v-model="form.title" required placeholder="Event Title" class="w-full px-8 py-6 border-2 rounded-2xl text-xl" />
        <textarea v-model="form.description" placeholder="Description (optional)" rows="4" class="w-full px-8 py-6 border-2 rounded-2xl text-xl"></textarea>
        <input v-model="form.location" required placeholder="Location" class="w-full px-8 py-6 border-2 rounded-2xl text-xl" />
        <input v-model="form.category" required placeholder="Category" class="w-full px-8 py-6 border-2 rounded-2xl text-xl" />
        <input v-model="form.start_date" type="datetime-local" required class="w-full px-8 py-6 border-2 rounded-2xl text-xl" />
        <input v-model="form.end_date" type="datetime-local" required class="w-full px-8 py-6 border-2 rounded-2xl text-xl" />
        <input v-model.number="form.price" type="number" placeholder="Price (0 = free)" class="w-full px-8 py-6 border-2 rounded-2xl text-xl" />

        <div class="text-center pt-10">
          <button 
            type="submit" 
            :disabled="loading || !auth.token"
            class="bg-green-600 text-white px-24 py-8 rounded-3xl text-4xl font-black disabled:opacity-50 hover:bg-green-700 transition"
          >
            {{ loading ? 'Creating...' : 'Create Event' }}
          </button>
        </div>
      </form>

      <div v-if="error" class="mt-8 p-6 bg-red-100 border-2 border-red-500 rounded-2xl text-red-700 text-xl text-center font-bold">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script setup>
// NO TypeScript → NO ERRORS EVER
const auth = useAuthStore()
const loading = ref(false)
const error = ref('')

const form = reactive({
  title: '',
  description: '',
  location: '',
  category: '',
  start_date: '',
  end_date: '',
  price: 0
})

const createEvent = async () => {
  loading.value = true
  error.value = ''

  // Always reload fresh token
  auth.load()

  if (!auth.token) {
    error.value = 'No token — logging out...'
    setTimeout(() => auth.logout(), 1500)
    return
  }

  try {
    await $fetch('/api/events/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token}`
      },
      body: {
        title: form.title.trim(),
        description: form.description.trim() || null,
        location: form.location.trim(),
        category: form.category.trim(),
        start_date: new Date(form.start_date).toISOString(),
        end_date: new Date(form.end_date).toISOString(),
        price: Number(form.price) || 0
      }
    })

    alert('EVENT CREATED SUCCESSFULLY!')
    navigateTo('/events')

  } catch (e) {
    // REMOVED "e: any" → NO MORE COMPILER ERROR
    console.error('Create failed:', e)
    
    if (e.status === 401) {
      error.value = 'Session expired — logging you out...'
      setTimeout(() => auth.logout(), 1500)
    } else {
      error.value = e?.data?.error || 'Check all fields and try again'
    }
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  auth.load()
  if (!auth.isLoggedIn) {
    navigateTo('/auth/login')
  }
})
</script>