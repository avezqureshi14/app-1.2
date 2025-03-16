<script setup>
import { ref, computed, watchEffect } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import { Menu } from 'ant-design-vue';

const props = defineProps({
    selectedKeys: Array,
    activeTab: String,
    links: Array
});

const emit = defineEmits();
const route = useRoute();
const selectedKey = ref(props.selectedKeys?.[0] || 'products'); // Default key

watchEffect(() => {
    selectedKey.value = route.path.split('/')[1] || 'products';
    emit('update:activeTab', selectedKey.value);
});

const updateActiveTab = (tab) => {
    selectedKey.value = tab;
    emit('update:activeTab', tab);
};
</script>

<template>
    <a-layout-sider theme="dark" class="custom-sidebar">
        <div class="logo">
            <h2 class="title">Avez | Webknot</h2>
        </div>

        <a-menu 
            :selectedKeys="[selectedKey]" 
            @update:selectedKeys="(keys) => updateActiveTab(keys[0])"
            mode="inline" 
            theme="dark"
        >
            <template v-for="section in props.links" :key="section.title">
                <a-menu-item-group>
                    <template #title>
                        <span class="text-gray-500 text-sm font-semibold">{{ section.title }}</span>
                    </template>
                    <a-menu-item 
                        v-for="link in section.data" 
                        :key="link.id" 
                        :class="{ 'ant-menu-item-selected': selectedKey === link.name.toLowerCase() }"
                    >
                        <RouterLink :to="`/${link.name.toLowerCase()}`">
                            <span>{{ link.name }}</span>
                        </RouterLink>
                    </a-menu-item>
                </a-menu-item-group>
            </template>
        </a-menu>
    </a-layout-sider>
</template>
