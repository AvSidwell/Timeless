<template>
  <form @submit.prevent="login">
    <input
      type="text"
      v-model="form.emailAdd"
      placeholder="Email"
      autocomplete="username"
    />
    <input
      type="password"
      v-model="form.userPass"
      placeholder="Password"
      autocomplete="current-password"
    />
    <button type="submit">Login</button>
    <p v-if="loginError" class="error-message">{{ loginError }}</p>
  </form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      form: {
        emailAdd: "",
        userPass: "",
      },
      loginError: null,
    };
  },
  methods: {
    ...mapActions(["loginUser"]),

    async login() {
      try {
        const response = await this.loginUser({
          emailAdd: this.form.emailAdd,
          userPass: this.form.userPass,
        });

        if (
          response &&
          response.token &&
          response.status === 200 &&
          response.data
        ) {
          const token = response.token;
          this.$cookies.set("userToken", token);
          const userData = response.data;
          localStorage.setItem("userData", JSON.stringify(userData));
        } else {
          this.$router.push("/");
          console.log(response);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.loginError = "Successfully Logged In";
        } else {
          console.log(error);
        }
      }
    },
  },
};
</script>

<style scoped>
.error-message {
  color: red;
  margin-top: 10px;
}
</style>

<style scoped>
.error-message {
  color: red;
  margin-top: 10px;
}
</style>
