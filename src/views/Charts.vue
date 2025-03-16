<script setup lang="ts">
import { useChart, useLocale } from '@/composables';
import {BaseChart} from '@/components/custom' 
const { chartData, paginatedBarChartData, nextPage, prevPage, currentPage, isLoading, isError } = useChart();
const { t } = useLocale(); 
</script>

<template>
    <a-layout-content style="padding: 20px">
        <div v-if="isLoading">{{t('charts.loading')}}</div>
        <div v-else-if="isError">{{t('charts.error')}}</div>
        <div v-else class="flex flex-wrap gap-4 p-4">
            <BaseChart :title="t('charts.product_price_distribution')" type="bar" :config="{ xaxis: { categories: paginatedBarChartData.categories } }" :series="[{ name: 'Price', data: paginatedBarChartData.prices }]">
                <template #controls>
                    <div class="flex justify-center mt-4">
                        <button @click="prevPage" class="btn-apex" :disabled="currentPage === 0">{{t('charts.prev')}}</button>
                        <button @click="nextPage" class="btn-apex" :disabled="(currentPage + 1) * 5 >= chartData.bar.categories.length">{{t('charts.next')}}</button>
                    </div>
                </template>
            </BaseChart>
            <BaseChart :title="t('charts.product_category_distribution')" type="pie" :config="{ labels: chartData.pie.labels }" :series="chartData.pie.series" />
        </div>
    </a-layout-content>
</template>