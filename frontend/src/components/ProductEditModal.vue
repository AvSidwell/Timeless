<template>
    <div>
      <form @submit.prevent="editProduct">
        <div class="form-group">
          <label for="prodName">Product Name</label>
          <input
            type="text"
            class="form-control"
            v-model="editedProduct.prodNAME"
            required
          />
        </div>
  
  
        <button type="submit" class="btn btn-primary">Edit Product</button>
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
        editedProduct: {
          prodID: null, 
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
      async editProduct() {
        try {
          // Call your store action to update the product
          const result = await this.$store.dispatch(
            "updateProduct",
            this.editedProduct
          );
  
          if (result) {
            await Swal.fire({
              icon: "success",
              title: "Success",
              text: "Product updated successfully",
            });
            this.clearForm();
          } else {
            await Swal.fire({
              icon: "error",
              title: "Error",
              text: "Error updating product",
            });
          }
        } catch (error) {
          console.error("Error editing product:", error);
        }
      },
      clearForm() {
        // Clear the form fields
        this.editedProduct = {
          prodID: null,
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
  