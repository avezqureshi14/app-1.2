import type { Product } from '@/interfaces/types';
import { ref, computed } from 'vue';


export function useFilter(products: { value: Product[] }) {
    const searchQuery = ref<string>('');
    const selectedCategory = ref<string | null>(null);

    const clearFilters = () => {
        searchQuery.value = '';
        selectedCategory.value = null;
    };

    const filteredProducts = computed(() => {
        if (!products.value) return []; 
        return products.value.filter((p: Product) =>
            (!selectedCategory.value || p.category === selectedCategory.value) &&
            (!searchQuery.value || p.title.toLowerCase().includes(searchQuery.value.toLowerCase()))
        );
    });
    
    return {
        searchQuery,
        selectedCategory,
        clearFilters,
        filteredProducts
    };
}