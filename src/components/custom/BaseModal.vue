<script setup>
import { defineModel } from 'vue';

const visible = defineModel('visible', { type: Boolean });
defineProps({ title: String, width: { type: String, default: '500px' } });

const emit = defineEmits(['ok', 'cancel']);

const handleOk = () => emit('ok');
const handleCancel = () => (visible.value = false);
</script>

<template>
    <a-modal v-model:open="visible" :title="title" :width="width" @ok="handleOk" @cancel="handleCancel">
        <slot />
    </a-modal>
</template>
