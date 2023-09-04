
const db = require("../config/database.js")
// import connection
// import db from "../config/database.js";
  
// // Get All Products
// const getProducts = (result) => {
//     db.query("SELECT * FROM Products", (err, results) => {             
//         if(err) {
//             console.log(err);
//             result(err, null);
//         } else {
//             result(null, results);
//         }
//     });   
// }
  
// // Get Single Product
// const getProductById = (id, result) => {
//     db.query("SELECT * FROM Products WHERE productID = ?", [id], (err, results) => {             
//         if(err) {
//             console.log(err);
//             result(err, null);
//         } else {
//             result(null, results[0]);
//         }
//     });   
// }
  
// // Insert Product to Database
// const insertProduct = (data, result) => {
//     // db.query("INSERT INTO Products SET ?", [data], (err, results) => {   
//          db.query("UPDATE Products SET productName = ?, productPrice = ?, productStock = ?, productUrl = ?, category = ? WHERE productID = ?",
//         [productName, productPrice, productStock, productUrl, category, id],
//         (err, results) => {           
//         if(err) {
//             console.log(err);
//             result(err, null);
//         } else {
//             result(null, results);
//         }
//     });   
// }
  
// // Update Product to Database
// const updateProductById = (data, id, result) => {
//     //db.query("UPDATE Products SET product_name = ?, product_price = ? WHERE product_id = ?", [data.product_name, data.product_price, id], (err, results) => {
//         db.query("UPDATE Products SET productName = ?, productPrice = ?, productStock = ?, productUrl = ?, category = ? WHERE productID = ?",
//         [productName, productPrice, productStock, productUrl, category, id],
//         (err, results) => {                
//         if(err) {
//             console.log(err);
//             result(err, null);
//         } else {
//             result(null, results);
//         }
//     });   
// }
  
// // Delete Product to Database
// const deleteProductById = (id, result) => {
//     db.query("DELETE FROM Products WHERE productID = ?", [id], (err, results) => {             
//         if(err) {
//             console.log(err);
//             result(err, null);
//         } else {
//             result(null, results);
//         }
//     });   
// }

// module.exports = {
//     getProducts,
//     getProductById,
//     insertProduct,
//     updateProductById,
//     deleteProductById
// }

const getProducts = (result) => {
    db.query("SELECT * FROM Products", (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}
  
const getProductById = (id, result) => {
    db.query("SELECT * FROM Products WHERE prodID = ?", [id], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results[0]);
        }
    });   
}
  
const insertProduct = (data, result) => {
    db.query("INSERT INTO Products SET ?", [data], (err, results) => {              
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}
  
const updateProductById = (data, id, result) => {
    db.query("UPDATE Products SET prodNAME = ?, prodPRICE = ?, prodDESC = ?, prodCAT = ?, prodTYPE = ?, prodSEASON = ?, prodIMG = ?, prodQUANTITY = ? WHERE prodID = ?",
        [data.prodNAME, data.prodPRICE, data.prodDESC, data.prodCAT, data.prodTYPE, data.prodSEASON, data.prodIMG, id],
        (err, results) => {                
            if(err) {
                console.log(err);
                result(err, null);
            } else {
                result(null, results);
            }
        });   
}
  
const deleteProductById = (id, result) => {
    db.query("DELETE FROM Products WHERE prodID = ?", [id], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}

module.exports = {
    getProducts,
    getProductById,
    insertProduct,
    updateProductById,
    deleteProductById
}
