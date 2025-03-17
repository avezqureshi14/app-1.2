<script setup>
import { ref, computed } from "vue";
import { BaseInput } from "@/components/custom";
import { productConfigs } from "@/utils/constants";
import { useLocale, useValidations } from "@/composables";
import { useToast } from "vue-toastification";

const props = defineProps({
  isModalVisible: Boolean,
  products: Array,
});
const emit = defineEmits();
const { t } = useLocale();
const toast = useToast();

const newProduct = ref({
  title: "",
  category: "",
  price: "",
  stock: "",
});

const validationRules = {
  title: [{ test: (val) => val.trim().length >= 3, message: "Title must be at least 3 characters" }],
  category: [{ test: (val) => val.trim().length > 0, message: "Category is required" }],
  price: [{ test: (val) => val > 0, message: "Price must be greater than zero" }],
  stock: [{ test: (val) => val >= 0, message: "Stock cannot be negative" }],
};

const { validateField, validateForm, errors } = useValidations(validationRules);

const getSanitizedFormData = () => ({
  title: newProduct.value.title || "",
  category: newProduct.value.category || "",
  price: newProduct.value.price || "",
  stock: newProduct.value.stock || "",
});

const addProduct = () => {
  const formData = getSanitizedFormData();
  if (!validateForm(formData)) {
    toast.error("Please correct the errors before submitting.");
    return;
  }

  emit("add-product", { id: (props.products?.length || 0) + 1, ...newProduct.value });
  toast.success("Product added successfully!");
  closeModal();
};

const closeModal = () => {
  emit("update:isModalVisible", false);
  resetForm();
};

const resetForm = () => {
  newProduct.value = { title: "", category: "", price: "", stock: "" };
};
</script>

<template>
  <a-modal
    :visible="isModalVisible"
    :title="t('add_product.modal_title')"
    @ok="addProduct"
    @cancel="closeModal"
  >
    <div v-for="field in productConfigs" :key="field.id">
      <BaseInput
        v-model="newProduct[field.model]"
        :placeholder="field.placeholder"
        :type="field.type"
        :style="field.styles"
        @blur="validateField(field.model, newProduct[field.model])"
      />
      <p v-if="errors[field.model]" class="error-text">{{ errors[field.model] }}</p>
    </div>
  </a-modal>
</template>

<style scoped>
.error-text {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}
</style>
