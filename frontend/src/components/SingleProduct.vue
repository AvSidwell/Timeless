<template>
  <div>
    <div v-if="product" class="single-product">
      <img :src="product.prodIMG" :alt="product.prodNAME" />
      <div class="product-details">
        <h2>{{ product.prodNAME }}</h2>
        <p>Price: R {{ product.prodPRICE }}.00</p>
        <p>Category: {{ product.prodCAT }}</p>
      </div>
      <button @click="addToCartProduct" class="btn btn-primary">Add to Cart</button>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      error: null,
    };
  },
  computed: {
    ...mapGetters(["product"]),
  },
  methods: {
    addToCartProduct() {
      this.addToCart(this.product);
    },
    ...mapActions(["addToCart"]),
  },
  created() {
    const prodID = this.$route.params.prodID;
    console.log("Product ID:", prodID); // Log prodID to check if it's correct
    try {
      this.$store.dispatch("getProduct", prodID).then(() => {
        console.log("Product:", this.product); // Log the product data
      });
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
