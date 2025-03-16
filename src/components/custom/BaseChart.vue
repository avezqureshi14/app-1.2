<script setup>
defineProps({
    title: String,
    type: String,
    config: Object,
    series: Array
});
</script>

<template>
    <div class="w-[200px] md:w-1/2 p-4 bg-white rounded-lg shadow-md">
        <h2 class="text-lg font-semibold text-center">{{ title }}</h2>
        <apexchart :type="type" :options="config" :series="series"></apexchart>
        <slot name="controls"></slot>
    </div>
</template>