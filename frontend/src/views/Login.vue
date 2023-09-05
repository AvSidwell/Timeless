<template>
  <form @submit.prevent="login">
    <input type="text" v-model="form.emailAdd" placeholder="Email">
    <input type="password" v-model="form.userPass" placeholder="Password">
    <button type="submit">Login</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        emailAdd: "",
        userPass: "",
      },
    };
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch("loginUser", {
          emailAdd: this.form.emailAdd,
          userPass: this.form.userPass,
        });
      } catch (error) {
        this.$store.dispatch('showErrorMessage', 'Login failed');
      }
    },
  },
};
</script>


<!-- //   CREATE TABLE Users (
// userID INT PRIMARY KEY AUTO_INCREMENT,
// firstName VARCHAR(20),
// lastName VARCHAR(20),
// gender VARCHAR(11),
// userDOB DATETIME DEFAULT NOW(),
// userRole VARCHAR(15),
// emailAdd VARCHAR(200) UNIQUE,
// userPass TEXT,
// profileUrl TEXT
// );
// -->