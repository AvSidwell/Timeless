import { createStore } from "vuex";
import axios from "axios";

const baseUrl = "http://localhost:5000/";

const state = {
  products: null,
  product: null,
  cart: [],
};

const mutations = {
  setProducts(state, products) {
    state.products = products;
  },
  setProduct(state, product) {
    state.product = product;
  },
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
      const response = await axios.get(`${baseUrl}product/${prodID}`);
      commit("setProduct", response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
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
};

export default createStore({
  state,
  mutations,
  actions,
});
