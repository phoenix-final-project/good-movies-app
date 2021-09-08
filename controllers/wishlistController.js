const WishList = require('../models/WishList');
const User = require('../models/User');

const { redisClient } = require('../redis-server');

exports.addMovie = async (req, res) => {
	const { userId } = req.params;
	const { movie } = req.body;
	const { imdb_id } = movie;

	try {
		//CHECKS
		const ifMovieExists = await WishList.find({
			user: userId,
			movieId: imdb_id,
		});

		// if (ifMovieExists.length !== 0) throw { message: 'This movie is already in the wishlist' };
		if (ifMovieExists.length !== 0) return res.status(409).json({ message: 'This movie is already in wishlist' });

		const ifUserExists = await User.findById(userId);
		if (ifUserExists === null) return res.status(404).json({ message: 'This user does not exist' });

		// ADD TO WISHLIST IN DB
		const movieToAdd = new WishList({
			user: userId,
			movieId: imdb_id,
		});

		await movieToAdd.save();

		// ADD add received from front-end movie TO CACHE (REDIS)
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
