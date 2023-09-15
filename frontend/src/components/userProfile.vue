<template>
  <div>
    <div v-if="isLoggedIn" class="cont">
      <p style="display: none">{{ user.userID }}</p>
      <h2><span>Name: </span> {{ user.firstName }}</h2>
      <h4><span>Lastame: </span> {{ user.lastName }}</h4>
      <p><span>Email: </span>{{ user.emailAdd }}</p>
      <p><span>Gender: </span>{{ user.gender }}</p>
      <p><span>Date of Birth: </span>{{ user.userDOB }}</p>
      <p>
        User Image:
        <img
          :src="user.profileUrl"
          alt="User image"
          style="height: 2rem; width: 2rem"
        />
      </p>

      <p><span>User Role: </span> {{ user.userRole }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: null,
      editUser: {
        userID: null,
        firstName: "",
        lastName: "",
        emailAdd: "",
        gender: "",
        userPass: "",
        userDOB: "",
        profileUrl: "https://i.postimg.cc/gJ3vvLbC/123.webp",
        userRole: "",
      },
    };
  },
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
    populateForm(user) {
      this.editUser.userID = user.userID;
      this.editUser.firstName = user.firstName;
      this.editUser.lastName = user.lastName;
      this.editUser.emailAdd = user.emailAdd;
      this.editUser.gender = user.gender;
      this.editUser.userPass = user.userPass;
      this.editUser.userDOB = user.userDOB;
      this.editUser.profileUrl = user.profileUrl;
      this.editUser.userRole = user.userRole;
    },
    updateUser() {
      axios
        .patch(`${baseUrl}user/${this.editUser.userID}`, this.editUser)
        .then((response) => {})
        .catch((error) => {
          // Handle update error
        });
    },
    deleteUser(userID) {
      Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover this user!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`${baseUrl}user/${userID}`)
            .then((response) => {
              if (response.status === 204) {
                Swal.fire("Deleted!", "The user has been deleted.", "success");
                // Successfully deleted, you may want to update the user list
                this.fetchUsers();
              } else {
                Swal.fire(
                  "Error!",
                  "An error occurred while deleting the user.",
                  "error"
                );
              }
            })
            .catch((error) => {
              // Handle delete error
              Swal.fire(
                "Error!",
                "An error occurred while deleting the user.",
                "error"
              );
              console.error("Error deleting user:", error);
            });
        }
      });
    },
  },
  created() {
  const baseUrl = "https://timeless-mcgx.onrender.com/";

  axios
    .get(`${baseUrl}users`)
    .then((response) => {
      this.users = response.data.results;
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
    });
},
};
</script>
<style scoped>
* {
  font-family: "Keania One", cursive;
  color: #e9e9e9;
}
.cont {
  background-color: #2b2828;
}

span {
  font-size: small;
}
img {
  border-radius: 5rem;
}
</style>
