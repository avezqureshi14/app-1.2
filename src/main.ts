import { createApp } from 'vue';
import App from './App.vue';
import Antd from 'ant-design-vue';
import VueApexCharts from 'vue3-apexcharts';

const app = createApp(App);
app.use(Antd);
app.component('apexchart', VueApexCharts);
app.mount('#app');
