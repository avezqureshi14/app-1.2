<script setup>
import { PieChartOutlined, AppstoreOutlined } from '@ant-design/icons-vue';
import { RouterLink, useRoute } from 'vue-router';
import { computed } from 'vue';

const props = defineProps({
    selectedKeys: Array,
    activeTab: String
});

const emit = defineEmits();
const route = useRoute();

// Dynamically set active tab based on current route
const activeTab = computed(() => {
    return route.path.includes('/charts') ? 'charts' : 'products';
});

const updateActiveTab = (tab) => {
    console.log("Selected Tab:", tab);
    emit('update:activeTab', tab);
};
</script>

<template>
    <a-layout-sider theme="dark" class="custom-sidebar">
        <div class="logo">
            <h2 class="title">Avez | Webknot</h2>
        </div>

        <a-menu theme="dark" mode="inline" :selectedKeys="[activeTab]" @click="({ key }) => updateActiveTab(key)">
            <a-menu-item key="products">
                <RouterLink to="/products">
                    <template #icon>
                        <AppstoreOutlined />
                    </template>
                    Products
                </RouterLink>
            </a-menu-item>
            <a-menu-item key="charts">
                <RouterLink to="/charts">
                    <template #icon>
                        <PieChartOutlined />
                    </template>
                    Charts
                </RouterLink>
            </a-menu-item>
        </a-menu>
    </a-layout-sider>
</template>
