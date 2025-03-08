<script setup>
import { defineProps, defineEmits } from 'vue';
import { PieChartOutlined, AppstoreOutlined } from '@ant-design/icons-vue';
import { RouterLink } from 'vue-router';

const props = defineProps({
    selectedKeys: Array,
    activeTab: String
});

const emit = defineEmits();

const updateActiveTab = (tab) => {
    emit('update:activeTab', tab);
};
</script>

<template>
    <a-layout-sider theme="dark" class="custom-sidebar">
        <div class="logo">
            <h2 class="title">Avez | Webknot</h2>
        </div>

        <a-menu theme="dark" mode="inline" :selectedKeys="[props.activeTab]" @click="({ key }) => updateActiveTab(key)">
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

<style scoped>
.custom-sidebar {
    min-height: 100vh;
    padding-top: 10px;
}

.logo {
    display: flex;
    align-items: center;
    padding: 16px;
    text-align: center;
}

.logo-img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
}

.title {
    color: white;
    font-size: 20px;
    font-weight: bold;
}

.a-menu-item {
    font-size: 16px;
}
</style>
