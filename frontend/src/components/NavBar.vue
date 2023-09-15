<template>
  <div>
    <nav class="navbar navbar-expand-lg p-0 navbar-dark bg-dark fixed-top">
      <div class="container-fluid">
        <router-link
          to="/"
          class="navbar-brand animate__animated animate__bounce animate__slower animate__infinite"
          >Timeless</router-link
        >
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav text-center">
            <li class="nav-item text-center">
              <router-link to="/" class="nav-link text-center"
                >Home</router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/ProductsView" class="nav-link"
                >Shop</router-link
              >
            </li>

            <li class="nav-item">
              <router-link to="/Admin" class="nav-link">Admin</router-link>
            </li>

            <li class="nav-item">
              <router-link to="/about" class="nav-link">About Us</router-link>
            </li>

            <li class="nav-item">
              <router-link to="/Cart" class="nav-link">Cart</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/Users" class="nav-link">Users</router-link>
            </li>

            <div class="nav-item">
              <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                  <router-link
                    class="nav-link"
                    v-if="!isLoggedIn"
                    @click="login"
                    to="/Login"
                    >Login</router-link
                  >
                  <button class="nav-link btnStyle" v-else @click="logout">
                    Logout
                  </button>
                </li>
                <li class="nav-item">
                  <router-link
                    class="nav-link"
                    v-if="!isLoggedIn"
                    to="/Register"
                    >Register</router-link
                  >
                </li>
              </ul>
            </div>
          </ul>
        </div>
      </div>
    </nav>
    <div v-if="isLoggedIn" class="row">
      <p class="text-start col-9 mt-4"><span>Welcome: </span> {{ user.firstName }} {{ user.lastName }}</p>
   
      <div class="col-3 text-center mt-2">
        <img
        src="https://i.postimg.cc/gJ3vvLbC/123.webp"
        alt=""
        style="height: 2rem; width: 2rem"
        />
        <router-link to="/userProfile" class="nav-link the" style="color:  #2b2828; font-size: small;">
          See Profile
        </router-link>
      </div>
  </div>
  </div>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      const userDataJSON = localStorage.getItem("userData");
      return !!userDataJSON;
    },
    user() {
      const userDataJSON = localStorage.getItem("userData");
      if (userDataJSON) {
        const userData = JSON.parse(userDataJSON);
        return userData.result || {};
      }
      return {};
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      localStorage.removeItem("userData");
      this.$router.push("/home");
      window.location.reload();
    },
  },
};
</script>

<style scoped>
.animate {
  --animate-duration: 10s;
}
* {
  font-family: "Keania One", cursive;
}
.the {
  text-shadow: 0.8px 0.8px 0.8px #2b2828;
}
.nav-link {
  color: #e9e9e9;
}
.nav-link:hover {
  color: #2b2828;
  text-shadow: 0.8px 0.8px 0.8px #e9e9e9;
}
.btnStyle {
  border-radius: 0.4rem;
  color: #e9e9e9;
}
</style>
