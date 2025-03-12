<script setup>
import { ref } from 'vue';
import { RouterView } from 'vue-router';
import Sidebar from '../components/general/sidebar/Sidebar.vue';
import {appLinks} from '@/router/navlinks/links.ts'
const selectedKeys = ref(['products']);
const activeTab = ref('products');
</script>
<template>
    <a-layout style="min-height: 100vh">
        <Sidebar :links="appLinks" v-model:selectedKeys="selectedKeys" v-model:activeTab="activeTab" />
        <a-layout-content style="padding: 20px">
            <RouterView />
        </a-layout-content>
    </a-layout>

</template>