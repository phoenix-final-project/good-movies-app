const WishList = require('../models/WishList');
const WatchedList = require('../models/WatchedList');
const { getListFromCache } = require('../helpers/listsHelpers');
const { redisClient } = require('../redis-server');

exports.addMovie = async (req, res) => {
	const { userId } = req.params;
	const { movie } = req.body;
	const { imdb_id } = movie;

	try {
		// checks in middleware

		// STEP 1. If movie in watched list, delete from there. If not, it comes from movies page, so add it to Redis
		const movieToDelete = await WatchedList.findOne({ user: userId, movieId: imdb_id });

		if (movieToDelete) {
			const deletedMovie = await movieToDelete.deleteOne();
			console.log(deletedMovie);
		} else {
			await redisClient.set(imdb_id, JSON.stringify(movie));
		}

		// STEP 2. Add to wishlist in DB
		const movieToAdd = new WishList({
			user: userId,
			movieId: imdb_id,
		});

		await movieToAdd.save();

		res.status(200).json({ message: 'Movie added to wishlist', movie });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

exports.deleteMovie = async (req, res) => {
	const { userId, movieId } = req.params;

	try {
		//CHECKS
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
