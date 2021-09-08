const express = require('express');
const router = express.Router();

const { addMovie, deleteMovie, showWishlist } = require('../controllers/wishlistController');

router.post('/add-movie/:userId', addMovie);
router.delete('/delete-movie/:userId/:movieId', deleteMovie);
router.get('/:userId', showWishlist);

module.exports = router;

// ADD: http://localhost:5000/api/wishlist/add-movie/:userId
// DEL: http://localhost:5000/api/wishlist/delete-movie/:userId/:movieId
