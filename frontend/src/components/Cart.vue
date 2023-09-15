<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th>Cart ID</th>
          <th>Product Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in cart" :key="item.cartID" class="cart-card">
          <td data-label="Cart ID">{{ item.cartID }}</td>
          <td data-label="Product Name">{{ item.prodNAME }}</td>
          <td data-label="Price">R {{ item.prodPRICE }}.00</td>
          <td data-label="Quantity">
            <input
              type="number"
              v-model="item.quantity"
              @input="updateQuantity(item)"
              min="1"
            />
          </td>
          <td data-label="Total">R {{ itemTotal(item) }}.00</td>
          <td data-label="Action">
            <button
              v-if="item.cartID"
              @click="removeItem(item.cartID)"
              class="btn btn-danger"
            >
              Remove
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div>Total Cart Value: R {{ cartTotal }}.00</div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  computed: {
    cart() {
      return this.$store.state.cart;
    },
    cartTotal() {
      return this.cart.reduce((total, item) => total + this.itemTotal(item), 0);
    },
  },
  methods: {
    removeItem(cartID) {
      this.$store.dispatch("removeItem", cartID);
    },
    updateQuantity(item) {
      this.$store.dispatch("updateCartItemQuantity", {
        cartID: item.cartID,
        prodID: item.prodID,
        quantity: item.quantity,
      });
    },
    itemTotal(item) {
      return item.prodPRICE * item.quantity;
    },
  },
};
</script>

<style scoped>
.table-container {
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
}

.table {
  width: 100%;
  max-width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
}

.table th,
.table td {
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid #dee2e6;
}

@media (max-width: 500px) {
  .table thead {
    display: none;
  }

  .table tbody tr {
    display: block;
    margin-bottom: 0.625rem;
    border-bottom: 1px solid #ccc;
  }

  .table tbody td {
    display: block;
    text-align: left;
    font-size: 14px;
  }

  .table tbody td:before {
    content: attr(data-label);
    font-weight: bold;
    display: inline-block;
    width: 50%;
    margin-right: 0.625rem;
  }
}
</style>
