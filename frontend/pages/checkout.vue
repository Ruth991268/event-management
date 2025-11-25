<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 class="text-2xl font-bold text-blue-600">Eventify</h1>
      <nav class="flex gap-4">
        <NuxtLink to="/" class="text-gray-700 hover:text-blue-600">Home</NuxtLink>
        <NuxtLink to="/events" class="text-gray-700 hover:text-blue-600">Events</NuxtLink>
      </nav>
    </header>

    <main class="max-w-3xl mx-auto py-8 px-6">
      <h2 class="text-2xl font-semibold mb-6">Checkout</h2>
      <form class="bg-white p-6 rounded-xl shadow-md flex flex-col gap-4">
        <input type="text" placeholder="Full Name" class="border rounded-lg px-4 py-2"/>
        <input type="email" placeholder="Email" class="border rounded-lg px-4 py-2"/>
        <input type="text" placeholder="Card Number" class="border rounded-lg px-4 py-2"/>
        <input type="text" placeholder="Expiry Date" class="border rounded-lg px-4 py-2"/>
        <input type="text" placeholder="CVC" class="border rounded-lg px-4 py-2"/>
        <button class="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Pay Now</button>
      </form>
    </main>

    <footer class="bg-white border-t mt-12 p-6 text-center text-gray-600">
      © 2025 Eventify. All rights reserved.
    </footer>
  </div>
</template>
