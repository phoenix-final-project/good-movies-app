const axios = require('axios').default;
const { findByIdAndMap } = require('../helpers/findByIdAndMap');

const rapidApiHeaders = {
	'x-rapidapi-host': 'data-imdb1.p.rapidapi.com',
	'x-rapidapi-key': process.env.RAPID_API_KEY,
};

// FOR LANDING PAGE - after login:
// **************************************
// GET upcoming movies - limited to 10
const upcomingMovies = async (req, res) => {
	let options = {
		method: 'GET',
		url: 'https://data-imdb1.p.rapidapi.com/movie/order/upcoming/',
		headers: rapidApiHeaders,
	};

	// getting Upcoming Movies with little data (title, imdb_id, release date)
	// limit to 10 movies
	axios
		.request(options)
		.then(async response => {
			const upcoming = Object.values(response.data)[0].slice(0, 10);

			// console.log("Upcoming simple :", upcoming);

			// getting Upcoming Movies by IMDB id with extended data
			// helper for extended info on movies
			const withExtendedInfo = await findByIdAndMap(upcoming);

			res.status(200).json({ movies: withExtendedInfo });
		})
		.catch(error => {
			console.error(error.message);
			res.status(400).json({ error: error.message });
		});
};

// GET Top Rated movies - limited to 10
const topRatedMovies = async (req, res) => {
	let options = {
		method: 'GET',
		url: 'https://data-imdb1.p.rapidapi.com/movie/order/byRating/',
		headers: rapidApiHeaders,
	};

	// getting TopRated Movies with little data (imdb_id, title, rating)
	// limit to 10 movies
	axios
		.request(options)
		.then(async response => {
			const topRatedMovies = Object.values(response.data)[0].slice(1, 11);

			console.log('topRatedMovies simple :', topRatedMovies);

			// getting TopRated Movies by IMDB id with extended data
			// helper for extended info on movies
			const withExtendedInfo = await findByIdAndMap(topRatedMovies);

			res.status(200).json({ movies: withExtendedInfo });
		})
		.catch(error => {
			console.error(error.message);
			res.status(400).json({ error: error.message });
		});
};

// GET movies by genre and by user id - limited to 10
const moviesByUserGenre = async (req, res) => {
	res.status(200).json({ message: 'connected to moviesByUserGenre movies' });
};

// FOR SEARCH:
// **************************************
// GET movies by title
const moviesByTitle = async (req, res) => {
	let options = {
		method: 'GET',
		url: `https://data-imdb1.p.rapidapi.com/movie/imdb_id/byTitle/${req.params.title}/`,
		headers: rapidApiHeaders,
	};

	await axios
		.request(options)
		.then(async response => {
			const foundTitles = Object.values(response.data)[0];

			if (foundTitles.length === 0) {
				return res.status(404).json({
					message: `No movies with a word *${req.params.title}* in the title were found`,
				});
			}

			// helper for extended info on movies
			const withExtendedInfo = await findByIdAndMap(foundTitles);

			res.status(200).json({
				searchParam: req.params.title,
				numberOfMovies: foundTitles.length,
				foundMovies: withExtendedInfo,
			});
		})
		.catch(error => {
			console.error(error.message);
			res.status(400).json({ error: error.message });
		});
};

// GET movies by director
const moviesByDirector = async (req, res) => {
	res.status(200).json({ message: 'connected to moviesByDirector' });
};

// GET movies by genre
const moviesByGenre = async (req, res) => {
	let options = {
		method: 'GET',
		url: `https://data-imdb1.p.rapidapi.com/movie/byGen/${req.params.genre}/`,
		headers: rapidApiHeaders,
	};

	await axios
		.request(options)
		.then(response => {
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
		.catch(error => {
			console.error(error.message);
			res.status(400).json({ error: error.message });
		});
};

// GET movies by year
const moviesByYear = async (req, res) => {
	let options = {
		method: 'GET',
		url: `https://data-imdb1.p.rapidapi.com/movie/byYear/${req.params.year}/`,
		headers: rapidApiHeaders,
	};

	axios
		.request(options)
		.then(response => {
			const foundByYear = Object.values(response.data)[0];

			if (foundByYear.length === 0) {
				return res.status(404).json({ message: `No movies for *${req.params.year}* were found` });
			}

			return res.status(200).json({
				searchParam: req.params.year,
				numberOfMovies: foundByYear.length,
				foundMovies: foundByYear,
			});
		})
		.catch(error => {
			console.error(error.message);
			res.status(400).json({ error: error.message });
		});
};

// FOR INDIVIDUAL MOVIE:
// **************************************
const movieById = async (req, res) => {
	let options = {
		method: 'GET',
		url: `https://data-imdb1.p.rapidapi.com/movie/id/${req.params.imdbId}/`,
		headers: rapidApiHeaders,
	};

	axios
		.request(options)
		.then(response => {
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
		.catch(error => {
			console.error(error.message);
			res.status(400).json({ error: error.message });
		});
};

const moviesByRandomSearch = async (req, res) => {
	res.status(200).json({ message: 'connected to movieByRandomSearch' });
};

module.exports = {
	upcomingMovies,
	topRatedMovies,
	moviesByUserGenre,
	moviesByTitle,
	moviesByDirector,
	moviesByGenre,
	moviesByYear,
	movieById,
	moviesByRandomSearch,
};
