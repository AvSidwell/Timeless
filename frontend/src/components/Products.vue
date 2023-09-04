<template>
  <div>
    <div>
      <button class="btn btn-primary mx-2" @click="sortByName('asc')">Sort by Name (Asc)</button>
      <button class="btn btn-primary mx-2" @click="sortByName('desc')">Sort by Name (Desc)</button>
      <button class="btn btn-primary mx-2" @click="sortByPrice('asc')">Sort by Price (Asc)</button>
      <button class="btn btn-primary mx-2" @click="sortByPrice('desc')">Sort by Price (Desc)</button>
    </div>
    
    <div>
      <label for="category">Filter by Category:</label>
      <select
        id="category"
        v-model="selectedCategory"
        @change="filterByCategory"
      >
        <option value="">All</option>
        <option v-for="category in categories" :key="category">
          {{ category }}
        </option>
      </select>
    </div>
    <div>
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search by Name"
        @input="searchByName"
      />
    </div>
    <div v-if="filteredProducts" class="row p-4 justify-content-evenly">
      <div
        v-for="product in filteredProducts"
        :key="product.prodID"
        class="product-card"
      >
        <router-link
          :to="{ name: 'Single', params: { prodID: product.prodID } }"
        >
          <div>
            <img :src="product.prodIMG" :alt="product.prodNAME" />
            <div class="product-details">
              <h2>{{ product.prodNAME }}</h2>
              <p>Price: R {{ product.prodPRICE }}.00</p>
              <p>Category: {{ product.prodCAT }}</p>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
export default {
  computed: {
    products() {
      return this.$store.state.products;
    },
    selectedCategory: {
      get() {
        return this.$store.state.selectedCategory;
      },
      set(value) {
        this.$store.dispatch("filterProductsByCategory", value);
      },
    },
    searchQuery: {
      get() {
        return this.$store.state.searchQuery;
      },
      set(value) {
        this.$store.dispatch("searchProducts", value);
      },
    },
    categories() {
      const products = this.$store.state.products;
      if (products) {
        const uniqueCategories = [...new Set(products.map((p) => p.prodCAT))];
        return uniqueCategories;
      }
      return [];
    },
    filteredProducts() {
      let filtered = this.products;
      if (this.selectedCategory) {
        filtered = filtered.filter(
          (product) => product.prodCAT === this.selectedCategory
        );
      }
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(
          (product) =>
            product.prodNAME.toLowerCase().includes(query) ||
            product.prodCAT.toLowerCase().includes(query)
        );
      }
      if (this.$store.state.sortBy === "name") {
        filtered = [...filtered].sort((a, b) =>
          a.prodNAME.localeCompare(b.prodNAME)
        );
      } else if (this.$store.state.sortBy === "price") {
        filtered = [...filtered].sort((a, b) => a.prodPRICE - b.prodPRICE);
      }
      return filtered;
    },
  },
  methods: {
    sortByName(order) {
      this.$store.dispatch("sortProducts", { field: "name", order });
    },
    sortByPrice(order) {
      this.$store.dispatch("sortProducts", { field: "price", order });
    },
    filterByCategory() {
    },
    searchByName() {
    },
  },
  mounted() {
    this.$store.dispatch("getProducts");
  },
};
</script>

<style scoped>
.product-card {
  width: 300px;
  margin: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
}

.product-card img {
  max-width: 100%;
  height: auto;
}

.product-details {
  margin-top: 10px;
}
</style>
