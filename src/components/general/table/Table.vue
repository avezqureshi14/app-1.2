<script setup>

defineProps({
    columns: Array,
    dataSource: Array,
    rowKey: String,
});
</script>

<template>
    <a-table :columns="columns" :data-source="dataSource" :rowKey="rowKey" />
</template>
