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
<<<<<<< HEAD
router.get("/upcoming", upcomingMovies);
// check: http://localhost:5000/movie/upcoming

// GET top rated movies
router.get("/toprated", topRatedMovies);
// check: http://localhost:5000/movie/toprated

// GET movies by genre and by user id
router.get("/byGenre/:id", moviesByUserGenre);
=======
router.get("/upcoming", upcomingMovies)
// check: http://localhost:5000/api/movie/upcoming

// GET top rated movies
router.get("/toprated", topRatedMovies)
// check: http://localhost:5000/api/movie/toprated


// GET movies by genre and by user id  - in process
// router.get("/byGenre/:id", moviesByUserGenre)

>>>>>>> 62d7f335da5158d4d3348e2d911443671944da14

// FOR SEARCH:
// **************************************
// GET movies by title
<<<<<<< HEAD
router.get("/title/:title", moviesByTitle);
// check: http://localhost:5000/movie/title/london
=======
router.get("/title/:title", moviesByTitle)
// check: http://localhost:5000/api/movie/title/london
>>>>>>> 62d7f335da5158d4d3348e2d911443671944da14

// GET movies by director
router.get("/director/:director", moviesByDirector);

// GET movies by genre
<<<<<<< HEAD
router.get("/genre/:genre", moviesByGenre);
// check: http://localhost:5000/movie/genre/comedy
=======
router.get("/genre/:genre", moviesByGenre)
// check: http://localhost:5000/api/movie/genre/comedy
>>>>>>> 62d7f335da5158d4d3348e2d911443671944da14

// GET movies by year
<<<<<<< HEAD
router.get("/year/:year", moviesByYear);
// check: http://localhost:5000/movie/year/1999
=======
router.get("/year/:year", moviesByYear)
// check: http://localhost:5000/api/movie/year/1999
>>>>>>> 62d7f335da5158d4d3348e2d911443671944da14

// FOR INDIVIDUAL MOVIE:
// **************************************
<<<<<<< HEAD
router.get("/oneMovieById/:imdbId", movieById);
// check: http://localhost:5000/movie/oneMovieById/tt0451279
=======
router.get("/oneMovieById/:imdbId", movieById)
// check: http://localhost:5000/api/movie/oneMovieById/tt0451279
>>>>>>> 62d7f335da5158d4d3348e2d911443671944da14

module.exports = router;
