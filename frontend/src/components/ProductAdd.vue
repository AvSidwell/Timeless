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
      <!-- images -->
      <div class="form-group">
        <label for="prodImage1">Product Image 1 (URL)</label>
        <input
          type="text"
          class="form-control"
          v-model="newProduct.prodIMG[0]"
          required
        />
      </div>
      <div class="form-group">
        <label for="prodImage2">Product Image 2 (URL)</label>
        <input
          type="text"
          class="form-control"
          v-model="newProduct.prodIMG[1]"
          required
        />
      </div>
      <div class="form-group">
        <label for="prodImage3">Product Image 3 (URL)</label>
        <input
          type="text"
          class="form-control"
          v-model="newProduct.prodIMG[2]"
          required
        />
      </div>
      <div class="form-group">
        <label for="prodImage4">Product Image 4 (URL)</label>
        <input
          type="text"
          class="form-control"
          v-model="newProduct.prodIMG[3]"
          required
        />
      </div>
      <div class="form-group">
        <label for="prodImage5">Product Image 5 (URL)</label>
        <input
          type="text"
          class="form-control"
          v-model="newProduct.prodIMG[4]"
          required
        />
      </div>
      <!-- end of images -->
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
        prodIMG: {
        image1: "",
        image2: "",
        image3: "",
        image4: "",
        image5: "",
      },
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
