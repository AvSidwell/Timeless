import { createStore } from "vuex";
import axios from "axios";
import Swal from "sweetalert2";
import { cookies } from "vue3-cookies";
// import routes from "../router/index";

// const baseUrl = "https://timeless-kast.onrender.com/";

const baseUrl = "http://localhost:5000/";

const state = {
  //Products/Shop
  products: [],
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
  // setUpdatedProduct(state, product) {
  //   state.updatedProduct = product;
  // },
  setDeletedProduct(state, product) {
    state.deletedProduct = product;
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
  
  
  // async loginUser({ commit }, credentials) {
  //   try {
  //     const response = await axios.post(`${baseUrl}login`, credentials);
  //     // if (response.status === 200) {
  //     // const { token, user } = response.data;
  //     // commit("setToken", token);
  //     // commit("setUser", user);
  //     // const response = await axios.post(`${baseUrl}login`, credentials);
  //     // if (response.status === 200) {
  //     const { token, user  } = response.data;
  //     console.log(response.data);
  //     console.log(token);
  //     commit("setToken", token);
  //     commit("setUser", user);
  //     localStorage.setItem("userToken", token);
  //     localStorage.setItem("userData", JSON.stringify(this.credentials));
  //     Swal.fire({
  //       icon: "success",
  //       title: "Login Successful",
  //       text: "You have successfully logged in.",
  //     });
  //     // } else {
  //     //   Swal.fire({
  //     //     icon: "error",
  //     //     title: "Error",
  //     //     text: "An error occurred during login.",
  //     //   });
  //     // }
  //   } catch (error) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error",
  //       text: error.message,
  //     });
  //   }
  // },

  logout({ commit }) {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
    commit("clearUser");
    window.location.reload();
  },

  // async registerUser({ commit }, userData) {
  //   try {
  //     const response = await axios.post(`${baseUrl}register`, userData);
  //     const user = response.data;
  //     commit("setUser", user);

  //     if (response.status === 200) {
  //       Swal.fire({
  //         icon: "success",
  //         title: "Registration Successful",
  //         text: "You have successfully registered.",
  //       });
  //       // Consider navigation in your component instead of here.
  //     } else {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Registration Failed",
  //         text: "An error occurred during registration.",
  //       });
  //     }
  //   } catch (error) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error",
  //       text: error.message,
  //     });
  //   }
  // },

  // async loginUser({ commit }, credentials) {
  //   try {
  //     const response = await axios.post(`${baseUrl}login`, credentials);
  //     if (response.status === 200) {
  //       const { token, user } = response.data;
  //       commit("setToken", token);
  //       commit("setUser", user);
  //       Swal.fire({
  //         icon: "success",
  //         title: "Login Successful",
  //         text: "You have successfully logged in.",
  //       });
  //       // Consider navigation in your component instead of here.
  //     } else {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Error",
  //         text: "An error occurred during login.",
  //       });
  //     }
  //   } catch (error) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error",
  //       text: error.message,
  //     });
  //   }
  // }

  //Handle Err
  // showErrorMessage(_, message) {
  //   Swal.fire({
  //     icon: "error",
  //     title: "Error",
  //     text: message,
  //   });
  // },

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

  // async updateProduct({ commit }, { prodID, updatedProduct }) {
  //   try {
  //     const response = await axios.patch(`${baseUrl}products/${prodID}`, updatedProduct);
  //     if (response.status === 200) {

  //       commit("setupdateProduct", response.data);

  //       Swal.fire({
  //         icon: "success",
  //         title: "Product Updated",
  //         text: "The product has been updated successfully.",
  //       });
  //     } else {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Update Failed",
  //         text: "An error occurred while updating the product.",
  //       });
  //     }
  //   } catch (error) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error",
  //       text: error.message,
  //     });
  //   }
  // },
  async deleteProduct({ commit }, prodID) {
    try {
      const response = await axios.delete(`${baseUrl}products/${prodID}`);
      if (response.status === 200) {
        commit("setDeletedProduct", response.data);

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
