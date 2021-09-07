const express = require('express');
const router = express.Router();
const passport = require("passport");

const { validateUser, sanitizeUser } = require('../middleware/userValidation');
const { registerUser, loginUser, updateUser, deleteUser, getUserByUsername, addFriend, findUserByAnyName, getFriendsOfUser } = require('../controllers/userControllers');


// register a new user
router.post('/register', validateUser, sanitizeUser, registerUser);

// login a user
router.post('/login', loginUser);

// update a user - protected route - a user needs to be logged in to perform an action
router.put('/update/:username', passport.authenticate("jwt", { session: false }), validateUser, sanitizeUser, updateUser);
// router.put('/update/:username', validateUser, sanitizeUser, updateUser);

// delete a user - PUT method - protected route - a user needs to be logged in to perform an action
router.put('/delete', passport.authenticate("jwt", { session: false }), deleteUser);

// get user by username
router.get("/username/:username", getUserByUsername)
// check: http://localhost:5000/api/user/username/santa

// get / find user(s) by first name / last name / username
router.get("/find/:name", findUserByAnyName)
// check: http://localhost:5000/api/user/find/santa


// USER + FRIENDS
// get friends of user(username of a user is used to make a request)
router.get("/friends/:username", getFriendsOfUser)
// check: http://localhost:5000/api/user/friends/santa

// add a friend to a user - protected route - a user needs to be logged in to perform an action
router.put("/friends/add", passport.authenticate("jwt", { session: false }), addFriend)


module.exports = router;
