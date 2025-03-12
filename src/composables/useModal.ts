import { ref } from 'vue';

export function useModal() {
    const isModalVisible = ref<boolean>(false);

    const showModal = () => {
        isModalVisible.value = true;
    };

    const hideModal = () => {
        isModalVisible.value = false;
    };

    return {
        isModalVisible,
        showModal,
        hideModal
    };
}
