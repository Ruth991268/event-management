<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center space-x-4">
            <NuxtLink to="/dashboard" class="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Dashboard
            </NuxtLink>
            <span class="text-gray-400">|</span>
            <span class="text-sm text-gray-600">Create Event</span>
          </div>
          
          <div class="flex items-center space-x-2">
            <div class="text-sm text-gray-600">{{ user?.name }}</div>
            <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
              {{ user?.name?.charAt(0) || 'U' }}
            </div>
          </div>
        </div>
        
        <!-- Page Title -->
        <div class="mb-6">
          <h1 class="text-3xl font-bold text-gray-800">Create New Event</h1>
          <p class="text-gray-600 mt-1">Fill in the event details below</p>
        </div>
      </div>

      <!-- Success/Error Messages -->
      <div v-if="successMessage" class="mb-6 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg">
        <div class="flex items-center">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
          {{ successMessage }}
        </div>
      </div>

      <div v-if="errorMessage" class="mb-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
        <div class="flex items-center">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
          {{ errorMessage }}
        </div>
      </div>

      <!-- Main Form -->
      <div class="bg-white rounded-xl shadow-lg p-6">
        <form @submit.prevent="handleSubmit">
          <!-- Event Title -->
          <div class="mb-6">
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Event Title *
            </label>
            <input
              v-model="form.title"
              type="text"
              required
              placeholder="e.g., Tech Conference 2024"
              :class="errors.title ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'"
              class="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition"
              @input="clearError('title')"
            />
            <p v-if="errors.title" class="mt-1 text-sm text-red-600">{{ errors.title }}</p>
          </div>

          <!-- Description -->
          <div class="mb-6">
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              v-model="form.description"
              required
              rows="4"
              placeholder="Describe your event..."
              :class="errors.description ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'"
              class="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition resize-none"
              @input="clearError('description')"
            ></textarea>
            <p v-if="errors.description" class="mt-1 text-sm text-red-600">{{ errors.description }}</p>
          </div>

          <!-- Category and Location -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <!-- Category -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                Category *
              </label>
              <select
                v-model="form.category"
                required
                :class="errors.category ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'"
                class="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition bg-white"
                @change="clearError('category')"
              >
                <option value="" disabled selected>Select category</option>
                <option value="Conference">Conference</option>
                <option value="Workshop">Workshop</option>
                <option value="Seminar">Seminar</option>
                <option value="Social">Social</option>
                <option value="Networking">Networking</option>
                <option value="Sports">Sports</option>
                <option value="Music">Music</option>
                <option value="Art">Art</option>
                <option value="Other">Other</option>
              </select>
              <p v-if="errors.category" class="mt-1 text-sm text-red-600">{{ errors.category }}</p>
            </div>

            <!-- Location -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                Location *
              </label>
              <input
                v-model="form.location"
                type="text"
                required
                placeholder="e.g., Convention Center, City"
                :class="errors.location ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'"
                class="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition"
                @input="clearError('location')"
              />
              <p v-if="errors.location" class="mt-1 text-sm text-red-600">{{ errors.location }}</p>
            </div>
          </div>

          <!-- Date and Time -->
          <div class="mb-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Date & Time *</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Start Date -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Start Date & Time
                </label>
                <div class="relative">
                  <input
                    v-model="form.start_date"
                    type="datetime-local"
                    required
                    :class="errors.start_date ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'"
                    class="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition appearance-none"
                    @change="clearError('start_date'); validateDates()"
                  />
                </div>
                <p v-if="errors.start_date" class="mt-1 text-sm text-red-600">{{ errors.start_date }}</p>
              </div>

              <!-- End Date -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  End Date & Time
                </label>
                <div class="relative">
                  <input
                    v-model="form.end_date"
                    type="datetime-local"
                    required
                    :class="errors.end_date ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'"
                    class="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition appearance-none"
                    @change="clearError('end_date'); validateDates()"
                  />
                </div>
                <p v-if="errors.end_date" class="mt-1 text-sm text-red-600">{{ errors.end_date }}</p>
              </div>
            </div>
            
            <!-- Date Validation Message -->
            <div v-if="dateValidationMessage" class="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div class="flex items-center text-blue-700">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="text-sm">{{ dateValidationMessage }}</span>
              </div>
            </div>
          </div>

          <!-- Price -->
          <div class="mb-8">
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Price (USD)
            </label>
            <div class="relative max-w-xs">
              <span class="absolute left-3 top-3 text-gray-600 font-medium">$</span>
              <input
                v-model="form.price"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                class="w-full pl-8 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
            <p class="text-sm text-gray-500 mt-1">Enter 0 for free events</p>
            
            <!-- Price Presets -->
            <div class="mt-4">
              <p class="text-sm text-gray-600 mb-2">Quick select:</p>
              <div class="flex flex-wrap gap-2">
                <button
                  type="button"
                  @click="form.price = 0"
                  class="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm"
                >
                  Free
                </button>
                <button
                  type="button"
                  @click="form.price = 19.99"
                  class="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm"
                >
                  $19.99
                </button>
                <button
                  type="button"
                  @click="form.price = 49.99"
                  class="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm"
                >
                  $49.99
                </button>
                <button
                  type="button"
                  @click="form.price = 99.99"
                  class="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm"
                >
                  $99.99
                </button>
              </div>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="pt-6 border-t">
            <div class="flex flex-col md:flex-row justify-between items-center gap-4">
              <div class="text-sm text-gray-500">
                <p>* Required fields</p>
              </div>
              
              <div class="flex space-x-4">
                <button
                  type="button"
                  @click="resetForm"
                  :disabled="isLoading"
                  class="px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
                >
                  Reset
                </button>
                
                <button
                  type="submit"
                  :disabled="isLoading"
                  class="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {{ isLoading ? 'Creating Event...' : 'Create Event' }}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <!-- Event Preview -->
      <div class="mt-8 bg-white rounded-xl shadow-lg p-6">
        <h3 class="text-xl font-bold text-gray-800 mb-4">Event Preview</h3>
        <div class="bg-gray-50 rounded-lg p-6">
          <div class="flex flex-col md:flex-row md:items-start gap-6">
            <!-- Preview Image Placeholder -->
            <div class="w-full md:w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center text-white text-4xl font-bold flex-shrink-0">
              {{ form.title?.charAt(0) || 'E' }}
            </div>
            
            <!-- Preview Details -->
            <div class="flex-1">
              <h4 class="text-2xl font-bold text-gray-800 mb-2">{{ form.title || 'Event Title' }}</h4>
              
              <!-- Category and Price Badge -->
              <div class="flex flex-wrap items-center gap-3 mb-4">
                <span v-if="form.category" class="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium">
                  {{ form.category }}
                </span>
                <span class="text-lg font-bold text-gray-800">
                  {{ form.price > 0 ? `$${form.price.toFixed(2)}` : 'Free' }}
                </span>
              </div>
              
              <!-- Description Preview -->
              <p class="text-gray-600 mb-4">
                {{ form.description || 'Event description will appear here...' }}
              </p>
              
              <!-- Details Grid -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Location -->
                <div class="flex items-start">
                  <svg class="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p class="text-sm text-gray-500">Location</p>
                    <p class="font-medium text-gray-800">{{ form.location || 'Not specified' }}</p>
                  </div>
                </div>
                
                <!-- Start Date -->
                <div class="flex items-start">
                  <svg class="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p class="text-sm text-gray-500">Start Time</p>
                    <p class="font-medium text-gray-800">{{ formatPreviewDate(form.start_date) || 'Not set' }}</p>
                  </div>
                </div>
                
                <!-- End Date -->
                <div class="flex items-start">
                  <svg class="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p class="text-sm text-gray-500">End Time</p>
                    <p class="font-medium text-gray-800">{{ formatPreviewDate(form.end_date) || 'Not set' }}</p>
                  </div>
                </div>
                
                <!-- Duration -->
                <div class="flex items-start">
                  <svg class="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p class="text-sm text-gray-500">Duration</p>
                    <p class="font-medium text-gray-800">{{ calculateDuration() }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
});

interface CreateEventRequest {
  title: string;
  description: string;
  category: string;
  location: string;
  start_date: string; // RFC3339 format
  end_date: string;   // RFC3339 format
  price: number;
}

interface CreateEventResponse {
  message: string;
  event_id: number;
}

interface User {
  id: number;
  name: string;
  email: string;
}

// Reactive state
const user = ref<User | null>(null);
const isLoading = ref(false);
const errorMessage = ref('');
const successMessage = ref('');
const dateValidationMessage = ref('');

// Form state
const form = ref<CreateEventRequest>({
  title: '',
  description: '',
  category: '',
  location: '',
  start_date: '',
  end_date: '',
  price: 0
});

// Form errors
const errors = reactive<Record<string, string>>({
  title: '',
  description: '',
  category: '',
  location: '',
  start_date: '',
  end_date: ''
});

// Initialize form with default dates
onMounted(() => {
  if (process.client) {
    // Load user data
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        user.value = JSON.parse(userData);
      } catch (e) {
        console.error('Error loading user:', e);
      }
    }
    
    // Set default dates (tomorrow 10 AM - 5 PM)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const startDate = new Date(tomorrow);
    startDate.setHours(10, 0, 0, 0);
    
    const endDate = new Date(tomorrow);
    endDate.setHours(17, 0, 0, 0);
    
    // Format for datetime-local input
    form.value.start_date = formatDateForInput(startDate);
    form.value.end_date = formatDateForInput(endDate);
  }
});

// API Helper Function
const useApi = () => {
  const getAuthHeaders = () => {
    const token = localStorage.getItem('jwt_token');
    if (!token) {
      // If no token, redirect to login
      window.location.href = '/login';
      throw new Error('No authentication token');
    }
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  };

  const fetchWithAuth = async (url: string, options: any = {}) => {
    try {
      const headers = getAuthHeaders();
      
      // Make the API call
      const response = await $fetch(url, {
        ...options,
        headers: {
          ...headers,
          ...options.headers
        }
      });
      
      return response;
    } catch (error: any) {
      console.error(`API Error (${url}):`, error);
      
      // Handle 401 Unauthorized - redirect to login
      if (error?.status === 401 || error?.statusCode === 401) {
        showMessage('Session expired. Please log in again.', 'error');
        setTimeout(() => {
          localStorage.removeItem('jwt_token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }, 2000);
        throw new Error('Unauthorized');
      }
      
      throw error;
    }
  };

  return { fetchWithAuth };
};

const { fetchWithAuth } = useApi();

// Utility Functions
const formatDateForInput = (date: Date): string => {
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

const formatPreviewDate = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    weekday: 'short', 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const calculateDuration = (): string => {
  if (!form.value.start_date || !form.value.end_date) return 'Not set';
  
  const start = new Date(form.value.start_date);
  const end = new Date(form.value.end_date);
  const durationMs = end.getTime() - start.getTime();
  
  if (durationMs <= 0) return 'Invalid duration';
  
  const hours = Math.floor(durationMs / (1000 * 60 * 60));
  const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours === 0) return `${minutes} minutes`;
  if (minutes === 0) return `${hours} hours`;
  return `${hours}h ${minutes}m`;
};

// Validation Functions
const validateDates = () => {
  if (!form.value.start_date || !form.value.end_date) return;
  
  const start = new Date(form.value.start_date);
  const end = new Date(form.value.end_date);
  const now = new Date();
  
  // Check if start date is in the past
  if (start < now) {
    errors.start_date = 'Start date cannot be in the past';
    dateValidationMessage.value = '⚠️ Start time is in the past. Choose a future date.';
    return;
  }
  
  // Check if end date is before start date
  if (end <= start) {
    errors.end_date = 'End date must be after start date';
    dateValidationMessage.value = '⚠️ End time must be after start time.';
    return;
  }
  
  // Check if event is too long (more than 7 days)
  const durationInHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
  if (durationInHours > 168) { // 7 days
    dateValidationMessage.value = '⚠️ Event duration is very long (over 7 days). Is this correct?';
    return;
  }
  
  // Check if event is upcoming soon
  const hoursUntilStart = (start.getTime() - now.getTime()) / (1000 * 60 * 60);
  if (hoursUntilStart < 24) {
    dateValidationMessage.value = '🎉 Event starts soon! Make sure to promote it.';
  } else if (hoursUntilStart < 168) {
    dateValidationMessage.value = '📅 Event is coming up in the next week.';
  } else {
    dateValidationMessage.value = '✅ Event dates look good!';
  }
  
  // Clear errors if validation passes
  clearError('start_date');
  clearError('end_date');
};

const clearError = (field: string) => {
  errors[field] = '';
  if (field.startsWith('start_') || field.startsWith('end_')) {
    dateValidationMessage.value = '';
  }
};

const showMessage = (message: string, type: 'success' | 'error' = 'success') => {
  if (type === 'success') {
    successMessage.value = message;
    errorMessage.value = '';
  } else {
    errorMessage.value = message;
    successMessage.value = '';
  }
  
  // Clear success message after 5 seconds
  if (type === 'success') {
    setTimeout(() => {
      successMessage.value = '';
    }, 5000);
  }
};

// Form Actions
const resetForm = () => {
  if (confirm('Are you sure you want to reset the form? All entered data will be lost.')) {
    form.value = {
      title: '',
      description: '',
      category: '',
      location: '',
      start_date: formatDateForInput(new Date(Date.now() + 86400000)), // Tomorrow
      end_date: formatDateForInput(new Date(Date.now() + 86400000 + 7 * 3600000)), // Tomorrow + 7 hours
      price: 0
    };
    showMessage('');
    Object.keys(errors).forEach(key => errors[key] = '');
    dateValidationMessage.value = '';
  }
};

// Main Submit Handler
const handleSubmit = async () => {
  // Clear previous messages
  errorMessage.value = '';
  successMessage.value = '';
  
  // Validate required fields
  let hasErrors = false;
  
  if (!form.value.title.trim()) {
    errors.title = 'Event title is required';
    hasErrors = true;
  } else if (form.value.title.trim().length > 100) {
    errors.title = 'Title must be less than 100 characters';
    hasErrors = true;
  }
  
  if (!form.value.description.trim()) {
    errors.description = 'Event description is required';
    hasErrors = true;
  } else if (form.value.description.trim().length > 2000) {
    errors.description = 'Description must be less than 2000 characters';
    hasErrors = true;
  }
  
  if (!form.value.category) {
    errors.category = 'Please select a category';
    hasErrors = true;
  }
  
  if (!form.value.location.trim()) {
    errors.location = 'Event location is required';
    hasErrors = true;
  }
  
  if (!form.value.start_date) {
    errors.start_date = 'Start date is required';
    hasErrors = true;
  }
  
  if (!form.value.end_date) {
    errors.end_date = 'End date is required';
    hasErrors = true;
  }
  
  if (hasErrors) {
    showMessage('Please fill in all required fields correctly', 'error');
    return;
  }
  
  // Validate dates
  const start = new Date(form.value.start_date);
  const end = new Date(form.value.end_date);
  const now = new Date();
  
  if (start < now) {
    errors.start_date = 'Start date cannot be in the past';
    showMessage('Please choose a future start date', 'error');
    return;
  }
  
  if (end <= start) {
    errors.end_date = 'End date must be after start date';
    showMessage('End time must be after start time', 'error');
    return;
  }
  
  // Prepare for submission
  isLoading.value = true;
  
  try {
    // Prepare payload with RFC3339 dates (as required by your backend)
    const payload: CreateEventRequest = {
      title: form.value.title.trim(),
      description: form.value.description.trim(),
      category: form.value.category,
      location: form.value.location.trim(),
      start_date: start.toISOString(), // Convert to RFC3339/ISO string
      end_date: end.toISOString(),     // Convert to RFC3339/ISO string
      price: parseFloat(form.value.price.toString()) || 0
    };
    
    console.log('Sending payload to backend:', payload);
    
    // Make API call to your backend endpoint
    const response = await fetchWithAuth('http://localhost:8080/events/create', {
      method: 'POST',
      body: payload
    }) as CreateEventResponse;
    
    console.log('Event created successfully:', response);
    
    // Show success message
    showMessage(`🎉 Event "${form.value.title}" created successfully! Redirecting...`, 'success');
    
    // Wait 2 seconds, then redirect to dashboard
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 2000);
    
  } catch (err: any) {
    console.error('Error creating event:', err);
    
    // Handle different error types
    let errorMsg = 'Failed to create event. Please try again.';
    
    if (err?.status === 401) {
      errorMsg = 'Your session has expired. Please log in again.';
    } else if (err?.status === 400) {
      errorMsg = 'Invalid data. Please check your inputs.';
      if (err?.data?.error) {
        errorMsg = err.data.error;
      }
    } else if (err?.status === 500) {
      errorMsg = 'Server error. Please try again later.';
    } else if (err?.message?.includes('fetch')) {
      errorMsg = 'Cannot connect to server. Make sure backend is running on localhost:8080';
    } else if (err?.data?.message) {
      errorMsg = err.data.message;
    } else if (err?.message) {
      errorMsg = err.message;
    }
    
    showMessage(errorMsg, 'error');
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
/* Custom styling for datetime-local inputs */
input[type="datetime-local"]::-webkit-calendar-picker-indicator {
  background: transparent;
  bottom: 0;
  color: transparent;
  cursor: pointer;
  height: auto;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  width: auto;
}

/* Custom scrollbar for textarea */
textarea::-webkit-scrollbar {
  width: 6px;
}

textarea::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

textarea::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

textarea::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Transition effects */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>