const WishList = require('../models/WishList');
const WatchedList = require('../models/WatchedList');
const User = require('../models/User');

exports.ifMovieInWishOrWatchedLists = async (req, res, next) => {
	const { userId } = req.params;
	const { imdb_id } = req.body.movie;

	// if movie in wishlist
	const ifMovieInWishlist = await WishList.find({
		user: userId,
		movieId: imdb_id,
	});

	// if movie in watched list
	const ifMovieInWatchedlist = await WatchedList.find({
		user: userId,
		movieId: imdb_id,
	});

	if (ifMovieInWishlist.length !== 0 || ifMovieInWatchedlist.length !== 0) return res.status(409).json({ message: 'This movie is already in your list' });

	next();
};

exports.ifUserExists = async (req, res, next) => {
	const { userId } = req.params;

	const ifUserExists = await User.findById(userId);
	if (ifUserExists === null) return res.status(404).json({ message: 'This user does not exist' });

	next();
};
