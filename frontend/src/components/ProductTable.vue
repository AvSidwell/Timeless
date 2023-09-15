<template>
  <div>
    <div class="row px-5">
      <div class="col-12 col-md-6 col-sm-12 mb-5">
        <EditProductModal :product="editedProduct" @edit="editProduct" />
      </div>
      <div class="col-12 col-md-6 col-sm-12 mb-5">
        <ProductAdd />
      </div>
    </div>
    <table class="table">
      <thead class="">
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
          <td data-label="Product Name">{{ product.prodNAME }}</td>
          <td data-label="Price">{{ product.prodPRICE }}</td>
          <td>{{ product.prodQUANTITY }}</td>
          <td data-label="Quantity">
            <div class="image-gallery">
           
              <img
                :src="productImages(product)[activeImageIndex]"
                :alt="`Image ${activeImageIndex + 1}`"
              />
            </div>
          </td>
          <td data-label="CAT">{{ product.prodCAT }}</td>
          <td>
            <button
              data-label="Action"
              @click="deleteProductModal(product)"
              class="btn btn-danger text-end"
            >
              Delete
            </button>
            <button
              data-label="Action"
              @click="editProductModal(product)"
              class="btn btn-primary text-end"
            >
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
    productImages() {
      return (product) => {
        if (product && product.prodIMG) {
          const parsedImages = JSON.parse(product.prodIMG);
          return Object.values(parsedImages).filter((img) => img !== "");
        }
        return [];
      };
    },
    Products() {
      return this.$store.state.products;
    },
  },
  async mounted() {
    await this.$store.dispatch("getProducts");
  },
  methods: {
    editProductModal(product) {
      this.editedProduct = { ...product };
      this.$refs.editProductModal.show();
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
