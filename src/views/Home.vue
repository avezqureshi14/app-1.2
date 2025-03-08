<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import Charts from '@/views/Charts.vue';
import Sidebar from '@/components/general/sidebar/Sidebar.vue';
import Table from '@/components/general/table/Table.vue';
import AddProduct from '@/components/general/modals/AddProduct.vue';
import Filters from '@/components/general/filters/Filters.vue';

const products = ref([]);
const searchQuery = ref('');
const selectedCategory = ref(null);
const categories = ref([]);
const selectedKeys = ref(['products']);
const activeTab = ref('products');
const isModalVisible = ref(false);

onMounted(async () => {
    const response = await axios.get('https://dummyjson.com/products');
    products.value = response.data.products;
    categories.value = [...new Set(products.value.map(p => p.category))];
});

const filteredProducts = computed(() => {
    return products.value.filter(p =>
        (!selectedCategory.value || p.category === selectedCategory.value) &&
        (!searchQuery.value || p.title.toLowerCase().includes(searchQuery.value.toLowerCase()))
    );
});

const clearFilters = () => {
    selectedCategory.value = null;
    searchQuery.value = '';
};

const showModal = () => {
    isModalVisible.value = true;
};

const handleAddProduct = (newProduct) => {
    products.value.push({
        id: products.value.length + 1,
        ...newProduct
    });
    categories.value = [...new Set(products.value.map(p => p.category))];
    isModalVisible.value = false;
};

const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title', sorter: (a, b) => a.title.localeCompare(b.title) },
    { title: 'Category', dataIndex: 'category', key: 'category' },
    { title: 'Price', dataIndex: 'price', key: 'price', sorter: (a, b) => a.price - b.price },
    { title: 'Stock', dataIndex: 'stock', key: 'stock' }
];
</script>

<template>
    <a-layout-content style="padding: 20px">
        <Filters :categories="categories" v-model:selectedCategory="selectedCategory" v-model:searchQuery="searchQuery"
            @clearFilters="clearFilters" />
        <a-button type="primary" @click="showModal" style="margin-bottom: 10px">Add Product</a-button>
        <Table :columns="columns" :data-source="filteredProducts" :rowKey="id" />
    </a-layout-content>
    <AddProduct v-model:isModalVisible="isModalVisible" @add-product="handleAddProduct" />
</template>
