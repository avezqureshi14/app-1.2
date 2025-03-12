<script setup>
import { computed } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import { PieChartOutlined, AppstoreOutlined } from '@ant-design/icons-vue';
import { Menu } from 'ant-design-vue';

const props = defineProps({
    selectedKeys: Array,
    activeTab: String,
    links: Array
});

const emit = defineEmits();
const route = useRoute();

const activeTab = computed(() => {
    return props.selectedKeys?.[0] || 
        (route.path.includes('/charts') ? 'charts' : 'products');
});


const updateActiveTab = (tab) => {
    emit('update:activeTab', tab);
};
</script>

<template>
    <a-layout-sider theme="dark" class="custom-sidebar">
        <div class="logo">
            <h2 class="title">Avez | Webknot</h2>
        </div>

        <a-menu 
  :selectedKeys="[activeTab]" 
  @update:selectedKeys="(keys) => updateActiveTab(keys[0])"
  mode="inline" 
  theme="dark">
            <template v-for="section in props.links" :key="section.title">
                <a-menu-item-group>
                    <template #title>
                        <span class="text-gray-500 text-sm font-semibold">{{ section.title }}</span>
                    </template>
                    <a-menu-item v-for="link in section.data" :key="link.id">
                        <RouterLink :to="`/${link.name.toLowerCase()}`">
                            <component :is="link.icon === 'pie-chart' ? PieChartOutlined : AppstoreOutlined" />
                            <span>{{ link.name }}</span>
                        </RouterLink>
                    </a-menu-item>
                </a-menu-item-group>
            </template>
        </a-menu>
    </a-layout-sider>
</template>