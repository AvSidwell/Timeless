const db = require("../config/database.js")

const getCart = (result) => {
    db.query("SELECT * FROM Cart", (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}
  
const getCartById = (id, result) => {
    db.query("SELECT * FROM Cart WHERE prodID = ?", [id], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results[0]);
        }
    });   
}
  
const insertCart = (data, result) => {
    db.query("INSERT INTO Cart SET ?", [data], (err, results) => {              
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}
  
const updateCartById = (data, id, result) => {
    db.query("UPDATE Cart SET prodNAME = ?, prodPRICE = ?, prodDESC = ?, prodCAT = ?, prodTYPE = ?, prodSEASON = ?, prodIMG = ? WHERE prodID = ?",
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
  
const deleteCartById = (id, result) => {
    db.query("DELETE FROM Cart WHERE prodID = ?", [id], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}

module.exports = {
    getCart,
    getCartById,
    insertCart,
    updateCartById,
    deleteCartById
}
