const axios = require("axios").default;
const { findByIdAndMap } = require("../helpers/findByIdAndMap");

const rapidApiHeaders = {
    "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
    "x-rapidapi-key": process.env.RAPID_API_KEY,
};

// FOR LANDING PAGE - after login:
// **************************************
// GET upcoming movies - limited to 10
exports.upcomingMovies = async (req, res) => {
    let options = {
        method: "GET",
        url: "https://data-imdb1.p.rapidapi.com/movie/order/upcoming/",
        headers: {
            "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
            "x-rapidapi-key": process.env.rapidapiKey,
        },
        method: "GET",
        url: "https://data-imdb1.p.rapidapi.com/movie/order/upcoming/",
        headers: rapidApiHeaders,
    };

    // getting Upcoming Movies with little data (title, imdb_id, release date)
    // limit to 10 movies
    axios
        .request(options)
        .then((response) => {
            const upcoming = Object.values(response.data)[0].slice(0, 10);

            // console.log("Upcoming simple :", upcoming);

            // getting Upcoming Movies by IMDB id with extended data
            // helper for extended info on movies
<<<<<<< HEAD
            findByIdAndMap(upcoming, res);
=======
            findByIdAndMap(upcoming, res)
>>>>>>> 62d7f335da5158d4d3348e2d911443671944da14
        })
        .catch((error) => {
            console.error(error.message);
            // console.error(error);
        });
<<<<<<< HEAD
};
=======
}

// GET Top Rated movies - limited to 10
exports.topRatedMovies = async (req, res) => {

    let options = {
        method: 'GET',
        url: 'https://data-imdb1.p.rapidapi.com/movie/order/byRating/',
        headers: rapidApiHeaders
    };

    // getting TopRated Movies with little data (imdb_id, title, rating)
    // limit to 10 movies
    axios.request(options)
        .then((response) => {

            const topRatedMovies = Object.values(response.data)[0]
                .slice(1, 11)

            console.log("topRatedMovies simple :", topRatedMovies);

            // getting TopRated Movies by IMDB id with extended data
            // helper for extended info on movies
            findByIdAndMap(topRatedMovies, res)
        })
        .catch((error) => {
            console.error(error.message);
        });
}

>>>>>>> 62d7f335da5158d4d3348e2d911443671944da14

// GET movies by genre and by user id - limited to 10
exports.moviesByUserGenre = async (req, res) => {
    res.status(200).json({ message: "connected to moviesByUserGenre movies" });
};

// FOR SEARCH:
// **************************************
// GET movies by title
exports.moviesByTitle = async (req, res) => {
    let options = {
        method: "GET",
        url: `https://data-imdb1.p.rapidapi.com/movie/imdb_id/byTitle/${req.params.title}/`,
        headers: {
            "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
            "x-rapidapi-key": process.env.rapidapiKey,
        },
    };

    await axios
        .request(options)
        .then((response) => {
            const foundTitles = Object.values(response.data)[0];

            if (foundTitles.length === 0) {
                return res.status(404).json({
                    message: `No movies with a word *${req.params.title}* in the title were found`,
                });
            }

            console.log({
                searchParam: req.params.title,
                numberOfMovies: foundTitles.length,
                foundMovies: foundTitles,
            });

            // helper for extended info on movies
<<<<<<< HEAD
            findByIdAndMap(foundTitles, res);
=======
            findByIdAndMap(foundTitles, res)

>>>>>>> 62d7f335da5158d4d3348e2d911443671944da14
        })
        .catch((error) => {
            console.error(error.message);
        });
};

// GET movies by director
exports.moviesByDirector = async (req, res) => {
    res.status(200).json({ message: "connected to moviesByDirector" });
};

// GET movies by genre
exports.moviesByGenre = async (req, res) => {
    let options = {
        method: "GET",
        url: `https://data-imdb1.p.rapidapi.com/movie/byGen/${req.params.genre}/`,
        headers: {
            "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
            "x-rapidapi-key": process.env.rapidapiKey,
        },
    };

    await axios
        .request(options)
        .then((response) => {
            const numberOfMoviesToShow = 20;

            // getting ALL movies for that genre (can be a lot)
            const foundByGenre = Object.values(response.data)[0];

            // then limiting a number of results of "foundByGenre" to 100
            const foundByGenre100 = foundByGenre.slice(0, numberOfMoviesToShow);

            if (foundByGenre.length === 0) {
                return res.status(404).json({
                    message: `No movies for *${req.params.genre}* were found`,
                });
            }

            return res.status(200).json({
                searchParam: req.params.genre,
                totalNumberOfMovies: foundByGenre.length,
                numberOfMoviesToShow: numberOfMoviesToShow,
                foundMovies: foundByGenre100,
            });
        })
        .catch((error) => {
            console.error(error.message);
        });
};

// GET movies by year
exports.moviesByYear = async (req, res) => {
    let options = {
        method: "GET",
        url: `https://data-imdb1.p.rapidapi.com/movie/byYear/${req.params.year}/`,
        headers: {
            "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
            //"x-rapidapi-key": process.env.rapidapiKey,
            "x-rapidapi-key":
                "5ba43a0aa0msh78a81186ccfad0fp181919jsn821c9b5a8cdf",
        },
    };

    axios
        .request(options)
        .then((response) => {
            const foundByYear = Object.values(response.data)[0];

            if (foundByYear.length === 0) {
                return res.status(404).json({
                    message: `No movies for *${req.params.year}* were found`,
                });
            }

            return res.status(200).json({
                searchParam: req.params.year,
                numberOfMovies: foundByYear.length,
                foundMovies: foundByYear,
            });
        })
        .catch((error) => {
            console.error(error.message);
        });
};

// FOR INDIVIDUAL MOVIE:
// **************************************
exports.movieById = async (req, res) => {
    let options = {
        method: "GET",
        url: `https://data-imdb1.p.rapidapi.com/movie/id/${req.params.imdbId}/`,
        headers: {
            "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
            "x-rapidapi-key": process.env.RAPID_API_KEY,
        },
    };

    axios
        .request(options)
        .then((response) => {
            const foundByImdbId = Object.values(response.data)[0];

            if (foundByImdbId.length === 0) {
                return res.status(404).json({
                    message: `No movie with IMBD ID *${req.params.imdbId}* was found`,
                });
            }

            return res.status(200).json({
                searchParam: req.params.imdbId,
                foundMovie: foundByImdbId,
            });
        })
        .catch((error) => {
            console.error(error.message);
        });
};
