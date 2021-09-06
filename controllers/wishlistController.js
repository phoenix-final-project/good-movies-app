const WishList = require('../models/WishList');
const User = require('../models/User');
const findMovieById = require('../helpers/findMovieById');
const { redisClient } = require('../server');

exports.addMovie = async (req, res) => {
	const { userId, movieId } = req.params;

	try {
		//CHECKS
		const ifMovieExists = await WishList.find({ user: userId, movieId });
		if (ifMovieExists.length !== 0) throw { message: 'This movie is already in the wishlist' };

		const ifUserExists = await User.findById(userId);
		if (ifUserExists === null) throw { message: 'This user does not exist' };

		// ADD TO WISHLIST IN DB
		const movieToAdd = new WishList({
			user: userId,
			movieId,
		});

		const result = await movieToAdd.save();

		// FIND THAT MOVIE IN external API
		const foundMovie = await findMovieById(movieId);

		// ADD FOUND MOVIE TO CACHE (REDIS)
		redisClient.setex(movieId, 3600, JSON.stringify(foundMovie));

		res.status(200).json({ message: 'Movie added', data: result });
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
	res.send('wishlist');
};
