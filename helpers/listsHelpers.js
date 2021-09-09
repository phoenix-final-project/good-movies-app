const { redisClient } = require('../redis-server');

exports.getListFromCache = async (schema, userId) => {
	const idMoviesFromList = await schema.find({ user: userId }).sort({
		date: -1,
	});

	const moviesFromList = idMoviesFromList.map(async item => {
		const { movieId } = item;

		const movie = await redisClient.get(movieId);
		return JSON.parse(movie);
	});

	return Promise.all(moviesFromList).then(data => {
		return { numOfMovies: data.length, data };
	});
};
