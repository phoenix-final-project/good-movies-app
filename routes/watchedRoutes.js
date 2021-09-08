const express = require('express');
const router = express.Router();

const {addMovie} = require('../controllers/watchedController')

router.post('/add-movie/:userId/:movieId', addMovie)

module.exports = router;