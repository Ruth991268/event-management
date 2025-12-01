<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header - Simplified -->
      <div class="mb-8">
        <!-- Navigation -->
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center space-x-4">
            <NuxtLink to="/dashboard" class="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Dashboard
            </NuxtLink>
            <span class="text-gray-400">|</span>
            <span class="text-sm text-gray-600">Following</span>
          </div>
          
          <!-- Quick Stats Badge -->
          <div class="text-xs">
            <span v-if="stats" class="bg-green-100 text-green-800 px-2 py-1 rounded-full">
              {{ stats.totalFollowing }} following
            </span>
          </div>
        </div>
        
        <!-- Page Title -->
        <div class="mb-6">
          <h1 class="text-2xl font-bold text-gray-800">Following</h1>
          <p class="text-gray-600 text-sm mt-1">Events you're interested in</p>
        </div>
        
        <!-- Filter and Actions - Compact -->
        <div class="flex flex-wrap gap-3 items-center">
          <!-- Filter Tabs (Horizontal) -->
          <div class="flex space-x-1 overflow-x-auto pb-2">
            <button 
              v-for="filter in filters" 
              :key="filter.value"
              @click="setFilter(filter)"
              class="px-3 py-1.5 text-sm rounded-lg whitespace-nowrap transition"
              :class="activeFilter?.value === filter.value 
                ? 'bg-blue-600 text-white' 
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'"
            >
              {{ filter.label }}
            </button>
          </div>
          
          <!-- Refresh Button -->
          <button @click="refreshFollowedEvents"
                  :disabled="loading"
                  class="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition disabled:opacity-50 flex items-center ml-auto">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>
      </div>

      <!-- Small Stats Cards -->
      <div v-if="stats" class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div class="bg-white rounded-lg shadow p-4">
          <div class="flex items-center">
            <div class="p-2 bg-green-100 rounded-lg">
              <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-xs text-gray-500">Following</p>
              <p class="text-lg font-bold text-gray-800">{{ stats.totalFollowing }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-4">
          <div class="flex items-center">
            <div class="p-2 bg-blue-100 rounded-lg">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-xs text-gray-500">Upcoming</p>
              <p class="text-lg font-bold text-gray-800">{{ stats.upcomingEvents }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-4">
          <div class="flex items-center">
            <div class="p-2 bg-purple-100 rounded-lg">
              <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-xs text-gray-500">Today</p>
              <p class="text-lg font-bold text-gray-800">{{ stats.todayEvents }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-4">
          <div class="flex items-center">
            <div class="p-2 bg-amber-100 rounded-lg">
              <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-xs text-gray-500">Soon</p>
              <p class="text-lg font-bold text-gray-800">{{ stats.startingSoon }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-8">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p class="mt-3 text-gray-600 text-sm">Loading followed events...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredEvents.length === 0" class="text-center py-8">
        <svg class="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-4.201V21m-4.75-11.75h4.5m-4.5 0v4.5m0-4.5l4.5 4.5" />
        </svg>
        <h3 class="text-base font-medium text-gray-800 mb-1">Not following any events</h3>
        <p class="text-gray-600 text-sm mb-4">Follow events to get updates</p>
        <div class="space-x-3">
          <NuxtLink to="/events" 
                    class="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Browse Events
          </NuxtLink>
        </div>
      </div>

      <!-- Events List - Compact -->
      <div v-else>
        <!-- Events Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="event in paginatedEvents" :key="event.id" 
               class="bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden border border-gray-100">
            <!-- Event Header -->
            <div class="p-4">
              <div class="flex justify-between items-start mb-3">
                <!-- Event Title and Status -->
                <div class="flex-1 min-w-0">
                  <div class="flex items-center space-x-2 mb-1">
                    <span class="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                      Following
                    </span>
                    <span :class="getTimeStatus(event.start_date).class" 
                          class="px-2 py-0.5 text-xs rounded-full">
                      {{ getTimeStatus(event.start_date).text }}
                    </span>
                  </div>
                  <h3 class="text-base font-semibold text-gray-800 truncate" :title="event.title">
                    {{ event.title }}
                  </h3>
                </div>
                
                <!-- Quick Actions -->
                <div class="flex space-x-1 ml-2">
                  <button @click="toggleBookmark(event.id)"
                          :title="isBookmarked(event.id) ? 'Remove bookmark' : 'Bookmark'"
                          class="p-1.5 rounded hover:bg-gray-100 transition"
                          :class="isBookmarked(event.id) ? 'text-red-600' : 'text-gray-400'">
                    <svg class="w-4 h-4" :class="isBookmarked(event.id) ? 'fill-current' : ''" 
                         fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <!-- Event Details - Compact -->
              <div class="space-y-2 text-sm">
                <!-- Category and Price -->
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">
                    {{ event.category }}
                  </span>
                  <span :class="event.price > 0 ? 'font-semibold text-gray-800' : 'text-green-600 font-medium'">
                    {{ event.price > 0 ? `$${event.price.toFixed(2)}` : 'Free' }}
                  </span>
                </div>
                
                <!-- Location -->
                <div class="flex items-center text-gray-600">
                  <svg class="w-4 h-4 mr-1.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <span class="truncate" :title="event.location">{{ event.location }}</span>
                </div>
                
                <!-- Date & Time -->
                <div class="flex items-center text-gray-600">
                  <svg class="w-4 h-4 mr-1.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{{ formatDateTime(event.start_date) }}</span>
                </div>
              </div>
            </div>
            
            <!-- Action Buttons - Compact -->
            <div class="bg-gray-50 px-4 py-3 border-t">
              <div class="flex justify-between items-center">
                <!-- View Button -->
                <NuxtLink :to="`/events/${event.id}`"
                          class="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition flex items-center">
                  <svg class="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View
                </NuxtLink>
                
                <!-- Unfollow Button -->
                <button @click="unfollowEvent(event.id)"
                        class="px-3 py-1.5 text-red-700 bg-red-50 text-sm rounded-lg hover:bg-red-100 transition flex items-center">
                  <svg class="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Unfollow
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- No Results for Filter -->
        <div v-if="filteredEvents.length > 0 && paginatedEvents.length === 0" 
             class="text-center py-8">
          <svg class="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 class="text-base font-medium text-gray-800 mb-1">No events match your filter</h3>
          <button @click="clearFilters" class="text-blue-600 hover:text-blue-800 text-sm">
            Clear filters
          </button>
        </div>

        <!-- Pagination - Compact -->
        <div v-if="filteredEvents.length > 0 && totalPages > 1" 
             class="flex justify-center items-center mt-6 space-x-2">
          <button @click="prevPage" 
                  :disabled="currentPage === 1"
                  class="px-3 py-1.5 border border-gray-300 text-sm rounded-lg hover:bg-gray-50 disabled:opacity-50">
            ← Prev
          </button>
          
          <div class="flex items-center space-x-1">
            <span v-for="page in visiblePages" :key="page"
                  @click="goToPage(page)"
                  class="w-8 h-8 flex items-center justify-center text-sm rounded-lg cursor-pointer transition"
                  :class="currentPage === page ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'">
              {{ page }}
            </span>
          </div>
          
          <button @click="nextPage" 
                  :disabled="currentPage === totalPages"
                  class="px-3 py-1.5 border border-gray-300 text-sm rounded-lg hover:bg-gray-50 disabled:opacity-50">
            Next →
          </button>
        </div>
      </div>

      <!-- Simple Toast Notification -->
      <div v-if="toast.show" 
           class="fixed bottom-4 right-4 px-4 py-2 rounded-lg shadow-lg transition-all duration-300 z-50 text-sm"
           :class="toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'">
        <div class="flex items-center text-white">
          <svg v-if="toast.type === 'success'" class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          <svg v-else class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
          {{ toast.message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
});

interface Event {
  id: number;
  title: string;
  description: string;
  category: string;
  location: string;
  start_date: string;
  end_date: string;
  price: number;
  created_by: number;
}

interface Stats {
  totalFollowing: number;
  upcomingEvents: number;
  todayEvents: number;
  startingSoon: number;
}

interface FilterOption {
  value: string;
  label: string;
}

interface Toast {
  show: boolean;
  message: string;
  type: 'success' | 'error';
}

// Initialize with default value to avoid undefined
const filters: FilterOption[] = [
  { value: 'all', label: 'All' },
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'today', label: 'Today' },
  { value: 'past', label: 'Past' },
  { value: 'free', label: 'Free' },
  { value: 'paid', label: 'Paid' }
];

// Set activeFilter with a default value from the filters array
const activeFilter = ref<FilterOption>(filters[0]);

const loading = ref(true);
const followedEvents = ref<Event[]>([]);
const bookmarkedEvents = ref<Event[]>([]);
const stats = ref<Stats | null>(null);

// Pagination
const itemsPerPage = 9;
const currentPage = ref(1);
const totalPages = computed(() => Math.ceil(filteredEvents.value.length / itemsPerPage));

// Toast notification
const toast = reactive<Toast>({
  show: false,
  message: '',
  type: 'success'
});

// Computed properties
const filteredEvents = computed(() => {
  const now = new Date();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  return followedEvents.value.filter(event => {
    const startDate = new Date(event.start_date);
    const isUpcoming = startDate > now;
    const isToday = startDate >= today && startDate < tomorrow;
    const isPast = startDate < now;
    const isFree = event.price === 0;

    switch (activeFilter.value?.value || 'all') {
      case 'upcoming':
        return isUpcoming;
      case 'today':
        return isToday;
      case 'past':
        return isPast;
      case 'free':
        return isFree;
      case 'paid':
        return !isFree;
      default:
        return true;
    }
  });
});

const paginatedEvents = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredEvents.value.slice(start, end);
});

const visiblePages = computed(() => {
  const pages: number[] = [];
  const maxVisible = 5;
  
  if (totalPages.value <= maxVisible) {
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i);
    }
  } else {
    const half = Math.floor(maxVisible / 2);
    let start = Math.max(1, currentPage.value - half);
    let end = Math.min(totalPages.value, start + maxVisible - 1);
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
  }
  
  return pages;
});

// Lifecycle
onMounted(async () => {
  await loadEvents();
});

// Create a proper API fetching function with proper headers
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
        showToast('Session expired. Please log in again.', 'error');
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

// Load events function
const loadEvents = async () => {
  loading.value = true;
  try {
    await Promise.all([
      fetchFollowedEvents(),
      fetchBookmarkedEvents()
    ]);
    calculateStats();
  } catch (error) {
    console.error('Error loading events:', error);
  } finally {
    loading.value = false;
  }
};

// API Calls - Updated with proper error handling
const fetchFollowedEvents = async () => {
  try {
    const response = await fetchWithAuth('http://localhost:8080/events/followed');
    followedEvents.value = response as Event[];
  } catch (error: any) {
    console.error('Error fetching followed events:', error);
    if (error.message !== 'Unauthorized') {
      showToast('Failed to load followed events', 'error');
    }
  }
};

const fetchBookmarkedEvents = async () => {
  try {
    const response = await fetchWithAuth('http://localhost:8080/events/bookmarked');
    bookmarkedEvents.value = response as Event[];
  } catch (error: any) {
    console.error('Error fetching bookmarked events:', error);
    if (error.message !== 'Unauthorized') {
      showToast('Failed to load bookmarked events', 'error');
    }
  }
};

const refreshFollowedEvents = async () => {
  await loadEvents();
  showToast('Refreshed', 'success');
};

// Utility Functions
const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const getTimeStatus = (startDate: string) => {
  const now = new Date();
  const start = new Date(startDate);
  const hoursUntil = (start.getTime() - now.getTime()) / (1000 * 60 * 60);
  
  if (hoursUntil < 0) {
    return { text: 'Ended', class: 'bg-gray-100 text-gray-800' };
  } else if (hoursUntil < 1) {
    return { text: 'Soon', class: 'bg-red-100 text-red-800' };
  } else if (hoursUntil < 24) {
    return { text: 'Today', class: 'bg-orange-100 text-orange-800' };
  } else if (hoursUntil < 168) {
    return { text: 'This Week', class: 'bg-blue-100 text-blue-800' };
  } else {
    return { text: 'Upcoming', class: 'bg-gray-100 text-gray-800' };
  }
};

const calculateStats = () => {
  const now = new Date();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  stats.value = {
    totalFollowing: followedEvents.value.length,
    upcomingEvents: followedEvents.value.filter(e => new Date(e.start_date) > now).length,
    todayEvents: followedEvents.value.filter(e => {
      const date = new Date(e.start_date);
      return date >= today && date < tomorrow;
    }).length,
    startingSoon: followedEvents.value.filter(e => {
      const hoursUntil = (new Date(e.start_date).getTime() - now.getTime()) / (1000 * 60 * 60);
      return hoursUntil > 0 && hoursUntil < 2;
    }).length
  };
};

// Bookmark Functions
const isBookmarked = (eventId: number): boolean => {
  return bookmarkedEvents.value.some(e => e.id === eventId);
};

const toggleBookmark = async (eventId: number) => {
  try {
    const isCurrentlyBookmarked = isBookmarked(eventId);
    
    if (isCurrentlyBookmarked) {
      await fetchWithAuth(`http://localhost:8080/events/unbookmark?event_id=${eventId}`, {
        method: 'POST'
      });
      bookmarkedEvents.value = bookmarkedEvents.value.filter(e => e.id !== eventId);
      showToast('Removed bookmark', 'success');
    } else {
      await fetchWithAuth(`http://localhost:8080/events/bookmark?event_id=${eventId}`, {
        method: 'POST'
      });
      const event = followedEvents.value.find(e => e.id === eventId);
      if (event) {
        bookmarkedEvents.value.unshift(event);
      }
      showToast('Bookmarked', 'success');
    }
  } catch (error) {
    console.error('Error toggling bookmark:', error);
    showToast('Failed to update bookmark', 'error');
  }
};

// Unfollow Event
const unfollowEvent = async (eventId: number) => {
  if (!confirm('Unfollow this event?')) {
    return;
  }
  
  try {
    await fetchWithAuth(`http://localhost:8080/events/unfollow?event_id=${eventId}`, {
      method: 'POST'
    });
    
    followedEvents.value = followedEvents.value.filter(e => e.id !== eventId);
    calculateStats();
    bookmarkedEvents.value = bookmarkedEvents.value.filter(e => e.id !== eventId);
    
    showToast('Unfollowed', 'success');
    
    if (paginatedEvents.value.length === 0 && currentPage.value > 1) {
      currentPage.value = 1;
    }
  } catch (error) {
    console.error('Error unfollowing event:', error);
    showToast('Failed to unfollow', 'error');
  }
};

// Filter Functions - FIXED: Added type guard
const setFilter = (filter: FilterOption | undefined) => {
  if (filter) {
    activeFilter.value = filter;
    currentPage.value = 1;
  }
};

const clearFilters = () => {
  activeFilter.value = filters[0];
  currentPage.value = 1;
};

// Pagination Functions
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const goToPage = (page: number) => {
  currentPage.value = page;
};

// Toast Functions
const showToast = (message: string, type: 'success' | 'error' = 'success') => {
  toast.message = message;
  toast.type = type;
  toast.show = true;
  
  setTimeout(() => {
    toast.show = false;
  }, 2000);
};
</script>

<style scoped>
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Smooth transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>