<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 via-white to-amber-50 flex items-center justify-center p-6">
    <div class="w-full max-w-6xl h-[80vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex">
      <!-- Left side - Image (50%) -->
      <div class="w-1/2 bg-gray-100">
        <img 
          src="/images/login-hero.png"
          alt="Welcome Back"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- Right side - Login Form (50%) -->
      <div class="w-1/2 flex flex-col justify-center p-12">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-gray-800">Log In</h2>
          <p class="mt-2 text-gray-600">Access your events and bookings</p>
        </div>

        <!-- Success Message -->
        <div v-if="successMessage" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4">
          {{ successMessage }}
        </div>

        <!-- Error Message -->
        <div v-if="authError" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
          {{ authError }}
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <input
              v-model="form.email"
              type="email"
              required
              placeholder="Email"
              class="w-full px-6 py-4 rounded-xl border border-gray-300 text-lg focus:outline-none focus:ring-4 focus:ring-purple-200"
            />
          </div>
          <div>
            <input
              v-model="form.password"
              type="password"
              required
              placeholder="Password"
              class="w-full px-6 py-4 rounded-xl border border-gray-300 text-lg focus:outline-none focus:ring-4 focus:ring-purple-200"
            />
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="w-full py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold text-xl rounded-xl hover:from-purple-700 transition disabled:opacity-70"
          >
            {{ isLoading ? 'Logging in...' : 'Log In' }}
          </button>
        </form>

        <p class="text-center mt-8 text-gray-600">
          No account?
          <NuxtLink to="/signup" class="text-purple-600 font-bold underline">
            Sign up free
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const form = ref({
  email: 'john@test.com',
  password: '123456'
});

const isLoading = ref(false);
const authError = ref('');
const successMessage = ref('');

const handleLogin = async () => {
  isLoading.value = true;
  authError.value = '';
  successMessage.value = '';

  try {
    console.log('🚀 Sending login request to backend...');
    console.log('Request payload:', { 
      email: form.value.email, 
      password: '***' // Don't log actual password
    });

    // Use fetch instead of $fetch to get more control
    const response = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: form.value.email,
        password: form.value.password
      })
    });

    console.log('📡 Response status:', response.status);
    console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()));

    // Get response text first to see what we actually get
    const responseText = await response.text();
    console.log('📡 Raw response text:', responseText);

    let responseData;
    try {
      responseData = JSON.parse(responseText);
      console.log('✅ Parsed JSON response:', responseData);
      console.log('🔍 Response keys:', Object.keys(responseData));
      
      // Log each property to see what we have
      for (const key in responseData) {
        console.log(`   ${key}:`, responseData[key]);
      }
      
      // Check for nested user object
      if (responseData.user) {
        console.log('👤 User object keys:', Object.keys(responseData.user));
        for (const key in responseData.user) {
          console.log(`   user.${key}:`, responseData.user[key]);
        }
      }
    } catch (parseError) {
      console.error('❌ Failed to parse response as JSON:', parseError);
      console.error('Raw response was:', responseText);
      throw new Error('Invalid response from server');
    }

    // Check if we got an error response from backend
    if (!response.ok) {
      console.error('❌ Backend returned error:', responseData);
      throw {
        status: response.status,
        data: responseData
      };
    }

    // Now extract token and user data - check different possible property names
    let token = '';
    let userData = null;

    // Check various possible token property names
    if (responseData.token) {
      token = responseData.token;
      console.log('✅ Found token in responseData.token');
    } else if (responseData.access_token) {
      token = responseData.access_token;
      console.log('✅ Found token in responseData.access_token');
    } else if (responseData.jwt) {
      token = responseData.jwt;
      console.log('✅ Found token in responseData.jwt');
    } else {
      console.error('❌ No token found in response! Available keys:', Object.keys(responseData));
      throw new Error('No authentication token received from server');
    }

    // Extract user data
    if (responseData.user && responseData.user.id) {
      userData = responseData.user;
      console.log('✅ Found user in responseData.user');
    } else if (responseData.id && responseData.name && responseData.email) {
      userData = {
        id: responseData.id,
        name: responseData.name,
        email: responseData.email
      };
      console.log('✅ Found user data at root level');
    } else if (responseData.data && responseData.data.id) {
      userData = responseData.data;
      console.log('✅ Found user in responseData.data');
    } else {
      // Create minimal user object from email
      userData = {
        id: Date.now(),
        name: form.value.email.split('@')[0],
        email: form.value.email
      };
      console.log('⚠️ No user data found, using fallback');
    }

    console.log('🔐 Token to store:', token.substring(0, 20) + '...');
    console.log('👤 User data to store:', userData);

    // Store in localStorage
    if (process.client) {
      // Clear old data
      localStorage.clear();
      
      // Store new data
      localStorage.setItem('jwt_token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('user_id', userData.id.toString());
      
      // Verify storage
      const storedToken = localStorage.getItem('jwt_token');
      const storedUser = localStorage.getItem('user');
      
      console.log('💾 Storage verification:');
      console.log('   Token stored:', storedToken ? '✅' : '❌');
      console.log('   User stored:', storedUser ? '✅' : '❌');
      
      if (!storedToken) {
        throw new Error('Failed to store token in localStorage');
      }
    }

    successMessage.value = 'Login successful! Redirecting...';

    // Redirect after short delay
    setTimeout(() => {
      console.log('🔄 Redirecting to dashboard...');
      window.location.href = '/dashboard';
    }, 1000);

  } catch (err: any) {
    console.error('❌ Login error:', err);
    
    // Show detailed error in console
    console.error('Error details:', {
      message: err.message,
      status: err.status,
      data: err.data
    });

    // User-friendly error messages
    if (err?.message?.includes('No authentication token')) {
      authError.value = 'Server did not return authentication token. Please contact support.';
    } else if (err?.status === 401) {
      authError.value = 'Invalid email or password.';
    } else if (err?.status === 400) {
      authError.value = 'Invalid request. Please check your input.';
    } else if (err?.status === 404) {
      authError.value = 'Server not found. Make sure backend is running on localhost:8080.';
    } else if (err?.status === 500) {
      authError.value = 'Server error. Please try again later.';
    } else if (err?.message?.includes('Failed to fetch')) {
      authError.value = 'Cannot connect to server. Please check: 1) Backend is running, 2) URL is correct (localhost:8080)';
    } else if (err?.data?.error) {
      authError.value = err.data.error;
    } else if (err?.data?.message) {
      authError.value = err.data.message;
    } else if (err?.message) {
      authError.value = err.message;
    } else {
      authError.value = 'Login failed. Please try again.';
    }
  } finally {
    isLoading.value = false;
  }
};

// Test function to debug backend response
const testBackendDirectly = async () => {
  console.log('🧪 Testing backend directly...');
  
  try {
    const response = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        email: 'john@test.com', 
        password: '123456' 
      })
    });
    
    const text = await response.text();
    console.log('Backend raw response:', text);
    
    try {
      const data = JSON.parse(text);
      console.log('Parsed data:', data);
    } catch (e) {
      console.log('Response is not JSON:', text);
    }
  } catch (error) {
    console.error('Test failed:', error);
  }
};

// Also test the health endpoint
const testHealthEndpoint = async () => {
  console.log('🏥 Testing health endpoint...');
  try {
    const response = await fetch('http://localhost:8080/health');
    const text = await response.text();
    console.log('Health response:', text);
  } catch (error) {
    console.error('Health check failed:', error);
  }
};

// Call these in browser console if needed
// testBackendDirectly();
// testHealthEndpoint();
</script>