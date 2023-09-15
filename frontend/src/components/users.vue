<template>
  <div>
    <div v-if="status === 200">
      <h2>Users</h2>
      <div class="row">
        <div class="col-md-4" v-for="user in results" :key="user.userID">
          <div class="card">
            <p style="display: none">{{ user.userID }}</p>
            <h2><span>Name: </span> {{ user.firstName }}</h2>
            <h4><span>Last Name: </span> {{ user.lastName }}</h4>
            <p><span>Email: </span>{{ user.emailAdd }}</p>
            <p><span>Gender: </span>{{ user.gender }}</p>
            <p><span>Date of Birth: </span>{{ user.userDOB }}</p>
            <p>User Image: <img :src="user.profileUrl" alt="User image"  style="height: 2rem; width: 2rem"/></p>
            <p><span>User Role: </span> {{ user.userRole }}</p>
            <button
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              @click="populateForm(user)"
            >
              Edit
            </button>
            <button @click="deleteUser(user.userID)">Delete</button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <!-- Handle different loading and error scenarios -->
      <div v-if="status === 404">User data not found.</div>
      <div v-else-if="status === 500">
        Internal server error. Please try again later.
      </div>
      <div v-else>Loading...</div>
    </div>
  </div>
</template>

<script>
import Spinner from "./Spinner.vue";

export default {
  components: { Spinner },
  data() {
    return {
      status: null, // Variable to store the response status
      results: [], // Variable to store user data
    };
  },
  methods: {
    // populateForm(user) {
    //   // Implement the logic to populate the form with user data for editing
    //   // You can use this user object to set values in your form fields or trigger a modal
    // },
    // deleteUser(userId) {
    //   // Implement the logic to delete a user by userId
    //   // You may dispatch an action to handle this deletion
    // },
    fetchUserData() {
      const baseUrl = "https://timeless-mcgx.onrender.com/users";

      fetch(baseUrl)
        .then((response) => {
          this.status = response.status; // Store the response status
          return response.json();
        })
        .then((data) => {
          this.results = data;
        })
        .catch((error) => {
          console.error("Error fetching users:", error);

          // Handle different error scenarios by setting the status accordingly
          if (error instanceof TypeError) {
            this.status = 404; // Not Found error
          } else {
            this.status = 500; // Internal Server Error
          }
        });
    },
  },
  mounted() {
    this.fetchUserData(); // Call the fetchUserData method when the component is mounted
  },
};
</script>

<style scoped>
/* Add your CSS styles for the user table here */
</style>
