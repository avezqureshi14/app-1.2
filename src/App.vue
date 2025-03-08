<script setup>
import { RouterView, useRoute } from 'vue-router';
import { computed } from 'vue';
import DefaultLayout from './layouts/DefaultLayout.vue';

const route = useRoute();
const layouts = {
  DefaultLayout
}

const layoutComponent = computed(() => layouts[route.meta.layout] || DefaultLayout)
</script>

<template #default>
  <component :is="layoutComponent">
    <RouterView />
  </component>
</template>
