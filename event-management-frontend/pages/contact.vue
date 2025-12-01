<template>
  <div class="min-h-screen bg-gray-50 py-24 px-6">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-6xl font-bold text-center mb-12 text-indigo-600">Contact Us</h1>
      <UCard>
        <UForm @submit="send">
          <UFormGroup label="Name" required><UInput v-model="name" /></UFormGroup>
          <UFormGroup label="Email" required><UInput v-model="email" type="email" /></UFormGroup>
          <UFormGroup label="Message" required><UTextarea v-model="message" rows="6" /></UFormGroup>
          <UButton type="submit" color="primary" size="xl" class="w-full">Send</UButton>
        </UForm>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
const name = ref(''), email = ref(''), message = ref('')
const send = () => { alert('Sent!'); name.value = email.value = message.value = '' }
</script>
