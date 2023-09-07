<template>
  <div>
    <button
      ref="showModalButton"
      type="button"
      class="btn btn-primary"
      style="display: none;"
      data-bs-toggle="modal"
      data-bs-target="#staticBackdrop"
    >
      Edit
    </button>

    <div
      class="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="false"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">
              Modal title
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body" >
            <h2 class="form-title">
              {{ editing ? "Edit Product" : "Create Product" }}
            </h2>
            <form @submit.prevent="saveProduct" class="product-form-container">
              <label for="prodNAME">Product Name</label>
              <input
                v-model="updatedProduct.prodNAME"
                type="text"
                id="prodNAME"
                class="form-input"
              />

              <label for="prodPRICE">Product Price</label>
              <input
                v-model="updatedProduct.prodPRICE"
                type="number"
                id="prodPRICE"
                class="form-input"
              />

              <label for="prodDESC">Product Description</label>
              <textarea
                v-model="updatedProduct.prodDESC"
                id="prodDESC"
                class="form-group form-input"
              ></textarea>

              <label for="prodCAT">Product Category</label>
              <input
                v-model="updatedProduct.prodCAT"
                type="text"
                id="prodCAT"
                class="form-input"
              />

              <label for="prodTYPE">Product Type</label>
              <input
                v-model="updatedProduct.prodTYPE"
                type="text"
                id="prodTYPE"
                class="form-input"
              />

              <label for="prodSEASON">Product Season</label>
              <input
                v-model="updatedProduct.prodSEASON"
                type="text"
                id="prodSEASON"
                class="form-input"
              />

              <label for="prodIMG">Product Image</label>
              <input
                v-model="updatedProduct.prodIMG"
                type="text"
                id="prodIMG"
                class="form-input"
              />

              <label for="prodQUANTITY">Product Quantity</label>
              <input
                v-model="updatedProduct.prodQUANTITY"
                type="number"
                id="prodQUANTITY"
                class="form-input"
              />

              <!-- Add other form fields for editing product details here -->
              <button type="submit" class="form-button mt-3">
                {{ editing ? "Update" : "Create" }}
              </button>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">Understood</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import $ from 'jquery';

export default {
  props: {
    product: Object,
  },
  data() {
    return {
      updatedProduct: { ...this.product },
      editing: !!this.product,
    };
  },
  methods: {
    ...mapActions(["editProduct"]),
    saveProduct() {
      this.$emit("update-product", this.updatedProduct);
    },
  },
  mounted() {
   
    this.$nextTick(() => {
      const showModalButton = this.$refs.showModalButton;
      if (showModalButton) {
        $(showModalButton).modal('show');
      }
    });
  },
};
</script>

<style scoped>
.product-form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}
.form-title {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
}
.form-group {
  margin-bottom: 15px;
}
.form-input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.form-button {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.form-button:hover {
  background-color: #0056b3;
}
</style>
