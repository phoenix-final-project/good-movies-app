const WishList = require("../models/WishList");
const WatchedList = require("../models/WatchedList");
const User = require("../models/User");

const {
    getListFromCache,
    addMovieToList,
    getListMovieIds,
} = require("../helpers/listsHelpers");
const { redisClient } = require("../redis-server");
const { findByIdAndMap } = require("../helpers/findByIdAndMap");

exports.addMovie = async (req, res) => {
    const { userId } = req.params;
    const { movie } = req.body;
    const { imdb_id } = movie;

    try {
        const response = await addMovieToList(
            WishList,
            WatchedList,
            userId,
            imdb_id,
            movie,
            "Wishlist"
        );

        const genres = movie.gen.map((item) => item.genre);
        console.log(genres);
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

        // Converting array of strings in an array of objects (values = imdbIds)
        imdbIdArrayOfObjects = movieIdInBothArrays.map((item) => ({
            imdb_id: item,
        }));
        //console.log(imdbIdArrayOfObjects);

        const moviesInCommon = await findByIdAndMap(imdbIdArrayOfObjects);

        console.log(movieIdInBothArrays);
        //console.log(moviesInCommon);
        const numberMoviesInCommon = movieIdInBothArrays.length;
        const totalUserWishlistMovies = userMovieIdArray.length;

        res.status(200).json({
            numberUserWishlistMovies: totalUserWishlistMovies,
            numberMoviesInCommon: numberMoviesInCommon,
            friendUserId: friendUserId,
            moviesInCommon: moviesInCommon,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getMoviesIds = async (req, res) => {
    const { userId } = req.params;
    try {
        // const docs = await WishList.find({ user: userId });
        const arrayOfIds = await getListMovieIds(WishList, userId);
        res.send(arrayOfIds);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
