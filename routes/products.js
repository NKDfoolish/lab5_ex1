// Import the express module
const express = require('express');
// Import the Product model from the models directory
const { Product } = require('../models');

// Create a new router instance
const router = express.Router();

// Define a route to get all products
router.get('/', async (req, res) => {
    const products = await Product.findAll(); // Fetch all products from the database
    res.json(products); // Send the products as a JSON response
});

// Define a route to create a new product
router.post('/', async (req, res) => {
    const product = await Product.create(req.body); // Create a new product with the request body data
    res.json(product); // Send the created product as a JSON response
});

// Define a route to update an existing product by ID
router.put('/:id', async (req, res) => {
    const product = await Product.update(req.body, { where: { productId: req.params.id } }); // Update the product with the given ID
    res.json(product); // Send the updated product as a JSON response
});

// Define a route to delete a product by ID
router.delete('/:id', async (req, res) => {
    await Product.destroy({ where: { productId: req.params.id } }); // Delete the product with the given ID
    res.sendStatus(200); // Send a 200 OK status
});

// Export the router to be used in other parts of the application
module.exports = router;
