import { createI18n } from 'vue-i18n';
import en from './en/common.json';
import kn from './kn/common.json';

const messages = {
  en,
  kn
};

const savedLocale = (localStorage.getItem('locale') as 'en' | 'kn') || 'en';

const i18n = createI18n({
  legacy: false, 
  locale: savedLocale,
  fallbackLocale: 'en',
  messages
});

export default i18n;
