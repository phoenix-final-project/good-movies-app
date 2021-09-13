const WishList = require("../models/WishList");
const WatchedList = require("../models/WatchedList");
const { getListFromCache } = require("../helpers/listsHelpers");
const { redisClient } = require("../redis-server");

const { findByIdAndMap } = require("../helpers/findByIdAndMap");

exports.addMovie = async (req, res) => {
    const { userId } = req.params;
    const { movie } = req.body;
    const { imdb_id } = movie;

    try {
        // checks in middleware

        // STEP 1. If movie in watched list, delete from there. If not, it comes from movies page, so add it to Redis
        const movieToDelete = await WatchedList.findOne({
            user: userId,
            movieId: imdb_id,
        });

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

        res.status(200).json({ message: "Movie added to wishlist", movie });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteMovie = async (req, res) => {
    const { userId, movieId } = req.params;

    try {
        //CHECKS
        const movieToDelete = await WishList.findOne({ user: userId, movieId });
        if (!movieToDelete)
            throw { message: "Movie not found in the wishlist" };

        // DELETE FROM WISHLIST
        const deletedMovie = await movieToDelete.deleteOne();
        res.status(200).json({ message: "Movie deleted", data: deletedMovie });
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

// COMPARE WISHLISTS
exports.compareWishlists = async (req, res) => {
    try {
        const { userId, friendUserId } = req.params;

        const findUserWishlist = await WishList.find({ user: userId });
        const findFriendWishlist = await WishList.find({
            user: friendUserId,
        });

        // Check if the user or user's friend have movies on their wishlist
        if (findUserWishlist.length === 0)
            throw { message: "The user has no movies on the  wishlist" };

        if (findFriendWishlist.length === 0)
            throw { message: "Your friend has no movies on the  wishlist" };

        // Getting two arrays with the movieIds from the user's and friend's wishlist
        const userMovieIdArray = findUserWishlist.map(
            (item) => item["movieId"]
        );

        const friendMovieIdArray = findFriendWishlist.map(
            (item) => item["movieId"]
        );

        // Finding the movies in common in both wishlists
        const movieIdInBothArrays = userMovieIdArray.filter((item) =>
            friendMovieIdArray.includes(item)
        );

        if (movieIdInBothArrays.length === 0)
            throw {
                message: "You do not have any movie in common with your friend",
            };

        const moviesInCommon = await findByIdAndMap(movieIdInBothArrays);

        const numberMoviesInCommon = movieIdInBothArrays.length;
        const totalUserWishlistMovies = userMovieIdArray.length;

        res.status(200).json({
            numberUserWishlistMovies: totalUserWishlistMovies,
            numberMoviesInCommon: numberMoviesInCommon,
            moviesInCommon: moviesInCommon,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
