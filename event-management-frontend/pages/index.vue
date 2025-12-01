<template>
  <div class="min-h-screen bg-purple-50">

    <!-- ===========================
         1. HERO SECTION WITH IMAGE
         =========================== -->
    <section 
      class="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center text-center px-6 relative"
      style="background-image: url('/images/event-hero.png')"
    >
      <div class="absolute inset-0 bg-black/50"></div>

      <div class="relative z-10 max-w-4xl mx-auto text-gray-100">
        <h1 class="text-6xl md:text-8xl font-bold mb-6">Welcome to Eventify Kenya</h1>
        <p class="text-2xl md:text-3xl mb-10 opacity-90">
          Discover the best events happening near you
        </p>

        <div class="flex flex-col sm:flex-row gap-6 justify-center">
          <UButton to="/events" size="xl" color="white" class="text-2xl px-12 py-6">
            Explore Events
          </UButton>
          <UButton 
            to="/events/create" 
            size="xl" 
            variant="outline" 
            color="white" 
            class="text-2xl px-12 py-6"
          >
            + Create Event
          </UButton>
        </div>
      </div>
    </section>

    <!-- ===========================
         2. OUR SERVICES SECTION
         =========================== -->
    <section class="py-28 bg-purple-50">
      <div class="max-w-7xl mx-auto px-6">

        <!-- TITLE -->
        <div class="text-center mb-20">
          <h2 class="text-5xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p class="text-lg text-gray-700">
            Tailored solutions for your events. Elevate your experience with our
            exceptional and comprehensive service suite.
          </p>
        </div>

        <!-- SERVICES GRID -->
        <div class="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 justify-items-center">

          <!-- SERVICE 1: LOCATION -->
          <div class="p-8 sm:p-10 bg-white rounded-3xl shadow-xl text-center border border-purple-200 w-full max-w-xs">
            <div
              class="w-20 h-20 mx-auto rounded-full bg-purple-600 
                     flex items-center justify-center text-white text-4xl mb-6">
              📍
            </div>

            <h3 class="text-2xl font-semibold text-gray-900 mb-3">Event Location Finder</h3>
            <p class="text-gray-600 text-lg mb-6">
              Discover nearby events instantly with our smart, real-time location system.
            </p>

            <button class="text-purple-600 font-semibold text-lg hover:underline">
              View more
            </button>
          </div>

          <!-- SERVICE 2: TICKETING -->
          <div class="p-8 sm:p-10 bg-white rounded-3xl shadow-xl text-center border border-purple-200 w-full max-w-xs">
            <div
              class="w-20 h-20 mx-auto rounded-full bg-purple-600 
                     flex items-center justify-center text-white text-4xl mb-6">
              🎟
            </div>

            <h3 class="text-2xl font-semibold text-gray-900 mb-3">Smart Ticketing</h3>
            <p class="text-gray-600 text-lg mb-6">
              Secure, fast, and simple ticket booking for all types of events in seconds.
            </p>

            <button class="text-purple-600 font-semibold text-lg hover:underline">
              View more
            </button>
          </div>

          <!-- SERVICE 3: PROMOTION -->
          <div class="p-8 sm:p-10 bg-white rounded-3xl shadow-xl text-center border border-purple-200 w-full max-w-xs">
            <div
              class="w-20 h-20 mx-auto rounded-full bg-purple-600 
                     flex items-center justify-center text-white text-4xl mb-6">
              📢
            </div>

            <h3 class="text-2xl font-semibold text-gray-900 mb-3">Event Promotion</h3>
            <p class="text-gray-600 text-lg mb-6">
              Boost visibility and reach thousands of users with powerful event marketing.
            </p>
            <button class="text-purple-600 font-semibold text-lg hover:underline">
              View more
            </button>
          </div>

        </div>
      </div>
    </section>

    <!-- ===========================
         3. UPCOMING EVENTS
         =========================== -->
    <section class="py-24 bg-purple-50 text-gray-900">
      <div class="max-w-7xl mx-auto px-6">

        <h2 class="text-5xl font-bold text-center mb-16 text-purple-700">
          Upcoming Events
        </h2>

        <div class="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 justify-items-center">

          <UCard class="bg-white border-purple-300 shadow-lg w-full max-w-sm">
            <img src="/images/event1.jpg" class="h-64 w-full object-cover rounded-t-xl" />
            <div class="p-6">
              <h3 class="text-3xl font-bold mb-3 text-purple-700">
                Nairobi Tech Summit
              </h3>
              <p class="text-xl">January 14, 2025</p>
            </div>
          </UCard>

          <UCard class="bg-white border-purple-300 shadow-lg w-full max-w-sm">
            <img src="/images/event2.jpg" class="h-64 w-full object-cover rounded-t-xl" />
            <div class="p-6">
              <h3 class="text-3xl font-bold mb-3 text-purple-700">
                Kenya Food Festival
              </h3>
              <p class="text-xl">December 22, 2024</p>
            </div>
          </UCard>

          <UCard class="bg-white border-purple-300 shadow-lg w-full max-w-sm">
            <img src="/images/event3.jpg" class="h-64 w-full object-cover rounded-t-xl" />
            <div class="p-6">
              <h3 class="text-3xl font-bold mb-3 text-purple-700">
                Mombasa Beach Party
              </h3>
              <p class="text-xl">January 9, 2025</p>
            </div>
          </UCard>

        </div>
      </div>
    </section>

    <!-- ===========================
         4. WHAT USERS SAY
         =========================== -->
    <section class="py-24 bg-purple-50 text-gray-900">
      <div class="max-w-7xl mx-auto px-6">

        <h2 class="text-5xl font-bold text-center mb-16 text-purple-700">
          What Our Customers Say
        </h2>

        <div class="flex flex-col md:flex-row justify-center gap-12 text-center">

          <!-- USER 1 -->
          <div class="flex flex-col items-center max-w-xs">
            <img 
              src="/images/user1.jpg" 
              class="w-32 h-32 rounded-full mb-4 object-cover border-4 border-purple-200" 
            />
            <p class="text-lg mb-2">“Eventify made booking so easy!”</p>
            <h4 class="text-xl font-bold">— Sarah K</h4>
          </div>

          <!-- USER 2 -->
          <div class="flex flex-col items-center max-w-xs">
            <img 
              src="/images/user2.jpg" 
              class="w-32 h-32 rounded-full mb-4 object-cover border-4 border-purple-200" 
            />
            <p class="text-lg mb-2">“Perfect for weekend plans.”</p>
            <h4 class="text-xl font-bold">— Brian M</h4>
          </div>

          <!-- USER 3 -->
          <div class="flex flex-col items-center max-w-xs">
            <img 
              src="/images/user3.jpg" 
              class="w-32 h-32 rounded-full mb-4 object-cover border-4 border-purple-200" 
            />
            <p class="text-lg mb-2">“Easy to find concerts I love!”</p>
            <h4 class="text-xl font-bold">— Aisha L</h4>
          </div>

        </div>
      </div>
    </section>

  </div>
</template>