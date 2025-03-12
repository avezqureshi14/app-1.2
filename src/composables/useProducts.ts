import { ref,  onMounted } from 'vue';
import axios from 'axios';
import type { Product } from '@/interfaces/types';

export function useProducts() {
    const products = ref<Product[]>([]);
    const isLoading = ref<boolean>(true);
    const isError = ref<boolean>(false);
    const categories = ref<string[]>([]);

    const fetchProducts = async (): Promise<void> => {
        isLoading.value = true;
        isError.value = false;
        try {
            const response = await axios.get<{ products: Product[] }>('https://dummyjson.com/products');
            products.value = response.data.products;
            console.log("Hi from useProduct")
            console.log("Products from useproduct",products.value)
            categories.value = [...new Set(products.value.map(p => p.category))];
        } catch (error) {
            isError.value = true;
            console.error('Error fetching products:', error);
        } finally {
            isLoading.value = false;
        }
    };

    onMounted(fetchProducts);

    const addProduct = (newProduct: Omit<Product, 'id'>): void => {
        products.value.push({
            id: products.value.length + 1,
            ...newProduct
        });
        categories.value = [...new Set(products.value.map(p => p.category))];
    };

    return {
        products,
        isLoading,
        isError,
        refetch: fetchProducts,
        categories,
        addProduct
    };
}
