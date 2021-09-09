const WishList = require('../models/WishList');
const { getListFromCache } = require('../helpers/listsHelpers');
const { redisClient } = require('../redis-server');

exports.addMovie = async (req, res) => {
	const { userId } = req.params;
	const { movie } = req.body;
	const { imdb_id } = movie;

	try {
		// checks in middleware

		// STEP 1. Add to wishlist in DB
		const movieToAdd = new WishList({
			user: userId,
			movieId: imdb_id,
		});

		await movieToAdd.save();

		// STEP 2. Add received from front-end movie TO CACHE (REDIS)
		await redisClient.set(imdb_id, JSON.stringify(movie));

		res.status(200).json({ message: 'Movie added', movie });
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
