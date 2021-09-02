const express = require('express');
const router = express.Router();
const {
    upcomingMovies,
    moviesByUserGenre,
    moviesByTitle,
    moviesByDirector,
    moviesByGenre,
    moviesByYear,
    movieById,
    topRatedMovies,
    moviesByRandomSearch } = require('../controllers/movieControllers');


// FOR LANDING PAGE - after login:
// **************************************
// GET upcoming movies
router.get("/upcoming", upcomingMovies)
// check: http://localhost:5000/api/movie/upcoming

// GET top rated movies
router.get("/toprated", topRatedMovies)
// check: http://localhost:5000/api/movie/toprated


// GET movies by genre and by user id  - in process
// router.get("/byGenre/:id", moviesByUserGenre)


// FOR SEARCH:
// **************************************
// GET movies by title
router.get("/title/:title", moviesByTitle)
// check: http://localhost:5000/api/movie/title/london

// GET movies by director
router.get("/director/:director", moviesByDirector)

// GET movies by genre
router.get("/genre/:genre", moviesByGenre)
// check: http://localhost:5000/api/movie/genre/comedy


// GET movies by year
router.get("/year/:year", moviesByYear)
// check: http://localhost:5000/api/movie/year/1999



// FOR INDIVIDUAL MOVIE:
// **************************************
router.get("/oneMovieById/:imdbId", movieById)
// check: http://localhost:5000/api/movie/oneMovieById/tt0451279


// General search by title/year/genre/director
router.get("/search/:searchParam", moviesByRandomSearch)


module.exports = router