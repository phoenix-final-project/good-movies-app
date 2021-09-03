const User = require('../models/User');
const Genre = require('../models/Genre');
const bcrypt = require('bcrypt');
const { generateToken } = require('../helpers/jwtIssuer');

// REGISTER a user
exports.registerUser = async (req, res) => {
	try {
		const { username, firstname, lastname, password, email, favoriteGenres } = req.body;

		const checkUser = await User.findOne({ username });

		if (checkUser) {
			return res.status(400).json({ message: 'User with this username already exists in our Database' });
		}

		// hashing password
		const hashedPassword = await bcrypt.hash(password, 10);
		// console.log(hashedPassword)

		//creating a new user from User model
		const createdUser = await User.create({
			username,
			firstname,
			lastname,
			password: hashedPassword,
			email,
			favoriteGenres,
		});

		res.status(200).json({ message: 'User was created', createdUser: createdUser });
	} catch (error) {
		res.status(400).send({ message: 'Error occurred', error: error.message });
	}
};

// LOGIN a user
exports.loginUser = async (req, res) => {
	try {
		const { username, password } = req.body;

		const user = await User.findOne({ username });

		// checking if the user exists in our DB OR if the users' field "deleted" is "true"
		if (user === null || user.deleted === true) {
			return res.status(404).json({ message: `User ${username} not found` });
		}

		// comparing passwords
		const checkPassword = await bcrypt.compare(password, user.password);

		if (!checkPassword) {
			return res.status(401).json({ message: 'Passwords do not match! Try again!' });
		}

		// issuing a session token
		const token = await generateToken(user);
		console.log(token);

		res.status(200).json({ success: true, message: 'Passwords match, you are logged in', token: token, user: user });
	} catch (error) {
		res.status(500).json({ message: 'Error occurred', error: error.message });
	}
};

// DELETE a user - PUT method
exports.deleteUser = async (req, res) => {

	try {

		// checking user authorization to perform the action
		if (req.body.userId != req.user._id) {
			return res.status(401).json({ message: "User is not authorized to perform this action" })
		}

		const user = await User.findByIdAndUpdate(req.body.userId, {
			deleted: true
		}, { new: true });


		// if (user === null) {
		// 	return res.status(404).send(`User with ID ${req.body.userId} was not found`);
		// }

		res.status(200).json({ message: `User ${user.username} was deleted`, deletedUser: user });
	} catch (error) {
		console.log(error);
		res.status(400).send({ message: 'Error occurred', error: error.message });
	}
};


// GET user by username
exports.getUserByUsername = async (req, res) => {
	try {
		const user = await User.findOne({ username: req.params.username })
		// .populate("friends.user")

		if (user === null || user.deleted === true) {
			return res.status(404).json({ message: `User ${req.params.username} was not found` });
		}


		res.status(200).json({ foundUser: user });
	} catch (error) {
		res.status(400).send({ message: 'Error occurred', error: error.message });
	}
};

// PUT - add a friend to a user
exports.addFriend = async (req, res) => {

	try {

		const { username, friendUsername } = req.body

		// checking if the friend and user exist in our DB (and not deleted)
		const friend = await User.findOne({ username: friendUsername, deleted: false });
		const user = await User.findOne({ username, deleted: false });

		if (friend === null || user === null) {
			return res.status(404).json({ message: `User ${req.body.friendUsername} was not found` });
		}

		// checking user authorization to perform the action
		if (user.username != req.user.username) {
			return res.status(401).json({ message: "User is not authorized to perform this action" })
		}

		// checking if the user is trying to add self
		if (friend.username == user.username) {
			return res.status(500).json({ message: "You can not add yourself to friends!" })
		}

		// checking if this friend is already user's friend
		const checkFriendExist = user.friends.find(item => {
			return item.user.equals(friend._id)
		})

		if (checkFriendExist) {
			return res.status(400).json({ message: `This user is already in your friends' list` });
		}

		// adding a new friend to the friends' list
		await user.updateOne({
			$addToSet: { friends: { user: friend._id } }
		}, { new: true })


		res.status(200).json({ message: `${friend.username} successfully added to your friends' list` });

	} catch (error) {
		res.status(400).send({ message: 'Error occurred', error: error.message });
	}
}