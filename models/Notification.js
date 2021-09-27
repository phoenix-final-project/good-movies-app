const { Schema, model } = require('mongoose');

const NotificationSchema = new Schema({
	user1: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	user2: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	movieId: { type: String, required: true },
	readStatus: { type: Boolean, default: false, required: true },
	date: { type: Date, default: Date.now },
});

const Notification = model('Notification', NotificationSchema);

module.exports = Notification;
