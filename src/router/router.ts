import { createRouter, createWebHistory } from "vue-router";

const routes = [
    { path: '/', redirect: '/products' },
    { 
        path: '/products', 
        component: () => import("@/views/Home.vue"), 
        meta: { layout: "DashboardLayout" } 
    },
    { 
        path: '/charts', 
        component: () => import("@/views/Charts.vue"), 
        meta: { layout: "DashboardLayout" } 
    },
    { 
        path: '/:pathMatch(.*)*', 
        component: () => import("@/views/NotFound.vue") 
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
