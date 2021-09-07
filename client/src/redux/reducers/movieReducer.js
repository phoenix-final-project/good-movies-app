import { ActionTypes } from "../constants/action-types";

const initialState = {
    favoriteMovies: ["JS", "CSS", "React", "HTML"],
    wishlistMovies: [],
    watchedMovies: [],
};

export const movieReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.ADD_MOVIE_FAVORITE:
            return { ...state, favoriteMovies: payload };
        case ActionTypes.REMOVE_MOVIE_FAVORITE:
            return state;
        case ActionTypes.ADD_MOVIE_WISHLIST:
            return { ...state, wishlistMovies: payload };
        case ActionTypes.REMOVE_MOVIE_WISHLIST:
            return state;
        case ActionTypes.ADD_MOVIE_WATCHED:
            return { ...state, watchedMovies: payload };
        case ActionTypes.REMOVE_MOVIE_WATCHED:
            return state;
        default:
            return state;
    }
};
