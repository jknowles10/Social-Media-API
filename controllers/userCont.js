const { User, Thought } = require('../models');

module.exports = {
// Get all users
async getAllUsers(req, res) {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json(err);
    }
},


// Get user by ID
async getUserById(req, res) {
    try {
        const user = await User.findOne({ _id: req.params.userId })
        .populate('friends')
        .populate('thoughts')
        .select('-__v');

        if (!user) { return res.status(404).json({ message: 'User not found' }); }

        res.json(user);
        
    } catch (error) {
        res.status(500).json(err);
    }
},

// Create user 
async createUser(req, res) {
    try {
        const newUser = new User(req.body);
        const result = await newUser.save();
        res.status(201).json(result);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ messages });
        }
        res.status(500).json({ message: error.message });
    }
},


// Update user by ID *** FIXME ***

async updateUserById(req, res) {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: req.params.userId }, 
            { $set: req.body }, 
            { new: true, runValidators: true }
        ).populate('friends')
        .populate('thoughts')
        .select('-__v');

        if (!updatedUser) { return res.status(404).json({ message: 'User not found' }); }

        res.json(updatedUser);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ messages });
        }
        res.status(500).json({ message: error.message });
    }
},

// Delete user and associated properties

async deleteUserById(req, res) {
    try {
        const deletedUser = await User.findOneAndDelete({ _id: req.params.userId})
        .populate('friends')
        .populate('thoughts')
        .select('-__v');

        if (!deletedUser) return res.status(404).json({ message: 'User not found' });
        res.json(deletedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
},

// Add friend

async addFriend(req, res) {
    try {
        const user = await User.findOneAndUpdate(
           { _id: req.params.userId},
        {$addToSet: { friends: req.params.friendId }},
    { runValidators: true, new: true}
).populate('friends')
.populate('thoughts')
.select('-__v');

        if (!user) return res.status(404).json({ message: 'User not found' });

        const friend = await User.findById(req.params.friendId);

        if (!friend) return res.status(404).json({ message: 'Friend not found' });

        if (user.friends.includes(friend._id)) return res.status(400).json({ message: 'User is already a friend' });

       // user.friends.push(friend._id);
       // await user.save();

        res.json(`${friend.username} has been added to ${user.username}'s friends list`);
    } catch (error) {
        res.status(500).json(err);
    }
},

// Delete friend

async deleteFriend(req, res) {
    try {
        const user = await User.findOneAndUpdate({ _id: req.params.userId}, 
            {$pull: { friends: req.params.friendId }},
            { runValidators: true, new: true}
        ).populate('friends')
        .populate('thoughts')
        .select('-__v');

        if (!user) { return res.status(404).json({ message: 'User not found' });
    }
        const friend = await User.findById(req.params.friendId);

        if (!friend) { return res.status(404).json({ message: 'Friend not found' });
}
        //const index = user.friends.indexOf(friend._id);

        //if (index === -1) return res.status(400).json({ message: 'User is not a friend' });

        //user.friends.splice(index, 1);
        //await user.save();
        res.json(`${friend.username} has been removed from ${user.username}'s friends list`);
} catch (err) {
    res.status(500).json(err);

      //  res.json(user);
    //} catch (error) {
      //  res.status(500).json({ message: error.message });
    }
},

};