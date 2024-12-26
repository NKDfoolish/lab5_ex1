// Import the express module
const express = require('express');
// Import the ShoppingCart model from the models directory
const { ShoppingCart } = require('../models');

// Create a new router instance
const router = express.Router();

// Define a route to get all shopping carts
router.get('/', async (req, res) => {
    try {
        const carts = await ShoppingCart.findAll(); // Fetch all shopping carts from the database
        res.json({ action: "view", status: "success", ShoppingCart: carts }); // Send the shopping carts as a JSON response
    } catch (error) {
        res.json({ action: "view", status: "failure", ShoppingCart: {} });
    }
});

// Define a route to create a new shopping cart
router.post('/', async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body; // Extract userId, productId, and quantity from the request body
        const cart = await ShoppingCart.create({ userId, productId, quantity }); // Create a new shopping cart with the provided data
        res.json({ action: "create", status: "success", ShoppingCart: cart }); // Send the created shopping cart as a JSON response
    } catch (error) {
        res.json({ action: "create", status: "failure", ShoppingCart: {} });
    }
});

// Define a route to update an existing shopping cart by ID
router.put('/:id', async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body; // Extract userId, productId, and quantity from the request body
        const cart = await ShoppingCart.update(
            { userId, productId, quantity }, // Update the shopping cart with the provided data
            { where: { cartId: req.params.id } } // Specify the shopping cart to update by ID
        );
        res.json({ action: "update", status: "success", ShoppingCart: cart }); // Send the updated shopping cart as a JSON response
    } catch (error) {
        res.json({ action: "update", status: "failure", ShoppingCart: {} });
    }
});

// Define a route to delete a shopping cart by ID
router.delete('/:id', async (req, res) => {
    try {
        await ShoppingCart.destroy({ where: { cartId: req.params.id } }); // Delete the shopping cart with the given ID
        res.json({ action: "delete", status: "success", ShoppingCart: {} }); // Send a success response
    } catch (error) {
        res.json({ action: "delete", status: "failure", ShoppingCart: {} });
    }
});

// Export the router to be used in other parts of the application
module.exports = router;