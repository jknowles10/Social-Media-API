const router = require('express').Router();
const {
    getAllThoughts,
    getOneThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction, 
    deleteReaction, 
} = require('../../controllers/thoughtCont');

// /api/thoughts
router.route('/').get(getAllThoughts).post(createThought);

// /api/thoughts/:id

router.route('/:thoughtId').get(getOneThought).put(updateThought).delete(deleteThought);

// /api/thoughts/:id/reactions

router.route('/:thoughtId/reactions').post(addReaction);

// /api/thoughts/:id/thoughtId/reactions/:reactionId

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);   


module.exports = router;
