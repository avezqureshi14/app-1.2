<script setup>
import {ref} from 'vue'
import {BaseInput} from '@/components/custom'
import {productConfigs} from '@/utils/constants'
import { useLocale } from '@/composables';

const props = defineProps({
    isModalVisible: Boolean,
    products: Array // Ensure products are passed as a prop
});

const emit = defineEmits();
const { t } = useLocale(); 

const newProduct = ref({
    title: '',
    category: '',
    price: null,
    stock: null
});

const handleAddProduct = () => {
    const newItem = {
        id: (props.products?.length || 0) + 1, 
        title: newProduct.value.title,
        category: newProduct.value.category,
        price: newProduct.value.price,
        stock: newProduct.value.stock
    };

    emit('add-product', newItem); 
    emit('update:isModalVisible', false); 
    newProduct.value = { title: '', category: '', price: null, stock: null }; 
};

const handleCancel = () => {
    emit('update:isModalVisible', false);
};
</script>

<template>
    <a-modal :visible="isModalVisible" :title="t('add_product.modal_title')" @ok="handleAddProduct" @cancel="handleCancel">
        <BaseInput 
            v-for="field in productConfigs" 
            :key="field.id" 
            v-model="newProduct[field.model]" 
            :placeholder="field.placeholder" 
            :type="field.type"
            :style="field.styles"
        />
    </a-modal>
</template>

