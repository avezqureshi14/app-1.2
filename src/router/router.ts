import { createRouter, createWebHistory } from "vue-router";
import Home from '@/views/Home.vue'
import Charts from '@/views/Charts.vue'
const routes = [
    { path: '/', redirect: '/products' },
    { path: '/products', component: Home, meta: { layout: "DefaultLayout" }, },
    { path: '/charts', component: Charts, meta: { layout: "DefaultLayout" }, },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router 