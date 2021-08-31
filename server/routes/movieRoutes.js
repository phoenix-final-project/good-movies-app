const express = require('express');
const router = express.Router();
const { upcomingMovies, moviesByUserGenre, moviesByTitle, moviesByDirector, moviesByGenre, moviesByYear, moviesById } = require('../controllers/movieControllers');


// FOR LANDING PAGE - after login:
// **************************************
// GET upcoming movies
router.get("/upcoming", upcomingMovies)
// check: http://localhost:5000/movie/upcoming

// GET movies by genre and by user id
router.get("/byGenre/:id", moviesByUserGenre)


// FOR SEARCH:
// **************************************
// GET movies by title
router.get("/:title", moviesByTitle)

// GET movies by director
router.get("/:director", moviesByDirector)

// GET movies by genre
router.get("/:genre", moviesByGenre)

// GET movies by year
router.get("/:year", moviesByYear)


// FOR INDIVIDUAL MOVIE:
// **************************************
router.get("/:imdbId", moviesById)





module.exports = router