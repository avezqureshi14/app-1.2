<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    categories: Array,
    selectedCategory: String,
    searchQuery: String
});

const emit = defineEmits(['update:selectedCategory', 'update:searchQuery', 'clearFilters']);

const clearFilters = () => {
    emit('update:selectedCategory', null);
    emit('update:searchQuery', '');
    emit('clearFilters');
};
</script>

<template>
    <a-select v-model:value="props.selectedCategory" @change="(value) => emit('update:selectedCategory', value)"
        placeholder="Filter by category" style="width: 200px; margin-bottom: 10px">
        <a-select-option v-for="category in props.categories" :key="category" :value="category">
            {{ category }}
        </a-select-option>
    </a-select>

    <a-button @click="clearFilters" style="margin-left: 10px">Remove Filter</a-button>

    <a-input v-model:value="props.searchQuery" @input="(e) => emit('update:searchQuery', e.target.value)"
        placeholder="Search by title" style="margin-bottom: 10px; margin-top: 10px" />
</template>
