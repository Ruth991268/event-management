<template>
  <div>
    <Header />
    <main class="min-h-[calc(100vh-64px)]">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup>
import Header from '~/components/Header.vue'
</script>
