<script setup>
import {BaseButton } from '@/components/custom';
import {LangSwitcher} from '@/components/general';
import { useLocale } from '@/composables';
const props = defineProps({
    categories: Array,
    selectedCategory: String,
    searchQuery: String
});
const { t } = useLocale(); 
const emit = defineEmits(['update:selectedCategory', 'update:searchQuery', 'clearFilters']);
const clearFilters = () => {
    emit('update:selectedCategory', null);
    emit('update:searchQuery', '');
    emit('clearFilters');
};

</script>

<template>
    <a-select v-model:value="props.selectedCategory" @change="(value) => emit('update:selectedCategory', value)"
        :placeholder="t('filters.placeholder_category')" style="width: 200px; margin-bottom: 10px">
        <a-select-option v-for="category in props.categories" :key="category" :value="category">
            {{ category }}
        </a-select-option>
    </a-select>
    <BaseButton :label="t('filters.remove_filter')" styles="margin-left: 10px;"   @click="clearFilters"  />
    <LangSwitcher/>
    <a-input v-model:value="props.searchQuery" @input="(e) => emit('update:searchQuery', e.target.value)"
        :placeholder="t('filters.placeholder_search')" style="margin-bottom: 10px; margin-top: 10px" />
</template>
