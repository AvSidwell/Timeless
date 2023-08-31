const express = require("express");
const bodyParser = require('body-parser')
const {verifyAToken} = require('../middleware/AuthenticateUser')
const router = express.Router()
const productController = require("../controllers/Product");
const Users = require('../models/user');
const users = new Users();
//Import all model's objects

//User's router
router.get('/users', (req, res)=>{
    users.fetchUsers(req, res)
})
router.get('/user/:id', (req, res)=>{
    users.fetchUser(req, res)
})
router.post('/register',bodyParser.json(),
(req, res)=>{
    users.register(req, res)
})
router.put('/user/:id', bodyParser.json(),
 (req, res)=>{
    users.updateUser(req,res)
})
router.patch('/user/:id', bodyParser.json(),
 (req, res)=>{
    users.updateUser(req,res)
})
router.delete('/user/:id', (req, res)=>{
    users.deleteUser(req, res)
})
router.post('/login',
bodyParser.json(), (req, res)=>{
    users.login(req, res)
})
// init express router
// const router = express.Router();
const {
  showProducts,
  showProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = productController;
// Get All Product
router.get("/products", showProducts);

// Get Single Product
router.get("/products/:id", showProductById);

// Create New Product
router.post("/products", createProduct);

// Update Product
router.put("/products/:id", updateProduct);

// Delete Product
router.delete("/products/:id", deleteProduct);

// export default router
module.exports = {router, verifyAToken};
