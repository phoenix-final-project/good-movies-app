const { Schema, model } = require('mongoose');

const CommentSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	movieId: { type: String, required: true }, // for imdb id received from api
	comment: { type: String, required: true },
	date: { type: Date, default: Date.now, required: true },
	deleted: { type: Boolean, default: false },
});

const Comment = model('Comment', CommentSchema);

module.exports = Comment;
