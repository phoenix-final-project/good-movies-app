const Notification = require('../models/Notification');
const findMovieById = require('../helpers/findMovieById');

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

// get new notifications
exports.getUserNotifications = async (req, res) => {
	const { userId } = req.params;

	try {
		const userNotification = await Notification.find({ user2: userId, readStatus: false });
		res.status(200).json({ numOfNew: userNotification.length, data: userNotification });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// get all notifications
exports.getAllNotifications = async (req, res) => {
	const { userId } = req.params;

	try {
		// get all notifications of a current user
		const userNotificationsAll = await Notification.find({ user2: userId }).sort({ date: -1 }).populate('user1');

		// get the needed data of a friend and of a movie of all current user's notifications
		const notificationDataRaw = userNotificationsAll.map(async notification => {
			const userData = {
				id: notification.user1._id,
				username: notification.user1.username,
				firstname: notification.user1.firstname,
				avatar: notification.user1.avatar,
				avatarColor: notification.user1.avatarColor,
			};

			const response = await findMovieById(notification.movieId);
			const getMovieData = Object.values(response)[0];

			const movieData = {
				imdb_id: getMovieData.imdb_id,
				title: getMovieData.title,
				image: getMovieData.image_url,
			};

			const date1 = new Date(notification.date);
			const date2 = new Date();

			const dateDifference = date2.getTime() - date1.getTime();
			const days = Math.round(dateDifference / (1000 * 3600 * 24));

			return { friend: userData, movie: movieData, created: days };
		});

		// wait until receive all data
		const notificationData = await Promise.all(notificationDataRaw);

		res.status(200).json(notificationData);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

exports.getAllInvitations = async (req, res) => {
	const { userId } = req.params;

	try {
		const friendInvitedFullData = await Notification.find({ user2: userId });
		const iInvitedFullData = await Notification.find({ user1: userId });

		const friendInvited = friendInvitedFullData.map(invitation => {
			return { userId: invitation.user1, movieId: invitation.movieId };
		});

		const iInvited = iInvitedFullData.map(invitation => {
			return { userId: invitation.user2, movieId: invitation.movieId };
		});

		res.status(200).json({ friendInvited, iInvited });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};
