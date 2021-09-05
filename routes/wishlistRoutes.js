const express = require('express');
const router = express.Router();

const { addMovie } = require('../controllers/wishlistController');

router.post('/add-movie', addMovie);

module.exports = router;
