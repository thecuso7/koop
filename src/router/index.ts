import { createWebHistory, createRouter } from "vue-router";
import OrderDetail from "@/components/order-detail.vue";

const routes = [
  {
    path: "/order/:id",
    name: "OrderDetail",
    component: OrderDetail,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;