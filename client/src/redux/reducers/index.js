import { combineReducers } from "redux";

import { movieReducer } from "./movieReducer";
import { userReducer } from "./userReducer";

const reducers = combineReducers({
    user: userReducer,
    movies: movieReducer,
});

export default reducers;
