<script setup lang="ts">
import { useLocale } from '@/composables/useI18n';
import { BaseButton } from '@/components/custom';

const { selectedLocale, changeLanguage } = useLocale();

const toggleLanguage = () => {
  const newLang = selectedLocale.value === 'en' ? 'kn' : 'en';
  changeLanguage(newLang);
};
</script>

<template>
  <BaseButton 
    :label="selectedLocale === 'en' ? '🌐 ಕನ್ನಡ' : '🌐 English'" 
    styles="margin-top: 10px; margin-left:5px; width: 80px;padding-left:0px"
    @click="toggleLanguage"  
  />
</template>
