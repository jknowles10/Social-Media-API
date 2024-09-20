const { User, Thought } = require('../models');

module.exports = {
// Get all users
async getAllUsers(req, res) {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
},


// Get user by ID
async getUserById(req, res) {
    try {
        const user = await User.findById(req.params.id)
        .populate('friends')
        .populate('thoughts')
        .select('-__v');

        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
        
    } catch (error) {
        res.status(500).json(err);
    }
},

// Create user

// Update user by ID

// Delete user and associated properties

// Add friend

// Delete friend

}