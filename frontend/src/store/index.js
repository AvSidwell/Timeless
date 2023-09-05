import { createStore } from "vuex";
import axios from "axios";
import Swal from "sweetalert2";
import { cookies } from "vue3-cookies";
import routes from "../router/index";

// const baseUrl = "https://timeless-kast.onrender.com/";

const baseUrl = " http://localhost:5000/";

const state = {
  //Products/Shop
  products: null,
  product: null,
  selectedCategory: "",
  searchQuery: "",
  //Cart
  cart: [],
  sortBy: "",
  //User
  user: null,
  token: null,
  isLoggedIn: false,

  //Err handling and Success
  errMsg: null,
  succMsg: null,
};

const mutations = {
  //PRODUCTS
  setProducts(state, products) {
    state.products = products;
  },
  setProduct(state, product) {
    state.product = product;
  },
  ///Products Page Functionality
  setSelectedCategory: (state, category) => {
    state.selectedCategory = category;
  },
  setSearchQuery: (state, query) => {
    state.searchQuery = query;
  },
  setSortBy: (state, sortBy) => {
    state.sortBy = sortBy;
  },

  //CART
  setCart(state, cart) {
    state.cart = cart;
  },
  addToCart(state, product) {
    state.cart.push(product);
  },
  removeFromCart(state, prodID) {
    const index = state.cart.findIndex((item) => item.prodID === prodID);
    if (index !== -1) {
      state.cart.splice(index, 1);
    }
  },

  //User
  setUser(state, user) {
    state.user = user;
    state.isLoggedIn = true;
  },
  setToken(state, token) {
    state.token = token;
  },
  clearUser(state) {
    state.user = null;
    state.token = null;
    state.isLoggedIn = false;
  },
  //Err handling and Success
  setErrMsg(state, message) {
    state.errMsg = message;
  },
  setSuccMsg(state, message) {
    state.succMsg = message;
  },
  clearMessages(state) {
    state.errMsg = null;
    state.succMsg = null;
  },
};

const actions = {
  async getProducts({ commit }) {
    try {
      const response = await axios.get(`${baseUrl}products`);
      commit("setProducts", response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },
  async getProduct({ commit }, prodID) {
    try {
      const response = await axios.get(`${baseUrl}products/${prodID}`);
      commit("setProduct", response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  },
  async created() {
    const prodID = this.$route.params.prodID;
    try {
      await this.$store.dispatch("getProduct", prodID);
    } catch (error) {
      this.error = "Product not found";
    }
  },
  ///CART
  async addToCart({ commit }, product) {
    try {
      const response = await axios.post(`${baseUrl}cart`, product);
      if (response.status === 200) {
        commit("addToCart", response.data);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error;
    }
  },
  async getCart({ commit }) {
    try {
      const response = await axios.get(`${baseUrl}cart`);
      commit("setCart", response.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  },
  async postCart({ commit }, cartData) {
    try {
      const response = await axios.post(`${baseUrl}cart`, cartData);
      commit("setCart", response.data);
    } catch (error) {
      console.error("Error posting cart:", error);
    }
  },
  async addToCart({ commit }, product) {
    try {
      const response = await axios.post(`${baseUrl}cart`, product);
      commit("addToCart", response.data);
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error;
    }
  },
  async fetchCartData({ commit }) {
    try {
      const response = await axios.get(`${baseUrl}cart`);
      commit("setCart", response.data);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  },
  async removeFromCart({ commit }, prodID) {
    try {
      await axios.delete(`${baseUrl}cart/${prodID}`);
      commit("removeFromCart", prodID);
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  },
  ///Product
  sortProducts({ commit, state }, { field, order }) {
    let sortedProducts = [...state.products];
    if (field === "name") {
      sortedProducts.sort((a, b) => {
        const nameA = a.prodNAME.toUpperCase();
        const nameB = b.prodNAME.toUpperCase();
        if (order === "asc") {
          return nameA.localeCompare(nameB);
        } else {
          return nameB.localeCompare(nameA);
        }
      });
    } else if (field === "price") {
      sortedProducts.sort((a, b) => {
        if (order === "asc") {
          return a.prodPRICE - b.prodPRICE;
        } else {
          return b.prodPRICE - a.prodPRICE;
        }
      });
    }
    commit("setProducts", sortedProducts);
    commit("setSortBy", { field, order });
  },
  ///////////////////////////////////////////////
  async filterProductsByCategory({ commit }, category) {
    commit("setSelectedCategory", category);
  },
  async searchProducts({ commit }, query) {
    commit("setSearchQuery", query);
  },

  //User
  //register
  async registerUser({ commit, dispatch }, userData) {
    try {
      const response = await axios.post(`${baseUrl}register`, userData);
      commit("setUser", userData);

      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "You have successfully registered.",
      });
    } catch (error) {
      dispatch("showErrorMessage", "Registration failed");
    }
  },
  //Login
  async loginUser({ commit, dispatch }, credentials) {
    try {
      const response = await axios.post(`${baseUrl}login`, credentials);
      const { token, user } = response.data;
      commit("setToken", token);
      commit("setUser", user);

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "You have successfully logged in.",
      });
    } catch (error) {
      dispatch("showErrorMessage", "Login failed");
    }
  },
  //Handle Err
  showErrorMessage(_, message) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: message,
    });
  },
};

export default createStore({
  state,
  mutations,
  actions,
});
// fetchUsers (context)
// ocontext.commit("setUsers", result, results)
// }catch(err)

// context.set('setUser', {result, msg})
// cookies.set.('realUser', {token, msg, })
// use the cookies, get and
// router.push({name:'home'})
// import router from '@/router'
// to esister there is no need for res only msg
// alert that dispatch fetch/getUser function
// router.push({name: 'login'})
// or after the registration you can login
// for token
// function applyToken(token) {
// if (token)
// axios.derault
// }
// change the login text for login to Logout when user has successfully loggedin
// remove cookie to logout make sure it resets to the log/registration page
// set default img on userurl
// make sure login page goes in first  in the router make a beforeEnter(): if(!)  function to make sure
// once someone goes in to the home page and they do not have cookies re-route them to the login page
// make use vue3-cookies sweetalert
// make use of Vue LifeCycle Hooks to make login page log faster
// on navbar  import {cookies} from useCookies
// computed() { return this.$store.dispatch.state.user || cookies.get('getUser') }
// grab data from cookies to make sure users stay logedin after refreshing the page
// make use of v-show to limit the pages/router-Links/views shown in navbar
// adminCheck() {
// }
