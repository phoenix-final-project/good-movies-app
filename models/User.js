const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
	username: { type: String, required: true, unique: true },
	firstname: { type: String, required: true },
	lastname: { type: String },
	password: { type: String, required: true },
	email: { type: String },
	favoriteGenres: [{ genre: { type: Schema.Types.ObjectId, ref: 'Genre' } }],
	registerDate: { type: Date, default: Date.now },
	friends: [{ user: { type: Schema.Types.ObjectId, ref: 'User' }, date: { type: Date, default: Date.now } }],
});

const User = model('User', UserSchema);

module.exports = User;
