<script setup>
defineProps({
  isVisible: Boolean,
  title: String,
  okText: { type: String, default: "Confirm" },
  cancelText: { type: String, default: "Cancel" },
  loading: { type: Boolean, default: false },
});
const emit = defineEmits(["update:isVisible", "ok", "cancel"]);

const handleClose = () => {
  emit("update:isVisible", false); 
  emit("cancel"); 
};
</script>


<template>
  <a-modal
    :visible="isVisible"
    :title="title"
    @ok="emit('ok')"
    @cancel="handleClose"
  >
    <slot></slot>
    <template #footer>
      <a-button @click="handleClose">{{ cancelText }}</a-button>
      <a-button type="primary" :loading="loading" @click="emit('ok')">{{ okText }}</a-button>
    </template>
  </a-modal>
</template>

