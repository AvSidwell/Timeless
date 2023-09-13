<template>
  <div>
    <div v-if="cart" class="row justify-content-evenly">
      <cart />
    </div>
    <div v-else>Cart is empty.</div>
  </div>
</template>

<script>
import cart from "@/components/Cart.vue";
export default {
  computed: {
    allCart() {
      return this.$store.state.cart;
    },
    cart() {
      return this.allCart || [];
    },
  },

  // mounted() {
  //   this.$store.dispatch("getCart");
  // },
  mounted() {
    this.$store.dispatch("getCart");
  },
  components: { cart },
};
</script>
