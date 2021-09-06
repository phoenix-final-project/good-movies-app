const express = require('express');
const router = express.Router();

const { addMovie, deleteMovie, showWishlist } = require('../controllers/wishlistController');

router.post('/add-movie/:userId/:movieId', addMovie);
router.delete('/delete-movie/:userId/:movieId', deleteMovie);
router.get('/:userId', showWishlist);

module.exports = router;
