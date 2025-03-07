<script setup>
import { ref, onMounted } from 'vue';
import VueApexCharts from 'vue3-apexcharts';
import axios from 'axios';

const pieChartData = ref({ series: [], labels: [] });
const barChartData = ref({ categories: [], prices: [] });
const pageSize = 5;
const currentPage = ref(0);

const paginatedBarChartData = ref({ categories: [], prices: [] });

onMounted(async () => {
    try {
        const response = await axios.get('https://dummyjson.com/products');
        const products = response.data.products;

        // Pie chart data (Category-wise distribution)
        const categoryCount = {};
        products.forEach((product) => {
            categoryCount[product.category] = (categoryCount[product.category] || 0) + 1;
        });
        pieChartData.value = {
            series: Object.values(categoryCount),
            labels: Object.keys(categoryCount),
        };

        // Bar chart data (Product price distribution)
        barChartData.value = {
            categories: products.map((p) => p.title),
            prices: products.map((p) => p.price),
        };
        updatePaginatedBarChart();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});

const updatePaginatedBarChart = () => {
    const start = currentPage.value * pageSize;
    const end = start + pageSize;
    paginatedBarChartData.value = {
        categories: barChartData.value.categories.slice(start, end),
        prices: barChartData.value.prices.slice(start, end),
    };
};

const nextPage = () => {
    if ((currentPage.value + 1) * pageSize < barChartData.value.categories.length) {
        currentPage.value++;
        updatePaginatedBarChart();
    }
};

const prevPage = () => {
    if (currentPage.value > 0) {
        currentPage.value--;
        updatePaginatedBarChart();
    }
};
</script>

<template>
    <div class="flex flex-wrap gap-4 p-4">
        <div class="w-full md:w-1/2 p-4 bg-white rounded-lg shadow-md">
            <h2 class="text-lg font-semibold text-center">Product Category Distribution</h2>
            <apexchart type="pie" :options="{ labels: pieChartData.labels }" :series="pieChartData.series"></apexchart>
        </div>

        <div class="w-full md:w-1/2 p-4 bg-white rounded-lg shadow-md">
            <h2 class="text-lg font-semibold text-center">Product Price Distribution</h2>
            <apexchart type="bar" :options="{ xaxis: { categories: paginatedBarChartData.categories } }"
                :series="[{ name: 'Price', data: paginatedBarChartData.prices }]">
            </apexchart>

            <div class="flex justify-center mt-4">
                <button @click="prevPage" class="px-4 py-2 bg-gray-300 rounded mr-2"
                    :disabled="currentPage === 0">Prev</button>
                <button @click="nextPage" class="px-4 py-2 bg-gray-300 rounded"
                    :disabled="(currentPage + 1) * pageSize >= barChartData.categories.length">Next</button>
            </div>
        </div>
    </div>
</template>