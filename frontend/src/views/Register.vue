<template>
  <div class="contain mb-5">
    <h2>Register</h2>
    <form @submit.prevent="registerUser">
      <div class="form-group">
        <label for="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          v-model="form.firstName"
          required
          class="input"
        />
      </div>
      <div class="form-group">
        <label for="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          v-model="form.lastName"
          required
          class="input"
        />
      </div>
      <div class="form-group">
        <label for="gender">Gender:</label>
        <input type="text" id="gender" v-model="form.gender" class="input" />
      </div>
      <div class="form-group">
        <label for="userDOB">Date of Birth:</label>
        <input type="date" id="userDOB" v-model="form.userDOB" class="input" />
      </div>
      <!-- <div class="form-group">
        <label for="userRole">User Role:</label>
        <input
          type="text"
          id="userRole"
          v-model="form.userRole"
          class="input"
        />
      </div> -->
      <div class="form-group">
        <label for="emailAdd">Email:</label>
        <input
          type="email"
          id="emailAdd"
          v-model="form.emailAdd"
          required
          class="input"
        />
      </div>
      <div class="form-group">
        <label for="userPass">Password:</label>
        <input
          type="password"
          id="userPass"
          v-model="form.userPass"
          required
          class="input"
        />
      </div>
      <div class="form-group">
        <label for="profileUrl">Profile URL:</label>
        <input
          type="text"
          id="profileUrl"
          v-model="form.profileUrl"
          class="input"
        />
      </div>
      <button type="submit">Register</button>
    </form>
    <p v-if="registrationError" class="error">{{ registrationError }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
        gender: "",
        userDOB: "",
        userRole: "user",
        emailAdd: "",
        userPass: "",
        profileUrl: "https://i.postimg.cc/gJ3vvLbC/123.webp",
      },
      registrationError: null,
    };
  },
  methods: {
    async registerUser() {
      this.registrationError = null;

      try {
        const response = await this.$store.dispatch("registerUser", this.form);
        this.$router.push("/login");
      } catch (error) {
        this.registrationError =
          "Registration failed. Please check your inputs and try again.";
      }
    },
  },
};
</script>

<style scoped>
* {
  font-family: "Keania One", cursive;
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
