<template>
  <div>
    <div class="row">
      <div class="col-12 col-md-6 edituser cont pt-5">
        <form @submit.prevent="updateUser">
          <h3>Edit User</h3>
          <div class="mb-3">
            <label for="editFirstName" class="form-label">First Name</label>
            <input
              type="text"
              class="form-control"
              id="editFirstName"
              v-model="editUser.firstName"
            />
          </div>
          <div class="mb-3">
            <label for="editLastName" class="form-label">Last Name</label>
            <input
              type="text"
              class="form-control"
              id="editLastName"
              v-model="editUser.lastName"
            />
          </div>
          <div class="mb-3">
            <label for="editEmail" class="form-label">Email</label>
            <input
              type="email"
              class="form-control"
              id="editEmail"
              v-model="editUser.emailAdd"
            />
          </div>
          <div class="mb-3">
            <label for="edituserPass" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              id="edituserPass"
              v-model="editUser.userPass"
            />
          </div>
          <div class="mb-3">
            <label for="editprofileUrl" class="form-label">Url Img</label>
            <input
              type="text"
              class="form-control"
              id="editprofileUrl"
              v-model="editUser.profileUrl"
            />
          </div>
          <div class="mb-3">
            <label for="edituserDOB" class="form-label">Date Of Birth</label>
            <input
              type="date"
              class="form-control"
              id="edituserDOB"
              v-model="editUser.userDOB"
            />
          </div>
          <div class="mb-3">
            <label for="editgender" class="form-label">Gender</label>
            <input
              type="text"
              class="form-control"
              id="editgender"
              v-model="editUser.gender"
            />
          </div>
          <div class="mb-3">
            <label for="edituserRole" class="form-label">User Role</label>
            <input
              type="text"
              class="form-control"
              id="edituserRole"
              v-model="editUser.userRole"
            />
          </div>
          <button type="submit" class="btn btn-primary">Update</button>
        </form>
      </div>
      <div v-if="isLoggedIn" class="cont col-12 col-md-6 pt-5">
        <p style="display: none">{{ user.userID }}</p>
        <h2><span>Name: </span> {{ user.firstName }}</h2>
        <h4><span>Last Name: </span> {{ user.lastName }}</h4>
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
        <button type="button" class="button" @click="populateForm(user)">
          Edit
        </button>
        <button class="button" @click="deleteUser(user.userID)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";

const baseUrl = "https://timeless-mcgx.onrender.com/";

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
                this.fetchUsers(); // Call the fetchUsers method
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
    fetchUsers() {
      axios
        .get(`${baseUrl}users`)
        .then((response) => {
          this.users = response.data.results;
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    },
  },
  created() {
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
.button {
  background-color: #2b2828;
  color: #e9e9e9;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin: auto;
  margin-bottom: 1rem;
  width: 80%;
  border-bottom: 4px #e9e9e9;
}
.button:hover {
  background-color: #e9e9e9;
  color: #2b2828;
}
input,
textarea {
  margin: auto;
  color: #2b2828;
  width: 70%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #e9e9e9;
  border-radius: 4px;
  font-size: 16px;
}
</style>
