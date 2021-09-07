import { combineReducers } from 'redux';

// import auth from "./auth";
// import message from "./message";

import { movieReducer } from './movieReducer';

const reducers = combineReducers({
	// auth,
	// message,
	movies: movieReducer,
});

export default reducers;
