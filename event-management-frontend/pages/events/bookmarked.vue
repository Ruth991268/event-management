<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
    <div class="max-w-4xl mx-auto">
      <!-- Navigation -->
      <div class="mb-6">
        <NuxtLink to="/events" class="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm mb-4">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Events
        </NuxtLink>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p class="mt-4 text-gray-600">Loading event details...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
        <p>{{ error }}</p>
        <button @click="$router.back()" class="mt-2 text-red-700 hover:text-red-900">
          Go Back
        </button>
      </div>

      <!-- Event Details -->
      <div v-else-if="event" class="bg-white rounded-xl shadow-lg overflow-hidden">
        <!-- Event Header -->
        <div class="p-6 md:p-8 border-b">
          <div class="flex justify-between items-start">
            <div>
              <h1 class="text-3xl font-bold text-gray-800">{{ event.title }}</h1>
              <div class="flex items-center space-x-3 mt-2">
                <span class="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium">
                  {{ event.category }}
                </span>
                <span v-if="event.price > 0" class="text-lg font-bold text-gray-800">
                  ${{ event.price.toFixed(2) }}
                </span>
                <span v-else class="text-green-600 font-medium">
                  Free
                </span>
              </div>
            </div>
            
            <!-- Action Buttons -->
            <div class="flex space-x-2">
              <button @click="toggleBookmark(event.id)"
                      :title="isBookmarked ? 'Remove bookmark' : 'Bookmark'"
                      class="p-2 rounded-lg hover:bg-gray-100 transition"
                      :class="isBookmarked ? 'text-red-600 bg-red-50' : 'text-gray-400'">
                <svg class="w-5 h-5" :class="isBookmarked ? 'fill-current' : ''" 
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </button>
              
              <button @click="toggleFollow(event.id)"
                      :title="isFollowing ? 'Unfollow' : 'Follow'"
                      class="p-2 rounded-lg hover:bg-gray-100 transition"
                      :class="isFollowing ? 'text-green-600 bg-green-50' : 'text-gray-400'">
                <svg class="w-5 h-5" :class="isFollowing ? 'fill-current' : ''"
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Event Content -->
        <div class="p-6 md:p-8">
          <!-- Description -->
          <div class="mb-8">
            <h2 class="text-xl font-bold text-gray-800 mb-4">Description</h2>
            <p class="text-gray-700 whitespace-pre-line">{{ event.description }}</p>
          </div>

          <!-- Event Details Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <!-- Date & Time -->
            <div class="bg-gray-50 rounded-lg p-6">
              <h3 class="text-lg font-semibold text-gray-800 mb-4">Date & Time</h3>
              <div class="space-y-3">
                <div class="flex items-center">
                  <svg class="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p class="text-sm text-gray-500">Start</p>
                    <p class="font-medium text-gray-800">{{ formatDateTime(event.start_date) }}</p>
                  </div>
                </div>
                
                <div class="flex items-center">
                  <svg class="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p class="text-sm text-gray-500">End</p>
                    <p class="font-medium text-gray-800">{{ formatDateTime(event.end_date) }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Location -->
            <div class="bg-gray-50 rounded-lg p-6">
              <h3 class="text-lg font-semibold text-gray-800 mb-4">Location</h3>
              <div class="flex items-start">
                <svg class="w-5 h-5 text-gray-400 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p class="font-medium text-gray-800">{{ event.location }}</p>
                  <p class="text-sm text-gray-500 mt-1">Venue address or location details</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Event Stats -->
          <div class="border-t pt-8">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Event Information</h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="text-center">
                <p class="text-sm text-gray-500">Event ID</p>
                <p class="font-bold text-gray-800">{{ event.id }}</p>
              </div>
              <div class="text-center">
                <p class="text-sm text-gray-500">Organizer ID</p>
                <p class="font-bold text-gray-800">{{ event.created_by }}</p>
              </div>
              <div class="text-center">
                <p class="text-sm text-gray-500">Category</p>
                <p class="font-bold text-gray-800">{{ event.category }}</p>
              </div>
              <div class="text-center">
                <p class="text-sm text-gray-500">Price</p>
                <p class="font-bold" :class="event.price > 0 ? 'text-gray-800' : 'text-green-600'">
                  {{ event.price > 0 ? `$${event.price.toFixed(2)}` : 'Free' }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons Footer -->
        <div class="bg-gray-50 px-6 md:px-8 py-6 border-t">
          <div class="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div class="flex space-x-3">
              <button @click="toggleBookmark(event.id)"
                      class="px-4 py-2 rounded-lg flex items-center transition"
                      :class="isBookmarked 
                        ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'">
                <svg class="w-4 h-4 mr-2" :class="isBookmarked ? 'fill-current' : ''" 
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                {{ isBookmarked ? 'Remove Bookmark' : 'Bookmark' }}
              </button>
              
              <button @click="toggleFollow(event.id)"
                      class="px-4 py-2 rounded-lg flex items-center transition"
                      :class="isFollowing 
                        ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'">
                <svg class="w-4 h-4 mr-2" :class="isFollowing ? 'fill-current' : ''"
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                {{ isFollowing ? 'Unfollow' : 'Follow' }}
              </button>
            </div>
            
            <div class="flex space-x-3">
              <button @click="shareEvent"
                      class="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition flex items-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Share
              </button>
              
              <button v-if="isEventOwner" @click="editEvent"
                      class="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition">
                Edit Event
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useApi } from '~/composables/useApi';

// Get the event ID from the route parameters
const route = useRoute();
const router = useRouter();
const { get, post, getCurrentUser } = useApi();

const eventId = computed(() => Number(route.params.id));
const loading = ref(true);
const error = ref('');
const event = ref<any>(null);
const bookmarkedEvents = ref<any[]>([]);
const followedEvents = ref<any[]>([]);
const currentUser = ref<any>(null);

// Computed properties
const isBookmarked = computed(() => {
  if (!Array.isArray(bookmarkedEvents.value)) return false;
  return bookmarkedEvents.value.some(e => e.id === event.value?.id);
});

const isFollowing = computed(() => {
  if (!Array.isArray(followedEvents.value)) return false;
  return followedEvents.value.some(e => e.id === event.value?.id);
});

const isEventOwner = computed(() => {
  return currentUser.value?.id === event.value?.created_by;
});

// Helper functions
const formatDateTime = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    weekday: 'short',
    month: 'short', 
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Load event data
onMounted(async () => {
  currentUser.value = getCurrentUser();
  
  try {
    loading.value = true;
    
    // Fetch event details
    const eventData = await get(`http://localhost:8080/events/get?id=${eventId.value}`);
    event.value = eventData;
    
    // Fetch bookmarked events
    try {
      const bookmarks = await get('http://localhost:8080/events/bookmarked');
      if (Array.isArray(bookmarks)) {
        bookmarkedEvents.value = bookmarks;
      }
    } catch (e) {
      console.error('Error fetching bookmarks:', e);
      bookmarkedEvents.value = [];
    }
    
    // Fetch followed events
    try {
      const followed = await get('http://localhost:8080/events/followed');
      if (Array.isArray(followed)) {
        followedEvents.value = followed;
      }
    } catch (e) {
      console.error('Error fetching followed events:', e);
      followedEvents.value = [];
    }
    
  } catch (err: any) {
    console.error('Error loading event:', err);
    
    if (err?.status === 404) {
      error.value = 'Event not found. It may have been deleted.';
    } else if (err?.status === 401) {
      error.value = 'Please log in to view this event.';
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } else {
      error.value = 'Failed to load event details. Please try again.';
    }
  } finally {
    loading.value = false;
  }
});

// Action functions
const toggleBookmark = async () => {
  if (!event.value) return;
  
  try {
    if (isBookmarked.value) {
      await post(`http://localhost:8080/events/unbookmark?event_id=${event.value.id}`, {});
      
      // Remove from local array
      bookmarkedEvents.value = bookmarkedEvents.value.filter(e => e.id !== event.value.id);
    } else {
      await post(`http://localhost:8080/events/bookmark?event_id=${event.value.id}`, {});
      
      // Add to local array
      bookmarkedEvents.value.push(event.value);
    }
  } catch (error) {
    console.error('Error toggling bookmark:', error);
    alert('Failed to update bookmark. Please try again.');
  }
};

const toggleFollow = async () => {
  if (!event.value) return;
  
  try {
    if (isFollowing.value) {
      await post(`http://localhost:8080/events/unfollow?event_id=${event.value.id}`, {});
      
      // Remove from local array
      followedEvents.value = followedEvents.value.filter(e => e.id !== event.value.id);
    } else {
      await post(`http://localhost:8080/events/follow?event_id=${event.value.id}`, {});
      
      // Add to local array
      followedEvents.value.push(event.value);
    }
  } catch (error) {
    console.error('Error toggling follow:', error);
    alert('Failed to update follow status. Please try again.');
  }
};

const shareEvent = () => {
  if (!event.value) return;
  
  const shareText = `Check out "${event.value.title}" on ${formatDateTime(event.value.start_date)} at ${event.value.location}`;
  const shareUrl = window.location.href;
  
  if (navigator.share) {
    navigator.share({
      title: event.value.title,
      text: shareText,
      url: shareUrl
    }).catch(console.error);
  } else {
    // Fallback: Copy to clipboard
    navigator.clipboard.writeText(`${shareText}\n${shareUrl}`)
      .then(() => alert('Event link copied to clipboard!'))
      .catch(() => alert('Failed to copy to clipboard.'));
  }
};

const editEvent = () => {
  if (!event.value) return;
  alert('Edit feature coming soon!');
  // router.push(`/events/${event.value.id}/edit`);
};
</script>