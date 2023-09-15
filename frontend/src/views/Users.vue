<template>
  <div>
    <div v-if="users">
      <h2>Users</h2>
      <div class="row">
        <div class="col-12 col-md-4 edituser cont">
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
        <div class="col-12 col-md-8">
          <div class="row">
            <div
              class="col-12 col-md-6 px-5 p-3 cont"
              v-for="user in users"
              :key="user.userID"
            >
              <div class="card">
                <h2><span>Name: </span> {{ user.firstName }}</h2>
                <h4><span>Lastame: </span> {{ user.lastName }}</h4>
                <p><span>Email: </span>{{ user.emailAdd }}</p>
                <p><span>Gender: </span>{{ user.gender }}</p>
                <p><span>Pass:</span>{{ user.userPass }}</p>
                <p><span>Date of Birth: </span>{{ user.userDOB }}</p>
                <p>
                  <span>User Image: </span
                  ><img
                    :src="user.profileUrl"
                    alt="User image"
                    style="height: 2rem; width: 2rem"
                  />
                </p>
                <p><span>User Role: </span> {{ user.userRole }}</p>
                <button
                  type="button"
                  class="button"
                  @click="populateForm(user)"
                >
                  Edit
                </button>
                <button class="button" @click="deleteUser(user.userID)">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import axios from "axios";

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
};
</script>

<style scoped>
* {
  font-family: "Keania One", cursive;
  /* color:  #e9e9e9; */
  color: #9ba38b;
  /* background-color: #2b2828; */
}

span {
  color: #e9e9e9;
}
.cont {
  background-color: #9ba38b;
}

.card {
  background-color: #2b2828;
  border-radius: 0.8rem;
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
  color: #2b2828;
  margin-bottom: 8px;
}

input,
textarea {
  color: #2b2828;
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #e9e9e9;
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
  border-color: #e9e9e9;
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

button[type="submit"]:hover {
  background-color: #e9e9e9;
  color: #2b2828;
}
.button:hover {
  background-color: #e9e9e9;
  color: #2b2828;
}
</style>
