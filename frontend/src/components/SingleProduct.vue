<template>
  <div>
    <div v-if="product" class="single-product">
      <img :src="product.prodIMG" :alt="product.prodNAME" />
      <div class="product-details">
        <h2>{{ product.prodNAME }}</h2>
        <p>Price: R {{ product.prodPRICE }}.00</p>
        <p>Category: {{ product.prodCAT }}</p>
      </div>
      <button @click="addToCartProduct" class="btn btn-primary">
        Add to Cart
      </button>
      <input v-model="quantity" type="number" min="1" placeholder="Quantity" />
    </div>
    <div v-else><Spinner /></div>
    <cart :cart-items="cart"> </cart>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import Spinner from "./Spinner.vue";

export default {
  components: { Spinner },
  data() {
    return {
      error: null,
      prodID: this.$route.params.prodID,
      quantity: 1,
    };
  },
  computed: {
    product() {
      return this.$store.state.product;
    },
    cart() {
      return this.$store.state.cart;
    },
  },
  methods: {
    // async addToCartProduct() {
    //   try {
    //     // Retrieve user data from localStorage
    //     const userDataJSON = localStorage.getItem("userData");
    //     if (userDataJSON) {
    //       const userData = JSON.parse(userDataJSON);
    //       const userID = userData.result.userID;
    //       console.log(userData.result.userID);
    //       await this.$store.dispatch("addToCart", {
    //         const product = {
    //         prodNAME: this.prodNAME,
    //         prodPRICE: this.prodPRICE,
    //         prodQUANTITY: this.prodQUANTITY,
    //         prodIMG: this.prodIMG,
    //         userID: userID,}
    //       });

    //       console.log("Added to cart:", this.product);
    //       await this.$store.dispatch("getCart");
    //       console.log("Updated cart information:", this.$store.state.cart);

    //       Swal.fire({
    //         icon: "success",
    //         title: "Added to Cart",
    //         text: "The product has been added to your cart.",
    //       });
    //     } else {
    //       console.error("User data not found in localStorage.");
    //     }
    //   } catch (error) {
    //     console.error("Error adding to cart:", error);

    //     Swal.fire({
    //       icon: "error",
    //       title: "Error",
    //       text: "An error occurred while adding the product to your cart.",
    //     });
    //   }
    // },
//     async addToCartProduct() {
//   try {
   
//     const userDataJSON = localStorage.getItem("userData");
//     if (userDataJSON) {
//       const userData = JSON.parse(userDataJSON);
//       const userID = userData.result.userID;

  
//       const product = {
//         prodID: this.product.prodID,
//         userID: userID, 
//       };

    
//       await this.$store.dispatch("addToCart", product);

//       console.log("Added to cart:", product);
//       await this.$store.dispatch("getCart");
//       console.log("Updated cart information:", this.$store.state.cart);

//       Swal.fire({
//         icon: "success",
//         title: "Added to Cart",
//         text: "The product has been added to your cart.",
//       });
//     } else {
//       console.error("User data not found in localStorage.");
//     }
//   } catch (error) {
//     console.error("Error adding to cart:", error);

//     Swal.fire({
//       icon: "error",
//       title: "Error",
//       text: "An error occurred while adding the product to your cart.",
//     });
//   }
// },
async addToCartProduct() {
  try {
    const userDataJSON = localStorage.getItem("userData");
    if (userDataJSON) {
      const userData = JSON.parse(userDataJSON);
      const userID = userData.result.userID;

      const product = {
        prodID: this.product.prodID,
        userID: userID,
      };

      const existingProductIndex = this.$store.state.cart.findIndex(
        (item) => item.prodID === product.prodID
      );

      if (existingProductIndex !== -1) {
        const existingProduct = this.$store.state.cart[existingProductIndex];
        await this.$store.dispatch("updateCartItem", {
          index: existingProductIndex,
          newQuantity: existingProduct.quantity + this.quantity,
        });
      } else {
     
        product.quantity = this.quantity;
        await this.$store.dispatch("addToCart", product);
      }

    
      await this.$store.dispatch("getCart");

      Swal.fire({
        icon: "success",
        title: "Added to Cart",
        text: "The product has been added to your cart.",
      });
    } else {
      console.error("User data not found in localStorage.");
    }
  } catch (error) {
    console.error("Error adding to cart:", error);

    Swal.fire({
      icon: "error",
      title: "Error",
      text: "An error occurred while adding the product to your cart.",
    });
  }
},



    getAllProductValues() {
      const cartItems = this.$store.state.cart;
      const allProductValues = [];
      cartItems.forEach((item) => {
        const product = {
          prodID: item.prodID,
          userID: userID,
        };
        allProductValues.push(product);
      });
      console.log("All Product Values:", allProductValues);
    },
  },
  async created() {
    const prodID = this.$route.params.prodID;
    try {
      await this.$store.dispatch("getProduct", prodID);
    } catch (error) {
      this.error = "Product not found";
    }
  },
};
</script>

<style scoped>
.single-product {
  text-align: center;
}

.single-product img {
  max-width: 100%;
  height: auto;
}

.product-details {
  margin-top: 10px;
}
</style>
