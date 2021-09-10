const WishList = require("../models/WishList");
const { findByIdAndMap } = require("../helpers/findByIdAndMap");

exports.compareWishlists = async (req, res) => {
    try {
        const { userId, friendUserId } = req.params;

        const findUserWishlist = await WishList.find({ user: userId });
        const findFriendWishlist = await WishList.find({
            user: friendUserId,
        });

        // Check if the user or user's friend have movies on their wishlist
        /* if (findUserWishlist.length === 0)
            throw { message: "The user has no movies on the  wishlist" };

        if (findFriendWishlist.length === 0)
            throw { message: "Your friend has no movies on the  wishlist" }; */

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

        /* if (movieIdInBothArrays.length === 0)
            throw {
                message: "You do not have any movie in common with your friend",
            }; */

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
