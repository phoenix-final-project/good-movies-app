const { Schema, model } = require('mongoose');

const GenreSchema = new Schema({
	genre: { type: String, required: true },
});

const Genre = model('Genre', GenreSchema);

module.exports = Genre;
