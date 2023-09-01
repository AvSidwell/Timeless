<template>
  <div>
    <div v-if="products" class="row p-4 justify-content-evenly">
      <Products
        v-for="product of products"
        :key="product.prodID"
        :product="product"
      />
    </div>
    <div v-else>Processing...</div>
  </div>
</template>
<script>
import Products from "@/components/Products.vue";
export default {
  computed: {
    allProducts() {
      return this.$store.state.products;
    },
    products() {
      return this.allProducts || [];
    },
  },

  mounted() {
    this.$store.dispatch("getProducts");
  },
  components: { Products },
};
</script>
<style></style>
