import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import type { Ref } from 'vue';
import type { Product } from '@/interfaces/types';
import { useQuery } from '@tanstack/vue-query';

const fetchProducts = async (): Promise<Product[]> => {
    const response = await axios.get<{ products: Product[] }>('https://dummyjson.com/products');
    return response.data.products;
};

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
    const { data: products, isLoading, isError} = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
    });
    const fetchChartData = async () => {
        isLoading.value = true;
        isError.value = false;
        const categoryCount: Record<string, number> = {};
        if (!products.value) {
            return [];
        }
        products.value.forEach((product: any) => {
            categoryCount[product.category] = (categoryCount[product.category] || 0) + 1;
        });

        chartData.value = {
            pie: { series: Object.values(categoryCount), labels: Object.keys(categoryCount) },
            bar: {
                categories: products.value.map((p: any) => p.title),
                prices: products.value.map((p: any) => p.price)
            }
        };
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