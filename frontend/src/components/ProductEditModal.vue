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
      <div class="form-group">
        <label for="prodPrice">Product Price</label>
        <input
          type="number"
          class="form-control"
          v-model="editedProduct.prodPRICE"
          required
        />
      </div>
      <div class="form-group">
        <label for="prodDesc">Product Description</label>
        <textarea
          class="form-control"
          v-model="editedProduct.prodDESC"
          required
        ></textarea>
      </div>
      <div class="form-group">
        <label for="prodCat">Product Category</label>
        <input
          type="text"
          class="form-control"
          v-model="editedProduct.prodCAT"
          required
        />
      </div>
      <div class="form-group">
        <label for="prodType">Product Type</label>
        <input
          type="text"
          class="form-control"
          v-model="editedProduct.prodTYPE"
          required
        />
      </div>
      <div class="form-group">
        <label for="prodSeason">Product Season</label>
        <input
          type="text"
          class="form-control"
          v-model="editedProduct.prodSEASON"
          required
        />
      </div>
      
    <div class="form-group">
      <label for="prodImage1">Product Image 1 (URL)</label>
      <input
        type="text"
        class="form-control"
        v-model="editedProduct.prodIMG.image1"
        required
      />
    </div>
    <div class="form-group">
      <label for="prodImage2">Product Image 2 (URL)</label>
      <input
        type="text"
        class="form-control"
        v-model="editedProduct.prodIMG.image2"
        required
      />
    </div>
    <div class="form-group">
      <label for="prodImage3">Product Image 3 (URL)</label>
      <input
        type="text"
        class="form-control"
        v-model="editedProduct.prodIMG.image3"
        required
      />
    </div>
    <div class="form-group">
      <label for="prodImage4">Product Image 4 (URL)</label>
      <input
        type="text"
        class="form-control"
        v-model="editedProduct.prodIMG.image4"
        required
      />
    </div>
    <div class="form-group">
      <label for="prodImage5">Product Image 5 (URL)</label>
      <input
        type="text"
        class="form-control"
        v-model="editedProduct.prodIMG.image5"
        required
      />
    </div>
      <div class="form-group">
        <label for="prodQuantity">Product Quantity</label>
        <input
          type="number"
          class="form-control"
          v-model="editedProduct.prodQUANTITY"
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
        prodIMG: {
        image1: "",
        image2: "",
        image3: "",
        image4: "",
        image5: "",
      },
        prodQUANTITY: 0,
      };
    },
  },
};
</script>
