<script setup>
import { RouterView, useRoute } from 'vue-router';
import { computed } from 'vue';
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import ErrorBoundary from "@/layouts/ErrorBoundary.vue";


const route = useRoute();
const layouts = {
  DashboardLayout,
  DefaultLayout
}

const layoutComponent = computed(() => layouts[route.meta.layout] || DefaultLayout)
</script>

<template>
  <ErrorBoundary>
    <Suspense>
      <template #default>
        <component :is="layoutComponent">
          <RouterView />
        </component>
      </template>
      <template #fallback>
        <p>Loading...</p>
      </template>
    </Suspense>
  </ErrorBoundary>
</template>
