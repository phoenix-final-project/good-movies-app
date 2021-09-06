const axios = require('axios').default;

const findMovieById = async id => {
	var options = {
		method: 'GET',
		url: `https://data-imdb1.p.rapidapi.com/movie/id/${id}/`,
		headers: {
			'x-rapidapi-host': 'data-imdb1.p.rapidapi.com',
			'x-rapidapi-key': '5ba43a0aa0msh78a81186ccfad0fp181919jsn821c9b5a8cdf',
		},
	};

	const response = await axios.request(options);

	return response.data;
};

module.exports = findMovieById;
