const WishList = require('../models/WishList');
const WatchedList = require('../models/WatchedList');
const User = require('../models/User');

exports.ifMovieInWishOrWatchedLists = async (req, res, next) => {
	const { userId, action } = req.params;
	const { imdb_id } = req.body.movie;

	// action = 0 => movie comes from movies page either to wish- or to watched list
	// action = 1 => movie comes from wish- to watched list or vice versa

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

	switch (action) {
		case '0':
			if (ifMovieInWishlist.length !== 0 || ifMovieInWatchedlist.length !== 0) return res.status(409).json({ message: 'This movie is already in your list' });
			break;
		case '1':
			break;
	}

	next();
};

exports.ifUserExists = async (req, res, next) => {
	const { userId } = req.params;

	const ifUserExists = await User.findById(userId);
	if (ifUserExists === null) return res.status(404).json({ message: 'This user does not exist' });

	next();
};
