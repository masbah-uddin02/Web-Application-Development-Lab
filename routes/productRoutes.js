const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");

// List all products
router.get("/products", ProductController.list);

// Retrieve a single product by ID
router.get("/products/:productId", ProductController.read);

// Create a new product
router.post("/products", ProductController.create);

// Update an existing product
router.put("/products/:productId", ProductController.update);

// Delete a product
router.delete("/products/:productId", ProductController.delete);

module.exports = router;
