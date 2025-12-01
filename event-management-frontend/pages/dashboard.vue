<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
    <!-- Navbar -->
    <nav class="max-w-7xl mx-auto mb-8">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl md:text-3xl font-bold text-gray-800">
          <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Event Dashboard
          </span>
        </h1>
        <div class="flex items-center space-x-4">
          <span class="text-gray-600 hidden md:inline">Welcome, {{ user?.name || 'User' }}!</span>
          <button 
            @click="logout"
            class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </nav>

    <div class="max-w-7xl mx-auto">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div class="bg-white rounded-xl shadow p-6">
          <div class="flex items-center">
            <div class="p-3 bg-blue-100 rounded-lg">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm text-gray-500">Total Events</p>
              <p class="text-2xl font-bold text-gray-800">{{ stats.totalEvents }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow p-6">
          <div class="flex items-center">
            <div class="p-3 bg-purple-100 rounded-lg">
              <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm text-gray-500">Bookmarked</p>
              <p class="text-2xl font-bold text-gray-800">{{ stats.bookmarkedEvents }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow p-6">
          <div class="flex items-center">
            <div class="p-3 bg-green-100 rounded-lg">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-4.201V21m-4.75-11.75h4.5m-4.5 0v4.5m0-4.5l4.5 4.5" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm text-gray-500">Following</p>
              <p class="text-2xl font-bold text-gray-800">{{ stats.followedEvents }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow p-6">
          <div class="flex items-center">
            <div class="p-3 bg-amber-100 rounded-lg">
              <svg class="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm text-gray-500">Your Events</p>
              <p class="text-2xl font-bold text-gray-800">{{ stats.myEvents }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left Column - Quick Actions & Profile -->
        <div class="lg:col-span-1 space-y-6">
          <!-- Quick Actions -->
          <div class="bg-white rounded-xl shadow p-6">
            <h2 class="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
            <div class="space-y-3">
              <NuxtLink to="/create">
                <button class="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Create New Event
                </button>
              </NuxtLink>
              <NuxtLink to="/events">
                <button class="w-full flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  Browse All Events
                </button>
              </NuxtLink>
              <NuxtLink to="/profile">
                <button class="w-full flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  View Profile
                </button>
              </NuxtLink>
            </div>
          </div>

          <!-- User Profile Card -->
          <div class="bg-white rounded-xl shadow p-6">
            <div class="flex items-center mb-4">
              <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {{ user?.name?.charAt(0) || 'U' }}
              </div>
              <div class="ml-4">
                <h3 class="font-bold text-gray-800">{{ user?.name || 'User' }}</h3>
                <p class="text-gray-600 text-sm">{{ user?.email || 'user@example.com' }}</p>
              </div>
            </div>
            <div class="border-t pt-4">
              <p class="text-sm text-gray-500 mb-2">Account ID: <span class="font-mono text-gray-800">{{ user?.id || 'N/A' }}</span></p>
              <p class="text-sm text-gray-500">Member since: <span class="text-gray-800">Today</span></p>
            </div>
          </div>
        </div>

        <!-- Middle Column - Bookmarked & Following -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Bookmarked Events -->
          <div class="bg-white rounded-xl shadow">
            <div class="p-6 border-b">
              <div class="flex justify-between items-center">
                <h2 class="text-xl font-bold text-gray-800">Bookmarked Events</h2>
                <NuxtLink to="/events/bookmarked" class="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View All →
                </NuxtLink>
              </div>
            </div>
            <div class="p-6">
              <div v-if="loading.bookmarks" class="text-center py-8">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              </div>
              <div v-else-if="!bookmarkedEvents || bookmarkedEvents.length === 0" class="text-center py-8">
                <svg class="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                <p class="text-gray-500">No bookmarked events yet</p>
                <p class="text-gray-400 text-sm mt-1">Bookmark events to see them here</p>
              </div>
              <div v-else class="space-y-4">
                <div v-for="event in bookmarkedEvents.slice(0, 3)" :key="event.id" 
                     class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <div>
                    <h4 class="font-medium text-gray-800">{{ event.title }}</h4>
                    <p class="text-sm text-gray-600 mt-1">
                      {{ formatDate(event.start_date) }} • {{ event.location }}
                    </p>
                  </div>
                  <div class="flex space-x-2">
                    <button @click="unbookmarkEvent(event.id)" 
                            class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                            title="Remove bookmark">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                      </svg>
                    </button>
                    <NuxtLink :to="`/events/${event.id}`" 
                              class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Events You're Following -->
          <div class="bg-white rounded-xl shadow">
            <div class="p-6 border-b">
              <div class="flex justify-between items-center">
                <h2 class="text-xl font-bold text-gray-800">Events You're Following</h2>
                <NuxtLink to="/events/followed" class="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View All →
                </NuxtLink>
              </div>
            </div>
            <div class="p-6">
              <div v-if="loading.followed" class="text-center py-8">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              </div>
              <div v-else-if="!followedEvents || followedEvents.length === 0" class="text-center py-8">
                <svg class="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-4.201V21m-4.75-11.75h4.5m-4.5 0v4.5m0-4.5l4.5 4.5" />
                </svg>
                <p class="text-gray-500">Not following any events</p>
                <p class="text-gray-400 text-sm mt-1">Follow events to get updates</p>
              </div>
              <div v-else class="space-y-4">
                <div v-for="event in followedEvents.slice(0, 3)" :key="event.id" 
                     class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <div>
                    <div class="flex items-center space-x-2">
                      <h4 class="font-medium text-gray-800">{{ event.title }}</h4>
                      <span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Following
                      </span>
                    </div>
                    <p class="text-sm text-gray-600 mt-1">
                      {{ formatDate(event.start_date) }} • {{ event.category }}
                    </p>
                  </div>
                  <div class="flex space-x-2">
                    <button @click="unfollowEvent(event.id)" 
                            class="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition">
                      Unfollow
                    </button>
                    <NuxtLink :to="`/events/${event.id}`" 
                              class="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition">
                      View
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Events -->
      <div class="mt-8 bg-white rounded-xl shadow">
        <div class="p-6 border-b">
          <h2 class="text-xl font-bold text-gray-800">Recent Events</h2>
        </div>
        <div class="p-6">
          <div v-if="loading.events" class="text-center py-8">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          </div>
          <div v-else-if="!recentEvents || recentEvents.length === 0" class="text-center py-8">
            <p class="text-gray-500">No events available</p>
            <button @click="fetchEvents" class="mt-2 text-blue-600 hover:text-blue-800">
              Refresh
            </button>
          </div>
          <div v-else class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="text-left text-gray-500 text-sm border-b">
                  <th class="pb-3 font-medium">Event</th>
                  <th class="pb-3 font-medium">Date</th>
                  <th class="pb-3 font-medium">Location</th>
                  <th class="pb-3 font-medium">Price</th>
                  <th class="pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="event in recentEvents.slice(0, 5)" :key="event.id" class="border-b hover:bg-gray-50">
                  <td class="py-4">
                    <div>
                      <p class="font-medium text-gray-800">{{ event.title }}</p>
                      <p class="text-sm text-gray-600">{{ truncateDescription(event.description) }}</p>
                    </div>
                  </td>
                  <td class="py-4">
                    {{ formatDate(event.start_date) }}
                  </td>
                  <td class="py-4">
                    {{ event.location }}
                  </td>
                  <td class="py-4">
                    <span v-if="event.price > 0" class="font-medium">
                      ${{ event.price.toFixed(2) }}
                    </span>
                    <span v-else class="text-green-600 font-medium">
                      Free
                    </span>
                  </td>
                  <td class="py-4">
                    <div class="flex space-x-2">
                      <button @click="toggleBookmark(event.id, event)"
                              class="p-2 rounded-lg hover:bg-gray-100 transition"
                              :title="isBookmarked(event.id) ? 'Remove bookmark' : 'Bookmark'">
                        <svg class="w-5 h-5" :class="isBookmarked(event.id) ? 'text-red-500 fill-current' : 'text-gray-400'" 
                             fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                      </button>
                      <button @click="toggleFollow(event.id, event)"
                              class="p-2 rounded-lg hover:bg-gray-100 transition"
                              :title="isFollowing(event.id) ? 'Unfollow' : 'Follow'">
                        <svg class="w-5 h-5" :class="isFollowing(event.id) ? 'text-green-500 fill-current' : 'text-gray-400'"
                             fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                      </button>
                      <NuxtLink :to="`/events/${event.id}`" 
                                class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                        View
                      </NuxtLink>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <div v-if="toast.show" 
         class="fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg transition-all duration-300"
         :class="toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'">
      <div class="flex items-center text-white">
        <svg v-if="toast.type === 'success'" class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <svg v-else class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
        {{ toast.message }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
});

// Import useApi composable
import { useApi } from '~/composables/useApi';

const { get, post, getCurrentUser } = useApi();

const user = ref<any>(null);
const loading = reactive({
  events: true,
  bookmarks: true,
  followed: true
});

const recentEvents = ref<any[]>([]);
const bookmarkedEvents = ref<any[]>([]);
const followedEvents = ref<any[]>([]);

const stats = reactive({
  totalEvents: 0,
  bookmarkedEvents: 0,
  followedEvents: 0,
  myEvents: 0
});

const toast = reactive({
  show: false,
  message: '',
  type: 'success'
});

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
  return description.length > 50 ? description.substring(0, 50) + '...' : description;
};

const showToast = (message: string, type: 'success' | 'error' = 'success') => {
  toast.message = message;
  toast.type = type;
  toast.show = true;
  setTimeout(() => {
    toast.show = false;
  }, 3000);
};

// Load user data
onMounted(async () => {
  if (process.client) {
    user.value = getCurrentUser();
    
    try {
      await Promise.all([
        fetchEvents(),
        fetchBookmarkedEvents(),
        fetchFollowedEvents()
      ]);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      showToast('Failed to load dashboard data', 'error');
    }
  }
});

// Fetch all events
const fetchEvents = async () => {
  try {
    loading.events = true;
    
    // Get all events (from all users)
    const response = await get('http://localhost:8080/events');
    
    // Ensure response is an array
    if (Array.isArray(response)) {
      recentEvents.value = response;
      stats.totalEvents = recentEvents.value.length;
      
      // Count events created by current user
      if (user.value?.id) {
        stats.myEvents = recentEvents.value.filter(e => e.created_by === user.value.id).length;
      }
    } else {
      console.error('Events API did not return an array:', response);
      recentEvents.value = [];
    }
    
  } catch (error) {
    console.error('Error fetching events:', error);
    showToast('Failed to load events', 'error');
  } finally {
    loading.events = false;
  }
};

// Fetch bookmarked events
const fetchBookmarkedEvents = async () => {
  try {
    loading.bookmarks = true;
    const response = await get('http://localhost:8080/events/bookmarked');
    
    // Ensure response is an array
    if (Array.isArray(response)) {
      bookmarkedEvents.value = response;
      stats.bookmarkedEvents = bookmarkedEvents.value.length;
    } else {
      console.error('Bookmarked API did not return an array:', response);
      bookmarkedEvents.value = [];
    }
    
  } catch (error) {
    console.error('Error fetching bookmarked events:', error);
  } finally {
    loading.bookmarks = false;
  }
};

// Fetch followed events
const fetchFollowedEvents = async () => {
  try {
    loading.followed = true;
    const response = await get('http://localhost:8080/events/followed');
    
    // Ensure response is an array
    if (Array.isArray(response)) {
      followedEvents.value = response;
      stats.followedEvents = followedEvents.value.length;
    } else {
      console.error('Followed API did not return an array:', response);
      followedEvents.value = [];
    }
    
  } catch (error) {
    console.error('Error fetching followed events:', error);
  } finally {
    loading.followed = false;
  }
};

// Check if event is bookmarked - FIXED
const isBookmarked = (eventId: number) => {
  if (!Array.isArray(bookmarkedEvents.value)) {
    return false;
  }
  return bookmarkedEvents.value.some((e: any) => e.id === eventId);
};

// Check if event is followed - FIXED
const isFollowing = (eventId: number) => {
  if (!Array.isArray(followedEvents.value)) {
    return false;
  }
  return followedEvents.value.some((e: any) => e.id === eventId);
};

// Toggle bookmark
const toggleBookmark = async (eventId: number, event: any) => {
  const token = localStorage.getItem('jwt_token');
  const isCurrentlyBookmarked = isBookmarked(eventId);
  
  try {
    if (isCurrentlyBookmarked) {
      await post(`http://localhost:8080/events/unbookmark?event_id=${eventId}`, {});
      
      // Remove from array
      if (Array.isArray(bookmarkedEvents.value)) {
        bookmarkedEvents.value = bookmarkedEvents.value.filter((e: any) => e.id !== eventId);
      }
      showToast('Event removed from bookmarks');
    } else {
      await post(`http://localhost:8080/events/bookmark?event_id=${eventId}`, {});
      
      // Add to array
      if (Array.isArray(bookmarkedEvents.value)) {
        bookmarkedEvents.value.unshift(event);
      } else {
        bookmarkedEvents.value = [event];
      }
      showToast('Event bookmarked!');
    }
    stats.bookmarkedEvents = Array.isArray(bookmarkedEvents.value) ? bookmarkedEvents.value.length : 0;
  } catch (error) {
    console.error('Error toggling bookmark:', error);
    showToast('Failed to update bookmark', 'error');
  }
};

// Remove bookmark
const unbookmarkEvent = async (eventId: number) => {
  await toggleBookmark(eventId, null);
  await fetchBookmarkedEvents();
};

// Toggle follow
const toggleFollow = async (eventId: number, event: any) => {
  const isCurrentlyFollowing = isFollowing(eventId);
  
  try {
    if (isCurrentlyFollowing) {
      await post(`http://localhost:8080/events/unfollow?event_id=${eventId}`, {});
      
      // Remove from array
      if (Array.isArray(followedEvents.value)) {
        followedEvents.value = followedEvents.value.filter((e: any) => e.id !== eventId);
      }
      showToast('Unfollowed event');
    } else {
      await post(`http://localhost:8080/events/follow?event_id=${eventId}`, {});
      
      // Add to array
      if (Array.isArray(followedEvents.value)) {
        followedEvents.value.unshift(event);
      } else {
        followedEvents.value = [event];
      }
      showToast('Now following event!');
    }
    stats.followedEvents = Array.isArray(followedEvents.value) ? followedEvents.value.length : 0;
  } catch (error) {
    console.error('Error toggling follow:', error);
    showToast('Failed to update follow status', 'error');
  }
};

// Unfollow event
const unfollowEvent = async (eventId: number) => {
  await toggleFollow(eventId, null);
  await fetchFollowedEvents();
};

// Logout
const logout = () => {
  if (process.client) {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }
};
</script>