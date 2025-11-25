<template>
  <div class="min-h-screen bg-gray-50 px-6 py-12 max-w-3xl mx-auto">

    <!-- Profile Card -->
    <div class="bg-white p-8 rounded-2xl shadow-md">
      <h1 class="text-2xl font-bold text-gray-900 mb-6">Your Profile</h1>

      <div class="flex flex-col sm:flex-row gap-6 items-center mb-6">
        <img :src="user.avatar || '/images/avatar-placeholder.png'" alt="Avatar" class="w-24 h-24 rounded-full object-cover border"/>
        <div class="flex-1">
          <label class="block text-gray-700 mb-1">Full Name</label>
          <input v-model="user.name" type="text" class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600"/>

          <label class="block text-gray-700 mt-4 mb-1">Email</label>
          <input v-model="user.email" type="email" class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600"/>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row gap-4 items-center">
        <label class="block text-gray-700">Avatar URL</label>
        <input v-model="user.avatar" type="text" placeholder="Paste avatar URL" class="flex-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600"/>
      </div>

      <button @click="saveProfile" class="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700">Save Changes</button>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const user = ref({
  name: 'John Doe',
  email: 'john@example.com',
  avatar: '/images/avatar-placeholder.png'
})

function saveProfile() {
  // placeholder for saving logic
  alert(`Profile updated!\nName: ${user.value.name}\nEmail: ${user.value.email}`)
}
</script>
