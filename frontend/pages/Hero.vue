<template>
  <section class="bg-white py-12">
    <div class="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-8 items-center">
      <div>
        <h1 class="text-4xl md:text-5xl font-extrabold text-primary">Discover Local Events Near You</h1>
        <p class="mt-4 text-neutral-700 max-w-xl">
          Browse, bookmark, and book tickets for music, workshops, food festivals, and more.
        </p>
        <div class="mt-6 flex gap-3">
          <NuxtLink to="/events" class="px-6 py-3 bg-secondary text-white rounded-xl">Browse Events</NuxtLink>
          <NuxtLink to="/create-event" class="px-6 py-3 bg-white border rounded-xl text-primary hover:bg-primary hover:text-white">Host Event</NuxtLink>
        </div>
      </div>
      <div class="relative">
        <img src="/hero.jpg" class="rounded-2xl shadow-lg object-cover w-full h-96" />
      </div>
    </div>
  </section>
</template>
