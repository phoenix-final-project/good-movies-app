const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
	username: {
		type: String,
		required: [true, 'Please, provide a username'],
		unique: [true, 'This username already exists'],
		min: [4, 'The username must be at least 4 characters long'],
	},
	firstname: { type: String, required: [true, 'Please, provide your first name'] },
	lastname: { type: String, required: [true, 'Please, provide your last name'] },
	avatar: { type: String },
	avatarColor: { type: String },
	password: { type: String, required: [true, 'Please, provide a password'], min: [5, 'The password must be at least 5 characters long'] },
	email: { type: String, required: [true, 'Please, provide your email address'] },
	favoriteGenres: [{ type: String }],
	registerDate: { type: Date, default: Date.now },
	friends: [{ user: { type: Schema.Types.ObjectId, ref: 'User' }, date: { type: Date, default: Date.now }, deleted: { type: Boolean, default: false } }],
	deleted: { type: Boolean, default: false }, // to delete the user
});

const User = model('User', UserSchema);

module.exports = User;
