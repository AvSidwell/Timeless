  // const db = require("../config/database.js");

  // // const getCart = (result) => {
  // //     db.query("SELECT * FROM Cart", (err, results) => {
  // //         if (err) {
  // //             console.log(err);
  // //             result(err, null);
  // //         } else {
  // //             result(null, results);
  // //         }
  // //     });
  // // }
  // const getCart = (result) => {
  //   db.query(
  //     // "SELECT Cart.cartID, Cart.userID, Cart.quantity, Products.prodPRICE,  Products.prodNAME, Products.prodDESC, Products.prodCAT, Products.prodTYPE " +
  //     // "FROM Cart " +
  //     // "INNER JOIN Products ON Cart.prodID = Products.prodID",
  //     // "SELECT Cart.cartID, Cart.userID, Cart.quantity, Products.prodPRICE,  Products.prodNAME, Products.prodDESC, Products.prodCAT, Products.prodTYPE " +
  //     // "FROM Cart " +
  //     // "INNER JOIN Products ON Cart.prodID = Products.prodID",
  //     "SELECT c.cartID, c.quantity, p.prodQUANTITY, p.prodIMG, p.prodNAME, p.prodPRICE, s.userID " +
  //       "FROM Cart c " +
  //       "INNER JOIN Products p ON c.prodID = p.prodID " +
  //       "INNER JOIN Users s ON c.userID = s.userID",
  //     (err, results) => {
  //       if (err) {
  //         console.log(err);
  //         result(err, null);
  //       } else {
  //         result(null, results);
  //       }
  //     }
  //   );
  // };
  // (err, results) => {
  //   if (err) {
  //     console.log(err);
  //     result(err, null);
  //   } else {
  //     result(null, results);
  //   }
  // };

  // const getCartById = (id, result) => {
  //   db.query("SELECT * FROM Cart WHERE prodID = ?", [id], (err, results) => {
  //     if (err) {
  //       console.log(err);
  //       result(err, null);
  //     } else {
  //       result(null, results[0]);
  //     }
  //   });
  // };
  // const insertCart = (data, result) => {
  //   db.query("INSERT INTO Cart SET ?", [data], (err, results) => {
  //     if (err) {
  //       console.log(err);
  //       result(err, null);
  //     } else {
  //       result(null, results);
  //     }
  //   });
  // };

  // // const insertCart = (data, result) => {
  // //   db.query("INSERT INTO Cart SET ?", [data], (err, results) => {
  // //     if (err) {
  // //       console.log(err);
  // //       result(err, null);
  // //     } else {
  // //       result(null, results);
  // //     }
  // //   });
  // // };

  // // const updateCartById = (data, id, result) => {
  // //   db.query(
  // //     "UPDATE Cart SET quantity = ? WHERE cartID = ?",
  // //     [data.quantity, id],
  // //     (err, results) => {
  // //       if (err) {
  // //         console.log(err);
  // //         result(err, null);
  // //       } else {
  // //         result(null, results);
  // //       }
  // //     }
  // //   );
  // // };
  // const updateCartById = (data, id, result) => {
  //   db.query(
  //     "UPDATE Cart SET prodQUANTITY = ?, prodIMG = ? WHERE cartID = ?",
  //     [data.prodQUANTITY, data.prodIMG, id],
  //     (err, results) => {
  //       if (err) {
  //         console.log(err);
  //         result(err, null);
  //       } else {
  //         result(null, results);
  //       }
  //     }
  //   );
  // };

  // const deleteCartById = (id, result) => {
  //   db.query("DELETE FROM Cart WHERE cartID = ?", [id], (err, results) => {
  //     if (err) {
  //       console.log(err);
  //       result(err, null);
  //     } else {
  //       result(null, results);
  //     }
  //   });
  // };

  // module.exports = {
  //   getCart,
  //   getCartById,
  //   insertCart,
  //   updateCartById,
  //   deleteCartById,
  // };

  const db = require("../config/database.js");

  const getCart = (userID, result) => {
    db.query(
      "SELECT c.cartID, c.quantity, p.prodQUANTITY, p.prodIMG, p.prodNAME, p.prodPRICE, s.userID " +
        "FROM Cart c " +
        "INNER JOIN Products p ON c.prodID = p.prodID " +
        "INNER JOIN Users s ON c.userID = s.userID " +
        "WHERE c.userID = ?",
      [userID],
      (err, results) => {
        if (err) {
          console.log(err);
          result(err, null);
        } else {
          result(null, results);
        }
      }
    );
  };
  
  const getCartById = (id, result) => {
    db.query("SELECT * FROM Cart WHERE cartID = ?", [id], (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results[0]);
      }
    });
  };
  const insertCart = (data, result) => {
    console.log("Data to insert:", data); // Log the data
    db.query("INSERT INTO Cart SET ?", [data], (err, results) => {
      if (err) {
        console.error("Error inserting data:", err);
        result(err, null);
      } else {
        console.log("Data inserted successfully.");
        result(null, results);
      }
    });
  };
  
  // const insertCart = (data, result) => {
  //   db.query("INSERT INTO Cart SET ?", [data], (err, results) => {
  //     if (err) {
  //       console.log(err);
  //       result(err, null);
  //       console.log("Data inserted successfully.");
  //     } else {
  //       console.error("Error inserting data:", err);
  //       result(null, results);
  //     }
  //   });
  // };
  
  const updateCartById = (data, id, result) => {
    db.query(
      "UPDATE Cart SET prodQUANTITY = ?, prodIMG = ? WHERE cartID = ?",
      [data.prodQUANTITY, data.prodIMG, id],
      (err, results) => {
        if (err) {
          console.log(err);
          result(err, null);
        } else {
          result(null, results);
        }
      }
    );
  };
  
  const deleteCartById = (id, result) => {
    db.query("DELETE FROM Cart WHERE cartID = ?", [id], (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results);
      }
    });
  };
  
  module.exports = {
    getCart,
    getCartById,
    insertCart,
    updateCartById,
    deleteCartById,
  };
  