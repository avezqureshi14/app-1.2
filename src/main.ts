import { createApp } from 'vue';
import App from './App.vue';
import Antd from 'ant-design-vue';
import VueApexCharts from 'vue3-apexcharts';
import router from './router/router.ts'
const app = createApp(App);
app.use(Antd);
app.use(router);
app.component('apexchart', VueApexCharts);
app.mount('#app');
