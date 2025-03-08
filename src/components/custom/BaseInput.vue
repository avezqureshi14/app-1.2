<template>
    <a-input v-model:value="modelValue" :placeholder="placeholder" :style="style" />
</template>

<script setup>
defineProps({
    modelValue: String,
    placeholder: String,
    style: Object
});
defineEmits(["update:modelValue"]);
</script>
