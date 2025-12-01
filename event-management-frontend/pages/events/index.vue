<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex justify-between items-center mb-6">
          <div>
            <h1 class="text-3xl font-bold text-gray-800">All Events</h1>
            <p class="text-gray-600 mt-2">Browse events from all users</p>
          </div>
          <NuxtLink to="/create" 
                    class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Create Event
          </NuxtLink>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p class="mt-4 text-gray-600">Loading events...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="!events || events.length === 0" class="text-center py-12">
        <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <h3 class="text-lg font-medium text-gray-800 mb-2">No events found</h3>
        <p class="text-gray-600">Be the first to create an event!</p>
        <NuxtLink to="/create" 
                  class="inline-block mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Create Your First Event
        </NuxtLink>
      </div>

      <!-- Events Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="event in events" :key="event.id" 
             class="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
          <!-- Event Header -->
          <div class="p-6">
            <div class="flex justify-between items-start mb-4">
              <div>
                <span class="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium">
                  {{ event.category }}
                </span>
                <h3 class="text-xl font-bold text-gray-800 mt-2">{{ event.title }}</h3>
              </div>
            </div>
            
            <p class="text-gray-600 mb-4">{{ truncateDescription(event.description) }}</p>
            
            <!-- Event Details -->
            <div class="space-y-3">
              <div class="flex items-center text-gray-600">
                <svg class="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                {{ event.location }}
              </div>
              
              <div class="flex items-center text-gray-600">
                <svg class="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {{ formatDate(event.start_date) }}
              </div>
              
              <div class="flex items-center text-gray-600">
                <svg class="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ event.price > 0 ? `$${event.price.toFixed(2)}` : 'Free' }}
              </div>
            </div>
          </div>
          
          <!-- Footer -->
          <div class="bg-gray-50 px-6 py-4 border-t">
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-500">
                Created by User {{ event.created_by }}
              </span>
              <NuxtLink :to="`/events/${event.id}`"
                        class="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition">
                View Details
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useApi } from '~/composables/useApi';

const { get } = useApi();
const loading = ref(true);
const events = ref<any[]>([]);

// Helper functions
const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const truncateDescription = (description: string) => {
  if (!description) return '';
  return description.length > 100 ? description.substring(0, 100) + '...' : description;
};

// Load events
onMounted(async () => {
  try {
    const response = await get('http://localhost:8080/events');
    
    if (Array.isArray(response)) {
      events.value = response;
    } else {
      console.error('Expected array but got:', response);
      events.value = [];
    }
  } catch (error) {
    console.error('Error fetching events:', error);
    events.value = [];
  } finally {
    loading.value = false;
  }
});
</script>