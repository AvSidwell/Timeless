<template>
    <div>
      <div v-if="users" class="">
        <users/>
      </div>
      <div v-else>Processing...</div>
    </div>
  </template>
  <script>
  import Products from "@/components/users.vue";
  export default {
    computed: {
      allUsers() {
        return this.$store.state.users;
      },
      products() {
        return this.allUsers || [];
      },
    },
  
    mounted() {
      this.$store.dispatch("getUsers");
    },
    components: { users },
  };
  </script>
  <style></style>
  