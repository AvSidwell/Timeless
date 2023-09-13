<template>
  <div>
    <div v-if="products" class="row justify-content-evenly">
      <Products/>
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
