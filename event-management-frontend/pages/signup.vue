<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 via-white to-amber-50 flex items-center justify-center p-6">
    <div class="w-full max-w-6xl h-[80vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex">
      <div class="w-1/2 bg-cover bg-center" style="background-image: url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')">
        <div class="h-full bg-black bg-opacity-20 flex items-center justify-center p-12">
          <div class="text-center text-white">
            <h1 class="text-5xl font-black mb-4">Eventify</h1>
            <p class="text-xl">Your events, beautifully organized</p>
          </div>
        </div>
      </div>

      <div class="w-1/2 flex flex-col justify-center p-12">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-gray-800">Create Account</h2>
          <p class="mt-2 text-gray-600">Sign up to start creating events</p>
        </div>

        <div v-if="authError" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
          {{ authError }}
        </div>

        <form @submit.prevent="handleSignup" class="space-y-6">
          <div>
            <input v-model="form.name" type="text" required placeholder="Full Name" 
                   class="w-full px-6 py-4 rounded-xl border border-gray-300 text-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
          </div>
          <div>
            <input v-model="form.email" type="email" required placeholder="Email" 
                   class="w-full px-6 py-4 rounded-xl border border-gray-300 text-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
          </div>
          <div>
            <input v-model="form.password" type="password" required minlength="6" placeholder="Password" 
                   class="w-full px-6 py-4 rounded-xl border border-gray-300 text-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
          </div>

          <button type="submit" :disabled="isLoading"
            class="w-full py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold text-xl rounded-xl hover:from-purple-700 hover:to-purple-800 transition disabled:opacity-70">
            {{ isLoading ? 'Creating account...' : 'Create Account' }}
          </button>
        </form>

        <p class="text-center mt-8 text-gray-600">
          Have account? <NuxtLink to="/login" class="text-purple-600 font-bold underline">Log in</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface AuthResponse {
  message: string;
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

const form = ref({
  name: 'John Doe',
  email: 'john@test.com',
  password: '123456'
});

const isLoading = ref(false);
const authError = ref('');

const handleSignup = async () => {
  isLoading.value = true;
  authError.value = '';

  try {
    const response = await $fetch<AuthResponse>('http://localhost:8080/signup', {
      method: 'POST',
      body: { 
        name: form.value.name,
        email: form.value.email,
        password: form.value.password
      },
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (process.client) {
      localStorage.setItem('jwt_token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }

    window.location.href = '/dashboard';

  } catch (err: any) {
    if (err?.status === 400) {
      authError.value = err?.data?.message || 'Invalid request data';
    } else if (err?.status === 409) {
      authError.value = 'Email already exists';
    } else if (err?.status === 404) {
      authError.value = 'Server endpoint not found';
    } else if (err?.status === 500) {
      authError.value = 'Server error';
    } else if (err?.message?.includes('fetch')) {
      authError.value = 'Cannot connect to server';
    } else if (err?.data?.message) {
      authError.value = err.data.message;
    } else {
      authError.value = 'Signup failed';
    }
  } finally {
    isLoading.value = false;
  }
};
</script>