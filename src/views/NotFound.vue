<script setup>
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-900 text-white text-center">
    <h1 class="text-5xl font-bold mb-4 ">Hey Dude, this page doesn't exist! </h1>
    <p class="text-lg mb-6">I guess you may find something on our</p>
    <RouterLink 
      to="/products" 
      class="px-6 py-3 text-lg font-semibold text-gray-900 bg-yellow-400 rounded-lg shadow-lg hover:bg-yellow-500 transition-all"
    >
      Home Page
    </RouterLink>
  </div>
</template>
