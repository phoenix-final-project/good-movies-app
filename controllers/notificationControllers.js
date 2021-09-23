const Notification = require('../models/Notification');

exports.createNotification = async (req, res) => {
	const { user1, user2, movieId } = req.body;

	try {
		const result = await Notification.create({ user1, user2, movieId });

		res.status(200).json(result);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

exports.setToRead = async (req, res) => {
	const { notificationId } = req.params;
	try {
		const result = await Notification.findOneAndUpdate({ _id: notificationId, readStatus: false }, { readStatus: true }, { new: true });
		res.status(200).json(result);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

exports.getUserNotifications = async (req, res) => {
	const { userId } = req.params;

	try {
		const userNotification = await Notification.find({ user2: userId, readStatus: false });
		res.status(200).json({ numOfNew: userNotification.length, data: userNotification });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};
