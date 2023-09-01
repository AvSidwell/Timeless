<template>
  <div>
    <div v-if="products" class="row p-4 justify-content-evenly">
      <div v-for="product in products" :key="product.prodID" class="product-card">
        <router-link :to="{ name: 'Single', params: { productID: product.prodID } }">
          <div>
            <img :src="product.prodIMG" :alt="product.prodNAME" />
            <div class="product-details">
              <h2>{{ product.prodNAME }}</h2>
              <p>Price: R {{ product.prodPRICE }}.00</p>
              <p>Category: {{ product.prodCAT }}</p>
            </div>
          </div>
        </router-link>
        </div>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
export default {
  computed: {
    products() {
      return this.$store.state.products;
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
  margin-top: 10px;
}
</style>
