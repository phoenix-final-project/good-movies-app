const express = require('express');
const router = express.Router();
const passport = require("passport");

const { validateUser, sanitizeUser } = require('../middleware/userValidation');
const { registerUser, loginUser, deleteUser, getUserByUsername, addFriend } = require('../controllers/userControllers');

    
// register a new user
router.post('/register', validateUser, sanitizeUser, registerUser);

// login a user
router.post('/login', loginUser);

// delete a user - PUT method - protected route - a user needs to be logged in to perform an action
router.put('/delete', passport.authenticate("jwt", { session: false }), deleteUser);

// get user by username
router.get("/username/:username", getUserByUsername)


// USER + FRIENDS
// add a friend to a user - protected route - a user needs to be logged in to perform an action
router.put("/friends/add", passport.authenticate("jwt", { session: false }), addFriend)


module.exports = router;
