<script setup lang="ts">
import { useChart } from '@/composables';
import {BaseChart} from '@/components/custom' 
const { chartData, paginatedBarChartData, nextPage, prevPage, currentPage, isLoading, isError } = useChart();
console.log('Chart data from chart component ',chartData.value)
</script>

<template>
    <a-layout-content style="padding: 20px">
        <div v-if="isLoading">Loading...</div>
        <div v-else-if="isError">Error loading data</div>
        <div v-else class="flex flex-wrap gap-4 p-4">
            <BaseChart title="Product Price Distribution" type="bar" :config="{ xaxis: { categories: paginatedBarChartData.categories } }" :series="[{ name: 'Price', data: paginatedBarChartData.prices }]">
                <template #controls>
                    <div class="flex justify-center mt-4">
                        <button @click="prevPage" class="px-4 py-2 bg-gray-300 rounded mr-2" :disabled="currentPage === 0">Prev</button>
                        <button @click="nextPage" class="px-4 py-2 bg-gray-300 rounded" :disabled="(currentPage + 1) * 5 >= chartData.bar.categories.length">Next</button>
                    </div>
                </template>
            </BaseChart>
            <BaseChart title="Product Category Distribution" type="pie" :config="{ labels: chartData.pie.labels }" :series="chartData.pie.series" />
        </div>
    </a-layout-content>
</template>