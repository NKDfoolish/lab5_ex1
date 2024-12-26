// Import the express module
const express = require('express');
// Import the User model from the models directory
const { User } = require('../models');

// Create a new router instance
const router = express.Router();

// CRUD Operations

// Define a route to get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll(); // Fetch all users from the database
        res.json({ action: "view", status: "success", User: users }); // Send the users as a JSON response
    } catch (error) {
        res.json({ action: "view", status: "failure", User: {} });
    }
});

// Define a route to create a new user
router.post('/', async (req, res) => {
    try {
        const user = await User.create(req.body); // Create a new user with the request body data
        res.json({ action: "create", status: "success", User: user }); // Send the created user as a JSON response
    } catch (error) {
        res.json({ action: "create", status: "failure", User: {} });
    }
});

// Define a route to update an existing user by ID
router.put('/:id', async (req, res) => {
    try {
        const user = await User.update(req.body, { where: { userId: req.params.id } }); // Update the user with the given ID
        res.json({ action: "update", status: "success", User: user }); // Send the updated user as a JSON response
    } catch (error) {
        res.json({ action: "update", status: "failure", User: {} });
    }
});

// Define a route to delete a user by ID
router.delete('/:id', async (req, res) => {
    try {
        await User.destroy({ where: { userId: req.params.id } }); // Delete the user with the given ID
        res.json({ action: "delete", status: "success", User: {} }); // Send a success response
    } catch (error) {
        res.json({ action: "delete", status: "failure", User: {} });
    }
});

// Export the router to be used in other parts of the application
module.exports = router;
