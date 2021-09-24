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
    moviesByRandomSearch,
} = require("../controllers/movieControllers");

// FOR LANDING PAGE - after login:
// **************************************
// GET upcoming movies
router.get("/upcoming/:page", upcomingMovies);
// check: http://localhost:5000/api/movie/upcoming/1

// GET top rated movies
router.get("/toprated/:page", topRatedMovies);
// check: http://localhost:5000/api/movie/toprated/1

// GET movies by genre and by user id  (1st genre)
router.get("/byGenre/:userId/:page", moviesByUserGenre);

// GET movies by genre and by user id  (2nd genre)
router.get("/byGenre2/:userId/:page", moviesByUserGenre2);

// FOR SEARCH:
// **************************************
// GET movies by title
router.get("/title/:title/:page", moviesByTitle);
// check: http://localhost:5000/api/movie/title/london/1

// GET movies by genre
router.get("/genre/:genre/:page", moviesByGenre);
// check: http://localhost:5000/api/movie/genre/comedy/1

// GET movies by year
router.get("/year/:year/:page", moviesByYear);
// check: http://localhost:5000/api/movie/year/1999/1

// GET movies by director - IN PROCESS
router.get("/director/:director/:page", moviesByDirector);

// FOR INDIVIDUAL MOVIE:
// **************************************
router.get("/oneMovieById/:imdbId", movieById);
// check: http://localhost:5000/api/movie/oneMovieById/tt0451279

// General search by title/year/genre/director
// router.get("/search/:searchParam", moviesByRandomSearch);

module.exports = router;
