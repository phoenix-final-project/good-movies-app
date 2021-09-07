const express = require('express');
const router = express.Router();

const { addMovie, deleteMovie, showWishlist } = require('../controllers/wishlistController');

router.post('/add-movie/:userId/:foundMovie', addMovie);
router.delete('/delete-movie/:userId/:movieObj', deleteMovie);
router.get('/:userId', showWishlist);

module.exports = router;

// ADD Movie to a wishlist
// http://localhost:5000/api/wishlist/add-movie/:userId/:movieObj
