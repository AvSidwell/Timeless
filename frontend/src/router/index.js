import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SingleProduct from "../components/SingleProduct.vue";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import store from "../store";
import ProductEditModal from "../components/ProductEditModal.vue";
import ProductAdd from "../components/ProductAdd.vue";
import footer from "../components/Footer.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/ProductsView",
    name: "ProductsView",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ProductsView.vue"),
  },
  {
    path: "/Cart",
    name: "Cart",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Cart.vue"),
  },
  {
    path: "/Contact",
    name: "Contact",
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/Contact.vue"),
  },
  {
    path: "/Admin",
    name: "Admin",
    component: () =>
      import("../views/Admin.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/single/:prodID",
    name: "Single",
    component: SingleProduct,
  },
  { path: "/Register", name: "register", component: Register },
  { path: "/Login", name: "login", component: Login },
  {
    path: "/products/:prodID/edit",
    name: "product-edit",
    component: ProductEditModal,
  },
  {
    path: "/ProductAdd",
    name: "ProductAdd",
    component: ProductAdd,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((route) => route.meta.requiresAuth)) {
    // Check if the user is authenticated
    const userData = localStorage.getItem('userData');
    if (userData) {
      const userDataObj = JSON.parse(userData);
      // Check if the user is an admin (you can modify this condition based on your user data structure)
      if (userDataObj && userDataObj.result.userRole === 'Admin') {
        next(); // Allow access for admins
      } else {
        next({ name: 'login' }); // Redirect to login for non-admin users
      }
    } else {
      next({ name: 'login' }); // User is not authenticated, redirect to login
    }
  } else {
    // Allow access to routes that don't require authentication
    next();
  }
});

export default router;
