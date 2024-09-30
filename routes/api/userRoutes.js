const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById,
    addFriend,
    deleteFriend,
} = require('../../controllers/userCont');

// /api/users
router.route('/').get(getAllUsers).post(createUser);

// /api/users/:id
router.route('/:userId').get(getUserById).put(updateUserById).delete(deleteUserById);

// /api/users/:id/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend);

router.route('/:userId/friends/:friendId').delete(deleteFriend);


module.exports = router;