<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <NuxtLink to="/dashboard" class="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Dashboard
        </NuxtLink>
        <h1 class="text-3xl font-bold text-gray-800">Your Profile</h1>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left Column - Profile Info -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-xl shadow p-6">
            <!-- Avatar -->
            <div class="flex flex-col items-center mb-6">
              <div class="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4">
                {{ user?.name?.charAt(0) || 'U' }}
              </div>
              <h2 class="text-2xl font-bold text-gray-800">{{ user?.name || 'User' }}</h2>
              <p class="text-gray-600">{{ user?.email || 'user@example.com' }}</p>
              <p class="text-sm text-gray-500 mt-2">User ID: {{ user?.id || 'N/A' }}</p>
            </div>

            <!-- Stats -->
            <div class="space-y-4">
              <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span class="text-gray-600">Events Created</span>
                <span class="font-bold text-gray-800">{{ stats.createdEvents }}</span>
              </div>
              <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span class="text-gray-600">Events Following</span>
                <span class="font-bold text-gray-800">{{ stats.following }}</span>
              </div>
              <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span class="text-gray-600">Bookmarks</span>
                <span class="font-bold text-gray-800">{{ stats.bookmarks }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column - Your Events -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-xl shadow">
            <div class="p-6 border-b">
              <h3 class="text-xl font-bold text-gray-800">Your Events</h3>
            </div>
            
            <div class="p-6">
              <div v-if="loading" class="text-center py-8">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              </div>
              
              <div v-else-if="userEvents.length === 0" class="text-center py-8">
                <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h4 class="text-lg font-medium text-gray-800 mb-2">No events created yet</h4>
                <p class="text-gray-600 mb-4">Create your first event to get started!</p>
                <NuxtLink to="/create" 
                          class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Create Event
                </NuxtLink>
              </div>
              
              <div v-else class="space-y-4">
                <div v-for="event in userEvents" :key="event.id" 
                     class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <div class="flex-1">
                    <div class="flex items-center justify-between mb-2">
                      <h4 class="font-bold text-gray-800">{{ event.title }}</h4>
                      <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {{ event.category }}
                      </span>
                    </div>
                    <p class="text-sm text-gray-600 mb-2">{{ event.description?.substring(0, 80) }}...</p>
                    <div class="flex items-center text-sm text-gray-500 space-x-4">
                      <span class="flex items-center">
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        {{ event.location }}
                      </span>
                      <span class="flex items-center">
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {{ new Date(event.start_date).toLocaleDateString() }}
                      </span>
                    </div>
                  </div>
                  
                  <div class="flex space-x-2 ml-4">
                    <NuxtLink :to="`/events/${event.id}`" 
                              class="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition">
                      View
                    </NuxtLink>
                    <button @click="editEvent(event.id)"
                            class="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                      Edit
                    </button>
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

const user = ref<any>(null);
const loading = ref(true);
const userEvents = ref<any[]>([]);

const stats = reactive({
  createdEvents: 0,
  following: 0,
  bookmarks: 0
});

onMounted(async () => {
  if (process.client) {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        user.value = JSON.parse(userData);
        await Promise.all([
          fetchUserEvents(),
          fetchStats()
        ]);
      } catch (e) {
        console.error('Error loading profile:', e);
      } finally {
        loading.value = false;
      }
    }
  }
});

const fetchUserEvents = async () => {
  try {
    const token = localStorage.getItem('jwt_token');
    const events = await $fetch('http://localhost:8080/events', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    userEvents.value = (events as any[]).filter(event => event.created_by === user.value?.id);
    stats.createdEvents = userEvents.value.length;
  } catch (error) {
    console.error('Error fetching user events:', error);
  }
};

const fetchStats = async () => {
  try {
    const token = localStorage.getItem('jwt_token');
    // Fetch bookmarked events
    const bookmarks = await $fetch('http://localhost:8080/events/bookmarked', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    stats.bookmarks = (bookmarks as any[]).length;
    
    // Fetch followed events
    const followed = await $fetch('http://localhost:8080/events/followed', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    stats.following = (followed as any[]).length;
  } catch (error) {
    console.error('Error fetching stats:', error);
  }
};

const editEvent = (eventId: number) => {
  // Navigate to edit page or show modal
  alert(`Edit event ${eventId} - To be implemented`);
};
</script>