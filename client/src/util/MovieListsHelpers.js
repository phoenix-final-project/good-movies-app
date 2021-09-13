import axios from './APIinstance';

export const getListMoviesIds = async (listName, callback) => {
	try {
		const listIds = await axios.get(`/api/${listName}/movies-id/${window.localStorage.getItem('user_id')}`);
		callback(listIds.data);
	} catch (error) {
		console.log(error);
	}
};
