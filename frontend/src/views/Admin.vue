<template>
  <div>
    <div v-if="Adminproducts" class="row p-4 justify-content-evenly">
      <ProductTable/>
    </div>
    <div v-else>Processing...</div>
  </div>
</template>
<script>
import ProductTable from "@/components/ProductTable.vue";
export default {
  computed: {
    allAdmin() {
      return this.$store.state.products;
    },
    Adminproducts() {
      return this.allAdmin || [];
    },
  },

  mounted() {
    this.$store.dispatch("getProducts");
  },
  components: { ProductTable },
};
</script>
<style></style>
