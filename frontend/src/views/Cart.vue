<template>
  <div>
    <div v-if="cartItems" class="row p-4 justify-content-evenly">
      <CartItem
        v-for="cartItem in cartItems"
        :key="cartItem.prodID"
        :product="cartItem"
        @removeFromCart="removeFromCart(cartItem.prodID)"
      />
    </div>
    <div v-else>Cart is empty.</div>
  </div>
</template>

<script>
export default {
  computed: {
    products() {
      return this.$store.state.cart;
    },
  },
  mounted() {
    this.$store.dispatch("fetchCartData", "removeFromCart");
  },
};
</script>
