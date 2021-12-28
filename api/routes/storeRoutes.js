const express = require("express") // Importin Express
const router = express.Router() // Setting up Router method from express

// Importing Products controller
const products = require("../controllers/storeControllers")


//  Defining routes
router.get("/readAll", products.allProducts) // route for reading all Products

router.get("/read/:id", products.showProduct) // route for reading a Product

router.post("/create", products.createProduct) // route for creating a Product

router.put("/update/:id", products.updateProduct) // route for updating a Product

router.delete("/delete/:id", products.deleteProduct) // route for deleting a Products


// Exporting all Routes
module.exports = router