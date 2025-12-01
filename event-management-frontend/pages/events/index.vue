<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-3xl font-bold text-gray-800">All Events</h1>
            <p class="text-gray-600 mt-2">Browse and discover events</p>
          </div>
          <NuxtLink to="/create" 
                    class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Create Event
          </NuxtLink>
        </div>
        
        <!-- Filter Tabs -->
        <div class="flex space-x-4 mt-6 border-b">
          <button @click="activeTab = 'all'" 
                  :class="activeTab === 'all' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'"
                  class="pb-2 px-1 font-medium">
            All Events
          </button>
          <button @click="activeTab = 'bookmarked'" 
                  :class="activeTab === 'bookmarked' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'"
                  class="pb-2 px-1 font-medium">
            Bookmarked
          </button>
          <button @click="activeTab = 'following'" 
                  :class="activeTab === 'following' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'"
                  class="pb-2 px-1 font-medium">
            Following
          </button>
        </div>
      </div>

      <!-- Events Grid -->
      <div v-if="loading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p class="mt-4 text-gray-600">Loading events...</p>
      </div>

      <div v-else-if="filteredEvents.length === 0" class="text-center py-12">
        <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <h3 class="text-lg font-medium text-gray-800 mb-2">No events found</h3>
        <p class="text-gray-600">Try creating your first event!</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="event in filteredEvents" :key="event.id" 
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
              <div class="flex space-x-2">
                <button @click="toggleBookmark(event.id)"
                        class="p-2 hover:bg-gray-100 rounded-lg transition"
                        :title="isBookmarked(event.id) ? 'Remove bookmark' : 'Bookmark'">
                  <svg class="w-5 h-5" :class="isBookmarked(event.id) ? 'text-red-500 fill-current' : 'text-gray-400'" 
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </button>
                <button @click="toggleFollow(event.id)"
                        class="p-2 hover:bg-gray-100 rounded-lg transition"
                        :title="isFollowing(event.id) ? 'Unfollow' : 'Follow'">
                  <svg class="w-5 h-5" :class="isFollowing(event.id) ? 'text-green-500 fill-current' : 'text-gray-400'"
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </button>
              </div>
            </div>
            
            <p class="text-gray-600 mb-4">{{ event.description?.substring(0, 100) }}...</p>
            
            <!-- Event Details -->
            <div class="space-y-3">
              <div class="flex items-center text-gray-600">
                <svg class="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {{ event.location }}
              </div>
              
              <div class="flex items-center text-gray-600">
                <svg class="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {{ new Date(event.start_date).toLocaleDateString() }}
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
definePageMeta({
  middleware: 'auth'
});

const activeTab = ref('all');
const loading = ref(true);
const allEvents = ref<any[]>([]);
const bookmarkedEvents = ref<any[]>([]);
const followedEvents = ref<any[]>([]);

const filteredEvents = computed(() => {
  switch (activeTab.value) {
    case 'bookmarked':
      return bookmarkedEvents.value;
    case 'following':
      return followedEvents.value;
    default:
      return allEvents.value;
  }
});

// Load events
onMounted(async () => {
  await Promise.all([
    fetchAllEvents(),
    fetchBookmarkedEvents(),
    fetchFollowedEvents()
  ]);
  loading.value = false;
});

const fetchAllEvents = async () => {
  try {
    const token = localStorage.getItem('jwt_token');
    const response = await $fetch('http://localhost:8080/events', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    allEvents.value = response as any[];
  } catch (error) {
    console.error('Error fetching events:', error);
  }
};

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

const fetchFollowedEvents = async () => {
  try {
    const token = localStorage.getItem('jwt_token');
    const response = await $fetch('http://localhost:8080/events/followed', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    followedEvents.value = response as any[];
  } catch (error) {
    console.error('Error fetching followed events:', error);
  }
};

const isBookmarked = (eventId: number) => {
  return bookmarkedEvents.value.some(e => e.id === eventId);
};

const isFollowing = (eventId: number) => {
  return followedEvents.value.some(e => e.id === eventId);
};

const toggleBookmark = async (eventId: number) => {
  const token = localStorage.getItem('jwt_token');
  const isCurrentlyBookmarked = isBookmarked(eventId);
  
  try {
    if (isCurrentlyBookmarked) {
      await $fetch(`http://localhost:8080/events/unbookmark?event_id=${eventId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      bookmarkedEvents.value = bookmarkedEvents.value.filter(e => e.id !== eventId);
    } else {
      await $fetch(`http://localhost:8080/events/bookmark?event_id=${eventId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      // Add to bookmarked list
      const event = allEvents.value.find(e => e.id === eventId);
      if (event) bookmarkedEvents.value.unshift(event);
    }
  } catch (error) {
    console.error('Error toggling bookmark:', error);
  }
};

const toggleFollow = async (eventId: number) => {
  const token = localStorage.getItem('jwt_token');
  const isCurrentlyFollowing = isFollowing(eventId);
  
  try {
    if (isCurrentlyFollowing) {
      await $fetch(`http://localhost:8080/events/unfollow?event_id=${eventId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      followedEvents.value = followedEvents.value.filter(e => e.id !== eventId);
    } else {
      await $fetch(`http://localhost:8080/events/follow?event_id=${eventId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      // Add to followed list
      const event = allEvents.value.find(e => e.id === eventId);
      if (event) followedEvents.value.unshift(event);
    }
  } catch (error) {
    console.error('Error toggling follow:', error);
  }
};
</script>