const { Thought, User } = require('../models');

module.exports = {
// Get all thoughts
async getAllThoughts(req, res) {
    try {
        const thoughts = await Thought.find({});
        res.json(thoughts);
    } catch (err) {
        res.status(500).json(err);
    }
},

// Get one thought
async getOneThought(req, res) {
    try {
        const thought = await Thought.findById({ _id: req.params.thoughtId });
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
},

// Create thought
async createThought(req, res) {
    const newThought = await Thought.create(req.body); //({ thoughtText: req.body.thoughtText, userId: req.body.userId });
    const user = await User.findById(
        { id: req.body.userId},
        { $addToSet: { thoughts: newThought._id}},
        { new: true}
    );
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    
},
// Update thought

async updateThought(req, res) {
    try {
        const thought = await Thought.findByIdAndUpdate(
            { _id: req.params.thoughtId},
            { $set: req.body },
            { new: true, runValidators: true });
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
},

// Delete thought

async deleteThought(req, res) {
    try {
        const thought = await Thought.findByIdAndDelete(
            { _id: req.params.thoughtId }
    );
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
    const user = await User.findById(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId }},
        { new: true});

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'Thought deleted' });

   /* user.thoughts.pull(req.params.id);
    await user.save();
    await Thought.findByIdAndUpdate(req.params.id, { $pull: { reactions: req.params.reactionId } }, { new: true }); */
    }, catch (err) {
        res.status(500).json(err);

    },
    // Add reaction to thought
    async addReaction(req, res) {
    try {
        const thought = await Thought.findById(
            { id: req.params.thoughtId },
            { $addToSet: { reactions: req.body }},
            { runValidators: true, new: true});
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
       /* const newReaction = new Reaction({ reactionBody: req.body.reactionBody, username: req.body.username });
        thought.reactions.push(newReaction);
        await thought.save();
        res.json(newReaction); */
    } catch (err) {
        res.status(500).json(err);
    }
    },
    // Delete reaction from thought
    async deleteReaction(req, res) {
    try {
        const thought = await Thought.findById(
            {id: req.params.thoughtId }, 
            { $pull: { reactions: { reactionID: req.params.reactionId }}},
            { runValidators: true, new: true});

        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        /* const reactionToRemove = thought.reactions.id(req.params.reactionId);
        if (!reactionToRemove) {
            return res.status(404).json({ message: 'Reaction not found' });
        }
        thought.reactions.pull(reactionToRemove);
        await thought.save();
        res.json(reactionToRemove); */
    } catch (err) {
        res.status(500).json(err);
    }
    },
    
};