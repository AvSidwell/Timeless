<template>
  <div>
    <form @submit.prevent="addProduct">
      <div class="form-group">
        <label for="prodName">Product Name</label>
        <input
          type="text"
          class="form-control"
          v-model="newProduct.prodNAME"
          required
        />
      </div>
      <div class="form-group">
        <label for="prodPrice">Product Price</label>
        <input
          type="number"
          class="form-control"
          v-model="newProduct.prodPRICE"
          required
        />
      </div>
      <div class="form-group">
        <label for="prodDesc">Product Description</label>
        <textarea
          class="form-control"
          v-model="newProduct.prodDESC"
          required
        ></textarea>
      </div>
      <div class="form-group">
        <label for="prodCategory">Product Category</label>
        <input
          type="text"
          class="form-control"
          v-model="newProduct.prodCAT"
          required
        />
      </div>
      <div class="form-group">
        <label for="prodType">Product Type</label>
        <input
          type="text"
          class="form-control"
          v-model="newProduct.prodTYPE"
          required
        />
      </div>
      <div class="form-group">
        <label for="prodSeason">Product Season</label>
        <input
          type="text"
          class="form-control"
          v-model="newProduct.prodSEASON"
          required
        />
      </div>
      <div class="form-group">
        <label for="prodImage">Product Image (URL)</label>
        <input
          type="text"
          class="form-control"
          v-model="newProduct.prodIMG"
          required
        />
      </div>
      <div class="form-group">
        <label for="prodQuantity">Product Quantity</label>
        <input
          type="number"
          class="form-control"
          v-model="newProduct.prodQUANTITY"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary" @click="submitForm()">
        Add Product
      </button>
    </form>
    <div v-if="successMessage" class="alert alert-success">
      {{ successMessage }}
    </div>
    <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
  </div>
</template>
<script>
import Swal from "sweetalert2";

export default {
    
  data() {
    return {
      newProduct: {
        prodNAME: "",
        prodPRICE: 0,
        prodDESC: "",
        prodCAT: "",
        prodTYPE: "",
        prodSEASON: "",
        prodIMG: "",
        prodQUANTITY: 0,
      },
    };
  },
  computed: {
    successMessage() {
      return this.$store.state.succMsg;
    },
    errorMessage() {
      return this.$store.state.errMsg;
    },
  },
  methods: {
    async submitForm() {
      const result = await this.$store.dispatch("addProduct", this.newProduct);
      console.log(this.newProduct);
      if (result) {
        await Swal.fire({
          icon: "success",
          title: "Success",
          text: "Product added successfully",
        });
        window.location.reload();
        this.clearForm();
      } else {
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error adding product",
        });
      }
    },
    clearForm() {
      // Clear the form fields
      this.newProduct = {
        prodNAME: "",
        prodPRICE: 0,
        prodDESC: "",
        prodCAT: "",
        prodTYPE: "",
        prodSEASON: "",
        prodIMG: "",
        prodQUANTITY: 0,
      };
    },
  },
};
</script>
