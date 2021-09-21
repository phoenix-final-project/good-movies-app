const { Schema, model } = require('mongoose');

const NotificationSchema = new Schema({
	user1: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	user2: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	readStatus: { type: Boolean, default: false, required: true },
});

const Notification = model('Notification', NotificationSchema);

module.exports = Notification;
