<script setup>
import { ref } from 'vue';
import { RouterView } from 'vue-router';
</script>
<template>
    <a-layout style="min-height: 100vh">
            <RouterView />
    </a-layout>

</template>