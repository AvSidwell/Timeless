<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in cartItems" :key="item.prodID">
          <td>{{ item.prodNAME }}</td>
          <td>R {{ item.prodPRICE }}.00</td>
          <td>{{ item.quantity }}</td>
          <td>R {{ item.prodPRICE * item.quantity }}.00</td>
          <td>
            <button @click="removeItem(item.prodID)" class="btn btn-danger">Remove</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

export default {
  props: {
    cartItems: Array,
  },
  methods: {
    ...mapActions(["removeFromCart"]),
    removeItem(prodID) {
      this.removeFromCart(prodID);
      this.$emit("itemRemoved", prodID);
    },
  },
};
</script>
