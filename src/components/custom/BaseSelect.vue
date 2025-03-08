<script setup>
defineProps({
    modelValue: String,
    options: Array,
    placeholder: String,
    style: Object
});
defineEmits(["update:modelValue"]);
</script>
<template>
    <a-select v-model:value="modelValue" :placeholder="placeholder" :style="style">
        <a-select-option v-for="option in options" :key="option" :value="option">
            {{ option }}
        </a-select-option>
    </a-select>
</template>
