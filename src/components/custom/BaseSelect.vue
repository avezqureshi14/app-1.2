<script setup>
defineProps({
    modelValue: String,
    options: Array,
    placeholder: String
});

const emit = defineEmits(['update:modelValue']);
</script>

<template>
    <a-select :value="modelValue" @change="(value) => emit('update:modelValue', value)" style="width: 200px;">
        <a-select-option v-for="option in options" :key="option" :value="option">
            {{ option }}
        </a-select-option>
    </a-select>
</template>
