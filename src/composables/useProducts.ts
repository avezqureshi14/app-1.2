import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import axios from 'axios';
import type { Product } from '@/interfaces/types';
import {computed} from 'vue'

const fetchProducts = async (): Promise<Product[]> => {
    const response = await axios.get<{ products: Product[] }>('https://dummyjson.com/products');
    return response.data.products;
};

export function useProducts() {
    const queryClient = useQueryClient();

    const { data: products, isLoading, isError, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
    });

    const categories = computed(() => {
        return products.value ? [...new Set(products.value.map(p => p.category))] : [];
    });

    
    const addProductMutation = useMutation({
        mutationFn: async (newProduct: Omit<Product, 'id'>) => {
            return {
                id: Math.random(), 
                ...newProduct,
            };
        },
        onSuccess: (newProduct) => {
            queryClient.setQueryData(['products'], (oldProducts: Product[] = []) => [
                ...oldProducts,
                newProduct,
            ]);
        },
    });

    return {
        products,
        isLoading,
        isError,
        refetch,
        categories,
        addProduct: addProductMutation.mutate,
    };
}
