<script setup>
import axios from 'axios';
import { ref, computed, onMounted } from 'vue';
import { Sidebar,Table,AddProduct,Filters } from '@/components/general';
import { useProducts,useFilter,useModal } from '@/composables';
import { Charts } from '@/views'
import {BaseButton } from '@/components/custom';

const selectedKeys = ref(['products']);
const activeTab = ref('products');

const {products,categories,addProduct} = useProducts();
const {isModalVisible,showModal,hideModal} = useModal();
const {searchQuery,selectedCategory,clearFilters,filteredProducts} = useFilter(products);

const handleAddProduct = (newProduct) => {
    addProduct(newProduct)
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
        <BaseButton type="primary" label="Add Product"  styles="margin-bottom: 10px;"  @click="showModal"  />
        <Table :columns="columns" :data-source="filteredProducts" :rowKey="id" />
    </a-layout-content>
    <AddProduct v-model:isModalVisible="isModalVisible" @add-product="handleAddProduct" />
</template>
