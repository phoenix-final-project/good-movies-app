const { redisClient } = require('../redis-server');
const findMovieById = require('../helpers/findMovieById');
const User = require('../models/User');

exports.getListMovieIds = async (schema, userId) => {
	const docs = await schema.find({ user: userId });
	return docs.map(item => item.movieId);
};

/**
 *
 * Returns a list of movie objects, received either from cache or from external API
 *
 * @param {*} schema
 * @param {*} userId
 */

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

/**
 * Checks if the movie is in the second list. If yes, then deletes it. After that, add the movie to the desired list.
 * Returns message and the movie that was added to the desired list
 * @param {*} firstList - mongoose Schema
 * @param {*} secondList - mongoose Schema
 * @param {*} userId - String
 * @param {*} imdb_id - String
 * @param {*} movie - Object
 * @param {*} nameOfList - String
 *
 */
exports.addMovieToList = async (firstList, secondList, userId, imdb_id, movie, nameOfList) => {
	// STEP 1. If movie already in firstList, throw error
	const ifMovieInList = await firstList.find({ user: userId, movieId: imdb_id });
	if (ifMovieInList.length !== 0) throw { message: `This movie is already in the ${nameOfList}` };

	// STEP 2. If movie in secondList list, delete from there.
	const movieToDelete = await secondList.findOne({ user: userId, movieId: imdb_id });

	if (movieToDelete) {
		const deletedMovie = await movieToDelete.deleteOne();
		// console.log(deletedMovie);
	} else {
		await redisClient.set(imdb_id, JSON.stringify(movie));
	}

	// STEP 3. Add to firstList in DB
	const movieToAdd = new firstList({
		user: userId,
		movieId: imdb_id,
	});

	await movieToAdd.save();

	return { message: `Movie added to the ${nameOfList}`, movie };
};

exports.addGenreToUser = async (movie, userId) => {
	try {
		const genres = movie.gen.map(item => item.genre);
		genres.forEach(async genre => await User.findByIdAndUpdate(userId, { $addToSet: { favoriteGenres: genre } }, { new: true }));

		Promise.resolve();
	} catch (error) {
		Promise.reject(error.message);
	}
};
