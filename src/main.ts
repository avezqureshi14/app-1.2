import { createApp } from 'vue';
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query';
import App from './App.vue';
import Antd from 'ant-design-vue';
import VueApexCharts from 'vue3-apexcharts';
import router from './router/router.ts';

const app = createApp(App);

const queryClient = new QueryClient();

app.use(Antd);
app.use(router);
app.use(VueQueryPlugin, { queryClient });
app.component('apexchart', VueApexCharts);

app.mount('#app');
