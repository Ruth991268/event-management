<!-- pages/about.vue -->
<template>
  <div class="min-h-screen bg-gray-50 py-12 px-6 md:px-12 lg:px-24">
    <div class="max-w-7xl mx-auto">

      <!-- Main Grid – matches your screenshot exactly -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        <!-- LEFT SIDE – Images & Stats -->
        <div class="space-y-12">

          <!-- Top Stats Card -->
          <div class="bg-white rounded-3xl shadow-lg p-8 text-center transform hover:scale-105 transition duration-300">
            <p class="text-5xl font-bold text-purple-700">1,000+</p>
            <p class="text-gray-600 mt-2">Users who switched & feel better every single day</p>
            <div class="mt-4 flex justify-center">
              <div class="flex -space-x-3">
                <img v-for="n in 6" :key="n"
                     class="w-10 h-10 rounded-full border-4 border-white shadow"
                     src="https://randomuser.me/api/portraits/women/32.jpg"
                     alt="user">
                <div class="w-10 h-10 rounded-full bg-purple-100 border-4 border-white flex items-center justify-center text-purple-700 font-bold text-sm">
                  +10k
                </div>
              </div>
            </div>
          </div>

          <!-- Images Grid -->
          <div class="grid grid-cols-2 gap-6">
            <!-- Image 1 – Purple bottle with orange -->
            <div class="relative group">
              <div class="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
              <img src="/images/about-1.jpg" alt="Thrive bottle"
                   class="relative rounded-3xl shadow-2xl w-full object-cover h-80">
            </div>

            <!-- Image 2 – Product box + bottle -->
            <div class="relative group mt-12">
              <div class="absolute -inset-1 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
              <img src="/images/about-2.jpg" alt="Thrive product"
                   class="relative rounded-3xl shadow-2xl w-full object-cover h-80">
            </div>
          </div>

          <!-- Ratings -->
          <div class="flex items-center space-x-2 bg-white rounded-full px-6 py-3 shadow-md w-fit">
            <span class="text-yellow-500 text-2xl">5 stars</span>
            <span class="font-semibold">Best ratings</span>
          </div>
        </div>

        <!-- RIGHT SIDE – Text + Button -->
        <div class="flex flex-col justify-center space-y-8">
          <div>
            <p class="text-purple-600 font-semibold tracking-wider uppercase text-sm">A bit</p>
            <h1 class="text-5xl md:text-6xl font-bold text-gray-800 mt-2 leading-tight">
              ABOUT US
            </h1>
          </div>

          <p class="text-gray-600 text-lg leading-relaxed max-w-lg">
         We believe every great moment deserves a great event. Eventify is the all-in-one platform that empowers organizers to create, manage, and promote unforgettable experiences — from intimate workshops to massive festivals.
            Whether you're hosting a corporate conference, wedding, concert, meetup, or community gathering, Eventify gives you beautiful ticketing, seamless check-in, powerful analytics, and stunning event pages — all in one place.</p>

          <button class="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold text-lg rounded-full shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 w-fit">
            <span>EXPLORE MORE</span>
            <svg class="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No script needed – pure static about page
</script>