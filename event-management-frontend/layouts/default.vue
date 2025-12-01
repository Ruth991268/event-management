<template>
  <div class="flex flex-col min-h-screen bg-gray-50">
    <AppNavbar />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>