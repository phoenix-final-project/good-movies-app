const express = require('express');
const router = express.Router();

const { validateUser, sanitizeUser } = require('../middleware/userValidation');
const { registerUser, loginUser, deleteUser } = require('../controllers/userControllers');

// register a new user
router.post('/register', validateUser, sanitizeUser, registerUser);

// login a user
router.post('/login', loginUser);

// delete a user
router.delete('/delete/:userId', deleteUser);

module.exports = router;
