import { ActionTypes } from "../constants/action-types";
import axiosApiInstance from "../../util/APIinstance";

// Wishlist
export const getMoviesWishlist = () => async (dispatch) => {
    try {
        const res = await axiosApiInstance.get(
            `/api/wishlist/6131ef2e3d206c5a94e92e60`
        );

        dispatch({ type: ActionTypes.GET_MOVIES_WISHLIST, payload: res });
    } catch (error) {
        console.log("Something went wrong", error.message);
    }
};

export const addMovieWishlist = (movie) => {
    return {
        type: ActionTypes.ADD_MOVIE_WISHLIST,
        payload: movie,
    };
};

export const removeMovieWishlist = (movie) => {
    return {
        type: ActionTypes.REMOVE_MOVIE_WISHLIST,
        payload: movie,
    };
};

// Watched
export const addMovieWatched = (movie) => {
    return {
        type: ActionTypes.ADD_MOVIE_WATCHED,
        payload: movie,
    };
};

export const removeMovieWatched = (movie) => {
    return {
        type: ActionTypes.REMOVE_MOVIE_WATCHED,
        payload: movie,
    };
};

// Favorite
export const addMovieFavorite = (movie) => {
    return {
        type: ActionTypes.ADD_MOVIE_FAVORITE,
        payload: movie,
    };
};

export const removeMovieFavorite = (movie) => {
    return {
        type: ActionTypes.REMOVE_MOVIE_FAVORITE,
        payload: movie,
    };
};
