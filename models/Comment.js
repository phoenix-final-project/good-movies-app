const { Schema, model } = require('mongoose');

// Creating Comment schema
const CommentSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	movieId: { type: String, required: true }, // for imdb id received from api
	comment: { type: String, required: true },
	date: { type: Date, default: Date.now, required: true },
});

const Comment = model('Comment', CommentSchema);

module.exports = Comment;
