<script setup>
import { ref, defineProps, defineExpose, onErrorCaptured } from 'vue';

const error = ref(null);

const props = defineProps({
  fallbackMessage: {
    type: String,
    default: "Something went wrong!",
  },
});

const resetError = () => {
  error.value = null;
};

defineExpose({ resetError });

onErrorCaptured((err) => {
  console.error("Caught an error:", err);
  error.value = err;
  return false;
});
</script>

<template>
  <div v-if="error" class="flex flex-col items-center justify-center h-screen bg-gray-100">
    <div class="bg-white p-6 rounded-lg shadow-lg text-center">
      <h2 class="text-2xl font-bold text-red-600">Oops!</h2>
      <p class="text-gray-600 mt-2">{{ props.fallbackMessage }}</p>
      <button @click="resetError" class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
        Retry
      </button>
    </div>
  </div>
  <slot v-else></slot>
</template>
