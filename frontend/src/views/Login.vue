<template>
  <div class="contain">
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
  </div>
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
          // this.$cookies.set("userToken", token);
          const userData = response.data;
          localStorage.setItem("userData", JSON.stringify(userData));
          this.$router.push("/");
        } else {
          // this.$router.push("/");
          console.log(response);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.loginError = "Log Err";
        } else {
          console.log(error);
        }
        this.$router.push("/");
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
form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #9ba38b;
  border-radius: 5px;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
  box-shadow: 2px 2px 2px #2b2828;
}
form:hover {
  background-color: #2b2828;
}
form:hover label {
  color: #e9e9e9;
}
label {
  display: block;
  color:  #2b2828;
  margin-bottom: 8px;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid   #e9e9e9;
  border-radius: 4px;
  font-size: 16px;
}

button[type="submit"] {
  background-color: #2b2828;
  color: #e9e9e9;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color:  #e9e9e9;
  color: #2b2828;
}
</style>
