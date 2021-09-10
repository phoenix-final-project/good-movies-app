const express = require('express');
const router = express.Router();

const { addMovie, deleteMovie, showWatchedList } = require('../controllers/watchedController');
const { ifMovieInWishOrWatchedLists, ifUserExists } = require('../middleware/movieListsChecks');

router.post('/add-movie/:userId/:action', ifMovieInWishOrWatchedLists, ifUserExists, addMovie);
router.delete('/delete-movie/:userId/:movieId', deleteMovie);
router.get('/:userId', showWatchedList);

module.exports = router;

//ADD: http://localhost:5000/api/watched/add-movie/6131ef2e3d206c5a94e92e60/tt0285175
//DEL: http://localhost:5000/api/watched/delete-movie/6131ef2e3d206c5a94e92e60/tt10288566
//GET: http://localhost:5000/api/watched/6131ef2e3d206c5a94e92e60
