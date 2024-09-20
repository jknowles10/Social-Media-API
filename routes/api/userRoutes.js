const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUserById,
    addFriend,
    deleteFriendById,
} = require('../../controllers/userCont');

// /api/users
router.route('/').get(getAllUsers).post(createUser);

// /api/users/:id

router.route('/:id').get(getUserById).put(updateUser).delete(deleteUserById);

// /api/users/:id/friends/:friendId

router.route('/:userId/friends/:friendId').post(addFriend);

router.route('/:userId/friends/:friendId').delete(deleteFriend);


module.exports = router;