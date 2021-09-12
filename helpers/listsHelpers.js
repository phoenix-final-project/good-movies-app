const { redisClient } = require('../redis-server');
const findMovieById = require('../helpers/findMovieById');

exports.getListFromCache = async (schema, userId) => {
	const idMoviesFromList = await schema.find({ user: userId }).sort({
		date: -1,
	});

	// go thru all movieIds of this user, return an array of movie objects
	const moviesFromList = idMoviesFromList.map(async item => {
		const { movieId } = item;
		let foundMovie;

		// find movie in Redis
		const movie = await redisClient.get(movieId);

		if (movie) {
			foundMovie = JSON.parse(movie);
		} else {
			//If movie is not in Redis, go to the external API
			const movieFromApi = await findMovieById(movieId);
			foundMovie = Object.values(movieFromApi)[0];
		}
		return foundMovie;
	});

	return Promise.all(moviesFromList).then(data => {
		console.log(data);
		return { numOfMovies: data.length, data };
	});
};
