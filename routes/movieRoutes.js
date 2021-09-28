const express = require("express");
const router = express.Router();
const {
    upcomingMovies,
    moviesByUserGenre,
    moviesByUserGenre2,
    moviesByTitle,
    moviesByDirector,
    moviesByGenre,
    moviesByYear,
    movieById,
    topRatedMovies,
} = require("../controllers/movieControllers");

// FOR LANDING PAGE - after login:
// **************************************
// GET upcoming movies
router.get("/upcoming/:page", upcomingMovies);

// GET top rated movies
router.get("/toprated/:page", topRatedMovies);

// GET movies by genre and by user id  (1st genre) - 30 movies
router.get("/byGenre/:userId", moviesByUserGenre);

// GET movies by genre and by user id  (2nd genre) - 30 movies
router.get("/byGenre2/:userId", moviesByUserGenre2);


// FOR SEARCH:
// **************************************
// GET movies by title
router.get("/title/:title/:page", moviesByTitle);

// GET movies by genre
router.get("/genre/:genre/:page", moviesByGenre);

// GET movies by year
router.get("/year/:year/:page", moviesByYear);

// GET movies by director
router.get("/director/:director/:page", moviesByDirector);


// FOR INDIVIDUAL MOVIE:
// **************************************
router.get("/oneMovieById/:imdbId", movieById);


module.exports = router;
