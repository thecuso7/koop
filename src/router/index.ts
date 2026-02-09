import { createWebHistory, createRouter } from "vue-router";
import OrderDetail from "@/components/order-detail.vue";
import MainPage from "@/components/main-page.vue";

const routes = [
  {
    path: "/",
    name: "Main",
    component: MainPage,
  },
  {
    path: "/order/:id",
    name: "OrderDetail",
    component: OrderDetail,
  },
  {
    path: "/info",
    name: "Info",
    component: () => import('@/components/info.vue'),
  },
  {
    path: "/demo",
    name: "Demo",
    component: () => import('@/components/demo/index.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;