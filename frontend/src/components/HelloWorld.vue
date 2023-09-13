<template>
  <div class="home">
    <section class="hero">
      <div class="hero-content">
        <h1>Welcome to Timeless Suits</h1>
        <p>Discover the Perfect Suit for Every Occasion</p>
        <button @click="exploreSuits">Explore Suits</button>
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
      <button @click="learnMore">Learn More</button>
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
.home {
  font-family: Arial, sans-serif;
}

header {
  background-color: #007bff;
  color: white;
  padding: 10px 0;
  text-align: center;
}
.hero {
  /* background-image: url("""); */
  background-size: cover;
  background-position: center;
  color: white;
  text-align: center;
  padding: 100px 0;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  font-size: 36px;
}

p {
  font-size: 18px;
  margin: 20px 0;
}
</style>
