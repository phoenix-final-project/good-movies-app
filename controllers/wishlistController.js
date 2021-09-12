const WishList = require('../models/WishList');
const WatchedList = require('../models/WatchedList');
const { getListFromCache, addMovieToList } = require('../helpers/listsHelpers');
const { redisClient } = require('../redis-server');

exports.addMovie = async (req, res) => {
	const { userId } = req.params;
	const { movie } = req.body;
	const { imdb_id } = movie;

	try {
		const response = await addMovieToList(WishList, WatchedList, userId, imdb_id, movie, 'Wishlist');
		res.json(response);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

exports.deleteMovie = async (req, res) => {
	const { userId, movieId } = req.params;

	try {
		// Checks
		const movieToDelete = await WishList.findOne({ user: userId, movieId });
		if (!movieToDelete) throw { message: 'Movie not found in the wishlist' };

		// DELETE FROM WISHLIST
		const deletedMovie = await movieToDelete.deleteOne();
		res.status(200).json({ message: 'Movie deleted', data: deletedMovie });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

exports.showWishlist = async (req, res) => {
	const { userId } = req.params;
	try {
		const MoviesInWishlist = await getListFromCache(WishList, userId);
		res.send(MoviesInWishlist);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};
