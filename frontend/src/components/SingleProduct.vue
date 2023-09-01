<template>
  <div>
    <div v-if="products" class="row p-4 justify-content-evenly">
      <div v-for="product in products" :key="product.prodID" class="product-card">
        <img :src="product.prodIMG" :alt="product.prodNAME" />
        <div class="product-details">
          <h2>{{ product.prodNAME }}</h2>
          <p>Price: R {{ product.prodPRICE }}.00</p>
          <p>Category: {{ product.prodCAT }}</p>
        </div>
        <button @click="addToCart(product)" class="btn btn-primary">Add to Cart</button>
      </div>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  computed: {
    products() {
      return this.$store.state.products;
    },
  },
  methods: {
    ...mapActions(["addToCart"]), // Import and use mapActions here

    addToCart(product) {
      this.$store.dispatch("addToCart", product);
    },
  },
  mounted() {
    this.$store.dispatch("getProducts");
  },
};
</script>

<style scoped>
.product-card {
  width: 300px;
  margin: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
}

.product-card img {
  max-width: 100%;
  height: auto;
}

.product-details {
  margin-top: 10px
}

</style>