const { Schema, model } = require('mongoose');

const FavoriteListSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	movieId: { type: String, required: true }, // for imdb id received from api
	date: { type: Date, default: Date.now },
});

const FavoriteList = model('FavoriteList', FavoriteListSchema);

module.exports = FavoriteList;
