<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <NuxtLink to="/dashboard" class="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Dashboard
        </NuxtLink>
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-3xl font-bold text-gray-800">Bookmarked Events</h1>
            <p class="text-gray-600 mt-2">Events you've saved for later</p>
          </div>
          <div class="text-sm text-gray-500">
            {{ bookmarkedEvents.length }} events bookmarked
          </div>
        </div>
      </div>

      <!-- Content -->
      <div v-if="loading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p class="mt-4 text-gray-600">Loading bookmarks...</p>
      </div>

      <div v-else-if="bookmarkedEvents.length === 0" class="text-center py-12">
        <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
        <h3 class="text-lg font-medium text-gray-800 mb-2">No bookmarks yet</h3>
        <p class="text-gray-600 mb-4">Bookmark events to see them here</p>
        <NuxtLink to="/events" 
                  class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          Browse Events
        </NuxtLink>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="event in bookmarkedEvents" :key="event.id" 
             class="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
          <div class="p-6">
            <div class="flex justify-between items-start mb-4">
              <div>
                <span class="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full font-medium">
                  {{ event.category }}
                </span>
                <h3 class="text-xl font-bold text-gray-800 mt-2">{{ event.title }}</h3>
              </div>
              <button @click="unbookmarkEvent(event.id)"
                      class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Remove bookmark">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
            
            <p class="text-gray-600 mb-4">{{ event.description?.substring(0, 100) }}...</p>
            
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
                {{ new Date(event.start_date).toLocaleDateString() }}
              </div>
            </div>
          </div>
          
          <div class="bg-gray-50 px-6 py-4 border-t">
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-500">
                Bookmarked
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
definePageMeta({
  middleware: 'auth'
});

const loading = ref(true);
const bookmarkedEvents = ref<any[]>([]);

onMounted(async () => {
  await fetchBookmarkedEvents();
  loading.value = false;
});

const fetchBookmarkedEvents = async () => {
  try {
    const token = localStorage.getItem('jwt_token');
    const response = await $fetch('http://localhost:8080/events/bookmarked', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    bookmarkedEvents.value = response as any[];
  } catch (error) {
    console.error('Error fetching bookmarked events:', error);
  }
};

const unbookmarkEvent = async (eventId: number) => {
  try {
    const token = localStorage.getItem('jwt_token');
    await $fetch(`http://localhost:8080/events/unbookmark?event_id=${eventId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    bookmarkedEvents.value = bookmarkedEvents.value.filter(e => e.id !== eventId);
    alert('Event removed from bookmarks');
  } catch (error) {
    console.error('Error removing bookmark:', error);
    alert('Failed to remove bookmark');
  }
};
</script>