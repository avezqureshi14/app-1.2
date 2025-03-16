import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

type Locale = 'en' | 'kn';

export function useLocale() {
  const { locale, t } = useI18n();
  const selectedLocale = ref<Locale>(locale.value as Locale || 'en'); 

  const changeLanguage = (lang: Locale) => {
    locale.value = lang;
    selectedLocale.value = lang;
    localStorage.setItem('locale', lang); 
  };

  return {
    selectedLocale,
    changeLanguage,
    t 
  };
}
