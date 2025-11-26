<template>
  <div></div>
</template>

<script setup>
const auth = useAuthStore()

onMounted(() => {
  if (auth.isLoggedIn) {
    navigateTo('/events')
  } else {
    navigateTo('/auth/login')
  }
})
</script>