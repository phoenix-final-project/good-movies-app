const Genres = require('./Genre');
const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
	username: { type: String, required: [true, 'Please, provide a username'], unique: [true, 'This username already exists'] },
	firstname: { type: String, required: [true, 'Please, provide your first name'] },
	lastname: { type: String },
	password: { type: String, required: [true, 'Please, provide a password'], max: [5, 'The password must me at least 5 characters'] },
	email: { type: String, required: [true, 'Please, provide your email address'] },
	favoriteGenres: [
		{
			type: Schema.Types.ObjectId,
			ref: 'User',
			min: [3, 'Please, choose your three favorite movie genres'],
			max: [3, 'Please, choose your three favorite movie genres'],
		},
	],
	registerDate: { type: Date, default: Date.now },
	friends: [{ user: { type: Schema.Types.ObjectId, ref: 'User' }, date: { type: Date, default: Date.now }, deleted: { type: Boolean, default: false } }],
	deleted: { type: Boolean, default: false }, // to delete the user
});

const User = model('User', UserSchema);

module.exports = User;
