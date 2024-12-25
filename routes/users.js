// Import the express module
const express = require('express');
// Import the User model from the models directory
const { User } = require('../models');

// Create a new router instance
const router = express.Router();

// CRUD Operations

// Define a route to get all users
router.get('/', async (req, res) => {
    const users = await User.findAll(); // Fetch all users from the database
    res.json(users); // Send the users as a JSON response
});

// Define a route to create a new user
router.post('/', async (req, res) => {
    const user = await User.create(req.body); // Create a new user with the request body data
    res.json(user); // Send the created user as a JSON response
});

// Define a route to update an existing user by ID
router.put('/:id', async (req, res) => {
    const user = await User.update(req.body, { where: { userId: req.params.id } }); // Update the user with the given ID
    res.json(user); // Send the updated user as a JSON response
});

// Define a route to delete a user by ID
router.delete('/:id', async (req, res) => {
    await User.destroy({ where: { userId: req.params.id } }); // Delete the user with the given ID
    res.sendStatus(200); // Send a 200 OK status
});

// Export the router to be used in other parts of the application
module.exports = router;
