<!-- frontend/pages/events/my.vue -->
<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6">My Events</h1>

    <div v-if="myEvents.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="event in myEvents" :key="event.id" class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="p-6">
          <h2 class="text-2xl font-semibold mb-2">{{ event.title }}</h2>
          <p class="text-gray-600 mb-4">{{ event.description }}</p>
          <p class="text-sm text-gray-500 mb-1"><strong>Category:</strong> {{ event.category }}</p>
          <p class="text-sm text-gray-500 mb-1"><strong>Location:</strong> {{ event.location }}</p>
          <p class="text-sm text-gray-500 mb-1"><strong>Date:</strong> {{ new Date(event.start_date).toLocaleDateString() }} - {{ new Date(event.end_date).toLocaleDateString() }}</p>
          <p class="text-lg font-bold text-green-700 mt-2">Price: ${{ event.price }}</p>
          <div class="mt-4 flex space-x-2">
            <button @click="editEvent(event.id)" class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded">Edit</button>
            <button @click="deleteEvent(event.id)" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">Delete</button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center py-10 text-gray-500">
      You haven't created any events yet.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';

const myEvents = ref([]);
const auth = useAuthStore();

const fetchMyEvents = async () => {
  if (!auth.isLoggedIn || !auth.user || !auth.user.id) {
    alert('You must be logged in to view your events.');
    navigateTo('/auth/login');
    return;
  }
  try {
    // Fetch all public events and then filter by the logged-in user's ID
    const response = await $fetch('/api/events/public', {
      headers: {
        'Content-Type': 'application/json'
        // No Authorization header needed for /events/public
      }
    });
    // Filter events created by the current user client-side
    myEvents.value = response.filter(event => event.created_by === auth.user.id);
  } catch (e) {
    console.error('Failed to fetch my events:', e);
    alert('Failed to load your events. Please try again.');
  }
};

const editEvent = (id) => {
  alert(`Edit event ${id} - This feature would navigate to an edit form.`);
  // In a real app, you'd navigate: navigateTo(`/events/edit/${id}`);
};

const deleteEvent = async (id) => {
  if (!auth.isLoggedIn) {
    alert('You must be logged in to delete an event.');
    navigateTo('/auth/login');
    return;
  }
  if (!confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
    return;
  }
  try {
    await $fetch(`/api/events/delete?id=${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${auth.token}` // Ensure token is sent for protected delete
      }
    });
    alert('Event deleted successfully!');
    fetchMyEvents(); // Refresh the list
  } catch (e) {
    console.error('Failed to delete event:', e);
    let errorMessage = 'Failed to delete event. You might not have permission or there was a server error.';
    if (e.response && e.response._data && e.response._data.error) {
        errorMessage = `Failed to delete event: ${e.response._data.error}`;
    } else if (e.message) {
        errorMessage = `Failed to delete event: ${e.message}`;
    }
    alert(errorMessage);
  }
};

onMounted(() => {
  auth.initialize();
  fetchMyEvents();
});
</script>