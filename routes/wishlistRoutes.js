const express = require('express');
const router = express.Router();

const { addMovie, deleteMovie, showWishlist } = require('../controllers/wishlistController');
const { ifMovieInWishOrWatchedLists, ifUserExists } = require('../middleware/movieListsChecks');

router.post('/add-movie/:userId', ifMovieInWishOrWatchedLists, ifUserExists, addMovie);
router.delete('/delete-movie/:userId/:movieId', deleteMovie);
router.get('/:userId', showWishlist);

module.exports = router;

//ADD: http://localhost:5000/api/wishlist/add-movie/6131ef2e3d206c5a94e92e60/tt0285175
//DEL: http://localhost:5000/api/wishlist/delete-movie/6131ef2e3d206c5a94e92e60/tt10288566
//GET: http://localhost:5000/api/wishlist/6131ef2e3d206c5a94e92e60
