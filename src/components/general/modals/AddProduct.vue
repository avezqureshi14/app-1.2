<script setup>
import { defineProps, defineEmits, ref } from 'vue';

const props = defineProps({
    isModalVisible: Boolean,
    products: Array // Ensure products are passed as a prop
});

const emit = defineEmits();

const newProduct = ref({
    title: '',
    category: '',
    price: null,
    stock: null
});

const handleAddProduct = () => {
    const newItem = {
        id: (props.products?.length || 0) + 1, // Ensure products is used
        title: newProduct.value.title,
        category: newProduct.value.category,
        price: newProduct.value.price,
        stock: newProduct.value.stock
    };

    emit('add-product', newItem); // Emit event with new product
    emit('update:isModalVisible', false); // Close modal
    newProduct.value = { title: '', category: '', price: null, stock: null }; // Reset
};

const handleCancel = () => {
    emit('update:isModalVisible', false);
};
</script>

<template>
    <a-modal :visible="isModalVisible" title="Add Product" @ok="handleAddProduct" @cancel="handleCancel">
        <a-input v-model:value="newProduct.title" placeholder="Title" style="margin-bottom: 10px" />
        <a-input v-model:value="newProduct.category" placeholder="Category" style="margin-bottom: 10px" />
        <a-input-number v-model:value="newProduct.price" placeholder="Price" style="margin-bottom: 10px; width: 100%" />
        <a-input-number v-model:value="newProduct.stock" placeholder="Stock" style="width: 100%" />
    </a-modal>
</template>
