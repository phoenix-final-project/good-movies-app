const Comment = require('../models/Comment');

exports.createComment = async (req, res) => {
	const { userId, movieId } = req.params;
	const { comment } = req.body;
	try {
		const resultComment = await Comment.create({
			user: userId,
			movieId,
			comment,
		});

		res.status(200).send(resultComment);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

exports.getCommentsToMovie = async (req, res) => {
	const { movieId } = req.params;

	try {
		const comments = await Comment.find({ movieId, deleted: false }).sort({ date: -1 }).populate("user", "username");

		if (comments.length === 0) {
			return res.status(200).json({
				message: 'There are no comments to this movie yet',
			});
		}

		res.status(200).json(comments);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

exports.editComment = async (req, res) => {
	const { userId, commentId } = req.params;
	const { comment } = req.body;
	try {
		const commentToUpdate = await Comment.findOne({ _id: commentId, deleted: false });

		if (!commentToUpdate) throw { message: 'Comment does not exist' };
		if (commentToUpdate.user != userId) throw { message: 'Not authorized to edit' };

		const resp = await Comment.updateOne({ comment });

		res.status(200).json(resp);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

exports.deleteComment = async (req, res) => {
	const { userId, commentId } = req.params;

	try {
		const commentToDelete = await Comment.findOne({ _id: commentId, deleted: false });

		if (!commentToDelete) throw { message: 'Comment does not exist' };
		if (commentToDelete.user != userId) throw { message: 'Not authorized to delete' };

		const resp = await Comment.findByIdAndUpdate(commentId, { deleted: true });

		res.status(200).json("This comment was successfully deleted");
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};
