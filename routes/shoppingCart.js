// Import the express module
const express = require('express');
// Import the ShoppingCart model from the models directory
const { ShoppingCart } = require('../models');

// Create a new router instance
const router = express.Router();

// Define a route to get all shopping carts
router.get('/', async (req, res) => {
    const carts = await ShoppingCart.findAll(); // Fetch all shopping carts from the database
    res.json(carts); // Send the shopping carts as a JSON response
});

// Define a route to create a new shopping cart
router.post('/', async (req, res) => {
    const { userId, productId, quantity } = req.body; // Extract userId, productId, and quantity from the request body
    const cart = await ShoppingCart.create({ userId, productId, quantity }); // Create a new shopping cart with the provided data
    res.json(cart); // Send the created shopping cart as a JSON response
});

// Define a route to update an existing shopping cart by ID
router.put('/:id', async (req, res) => {
    const { userId, productId, quantity } = req.body; // Extract userId, productId, and quantity from the request body
    const cart = await ShoppingCart.update(
        { userId, productId, quantity }, // Update the shopping cart with the provided data
        { where: { cartId: req.params.id } } // Specify the shopping cart to update by ID
    );
    res.json(cart); // Send the updated shopping cart as a JSON response
});

// Define a route to delete a shopping cart by ID
router.delete('/:id', async (req, res) => {
    await ShoppingCart.destroy({ where: { cartId: req.params.id } }); // Delete the shopping cart with the given ID
    res.sendStatus(200); // Send a 200 OK status
});

// Export the router to be used in other parts of the application
module.exports = router;