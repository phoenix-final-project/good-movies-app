const WishList = require('../models/WishList');
const WatchedList = require('../models/WatchedList');
const User = require('../models/User');

const { redisClient } = require('../redis-server');

exports.addMovie = async (req, res) => {
	const { userId } = req.params;
	const { movieToAdd } = req.body;
	const { imdb_id } = movieToAdd;

	try {
		//CHECKS
		// if movie in watched list
		const ifMovieExists = await WatchedList.find({
			user: userId,
			movieId: imdb_id,
		});

		if (ifMovieExists.length !== 0) return res.status(409).json({ message: 'This movie is already in watched list' });

		// if user exists
		const ifUserExists = await User.findById(userId);
		if (ifUserExists === null) return res.status(404).json({ message: 'This user does not exist' });

		// Step 1. If movie in wishlist, delete it from there. If not - add to Redis
		const movieToDelete = await WishList.findOne({ user: userId, movieId: imdb_id });
		if (movieToDelete) {
			const deletedMovie = await movieToDelete.deleteOne();
			console.log(deletedMovie);
		} else {
			await redisClient.set(imdb_id, JSON.stringify(movie));
		}

		// Step 2. ADD TO Watched list IN DB
		const movieToAdd = new WatchedList({
			user: userId,
			movieId: imdb_id,
		});

		const result = await movieToAdd.save();

		res.status(200).json({ message: 'Movie added', result });
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

	const idMoviesFromWishlist = await WishList.find({ user: userId }).sort({
		date: -1,
	});

	const moviesFromWishlist = idMoviesFromWishlist.map(async item => {
		const { movieId } = item;

		const movie = await redisClient.get(movieId);
		return JSON.parse(movie);
	});

	Promise.all(moviesFromWishlist)
		.then(data => {
			console.log(data);
			res.send(data);
		})
		.catch(err => {
			console.log(err);
			res.status(404).json({ message: 'Movies not found' });
		});
};
