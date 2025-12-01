<template>
  <footer class="bg-gradient-to-r from-purple-800 to-purple-900 text-white py-16 mt-auto">
    <div class="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">
      <div>
        <h3 class="text-3xl font-black mb-4">Eventify Kenya</h3>
        <p class="text-purple-200 leading-relaxed">
          The #1 platform to discover, create, and manage events across East Africa.
        </p>
      </div>

      <div>
        <h4 class="text-xl font-bold mb-4">Quick Links</h4>
        <ul class="space-y-3 text-purple-200">
          <li><NuxtLink to="/" class="hover:underline">Home</NuxtLink></li>
          <li><NuxtLink to="/events" class="hover:underline">Discover Events</NuxtLink></li>
          <li><NuxtLink to="/events/create" class="hover:underline">Create Event</NuxtLink></li>
          <li><NuxtLink to="/events/my" class="hover:underline">My Events</NuxtLink></li>
        </ul>
      </div>

      <div>
        <h4 class="text-xl font-bold mb-4">Support</h4>
        <ul class="space-y-3 text-purple-200">
          <li><a href="#" class="hover:underline">Help Center</a></li>
          <li><a href="#" class="hover:underline">Contact Us</a></li>
          <li><a href="#" class="hover:underline">Privacy Policy</a></li>
        </ul>
      </div>

      <div>
        <h4 class="text-xl font-bold mb-4">Connect</h4>
        <div class="flex space-x-5 text-3xl">
          <a href="#" class="hover:text-purple-300">Facebook</a>
          <a href="#" class="hover:text-purple-300">Twitter</a>
          <a href="#" class="hover:text-purple-300">Instagram</a>
        </div>
        <p class="mt-6 text-purple-200">contact@eventify.co.ke</p>
      </div>
    </div>

    <div class="text-center mt-12 text-purple-300 text-sm">
      © 2025 Eventify Kenya. Built with love in Nairobi ❤️
    </div>
  </footer>
</template>