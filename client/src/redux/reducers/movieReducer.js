import { ActionTypes } from "../constants/action-types";

const initialState = {
    favoriteMovies: ["JS", "CSS", "React", "HTML"],
    wishlistMovies: [],
    watchedMovies: [],
};

export const movieReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        // favorite
        case ActionTypes.ADD_MOVIE_FAVORITE:
            return { ...state, favoriteMovies: payload };
        case ActionTypes.REMOVE_MOVIE_FAVORITE:
            return state;

        //wishlist
        case ActionTypes.GET_MOVIES_WISHLIST:
            return payload;
        case ActionTypes.ADD_MOVIE_WISHLIST:
            return { ...state, wishlistMovies: payload };
        case ActionTypes.REMOVE_MOVIE_WISHLIST:
            return state;

        //Watched
        case ActionTypes.ADD_MOVIE_WATCHED:
            return { ...state, watchedMovies: payload };
        case ActionTypes.REMOVE_MOVIE_WATCHED:
            return state;
        default:
            return state;
    }
};
