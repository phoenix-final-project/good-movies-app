import { ActionTypes } from "../constants/action-types";

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
