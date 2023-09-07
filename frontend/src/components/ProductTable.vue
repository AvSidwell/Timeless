<template>
  <div>
    <div>
      <!-- Your template code remains mostly the same, with only minor naming changes -->
      <!-- ... -->

      <!-- Update the table headers for Products -->
      <!-- <table class="table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Product Stock</th>
            <th>Product URL</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in Products" :key="product.prodID">
            <td>{{ product.prodNAME }}</td>
            <td>{{ product.prodPRICE }}</td>
            <td>{{ product.prodQUANTITY }}</td>
            <td><img :src="product.prodIMG" :alt="product.prodNAME" /></td>
            <td>{{ product.prodCAT }}</td>
            <td>
              <router-link
              :to="{
                name: 'product-edit',
                params: { prodID: product.prodID },
              }"
              >
              <button
                type="button"
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#editModal"
                @click="editProductModal(product)"
              >
                Edit
              </button>
          
              </router-link>              <button @click="editProductModal(product)">Edit</button>
                </td>
          </tr>
        </tbody>
      </table> -->
      <table class="table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Product Stock</th>
            <th>Product URL</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in Products" :key="product.prodID">
            <td>{{ product.prodNAME }}</td>
            <td>{{ product.prodPRICE }}</td>
            <td>{{ product.prodQUANTITY }}</td>
            <td><img :src="product.prodIMG" :alt="product.prodNAME" /></td>
            <td>{{ product.prodCAT }}</td>
            <td>
              <router-link
                :to="{ name: 'product-edit', params: { prodID: product.prodID } }"
                class="btn btn-primary"
              >
                Edit
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import EditProductModal from "./ProductEditModal.vue";

export default {
  components: {
    EditProductModal,
  },
  data() {
    return {
      editedProduct: null,
    };
  },
  computed: {
    Products() {
      return this.$store.state.products;
    },
  },
  methods: {
    async mounted() {
      await this.$store.dispatch("getProducts");
    },
    async editProduct() {
      try {
        const editedProduct = {
          prodPRICE: this.editedProduct.prodPRICE,
        prodNAME: this.editedProduct.prodNAME,
        prodDESC: this.editedProduct.prodDESC,
        prodCAT: this.editedProduct.prodCAT,
        prodTYPE: this.editedProduct.prodTYPE,
        prodSEASON: this.editedProduct.prodSEASON,
        prodIMG: this.editedProduct.prodIMG,
        prodQUANTITY: this.editedProduct.prodQUANTITY,
          // Modify other properties accordingly
        };

        // Send a PUT or PATCH request to update the product
        const response = await axios.patch(
          `http://localhost:5000/products/${this.form.prodID}`,
          editedProduct
        );

        alert("Product updated successfully");
        await this.$store.dispatch("getProducts"); // Refresh the product list
        this.resetForm();
        $("#editModal").modal("hide");
      } catch (error) {
        console.error("Error editing product:", error);
      }
    },
    // Method to set the edited product and open the edit modal
    editProductModal(product) {
      this.editedProduct = product;
      // You can also open the edit modal here if needed
      $("#editModal").modal("show");
    },
    // ... (other methods remain the same)
  },
};
</script>

<!-- Your style section remains the same -->
