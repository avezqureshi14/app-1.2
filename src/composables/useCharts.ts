import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import type { Ref } from 'vue';

type ChartData = {
    pie: { series: number[]; labels: string[] };
    bar: { categories: string[]; prices: number[] };
};

export function useChart() {
    const pageSize = 5;
    const currentPage: Ref<number> = ref(0);
    const chartData: Ref<ChartData> = ref({
        pie: { series: [], labels: [] },
        bar: { categories: [], prices: [] }
    });
    const isLoading: Ref<boolean> = ref(true);
    const isError: Ref<boolean> = ref(false);

    const fetchChartData = async () => {
        isLoading.value = true;
        isError.value = false;
        try {
            const response = await axios.get('https://dummyjson.com/products');
            const products = response.data.products;
            
            const categoryCount: Record<string, number> = {};
            products.forEach((product: any) => {
                categoryCount[product.category] = (categoryCount[product.category] || 0) + 1;
            });

            chartData.value = {
                pie: { series: Object.values(categoryCount), labels: Object.keys(categoryCount) },
                bar: {
                    categories: products.map((p: any) => p.title),
                    prices: products.map((p: any) => p.price)
                }
            };
        } catch (error) {
            isError.value = true;
            console.error('Error fetching data:', error);
        } finally {
            isLoading.value = false;
        }
    };

    onMounted(fetchChartData);

    const paginatedBarChartData = computed(() => {
        const start = currentPage.value * pageSize;
        const end = start + pageSize;
        return {
            categories: chartData.value.bar.categories.slice(start, end),
            prices: chartData.value.bar.prices.slice(start, end)
        };
    });

    const nextPage = () => {
        if ((currentPage.value + 1) * pageSize < chartData.value.bar.categories.length) {
            currentPage.value++;
        }
    };

    const prevPage = () => {
        if (currentPage.value > 0) {
            currentPage.value--;
        }
    };

    return { chartData, paginatedBarChartData, nextPage, prevPage, currentPage, isLoading, isError };
}