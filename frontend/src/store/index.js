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
};

export default createStore({
  state,
  mutations,
  actions,
});
