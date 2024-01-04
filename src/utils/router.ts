// router.ts
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Login from "../views/auth/Login.vue";
import Register from "../views/auth/Register.vue";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Home,
    name: "Home",
  },
  {
    path: "/register",
    component: Register,
    name: "register",
  },
  {
    path: "/login",
    component: Login,
    name: "login",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
