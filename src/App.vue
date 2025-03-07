<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider theme="dark">
      <a-menu theme="dark" mode="inline">
        <a-menu-item @click="activeTab = 'products'">Products</a-menu-item>
        <a-menu-item @click="activeTab = 'charts'">Charts</a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout-content style="padding: 20px">
      <template v-if="activeTab === 'products'">
        <a-select v-model:value="selectedCategory" placeholder="Filter by category"
          style="width: 200px; margin-bottom: 10px">
          <a-select-option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </a-select-option>
        </a-select>
        <a-button @click="clearFilters" style="margin-left: 10px">Remove Filter</a-button>
        <a-input v-model:value="searchQuery" placeholder="Search by title"
          style="margin-bottom: 10px; margin-top: 10px" />
        <a-button type="primary" @click="showModal" style="margin-bottom: 10px">Add Product</a-button>
        <a-table :columns="columns" :data-source="filteredProducts" rowKey="id" />
      </template>
      <template v-else>
        <h2>Charts Section (Coming Soon)</h2>
        <Charts />
      </template>
    </a-layout-content>
  </a-layout>

  <a-modal v-model:visible="isModalVisible" title="Add Product" @ok="handleAddProduct" @cancel="handleCancel">
    <a-input v-model:value="newProduct.title" placeholder="Title" style="margin-bottom: 10px" />
    <a-input v-model:value="newProduct.category" placeholder="Category" style="margin-bottom: 10px" />
    <a-input-number v-model:value="newProduct.price" placeholder="Price" style="margin-bottom: 10px; width: 100%" />
    <a-input-number v-model:value="newProduct.stock" placeholder="Stock" style="width: 100%" />
  </a-modal>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { Table, Input, Menu, Layout, Select, Button, Modal, InputNumber } from 'ant-design-vue';
import axios from 'axios';
import Charts from './components/Charts.vue'

const products = ref([]);
const searchQuery = ref('');
const selectedCategory = ref(null);
const categories = ref([]);
const activeTab = ref('products');
const isModalVisible = ref(false);
const newProduct = ref({ title: '', category: '', price: null, stock: null });

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

const handleAddProduct = () => {
  products.value.push({
    id: products.value.length + 1,
    title: newProduct.value.title,
    category: newProduct.value.category,
    price: newProduct.value.price,
    stock: newProduct.value.stock
  });
  categories.value = [...new Set(products.value.map(p => p.category))];
  isModalVisible.value = false;
  newProduct.value = { title: '', category: '', price: null, stock: null };
};

const handleCancel = () => {
  isModalVisible.value = false;
};

const columns = [
  { title: 'Title', dataIndex: 'title', key: 'title', sorter: (a, b) => a.title.localeCompare(b.title) },
  { title: 'Category', dataIndex: 'category', key: 'category' },
  { title: 'Price', dataIndex: 'price', key: 'price', sorter: (a, b) => a.price - b.price },
  { title: 'Stock', dataIndex: 'stock', key: 'stock' }
];
</script>
