const axios = require("axios").default;


exports.findByIdAndMap = (array, res) => {

    const moviesInfo = array.map(async item => {

        let options = {
            method: 'GET',
            url: `https://data-imdb1.p.rapidapi.com/movie/id/${item.imdb_id}/`,
            headers: {
                'x-rapidapi-host': 'data-imdb1.p.rapidapi.com',
                'x-rapidapi-key': process.env.RAPID_API_KEY
            }
        }

        return await axios.request(options)
            .then((response) => response.data)
            .catch((error) => {
                console.error(error.message);
            });
    })

    // resolving asynchronicity for "map" method
    return Promise.all(moviesInfo)
        .then(results => res.status(200).json(Object.values(results)));
}