import { createStore } from "vuex";
import axios from "axios";

// const baseUrl = "https://timeless-kast.onrender.com/";

const baseUrl = " http://localhost:5000/";

const state = {
  products: null,
  product: null,
  cart: [],
  selectedCategory: "",
  searchQuery: "",
  sortBy: "",
};

const mutations = {
  //PRODUCTS
  setProducts(state, products) {
    state.products = products;
  },
  setProduct(state, product) {
    state.product = product;
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
};

const actions = {
  // PRODUCTS
  async fetchProducts({ commit }) {
    try {
      const response = await axios.get(`${baseUrl}products`);
      commit("setProducts", response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },

  // CART
  async fetchCartData({ commit }) {
    try {
      const response = await axios.get(`${baseUrl}cart`);
      commit("setCart", response.data);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  },

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

  async removeFromCart({ commit }, prodID) {
    try {
      await axios.delete(`${baseUrl}cart/${prodID}`);
      commit("removeFromCart", prodID);
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  },

};

export default createStore({
  state,
  mutations,
  actions,
});