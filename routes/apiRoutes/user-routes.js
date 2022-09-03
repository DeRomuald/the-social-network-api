  
const userRouter = require('express').Router();

const {
    allUsers,
    userById,
    newUser,
    editUser,
    deleteUser,
    newFriend,
    deleteFriend
} = require('../../controllers/user-controller');

userRouter
    .route('/')
    .get()
    .post();

userRouter
    .route('/:id')
    .get(userById)
    .put(editUser)
    .delete(deleteUser)

userRouter
    .route('/:id/friends/:friendId')
    .post(newFriend)
    .delete(deleteFriend);

userRouter
    .route('/')
    .get(allUsers)
    .post(newUser);

module.exports = userRouter;