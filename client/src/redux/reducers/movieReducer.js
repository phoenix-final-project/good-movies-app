import { ActionTypes } from "../constants/action-types";

const initialState = {
    favoriteMovies: [],
    wishlistMovies: [],
    watchedMovies: [],
};

export const movieReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.ADD_MOVIE_FAVORITE:
            return state;
        case ActionTypes.REMOVE_MOVIE_FAVORITE:
            return state;
        case ActionTypes.ADD_MOVIE_WISHLIST:
            return state;
        case ActionTypes.REMOVE_MOVIE_WISHLIST:
            return state;
        case ActionTypes.ADD_MOVIE_WATCHED:
            return state;
        case ActionTypes.REMOVE_MOVIE_WATCHED:
            return state;
        default:
            return state;
    }
};
