<template>
  <div>
    <div class="products-container">
      <div
        class="products-sidebar text-center"
        :class="{ 'sticky-top': isSticky, 'on-top': isMobileView }"
      >
        <div>
          <h5 class="text-start">Sort By:</h5>
          <button class="btnStyle m-1" @click="sortByName('asc')">
            Name(Asc)
          </button>
          <button class="btnStyle m-1" @click="sortByName('desc')">
            Name(Desc)
          </button>
          <button class="btnStyle m-1" @click="sortByPrice('asc')">
            Price(Asc)
          </button>
          <button class="btnStyle m-1" @click="sortByPrice('desc')">
            Price(Desc)
          </button>
        </div>
        <h5 class="text-start">Filter by Category:</h5>
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
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search by Name"
          @input="searchByName"
        />
      </div>
      <div class="products-content" :class="{ 'move-down': isMobileView }">
        <div v-if="filteredProducts" class="row justify-content-evenly">
          <div
            v-for="(product, index) in filteredProducts"
            :key="product.prodID"
            class="col-12 col-md-4 col-sm-6"
          >
            <router-link
              :to="{ name: 'Single', params: { prodID: product.prodID } }"
            >
            <h6 class="name text-start ms-4">{{ product.prodNAME }}</h6>
              <div class="image-gallery">
                <img
                  :src="productImages(product)[activeImageIndex]"
                  :alt="`Image ${activeImageIndex + 1}`"
                />
              </div>
              <div class="product-details">
                <p> <span class="name">Price:</span> R{{ product.prodPRICE }}.00</p>
                <p> <span class="name">Type:</span> {{ product.prodTYPE }}</p>
              </div>
            </router-link>
          </div>
        </div>
        <div v-else><Spinner /></div>
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from "./Spinner.vue";
import "animate.css";

export default {
  components: { Spinner },
  data() {
    return {
      isSticky: false,
      activeImageIndex: 3,
      isMobileView: false,
    };
  },
  computed: {
    productImages() {
      return (product) => {
        if (product.prodIMG) {
          const parsedImages = JSON.parse(product.prodIMG);
          return Object.values(parsedImages).filter((img) => img !== "");
        }
        return [];
      };
    },
    screenWidth() {
      return window.innerWidth;
    },
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
  watch: {
    screenWidth(newWidth) {
      if (newWidth <= 500) {
        this.isSticky = true;
      } else {
        this.isSticky = false;
      }
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
      this.$store.dispatch("filterProductsByCategory", this.selectedCategory);
    },
    searchByName() {
      this.$store.dispatch("searchProducts", this.searchQuery);
    },
  },
  mounted() {
    this.$store.dispatch("getProducts");
    if (window.innerWidth <= 500) {
      this.isMobileView = true;
    }
  },
};
</script>

<style scoped>
.btnStyle {
  border-radius: 0.4rem;
  color: #9ba38b;
  background-color: #2b2828;
  border: solid #9ba38b;
}

.btnStyle:hover {
  color: #2b2828;
  background-color: #9ba38b;
  border: solid #2b2828;
}
.products-container {
  display: flex;
  font-family: "Keania One", cursive;
}

#category {
  border-radius: 0.4rem;
  color: #9ba38b;
  background-color: #2b2828;
  border: solid #9ba38b;
}
#category:hover {
  color: #2b2828;
  background-color: #9ba38b;
  border: solid #2b2828;
}

input {
  margin-top: 1rem;
  border-radius: 0.4rem;
  color: #9ba38b;
  background-color: #2b2828;
  border: solid #9ba38b;
}
.products-sidebar {
  background-color: #E9E9E9;
}
/* Product card  */
.products-content {
  background-color: #2b2828;
  text-align: center;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}
p {
  color: #9ba38b;
  text-decoration: underline;
}
span {
  font-size: larger;
  font-weight: bolder;
}

.name {
  color: #E9E9E9;
  text-decoration: underline  #2b2828;
}
/* ///////////////////////////////////////////////////////////////////////////// */
.products-sidebar {
  width: 30%;
  z-index: 1;
  padding: 20px;
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
}

.sticky-top {
  position: sticky;
  top: 0;
}

@media screen and (max-width: 500px) {
  .products-sidebar {
    display: block;
  }

  .move-down {
    margin-top: 20px;
  }
}


img {
  max-width: 100%;
  height: 25rem;
}
</style>
