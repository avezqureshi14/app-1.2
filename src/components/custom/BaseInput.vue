<script setup>
import {EMITS} from '@/utils/constants'

defineProps({
    modelValue: [String, Number], 
    placeholder: String,
    type: { type: String, default: "text" }, 
    className: { type: String, default: "" }, 
    styles: { type: String, default: "" } 
});

const emit = defineEmits([EMITS.UPDATE_MODEL_VALUE]);
</script>

<template>
    <a-input 
        v-if="type === 'text'"
        :value="modelValue" 
        :placeholder="placeholder" 
        :class="className"
        :style="styles"
        @input="(e) => emit('update:modelValue', e.target.value)"
    />

    <a-input-number 
        v-else 
        :value="modelValue" 
        :placeholder="placeholder" 
        :class="className" 
        :style="styles"
        @change="(value) => emit('update:modelValue', value)" 
    />
</template>
