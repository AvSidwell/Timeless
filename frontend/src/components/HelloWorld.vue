<template>
  <div class="home">
    <section class="hero">
      <div class="hero-content">
        <h1>Welcome to Timeless</h1>
        <p>Discover the Perfect Suit for Every Occasion</p>
        <router-link to="/ProductsView" class="nav-item">Shop</router-link>
      </div>
    </section>

    <section class="featured-products">
      <h2>Featured Products</h2>
    </section>

    <section class="about">
      <h2>About Us</h2>
      <p>
        At Timeless Suits, we are passionate about providing high-quality suits
        for every occasion. Our suits are designed with precision and crafted
        with care to ensure you look your best.
      </p>
      <p>
        Explore our wide range of suits for men and women, and find the perfect
        outfit that suits your style.
      </p>
      <router-link to="/about" class="nav-item">About</router-link>
    </section>

    <footer>
    </footer>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {},
  methods: {},
};
</script>

<style scoped>
* {
  font-family: "Keania One", cursive;
}
h1 {
  color:#e9e9e9;
  box-shadow: 1.5px 2px 5px #2b2828;
}
.nav-item {
  border-radius: 0.4rem;
  padding: 5px;
  color: #e9e9e9;
  background-color: #2b2828;
  border: solid #e9e9e9;
  box-shadow: 1.5px 2px 5px #2b2828;
}

.home {
  font-family: Arial, sans-serif;
}


.hero {
  background-image:  linear-gradient(rgba(0, 0, 0, 0.65), rgba(10, 0, 0, 0.65)), url("https://i.postimg.cc/c4FXDB8D/2690453.jpg");
  /* background: linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)); */
  background-attachment: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  height: 100vh;
  background-repeat: no-repeat;
  background-position: center;
  color: white;
  text-align: center;
  padding: 100px 0;
}

.hero-content {
  color: #e9e9e9;
  text-shadow: 2px 4px 3px #2b2828;
}

h1 {
  font-size: 36px;
}

p {
  font-size: 18px;
  margin: 20px 0;
}
</style>
