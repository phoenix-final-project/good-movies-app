const express = require('express');
const router = express.Router();
const passport = require("passport");

const { validateUser, sanitizeUser } = require('../middleware/userValidation');
const { registerUser, loginUser, updateUser, deleteUser, getUserByUsername, addFriend, findUserByAnyName, getFriendsOfUser, deleteFriend } = require('../controllers/userControllers');


// REGISTER A NEW USER
router.post('/register', validateUser, sanitizeUser, registerUser);

// LOGIN A USER
router.post('/login', loginUser);

// UPDATE A USER- protected route - a user needs to be logged in to perform an action
router.put('/update/:username', passport.authenticate("jwt", { session: false }), validateUser, sanitizeUser, updateUser);
// router.put('/update/:username', validateUser, sanitizeUser, updateUser);

// DELETE A USER- PUT method - protected route - a user needs to be logged in to perform an action
router.put('/delete', passport.authenticate("jwt", { session: false }), deleteUser);

// FIND **ONE** USER BY USERNAME - an object
router.get('/username/:username', getUserByUsername)
// check: http://localhost:5000/api/user/username/santa

// FIND USERS BY **ANY** NAME (username, firstname, lastname) - an array of objects
router.get('/find/:name', findUserByAnyName)
// check: http://localhost:5000/api/user/find/santa


// ********************************************************
// USER + FRIENDS
// GET ALL FRIENDS OF A USER (username of a user is used to make a request)
router.get('/friends/:username', getFriendsOfUser)
// check: http://localhost:5000/api/user/friends/santa

// ADD A NEW FRIEND TO A USER - protected route - a user needs to be logged in to perform an action
router.put('/friends/add', passport.authenticate("jwt", { session: false }), addFriend)

// DELETE A FRIEND FROM A USER  - PUT method to edit the user - protected route - a user needs to be logged in to perform an action
router.delete('/friends/delete', passport.authenticate("jwt", { session: false }), deleteFriend);



module.exports = router;
