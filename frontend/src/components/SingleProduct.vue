<template>
  <div>
    <div v-if="product" class="single-product">
      <div class="image-gallery">
        <h2 class="text-start head mx-5">{{ product.prodNAME }}</h2>
        <img
          v-for="(image, index) in productImages"
          :key="index"
          :src="image"
          :alt="`Image ${index + 1}`"
        />
      </div>
      <div class="product-details px-5">
        <div class="justify-content-center d-flex">
          <p class="text-center mx-3">
            <span>Price:</span> R{{ product.prodPRICE }}.00
          </p>
          <p class="text-center mx-3">
            <span>Category:</span> {{ product.prodCAT }}
          </p>
        </div>
        <div class="text-center">
          <button @click="addToCartProduct" class="btnStyle mx-2">
            Add to Cart
          </button>
          <input
            v-model="quantity"
            type="number"
            min="1"
            placeholder="Quantity"
            class="text-center my-3"
          />
        </div>
      </div>
      <p><span>Description:</span> {{ product.prodDESC }}</p>
      <div class="d-flex justify-content-around">
        <p><span>Type:</span> {{ product.prodTYPE }}</p>
        <p><span>Season:</span> {{ product.prodSEASON }}</p>
        <p><span>Quantity:</span> {{ product.prodQUANTITY }}</p>
      </div>
    </div>
    <div v-else>
      <Spinner />
    </div>
    <!-- <cart :cart-items="cart"> </cart> -->
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
      prodID: parseInt(this.$route.params.prodID),
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
    productImages() {
      const parsedImages = JSON.parse(this.product.prodIMG);
      return Object.values(parsedImages).filter((img) => img !== "");
    },
  },
  methods: {
    async addToCartProduct() {
  try {
    const userDataJSON = localStorage.getItem("userData");
    if (userDataJSON) {
      const userData = JSON.parse(userDataJSON);
      const userID = userData.result.userID;

      const product = {
        prodID: this.prodID,
        userID: userID,
        quantity: this.quantity,
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
        await this.$store.dispatch("addToCart", product);
      }

      // await this.$store.dispatch("getCart");

      Swal.fire({
        icon: "success",
        title: "Added to Cart",
        text: "The product has been added to your cart.",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Not Logged In",
        text: "You need to log in to add products to your cart.",
        confirmButtonText: "Log In",
        showCancelButton: true,
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$router.push("/login"); 
        }
      });
    }
  } catch (error) {
    console.error("Error adding to cart:", error);

    Swal.fire({
     icon: "success",
        title: "Added to Cart",
        text: "The product has been added to your cart.",
    });
  }
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
* {
  font-family: "Keania One", cursive;
}
.single-product {
  background-color: #9ba38b;
}
.head {
  color: #e9e9e9;
  text-shadow: 2px 4px 3px #2b2828;
}
img {
  margin: 1.5rem;
  height: 15rem;
}
.btnStyle {
  border-radius: 0.4rem;
  color: #9ba38b;
  background-color: #2b2828;
  border: solid #9ba38b;
  box-shadow: 1.5px 2px 5px #2b2828;
}

input {
  margin-top: 1rem;
  border-radius: 0.4rem;
  color: #9ba38b;
  background-color: #2b2828;
  border: solid #9ba38b;
  box-shadow: 1.5px 2px 5px #2b2828;
}

span {
  color: #e9e9e9;
  text-shadow: 1px 2px 1.5px #2b2828;
  font-size: large;
}
</style>
