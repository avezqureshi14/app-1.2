<script setup>
defineProps({
    label: String,
    type: { type: String, default: "default" },
    styles: { type: String, default: "" }
});

const emit = defineEmits(['click']);
</script>

<template>
    <a-button :type="type" :style="styles" @click="emit('click')">
        <slot>{{ label }}</slot>
    </a-button>
</template>
