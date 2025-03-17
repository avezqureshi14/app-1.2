import { ref } from "vue";

type ValidateRule = {
  test: (value: any) => boolean;
  message: string;
};

type ValidateRules = {
  [key: string]: ValidateRule[];
};

export function useValidations(rules: ValidateRules) {
  const errors = ref<{ [key: string]: string }>({});

  const validateField = (field: string, value: any) => {
    const fieldRules = rules[field];
    if (!fieldRules) return true;

    for (const rule of fieldRules) {
      if (!rule.test(value)) {
        errors.value[field] = rule.message;
        return false;
      }
    }
    errors.value[field] = ""; 
    return true;
  };

  const validateForm = (formData: { [key: string]: any }) => {
    let isValid = true;
    for (let field in formData) {
      if (!validateField(field, formData[field])) {
        isValid = false;
      }
    }
    return isValid;
  };

  return { validateField, validateForm, errors };
}
