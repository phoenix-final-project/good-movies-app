const { Schema, model } = require('mongoose');

const MovieSchema = new Schema({
	imdb_id: { type: String, required: true, unique: true },
	title: { type: String, required: true },
	year: { type: Number },
	description: { type: String },
	movie_length: { type: Number },
	rating: { type: Number },
	trailer: { type: String },
	plot: { type: String },
	image_url: { type: String },
	banner: {
		type: String,
		default: 'https://images.pexels.com/photos/390089/film-movie-motion-picture-390089.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
	},
	gen: [{ genre: String, required: true }],
});

const Movie = model('Movie', MovieSchema);

module.exports = Movie;
