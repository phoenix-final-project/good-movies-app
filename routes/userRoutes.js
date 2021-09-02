const express = require('express');
const router = express.Router();

const { validateUser, sanitizeUser } = require('../middleware/userValidation');
const { registerUser, loginUser, deleteUser, getUserByUsername,
    addFriend } = require('../controllers/userControllers');

    
// register a new user
router.post('/register', validateUser, sanitizeUser, registerUser);
// router.post('/register', validateUser, registerUser);

// login a user
router.post('/login', loginUser);

// delete a user
router.delete('/delete/:userId', deleteUser);

// get user by username
router.get("/username/:username", getUserByUsername)


// USER + FRIENDS
// add a friend to a user
router.put("/friends/add", addFriend)


module.exports = router;
