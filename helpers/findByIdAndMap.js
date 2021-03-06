const axios = require('axios').default;

exports.findByIdAndMap = array => {
	const moviesInfo = array.map(async item => {
		let options = {
			method: 'GET',
			url: `https://data-imdb1.p.rapidapi.com/movie/id/${item.imdb_id}/`,
			headers: {
				'x-rapidapi-host': 'data-imdb1.p.rapidapi.com',
				'x-rapidapi-key': process.env.RAPID_API_KEY,
			},
		};

		return await axios
			.request(options)
			.then(response => response.data)
			.catch(error => {
				console.error(error.message);
			});
	});

	return Promise.all(moviesInfo)
		.then(results => Object.values(results))
		.then(data => {
			let movieArray = [];

			data.forEach(item => {
				let movie = Object.values(item)[0];

				if (array[data.indexOf(item)].director) {
					let movie2 = {
						director: array[data.indexOf(item)].director,
						director_id: array[data.indexOf(item)].director_id,
						...movie,
					};

					movieArray.push(movie2);
				} else {
					movieArray.push(movie);
				}
			});

			return movieArray;
		});
};
