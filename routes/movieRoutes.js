const express = require("express");
const router = express.Router();
const {
    upcomingMovies,
    moviesByUserGenre,
    moviesByTitle,
    moviesByDirector,
    moviesByGenre,
    moviesByYear,
    movieById,
} = require("../controllers/movieControllers");

// FOR LANDING PAGE - after login:
// **************************************
// GET upcoming movies
router.get("/upcoming", upcomingMovies);
// check: http://localhost:5000/movie/upcoming

// GET top rated movies
router.get("/toprated", topRatedMovies);
// check: http://localhost:5000/movie/toprated

// GET movies by genre and by user id
router.get("/byGenre/:id", moviesByUserGenre);

// FOR SEARCH:
// **************************************
// GET movies by title
router.get("/title/:title", moviesByTitle);
// check: http://localhost:5000/movie/title/london

// GET movies by director
router.get("/director/:director", moviesByDirector);

// GET movies by genre
router.get("/genre/:genre", moviesByGenre);
// check: http://localhost:5000/movie/genre/comedy

// GET movies by year
router.get("/year/:year", moviesByYear);
// check: http://localhost:5000/movie/year/1999

// FOR INDIVIDUAL MOVIE:
// **************************************
router.get("/oneMovieById/:imdbId", movieById);
// check: http://localhost:5000/movie/oneMovieById/tt0451279

module.exports = router;
