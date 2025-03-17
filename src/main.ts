import { createApp } from 'vue';
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query';
import App from './App.vue';
import Antd from 'ant-design-vue';
import VueApexCharts from 'vue3-apexcharts';
import router from './router/router.ts';
import i18n from './locales/i18n.ts';
import Toast from 'vue-toastification';
import type { PluginOptions } from 'vue-toastification'; 
import 'vue-toastification/dist/index.css';
import './style.css';

const app = createApp(App);
const queryClient = new QueryClient();

const toastOptions: PluginOptions = {
  //@ts-expect-error
  position: 'top-right',
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
};

app.use(Antd);
app.use(i18n);
app.use(router);
app.use(VueQueryPlugin, { queryClient });
app.use(Toast, toastOptions); 
app.component('apexchart', VueApexCharts);

app.mount('#app');
