<!-- pages/contact.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 overflow-hidden">
    <!-- Main Container -->
    <div class="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        <!-- LEFT SIDE – Text -->
        <div class="space-y-8">
          <div>
            <h1 class="text-6xl md:text-7xl lg:text-8xl font-black text-gray-900 leading-none">
              CONTACT<br />
              <span class="text-purple-600">US</span>
            </h1>
            <div class="h-1 w-24 bg-purple-600 mt-6"></div>
          </div>

          <p class="text-2xl font-medium text-gray-700">Eventify Support Team</p>

          <p class="text-lg text-gray-600 max-w-lg leading-relaxed">
            Have a question? Want to organize an event with us or just say hello?
            Our team is here 24/7 to help you create amazing experiences.
            Drop us a message — we reply lightning fast!
          </p>

          <NuxtLink
            to="mailto:hello@eventify.app"
            class="inline-flex items-center px-8 py-4 bg-gray-900 text-white font-bold text-lg rounded-full shadow-xl hover:bg-gray-800 transform hover:-translate-y-1 transition-all duration-300"
          >
            <span>GET IN TOUCH</span>
            <svg class="w-6 h-6 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </NuxtLink>
        </div>

        <!-- RIGHT SIDE – Illustration -->
        <div class="relative">
          <!-- Decorative bubbles -->
          <div class="absolute top-0 right-10 w-20 h-20 bg-purple-200 rounded-full opacity-30"></div>
          <div class="absolute top-32 left-20 w-12 h-12 bg-purple-300 rounded-full opacity-40"></div>
          <div class="absolute bottom-40 right-32 w-16 h-16 bg-purple-100 rounded-full opacity-50"></div>
          <div class="absolute bottom-10 left-10 w-24 h-24 bg-purple-200 rounded-full opacity-20"></div>
          <div class="absolute top-1/2 right-0 w-10 h-10 bg-purple-400 rounded-full opacity-60"></div>

          <!-- Exact illustration from your screenshot -->
          <img
            src="/images/contact-illustration.png"
            alt="Eventify Support Team"
            class="relative z-10 w-full max-w-lg drop-shadow-2xl"
          />
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Page is fully static – no script needed
</script>

<style scoped>
/* Optional: add a little entrance animation */
img {
  animation: float 6s ease-in-out infinite;
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}
</style>