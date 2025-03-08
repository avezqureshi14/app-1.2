<template>
    <a-button :type="type" :style="style" :size="size" :disabled="disabled" @click="handleClick">
        <slot></slot>
    </a-button>
</template>

<script setup>
defineProps({
    type: { type: String, default: "default" },
    size: { type: String, default: "middle" },
    style: { type: Object, default: () => ({}) },
    disabled: { type: Boolean, default: false },
});
const emit = defineEmits(["click"]);

const handleClick = () => {
    emit("click");
};
</script>
