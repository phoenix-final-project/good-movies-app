const WishList = require('../models/WishList');
const WatchedList = require('../models/WatchedList');
const User = require('../models/User');

const { getListFromCache, addMovieToList } = require('../helpers/listsHelpers');

const { redisClient } = require('../redis-server');

exports.addMovie = async (req, res) => {
	const { userId } = req.params;
	const { movie } = req.body;
	const { imdb_id } = movie;

	try {
		const response = await addMovieToList(WatchedList, WishList, userId, imdb_id, movie, 'Watched List');
		res.json(response);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

exports.deleteMovie = async (req, res) => {
	const { userId, movieId } = req.params;

	try {
		//CHECKS
		const movieToDelete = await WatchedList.findOne({ user: userId, movieId });
		if (!movieToDelete) throw { message: 'Movie not found in the watched list' };

		// DELETE FROM WATCHLIST
		const deletedMovie = await movieToDelete.deleteOne();
		res.status(200).json({ message: 'Movie deleted', data: deletedMovie });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

exports.showWatchedList = async (req, res) => {
	const { userId } = req.params;

	try {
		const MoviesInWatchedList = await getListFromCache(WatchedList, userId);
		res.send(MoviesInWatchedList);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};
