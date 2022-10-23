import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import SolarProductView from "../views/SolarProductView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "solar-product",
    component: SolarProductView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
