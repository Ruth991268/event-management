<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header with Navigation -->
      <nav class="mb-8">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <NuxtLink to="/dashboard" class="inline-flex items-center text-blue-600 hover:text-blue-800">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </NuxtLink>
            <div class="hidden md:block text-gray-400">|</div>
            <h1 class="text-3xl font-bold text-gray-800 hidden md:block">Create Event</h1>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-600 hidden md:block">{{ user?.name }}</span>
            <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
              {{ user?.name?.charAt(0) || 'U' }}
            </div>
          </div>
        </div>
        <h1 class="text-3xl font-bold text-gray-800 mt-4 md:hidden">Create Event</h1>
        <p class="text-gray-600 mt-2">Fill in the details to create your event</p>
      </nav>

      <!-- Progress Steps -->
      <div class="mb-8">
        <div class="flex items-center justify-between max-w-2xl mx-auto">
          <div class="flex flex-col items-center">
            <div class="w-10 h-10 rounded-full flex items-center justify-center bg-blue-600 text-white mb-2">
              1
            </div>
            <span class="text-sm font-medium text-blue-600">Details</span>
          </div>
          <div class="flex-1 h-1 bg-gray-300"></div>
          <div class="flex flex-col items-center">
            <div class="w-10 h-10 rounded-full flex items-center justify-center bg-gray-300 text-gray-600 mb-2">
              2
            </div>
            <span class="text-sm font-medium text-gray-500">Date & Time</span>
          </div>
          <div class="flex-1 h-1 bg-gray-300"></div>
          <div class="flex flex-col items-center">
            <div class="w-10 h-10 rounded-full flex items-center justify-center bg-gray-300 text-gray-600 mb-2">
              3
            </div>
            <span class="text-sm font-medium text-gray-500">Review</span>
          </div>
        </div>
      </div>

      <!-- Error/Success Messages -->
      <div v-if="errorMessage" class="mb-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
        <div class="flex items-center">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
          {{ errorMessage }}
        </div>
      </div>

      <div v-if="successMessage" class="mb-6 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg">
        <div class="flex items-center">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
          {{ successMessage }}
        </div>
      </div>

      <!-- Main Form -->
      <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
        <form @submit.prevent="handleSubmit" class="p-6 md:p-8">
          <!-- Basic Information Section -->
          <div class="mb-8">
            <h2 class="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b">Event Information</h2>
            
            <!-- Event Title -->
            <div class="mb-6">
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                Event Title *
                <span class="text-gray-500 font-normal ml-2">(Be creative and descriptive)</span>
              </label>
              <input
                v-model="form.title"
                type="text"
                required
                placeholder="e.g., Annual Tech Conference 2024"
                :class="errors.title ? 'border-red-300' : 'border-gray-300'"
                class="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                @input="clearError('title')"
              />
              <p v-if="errors.title" class="mt-1 text-sm text-red-600">{{ errors.title }}</p>
              <p class="mt-1 text-xs text-gray-500">Max 100 characters. Make it catchy!</p>
            </div>

            <!-- Description -->
            <div class="mb-6">
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                Description *
                <span class="text-gray-500 font-normal ml-2">(What will attendees experience?)</span>
              </label>
              <textarea
                v-model="form.description"
                required
                rows="4"
                placeholder="Describe your event in detail. Include topics, speakers, activities, and what makes it special..."
                :class="errors.description ? 'border-red-300' : 'border-gray-300'"
                class="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                @input="clearError('description')"
              ></textarea>
              <div class="flex justify-between mt-1">
                <p v-if="errors.description" class="text-sm text-red-600">{{ errors.description }}</p>
                <p class="text-xs text-gray-500 ml-auto">{{ form.description.length }}/500 characters</p>
              </div>
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
                  :class="errors.category ? 'border-red-300' : 'border-gray-300'"
                  class="w-full px-4 py-3 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  @change="clearError('category')"
                >
                  <option value="" disabled selected>Select a category</option>
                  <option value="Conference">Conference</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Seminar">Seminar</option>
                  <option value="Networking">Networking</option>
                  <option value="Social">Social Event</option>
                  <option value="Sports">Sports</option>
                  <option value="Music">Music Concert</option>
                  <option value="Art">Art Exhibition</option>
                  <option value="Food">Food & Drink</option>
                  <option value="Tech">Technology</option>
                  <option value="Business">Business</option>
                  <option value="Education">Education</option>
                  <option value="Health">Health & Wellness</option>
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
                  placeholder="e.g., Convention Center, New York"
                  :class="errors.location ? 'border-red-300' : 'border-gray-300'"
                  class="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  @input="clearError('location')"
                />
                <p v-if="errors.location" class="mt-1 text-sm text-red-600">{{ errors.location }}</p>
                <p class="mt-1 text-xs text-gray-500">Venue name and city</p>
              </div>
            </div>
          </div>

          <!-- Date & Time Section -->
          <div class="mb-8">
            <h2 class="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b">Date & Time</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Start Date & Time -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  Start Date & Time *
                </label>
                <div class="relative">
                  <input
                    v-model="form.start_date"
                    type="datetime-local"
                    required
                    :class="errors.start_date ? 'border-red-300' : 'border-gray-300'"
                    class="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none"
                    @change="clearError('start_date'); validateDates()"
                  />
                  <svg class="absolute right-3 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p v-if="errors.start_date" class="mt-1 text-sm text-red-600">{{ errors.start_date }}</p>
              </div>

              <!-- End Date & Time -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  End Date & Time *
                </label>
                <div class="relative">
                  <input
                    v-model="form.end_date"
                    type="datetime-local"
                    required
                    :class="errors.end_date ? 'border-red-300' : 'border-gray-300'"
                    class="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none"
                    @change="clearError('end_date'); validateDates()"
                  />
                  <svg class="absolute right-3 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
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

          <!-- Pricing Section -->
          <div class="mb-8">
            <h2 class="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b">Pricing</h2>
            
            <div class="max-w-md">
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                Ticket Price
                <span class="text-gray-500 font-normal ml-2">(Leave as 0 for free events)</span>
              </label>
              <div class="relative">
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
              <div class="mt-4">
                <div class="flex items-center space-x-4">
                  <button
                    type="button"
                    @click="form.price = 0"
                    class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                  >
                    Free Event
                  </button>
                  <button
                    type="button"
                    @click="form.price = 49.99"
                    class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                  >
                    $49.99
                  </button>
                  <button
                    type="button"
                    @click="form.price = 99.99"
                    class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                  >
                    $99.99
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Image Upload Section (Optional) -->
          <div class="mb-8">
            <h2 class="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b">Event Image (Optional)</h2>
            
            <div class="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition cursor-pointer"
                 @click="triggerFileInput"
                 @dragover.prevent
                 @drop.prevent="handleDrop">
              <input
                ref="fileInput"
                type="file"
                accept="image/*"
                class="hidden"
                @change="handleImageUpload"
              />
              
              <div v-if="!imagePreview" class="space-y-4">
                <svg class="w-16 h-16 text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <div>
                  <p class="text-lg font-medium text-gray-700">Upload Event Image</p>
                  <p class="text-sm text-gray-500 mt-1">Drag & drop or click to browse</p>
                  <p class="text-xs text-gray-400 mt-2">Recommended: 1200x630px, JPG or PNG</p>
                </div>
              </div>
              
              <div v-else class="space-y-4">
                <div class="relative inline-block">
                  <img :src="imagePreview" alt="Event preview" class="w-48 h-32 object-cover rounded-lg mx-auto" />
                  <button
                    type="button"
                    @click.stop="removeImage"
                    class="absolute -top-2 -right-2 w-8 h-8 bg-red-600 text-white rounded-full hover:bg-red-700 transition flex items-center justify-center"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <p class="text-sm text-gray-600">Click to change image</p>
              </div>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="pt-6 border-t">
            <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div class="text-sm text-gray-500">
                <p>* Required fields</p>
              </div>
              
              <div class="flex space-x-4">
                <button
                  type="button"
                  @click="resetForm"
                  class="px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition"
                  :disabled="isLoading"
                >
                  Reset Form
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
                  <svg v-if="!isLoading" class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <!-- Preview Section (Desktop only) -->
      <div class="hidden lg:block mt-8 bg-white rounded-2xl shadow-xl p-6">
        <h3 class="text-xl font-bold text-gray-800 mb-4">Live Preview</h3>
        <div class="bg-gray-50 rounded-xl p-6">
          <div class="flex items-start space-x-6">
            <div class="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center text-white text-2xl font-bold">
              {{ form.title?.charAt(0) || 'E' }}
            </div>
            <div class="flex-1">
              <h4 class="text-2xl font-bold text-gray-800">{{ form.title || 'Event Title' }}</h4>
              <div class="flex items-center space-x-4 mt-2">
                <span class="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium">
                  {{ form.category || 'Category' }}
                </span>
                <span class="text-gray-600">
                  <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  {{ form.location || 'Location' }}
                </span>
              </div>
              <p class="text-gray-600 mt-3">{{ form.description || 'Event description will appear here...' }}</p>
              <div class="flex items-center justify-between mt-4 pt-4 border-t">
                <div class="text-sm text-gray-500">
                  <div class="flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {{ formatPreviewDate(form.start_date) }}
                  </div>
                </div>
                <div class="text-lg font-bold text-gray-800">
                  {{ form.price > 0 ? `$${form.price.toFixed(2)}` : 'Free' }}
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

// Types based on your backend models
interface CreateEventRequest {
  title: string;
  description: string;
  category: string;
  location: string;
  start_date: string; // RFC3339 format
  end_date: string;   // RFC3339 format
  price: number;
  // Optional fields that your backend might support
  image_url?: string;
}

interface CreateEventResponse {
  message: string;
  event_id: number;
}

const user = ref<any>(null);
const isLoading = ref(false);
const errorMessage = ref('');
const successMessage = ref('');
const dateValidationMessage = ref('');

// File upload
const fileInput = ref<HTMLInputElement | null>(null);
const imagePreview = ref<string>('');
const selectedFile = ref<File | null>(null);

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

// Initialize form with current datetime defaults
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
    
    // Set default dates (next day 10 AM - 5 PM)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const startDate = new Date(tomorrow);
    startDate.setHours(10, 0, 0, 0);
    
    const endDate = new Date(tomorrow);
    endDate.setHours(17, 0, 0, 0);
    
    // Format for datetime-local input (YYYY-MM-DDTHH:mm)
    form.value.start_date = formatDateForInput(startDate);
    form.value.end_date = formatDateForInput(endDate);
  }
});

// Format date for input field
const formatDateForInput = (date: Date): string => {
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

// Format date for preview
const formatPreviewDate = (dateString: string): string => {
  if (!dateString) return 'Date not set';
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

// Validate dates
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

// Clear specific error
const clearError = (field: string) => {
  errors[field] = '';
  if (field.startsWith('start_') || field.startsWith('end_')) {
    dateValidationMessage.value = '';
  }
};

// Reset form to initial state
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
    removeImage();
    errorMessage.value = '';
    successMessage.value = '';
    Object.keys(errors).forEach(key => errors[key] = '');
    dateValidationMessage.value = '';
  }
};

// File upload handlers
const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleDrop = (e: DragEvent) => {
  const files = e.dataTransfer?.files;
  if (files && files[0]) {
    handleFile(files[0]);
  }
};

const handleImageUpload = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    handleFile(target.files[0]);
  }
};

const handleFile = (file: File) => {
  // Validate file type
  if (!file.type.startsWith('image/')) {
    errorMessage.value = 'Please select an image file (JPG, PNG, etc.)';
    return;
  }
  
  // Validate file size (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    errorMessage.value = 'Image size should be less than 5MB';
    return;
  }
  
  selectedFile.value = file;
  
  // Create preview
  const reader = new FileReader();
  reader.onload = (e) => {
    imagePreview.value = e.target?.result as string;
  };
  reader.readAsDataURL(file);
};

const removeImage = () => {
  imagePreview.value = '';
  selectedFile.value = null;
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};

// Main submit handler
const handleSubmit = async () => {
  // Clear previous messages
  errorMessage.value = '';
  successMessage.value = '';
  
  // Validate required fields
  let hasErrors = false;
  
  if (!form.value.title.trim()) {
    errors.title = 'Event title is required';
    hasErrors = true;
  }
  
  if (!form.value.description.trim()) {
    errors.description = 'Event description is required';
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
    errorMessage.value = 'Please fill in all required fields correctly';
    return;
  }
  
  // Validate dates
  const start = new Date(form.value.start_date);
  const end = new Date(form.value.end_date);
  const now = new Date();
  
  if (start < now) {
    errors.start_date = 'Start date cannot be in the past';
    errorMessage.value = 'Please choose a future start date';
    return;
  }
  
  if (end <= start) {
    errors.end_date = 'End date must be after start date';
    errorMessage.value = 'End time must be after start time';
    return;
  }
  
  // Prepare data for submission
  isLoading.value = true;
  
  try {
    // Get JWT token
    const token = localStorage.getItem('jwt_token');
    if (!token) {
      throw new Error('Authentication required. Please log in again.');
    }
    
    // Prepare payload with RFC3339 dates
    const payload: CreateEventRequest = {
      title: form.value.title.trim(),
      description: form.value.description.trim(),
      category: form.value.category,
      location: form.value.location.trim(),
      start_date: start.toISOString(), // Convert to RFC3339
      end_date: end.toISOString(),     // Convert to RFC3339
      price: parseFloat(form.value.price.toString()) || 0
    };
    
    // Note: Your backend doesn't currently support image_url in the create endpoint
    // If you want to add image support, you'll need to:
    // 1. Upload image to a separate endpoint first
    // 2. Get the image URL
    // 3. Include it in the payload
    // For now, we'll skip image upload since your backend doesn't support it
    
    console.log('Creating event with payload:', payload);
    
    // Make API call
    const response = await $fetch<CreateEventResponse>('http://localhost:8080/events/create', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: payload
    });
    
    console.log('Event created successfully:', response);
    
    successMessage.value = `🎉 Event "${form.value.title}" created successfully! Redirecting...`;
    
    // Wait a moment, then redirect to the new event or dashboard
    setTimeout(() => {
      // You could redirect to the event detail page if you have one
      // window.location.href = `/events/${response.event_id}`;
      window.location.href = '/dashboard';
    }, 2000);
    
  } catch (err: any) {
    console.error('Error creating event:', err);
    
    // Handle different error types
    if (err?.status === 401) {
      errorMessage.value = 'Your session has expired. Please log in again.';
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } else if (err?.status === 400) {
      errorMessage.value = 'Invalid data. Please check your inputs.';
    } else if (err?.status === 500) {
      errorMessage.value = 'Server error. Please try again later.';
    } else if (err?.message?.includes('fetch')) {
      errorMessage.value = 'Cannot connect to server. Make sure backend is running on localhost:8080';
    } else if (err?.data?.error) {
      errorMessage.value = err.data.error;
    } else if (err?.data?.message) {
      errorMessage.value = err.data.message;
    } else {
      errorMessage.value = 'Failed to create event. Please try again.';
    }
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
/* Custom scrollbar */
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

/* Remove default datetime-local icon in Firefox */
input[type="datetime-local"]::-webkit-calendar-picker-indicator {
  opacity: 0;
  position: absolute;
  right: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

/* Smooth transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>