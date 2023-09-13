<template>
  <div>
    <div class="row">
      <div class="col-12 col-sm-12">
        <EditProductModal :product="editedProduct" @edit="editProduct" />
      </div>
      <div class="col-12 col-sm-6">
        <ProductAdd />
      </div>
    </div>
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
            <button @click="deleteProductModal(product)" class="btn btn-danger">
              Delete
            </button>
            <button @click="editProductModal(product)" class="btn btn-primary">
              Edit
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
import ProductAdd from "./ProductAdd.vue";
import EditProductModal from "./ProductEditModal.vue";

export default {
  props: {
    products: Array,
  },
  components: {
    EditProductModal,
    ProductAdd,
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
  async mounted() {
    await this.$store.dispatch("getProducts");
  },
  methods: {
    // async editProduct(updatedProduct) {
    //   try {
    
    //     const response = await axios.patch(
    //       `http://localhost:5000/products/${updatedProduct.prodID}`,
    //       updatedProduct
    //     );

    //     alert("Product updated successfully");
    //     await this.$store.dispatch("getProducts"); 
    //     this.editedProduct = null;
    //   } catch (error) {
    //     console.error("Error editing product:", error);
    //   }
    // },
    // editProduct(product) {
    //   this.$emit("edit-product", product);
    // },
    editProductModal(product) {
      this.editedProduct = { ...product }; // Set the selected product
      this.$refs.editProductModal.show(); // Show the modal (use a ref)
    },
    deleteProductModal(product) {
      Swal.fire({
        title: "Delete Product?",
        text: "Are you sure you want to delete this product?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel",
        confirmButtonColor: "#d33",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch("deleteProduct", product.prodID);
        }
      });
    },
  },
};
</script>
