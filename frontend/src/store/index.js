import { createStore } from "vuex";
import axios from "axios";
import Swal from "sweetalert2";
import { cookies } from "vue3-cookies";
// import routes from "../router/index";

// const baseUrl = "https://timeless-kast.onrender.com/";

const baseUrl = "https://timeless-mcgx.onrender.com/";

const state = {
  //Products/Shop
  products: null,
  product: null,
  selectedCategory: "",
  searchQuery: "",
  //Cart
  cart: [],
  userData: {},
  sortBy: "",
  //User
  user: null,
  token: null,
  isLoggedIn: false,

  //Err handling and Success
  errMsg: null,
  succMsg: null,

  //Admin CRUD
  updatedProduct: null,
  deletedProduct: null,
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
  // addToCart(state, product) {
  //   state.cart.push(product);
  // },
  addToCart(state, product) {
    const existingProduct = state.cart.find(
      (item) => item.prodID === product.prodID
    );
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      product.quantity = 1;
      state.cart.push(product);
    }
  },

  updateCartItemQuantity(state, { prodID, prodQUANTITY }) {
    const cartItem = state.cart.find((item) => item.prodID === prodID);
    if (cartItem) {
      cartItem.quantity = prodQUANTITY;
    }
  },

  removeItem(state, cartID) {
    const index = state.cart.findIndex((item) => item.cartID === cartID);
    if (index !== -1) {
      state.cart.splice(index, 1);
    }
  },

  //User
  setUser(state, user) {
    state.user = user;
    state.isLoggedIn = true;
  },
  SET_USER_DATA(state, userData) {
    state.userData = userData;
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
  setUserFromLocalStorage(state) {
    const token = localStorage.getItem("userToken");
    if (token) {
      state.token = token;
      state.isLoggedIn = true;
      const userData = JSON.parse(localStorage.getItem("userData"));
      if (userData) {
        state.user = userData;
      }
    }
  },

  //Admin CRUD
  setupdateProduct(state, updatedProduct) {
    const index = state.products.findIndex(
      (product) => product.prodID === updatedProduct.prodID
    );
    if (index !== -1) {
      state.products.splice(index, 1, updatedProduct);
    }
  },
  setDeletedProduct(state, product) {
    state.deletedProduct = product;
  },
};

const actions = {
  async getUser({ commit }) {
    try {
      const response = await axios.get(`${baseUrl}users`);
      commit("setUser", response.data.results);
      console.log(response.data.results);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },
  async getProducts({ commit }) {
    try {
      const response = await axios.get(`${baseUrl}products`);
      commit("setProducts", response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },
  async getProduct({ commit }, prodID) {
    try {
      const response = await axios.get(`${baseUrl}products/${prodID}`);
      commit("setProduct", response.data);
      console.log(response.data);
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
 
  async getCart({ commit }, userID) {
    try {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const response = await axios.get(`${baseUrl}cart/${userData.result.userID}`
      );
      commit("setCart", response.data);
      console.log(userData.result.userID);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  },

  async addToCart({ commit, state }, product) {
    try {
      if (!state.cart) {
        console.error("Cart is not initialized.");
        return false;
      }

      const response = await axios.post(`${baseUrl}cart`, product);
      console.log(product);
      if (response.status === 200) {
        commit("addToCart", response.data);
        console.log("addToCart", response.data);
        Swal.fire({
          icon: "success",
          title: "Added to Cart",
          text: "The product has been added to your cart.",
        });
        dispatch("getCart");

        return true;
      } else {
        console.error("Error adding to cart:", response.statusText);

        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred while adding the product to your cart.",
        });

        return false;
      }
    } catch (error) {
      console.error("Error adding to cart:", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while adding the product to your cart.",
      });

      throw error;
    }
  },
 
  async removeItem({ commit }, cartID) {
    try {
      await axios.delete(`${baseUrl}cart/${cartID}`);
      // Optionally, you can update the cart in the store here.
      commit(
        "setCart",
        state.cart.filter((item) => item.cartID !== cartID)
      );
      console.log(cartID);
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  },

 
  async updateCartItemQuantity(
    { commit, state },
    { cartID, prodID, quantity }
  ) {
    try {
      const response = await axios.patch(`${baseUrl}cart/${prodID}`, {
        quantity,
      });

      if (response.status === 200) {
        const cartItem = state.cart.find(
          (item) => item.cartID === cartID && item.prodID === prodID
        );
        if (cartItem) {
          cartItem.quantity = quantity;
          commit("setCart", [...state.cart]);
        }
        console.log(cartID);
      } else {
        console.error(
          "Error updating cart item quantity:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error updating cart item quantity:", error);
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
  async registerUser({ commit }, userData) {
    try {
      const response = await axios.post(`${baseUrl}register`, userData);
      const user = response.data;
      commit("setUser", user);

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: "You have successfully registered.",
        });

        this.$router.push("/login");
      } else {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: "An error occurred during registration.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  },
  //Login
  async loginUser({ commit }, credentials) {
    try {
      const response = await axios.post(`${baseUrl}login`, credentials);

      if (response.status === 200) {
        const { token, user } = response.data;
        console.log(response.data);
        console.log(token);

        commit("setToken", token);
        commit("setUser", user);

        // Store user data in local storage
        localStorage.setItem("userToken", token);
        localStorage.setItem("userData", JSON.stringify(response.data));
        window.location.reload();

        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "You have successfully logged in.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred during login.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  },

 

  logout({ commit }) {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
    commit("clearUser");
    window.location.reload();
  },

 

  // Admin CRUD
  async editProduct() {
    try {
      const editedProduct = {
        prodPRICE: this.updatedProduct.prodPRICE,
        prodNAME: this.updatedProduct.prodNAME,
        prodDESC: this.updatedProduct.prodDESC,
        prodCAT: this.updatedProduct.prodCAT,
        prodTYPE: this.updatedProduct.prodTYPE,
        prodSEASON: this.updatedProduct.prodSEASON,
        prodIMG: this.updatedProduct.prodIMG,
        prodQUANTITY: this.updatedProduct.prodQUANTITY,
      };

      const response = await axios.patch(
        `${baseUrl}products/${this.updatedProduct.prodID}`,
        editedProduct
      );

      if (response.status === 200) {
        this.$store.dispatch("updateProduct", {
          prodID: this.updatedProduct.prodID,
          editedProduct: response.data,
        });

        Swal.fire({
          icon: "success",
          title: "Product Updated",
          text: "The product has been updated successfully.",
        });

        this.resetForm();
        $("#exampleModal").modal("hide");
      } else {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: "An error occurred while updating the product.",
        });
      }
    } catch (error) {
      console.error("Error editing product:", error);
    }
  },

  async updateProduct({ commit }, { prodID, editedProduct }) {
    try {
      const response = await axios.patch(
        `${baseUrl}products/${prodID}`,
        editedProduct
      );

      if (response.status === 200) {
        commit("updateProductInState", response.data);
      } else {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: "An error occurred while updating the product.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  },

  async addProduct({ commit }, newProduct) {
    try {
      const response = await axios.post(`${baseUrl}products`, newProduct);

      if (response.status === 200) {
        // Product added successfully
        commit("clearMessages"); // Clear any previous error or success messages
        return true;
      } else {
        commit("setErrMsg", "Error adding product");
        return false;
      }
    } catch (error) {
      commit("setErrMsg", `Error adding product: ${error.message}`);
      return false;
    }
  },
  async deleteProduct({ commit }, prodID) {
    try {
      const response = await axios.delete(`${baseUrl}products/${prodID}`);
      if (response.status === 200) {
        commit("setDeletedProduct", response.data);
        await this.dispatch("getProducts");

        Swal.fire({
          icon: "success",
          title: "Product Deleted",
          text: "The product has been deleted successfully.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Delete Failed",
          text: "An error occurred while deleting the product.",
        });
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  },
  async fetchProductForEdit({ commit }, prodID) {
    try {
      const response = await axios.get(`${baseUrl}products/${prodID}`);
      const product = response.data;
      commit("setProductForEdit", product);
    } catch (error) {
      console.error("Error fetching product for edit:", error);
    }
  },
  async updateProduct({ commit }, { prodID, editedProduct }) {
    try {
      const response = await axios.patch(
        `${baseUrl}products/${prodID}`,
        editedProduct
      );

      commit("updateProductInState", response.data);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  },
};

export default createStore({
  state,
  mutations,
  actions,
});
