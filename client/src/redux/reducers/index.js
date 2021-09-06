import { combineReducers } from "redux";

// session
import { sessionReducer } from "redux-react-session";

import { movieReducer } from "./movieReducer";

const reducers = combineReducers({
    session: sessionReducer,
    movies: movieReducer,
});

export default reducers;
