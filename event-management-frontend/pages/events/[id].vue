<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
    <div class="max-w-6xl mx-auto">
      <!-- Navigation -->
      <div class="mb-6">
        <NuxtLink to="/events" class="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm mb-4">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to All Events
        </NuxtLink>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p class="mt-4 text-gray-600">Loading event details...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
        <p class="font-medium">{{ error }}</p>
        <button @click="$router.back()" class="mt-2 text-red-700 hover:text-red-900 underline text-sm">
          ← Go Back
        </button>
      </div>

      <!-- Event Details -->
      <div v-else-if="event" class="bg-white rounded-xl shadow-lg overflow-hidden">
        <!-- Event Header -->
        <div class="relative">
          <!-- Banner Image Placeholder -->
          <div class="h-48 md:h-64 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            <div class="text-center">
              <div class="text-white text-4xl md:text-5xl font-bold mb-2">{{ event.title }}</div>
              <div class="text-blue-100 text-lg">{{ event.category }}</div>
            </div>
          </div>
          
          <!-- Quick Actions -->
          <div class="absolute top-4 right-4 flex space-x-2">
            <button @click="toggleBookmark"
                    :title="isBookmarked ? 'Remove bookmark' : 'Bookmark'"
                    class="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition"
                    :class="isBookmarked ? 'text-red-600' : 'text-gray-600'">
              <svg class="w-5 h-5" :class="isBookmarked ? 'fill-current' : ''" 
                   fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
            
            <button @click="toggleFollow"
                    :title="isFollowing ? 'Unfollow' : 'Follow'"
                    class="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition"
                    :class="isFollowing ? 'text-green-600' : 'text-gray-600'">
              <svg class="w-5 h-5" :class="isFollowing ? 'fill-current' : ''"
                   fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Main Content -->
        <div class="p-6 md:p-8">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Left Column - Main Info -->
            <div class="lg:col-span-2">
              <!-- Description -->
              <div class="mb-8">
                <h2 class="text-2xl font-bold text-gray-800 mb-4">About This Event</h2>
                <div class="prose max-w-none">
                  <p class="text-gray-700 leading-relaxed whitespace-pre-line">{{ event.description }}</p>
                </div>
              </div>

              <!-- Event Highlights -->
              <div class="mb-8">
                <h2 class="text-2xl font-bold text-gray-800 mb-4">Event Highlights</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="flex items-center p-4 bg-blue-50 rounded-lg">
                    <svg class="w-6 h-6 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p class="font-medium text-gray-800">Date & Time</p>
                      <p class="text-sm text-gray-600">{{ formatDateTime(event.start_date) }} - {{ formatTime(event.end_date) }}</p>
                    </div>
                  </div>
                  
                  <div class="flex items-center p-4 bg-green-50 rounded-lg">
                    <svg class="w-6 h-6 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    <div>
                      <p class="font-medium text-gray-800">Location</p>
                      <p class="text-sm text-gray-600">{{ event.location }}</p>
                    </div>
                  </div>
                  
                  <div class="flex items-center p-4 bg-purple-50 rounded-lg">
                    <svg class="w-6 h-6 text-purple-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <div>
                      <p class="font-medium text-gray-800">Category</p>
                      <p class="text-sm text-gray-600">{{ event.category }}</p>
                    </div>
                  </div>
                  
                  <div class="flex items-center p-4 bg-amber-50 rounded-lg">
                    <svg class="w-6 h-6 text-amber-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p class="font-medium text-gray-800">Price</p>
                      <p class="text-lg font-bold" :class="event.price > 0 ? 'text-gray-800' : 'text-green-600'">
                        {{ event.price > 0 ? `$${event.price.toFixed(2)}` : 'Free Entry' }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Column - Sidebar -->
            <div class="lg:col-span-1">
              <!-- Event Stats Card -->
              <div class="bg-gray-50 rounded-xl p-6 mb-6">
                <h3 class="text-lg font-bold text-gray-800 mb-4">Event Information</h3>
                <div class="space-y-4">
                  <div>
                    <p class="text-sm text-gray-500">Event ID</p>
                    <p class="font-mono font-bold text-gray-800">{{ event.id }}</p>
                  </div>
                  
                  <div>
                    <p class="text-sm text-gray-500">Organizer ID</p>
                    <p class="font-mono font-bold text-gray-800">{{ event.created_by }}</p>
                  </div>
                  
                  <div>
                    <p class="text-sm text-gray-500">Duration</p>
                    <p class="font-medium text-gray-800">{{ calculateDuration() }}</p>
                  </div>
                  
                  <div>
                    <p class="text-sm text-gray-500">Status</p>
                    <span :class="getEventStatus().class" class="px-3 py-1 rounded-full text-sm font-medium">
                      {{ getEventStatus().text }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Action Buttons Card -->
              <div class="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
                <h3 class="text-lg font-bold text-gray-800 mb-4">Actions</h3>
                <div class="space-y-3">
                  <button @click="toggleBookmark"
                          class="w-full flex items-center justify-center px-4 py-3 rounded-lg transition"
                          :class="isBookmarked 
                            ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'">
                    <svg class="w-5 h-5 mr-2" :class="isBookmarked ? 'fill-current' : ''" 
                         fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                    {{ isBookmarked ? 'Remove Bookmark' : 'Bookmark Event' }}
                  </button>
                  
                  <button @click="toggleFollow"
                          class="w-full flex items-center justify-center px-4 py-3 rounded-lg transition"
                          :class="isFollowing 
                            ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'">
                    <svg class="w-5 h-5 mr-2" :class="isFollowing ? 'fill-current' : ''"
                         fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                            d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    {{ isFollowing ? 'Unfollow Event' : 'Follow Event' }}
                  </button>
                  
                  <button @click="shareEvent"
                          class="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Share Event
                  </button>
                  
                  <div v-if="isEventOwner" class="pt-3 border-t">
                    <button @click="editEvent"
                            class="w-full flex items-center justify-center px-4 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition">
                      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit Event
                    </button>
                  </div>
                </div>
              </div>

              <!-- Share Card -->
              <div class="mt-6 p-4 bg-gray-50 rounded-lg">
                <p class="text-sm text-gray-600 mb-2">Share this event:</p>
                <div class="flex space-x-2">
                  <button @click="shareOnTwitter" class="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    Twitter
                  </button>
                  <button @click="shareOnFacebook" class="p-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800">
                    Facebook
                  </button>
                  <button @click="copyLink" class="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                    Copy Link
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Additional Details Section -->
        <div class="border-t">
          <div class="p-6 md:p-8">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">Additional Information</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Date Details -->
              <div class="bg-gray-50 rounded-lg p-6">
                <h3 class="text-lg font-semibold text-gray-800 mb-4">Schedule Details</h3>
                <div class="space-y-4">
                  <div>
                    <p class="text-sm text-gray-500">Start Date & Time</p>
                    <p class="font-medium text-gray-800">{{ formatFullDateTime(event.start_date) }}</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500">End Date & Time</p>
                    <p class="font-medium text-gray-800">{{ formatFullDateTime(event.end_date) }}</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500">Timezone</p>
                    <p class="font-medium text-gray-800">Local Time</p>
                  </div>
                </div>
              </div>

              <!-- Location Details -->
              <div class="bg-gray-50 rounded-lg p-6">
                <h3 class="text-lg font-semibold text-gray-800 mb-4">Venue Information</h3>
                <div class="space-y-4">
                  <div>
                    <p class="text-sm text-gray-500">Venue Name</p>
                    <p class="font-medium text-gray-800">{{ event.location }}</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500">Address</p>
                    <p class="text-gray-600">Exact address would be displayed here</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500">Contact</p>
                    <p class="text-gray-600">Contact organizer for details</p>
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
    year: 'numeric'
  });
};

const formatTime = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

const formatFullDateTime = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    weekday: 'long',
    month: 'long', 
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const calculateDuration = () => {
  if (!event.value?.start_date || !event.value?.end_date) return '';
  
  const start = new Date(event.value.start_date);
  const end = new Date(event.value.end_date);
  const durationMs = end.getTime() - start.getTime();
  
  const hours = Math.floor(durationMs / (1000 * 60 * 60));
  const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours === 0) return `${minutes} minutes`;
  if (minutes === 0) return `${hours} hours`;
  return `${hours}h ${minutes}m`;
};

const getEventStatus = () => {
  if (!event.value?.start_date) return { text: 'Unknown', class: 'bg-gray-100 text-gray-800' };
  
  const now = new Date();
  const start = new Date(event.value.start_date);
  const end = new Date(event.value.end_date);
  
  if (now < start) {
    const daysUntil = Math.ceil((start.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    if (daysUntil === 1) return { text: 'Tomorrow', class: 'bg-blue-100 text-blue-800' };
    if (daysUntil <= 7) return { text: 'This Week', class: 'bg-green-100 text-green-800' };
    return { text: 'Upcoming', class: 'bg-blue-100 text-blue-800' };
  } else if (now >= start && now <= end) {
    return { text: 'Live Now', class: 'bg-green-100 text-green-800' };
  } else {
    return { text: 'Ended', class: 'bg-gray-100 text-gray-800' };
  }
};

// Load event data
onMounted(async () => {
  currentUser.value = getCurrentUser();
  
  try {
    loading.value = true;
    console.log('Loading event with ID:', eventId.value);
    
    // Fetch event details using your backend endpoint
    const eventData = await get(`http://localhost:8080/events/get?id=${eventId.value}`);
    console.log('Event data received:', eventData);
    
    if (!eventData || Object.keys(eventData).length === 0) {
      throw new Error('Event not found');
    }
    
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
    
    if (err?.status === 404 || err?.message?.includes('not found')) {
      error.value = 'Event not found. It may have been deleted or the ID is incorrect.';
    } else if (err?.status === 401) {
      error.value = 'Please log in to view this event.';
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } else if (err?.message?.includes('fetch')) {
      error.value = 'Cannot connect to server. Make sure backend is running on localhost:8080';
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
      alert('Event removed from bookmarks!');
    } else {
      await post(`http://localhost:8080/events/bookmark?event_id=${event.value.id}`, {});
      
      // Add to local array
      bookmarkedEvents.value.push(event.value);
      alert('Event bookmarked successfully!');
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
      alert('You unfollowed this event.');
    } else {
      await post(`http://localhost:8080/events/follow?event_id=${event.value.id}`, {});
      
      // Add to local array
      followedEvents.value.push(event.value);
      alert('You are now following this event!');
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
    copyLink();
  }
};

const shareOnTwitter = () => {
  if (!event.value) return;
  const text = `Check out "${event.value.title}"`;
  const url = window.location.href;
  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
};

const shareOnFacebook = () => {
  const url = window.location.href;
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
};

const copyLink = () => {
  const url = window.location.href;
  navigator.clipboard.writeText(url)
    .then(() => alert('Event link copied to clipboard!'))
    .catch(() => alert('Failed to copy to clipboard.'));
};

const editEvent = () => {
  if (!event.value) return;
  alert('Edit feature coming soon!');
  // router.push(`/events/${event.value.id}/edit`);
};
</script>

<style scoped>
.prose {
  color: #374151;
}

.prose p {
  margin-bottom: 1em;
  line-height: 1.7;
}
</style>