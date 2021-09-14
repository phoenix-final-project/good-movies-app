import axios from './APIinstance';

export const getListMoviesIds = async (listName, callback) => {
	try {
		const listIds = await axios.get(`/api/${listName}/movies-id/${window.localStorage.getItem('user_id')}`);
		callback(listIds.data);
	} catch (error) {
		console.log(error);
	}
};

export const addMovieToList = async (listName, movie) => {
	try {
		const res = await axios.post(`/api/${listName}/add-movie/${window.localStorage.getItem('user_id')}`, { movie });

		console.log(res.data);
		return Promise.resolve();
	} catch (error) {
		console.log(error.response);
		return Promise.reject();
	}
};

export const getListMovies = async (listName, listCallback, numCallback) => {
	try {
		const res = await axios.get(`/api/${listName}/${window.localStorage.getItem('user_id')}`);
		listCallback(res.data.data); // for list
		numCallback(res.data.numOfMovies); // for quantity of movies in a list
	} catch (error) {
		console.log(error.response);
	}
};
