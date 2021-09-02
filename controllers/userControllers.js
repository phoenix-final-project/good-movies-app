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
			return res.status(400).send('User with this username already exists in our Database');
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

		// console.log(user)

		if (user === null) {
			return res.status(404).send(`User ${username} not found`);
		}

		const checkPassword = await bcrypt.compare(password, user.password);

		if (!checkPassword) {
			return res.status(401).send('Passwords do not match! Try again!');
		}

		const token = await generateToken(user);
		console.log(token);

		res.status(200).json({ success: true, message: 'Passwords match, you are logged in', token: token, user: user });
	} catch (error) {
		res.status(500).json({ message: 'Error occurred', error: error.message });
	}
};

// DELETE a user
exports.deleteUser = async (req, res) => {
	try {
		const user = await User.findByIdAndDelete(req.params.userId);

		if (user === null) {
			return res.status(404).send(`User with ID ${req.params.userId} was not found`);
		}

		res.status(200).json({ message: `User ${user.username} was deleted`, deletedUser: user });
	} catch (error) {
		res.status(400).send({ message: 'Error occurred', error: error.message });
	}
};


// GET user by username
exports.getUserByUsername = async (req, res) => {
	try {
		const user = await User.findOne({ username: req.params.username })
			.populate("favoriteGenres")
			.populate("friends.user")

		if (user === null) {
			return res.status(404).send(`User ${req.params.username} was not found`);
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

		// checking if the friend and user exist in our DB
		const friend = await User.findOne({ username: friendUsername });
		const user = await User.findOne({ username });

		if (friend === null || user === null) {
			return res.status(404).json({ message: `User ${req.body.friendUsername} was not found` });
		}

		// checking if the user is trying to add self
		if (friend.username == user.username) {
			return res.status(500).json({ message: "You can not add yourself to friends!" })
		}

		// console.log(user.friends[0].user);

		// checking if this friend is already user's friend

		// const checkFriendExist = await user.findOne({
		// 	username: friendUsername
		// 	// friends: user._id
		// })
		// console.log(checkFriendExist);


		await user.updateOne({
			$addToSet: { friends: { user: friend._id } }
		}, { new: true })


		// res.status(200).json({ updatedUser: user });
		res.status(200).json({ updatedUser: user });

	} catch (error) {
		res.status(400).send({ message: 'Error occurred', error: error.message });
	}
}