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
    </div>
    <div v-else>Loading...</div>
    <cart :cart-items="cart"> </cart>
  </div>
</template>

<script>
export default {
  data() {
    return {
      error: null,
    };
  },
  computed: {
    product() {
      return this.$store.state.product;
    },
  },
  methods: {
    addToCartProduct() {
      // Make sure Axios is properly imported and available
      this.$store
        .dispatch('addToCart', this.product) // Dispatch addToCart action
        .then(() => {
          // Optionally, you can fetch the updated cart data
          this.$store.dispatch('getCart');
        })
        .catch((error) => {
          console.error('Error adding to cart:', error);
        });
    },
  },
  async created() {
    const prodID = this.$route.params.prodID;
    try {
      await this.$store.dispatch('getProduct', prodID);
    } catch (error) {
      this.error = 'Product not found';
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
