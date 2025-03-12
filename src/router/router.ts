import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Charts from "@/views/Charts.vue";
import NotFound from "@/views/NotFound.vue";

const routes = [
    { path: '/', redirect: '/products' },
    { path: '/products', component: Home, meta: { layout: "DashboardLayout" } },
    { path: '/charts', component: Charts, meta: { layout: "DashboardLayout" } },
    { path: '/:pathMatch(.*)*', component: NotFound } 
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
