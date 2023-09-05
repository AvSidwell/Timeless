import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SingleProduct from "@/components/SingleProduct.vue";
import Register from "../views/Register.vue"; 
import Login from "../views/Login.vue";
import store from "../store";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/ProductsView",
    name: "ProductsView",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ProductsView.vue"),
  },
  {
    path: "/Cart",
    name: "Cart",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Cart.vue"),
  },
  {
    path: "/single/:prodID",
    name: "Single",
    component: SingleProduct,
  },
  { path: "/register", name: "register", component: Register },
  { path: "/Login", name: "register", component: Login },
  // { path: "/login", name: "login", component: Login },
  // {
  //   path: "/login",
  //   component: Login,
  //   beforeEnter: (to, from, next) => {
  //     if (store.state.isLoggedIn) {
  //       next();
  //     } else {
  //       next({ name: "login" });
  //     }
  //   },
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
