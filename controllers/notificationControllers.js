const Notification = require('../models/Notification');
const findMovieById = require('../helpers/findMovieById');
const findByIdAndMap = require('../helpers/findByIdAndMap');

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
		// get the number of new notifications
		const numberOfNewNotifications = await Notification.count({ user2: userId, readStatus: false });

		// get all notifications of a current user
		const userNotificationsAll = await Notification.find({ user2: userId }).populate('user1');

		// get the needed data of a friend and of a movie of all current user's notifications
		const notificationDataRaw = userNotificationsAll.map(async notification => {
			const userData = {
				id: notification.user1._id,
				username: notification.user1.username,
				avatar: notification.user1.avatar,
			};

			const response = await findMovieById(notification.movieId);
			const getMovieData = Object.values(response)[0];

			const movieData = {
				imdb_id: getMovieData.imdb_id,
				title: getMovieData.title,
				image: getMovieData.image_url,
			};

			return { friend: userData, movie: movieData };
		});

		// wait until receive all data
		const notificationData = await Promise.all(notificationDataRaw);

		res.status(200).json({ numOfNew: numberOfNewNotifications, notificationData });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};
