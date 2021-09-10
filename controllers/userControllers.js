const User = require("../models/User");
const Genre = require("../models/Genre");
const bcrypt = require("bcrypt");
const { generateToken } = require("../helpers/jwtIssuer");

// REGISTER a user
exports.registerUser = async (req, res) => {
    try {
        const {
            username,
            firstname,
            lastname,
            password,
            email,
            favoriteGenres,
        } = req.body;

        const checkUser = await User.findOne({ username });

        if (checkUser) {
            return res
                .status(400)
                .json({ message: "User with this username already exists" });
        }

        // hashing password
        const hashedPassword = await bcrypt.hash(password, 10);
        // console.log(hashedPassword)

        //creating a new user from User model
        const createdUser = await User.create({
            username,
            firstname,
            lastname,
            avatar: (firstname[0] + lastname[0]).toUpperCase(),
            password: hashedPassword,
            email,
        });

        res.status(200).json({
            message: "User was created",
            createdUser: createdUser,
        });
    } catch (error) {
        res.status(400).send({
            message: "Error occurred",
            error: error.message,
        });
    }
};

// LOGIN a user
exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        // checking if the user exists in our DB OR if the users' field "deleted" is "true"
        if (user === null || user.deleted === true) {
            return res
                .status(404)
                .json({ message: `User ${username} not found` });
        }

        // comparing passwords
        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            return res
                .status(401)
                .json({ message: "Passwords do not match! Try again!" });
        }

        // issuing a session token
        const token = await generateToken(user);
        console.log(token);

        res.status(200).json({
            success: true,
            message: "Passwords match, you are logged in",
            token: token,
            user: user,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error occurred",
            error: error.message,
        });
    }
};

// UPDATE a user
exports.updateUser = async (req, res) => {
    try {
        const username = req.params.username;
        const { firstname, lastname, password, email } = req.body;

        const user = await User.findOne({ username });

        // checking if the user exists in our DB OR if the user's field "deleted" is "true"
        if (user === null || user.deleted === true) {
            return res
                .status(404)
                .json({ message: `User ${username} not found` });
        }

        // console.log("check :", username, req.user.username);

        // checking user authorization to perform the action
        if (username !== req.user.username) {
            return res
                .status(401)
                .json({
                    message: "User is not authorized to perform this action",
                });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        //updating a user
        const updatedUser = await User.findOneAndUpdate(
            { username },
            {
                firstname,
                lastname,
                avatar: (firstname[0] + lastname[0]).toUpperCase(),
                password: hashedPassword,
                email,
            },
            { new: true }
        );

        res.status(200).json({ message: "User was successfully updated" });
    } catch (error) {
        res.status(400).send({
            message: "Error occurred",
            error: error.message,
        });
    }
};

// DELETE a user - PUT method
exports.deleteUser = async (req, res) => {
    try {
        // checking user authorization to perform the action
        if (req.body.userId != req.user._id) {
            return res
                .status(401)
                .json({
                    message: "User is not authorized to perform this action",
                });
        }

        const user = await User.findByIdAndUpdate(
            req.body.userId,
            {
                deleted: true,
            },
            { new: true }
        );

        // if (user === null) {
        // 	return res.status(404).send(`User with ID ${req.body.userId} was not found`);
        // }

        res.status(200).json({
            message: `User ${user.username} was deleted`,
            deletedUser: user,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            message: "Error occurred",
            error: error.message,
        });
    }
};

// GET user by username
exports.getUserByUsername = async (req, res) => {
    try {
        const user = await User.findOne({
            username: req.params.username,
        }).select("username firstname lastname avatar email registerDate");

        if (user === null || user.deleted === true) {
            return res
                .status(404)
                .json({ message: `User ${req.params.username} was not found` });
        }

        res.status(200).json({ foundUser: user });
    } catch (error) {
        res.status(400).send({
            message: "Error occurred",
            error: error.message,
        });
    }
};

// GET/find user by name, surname, username
exports.findUserByAnyName = async (req, res) => {
    try {
        const findAllUsers = await User.find({
            $text: { $search: req.params.name },
            deleted: false,
        });
        // console.log("findAllUsers", findAllUsers.length);

        // return a message if no user was found
        if (findAllUsers.length === 0) {
            return res
                .status(404)
                .send({ message: `User *${req.params.name}* was not found` });
        }

        const findAllUsersWithInfo = [];

        // re-organize data in the array for better Frontend use
        findAllUsers.forEach((user) => {
            findAllUsersWithInfo.push({
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                avatar: user.avatar,
                // email: user.email
            });
        });

        res.status(200).json({
            foundUsersNumber: findAllUsers.length,
            foundUsers: findAllUsersWithInfo,
        });
    } catch (error) {
        res.status(400).send({
            message: "Error occurred",
            error: error.message,
        });
    }
};

// GET /show friends of a user
exports.getFriendsOfUser = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username })
            .select("friends.user")
            .populate("friends.user");

        console.log(user);

        if (user === null || user.deleted === true) {
            return res
                .status(404)
                .json({ message: `User ${req.params.username} was not found` });
        }

        // getting "friends" field only
        const friends = user.friends;

        if (friends.length === 0) {
            return res
                .status(404)
                .json({
                    message: `User ${req.params.username} doesn't have any friends`,
                });
        }

        // creating a new array of friends
        let friendsArray = [];

        friends.forEach((item) => {
            // showing only existing friends/users - if the user has deleted profile, this friend won't be shown
            if (item.user) {
                if (item.user.deleted == false) {
                    friendsArray.push({
                        username: item.user.username,
                        firstname: item.user.firstname,
                        lastname: item.user.lastname,
                        avatar: item.user.avatar,
                        email: item.user.email,
                        id: item.user._id,
                    });
                }
            }
        });

        res.status(200).json(friendsArray);
    } catch (error) {
        res.status(400).send({
            message: "Error occurred",
            error: error.message,
        });
    }
};

// PUT - add a friend to a user
exports.addFriend = async (req, res) => {
    try {
        const { username, friendUsername } = req.body;

        // checking if the friend and user exist in our DB (and not deleted)
        const friend = await User.findOne({
            username: friendUsername,
            deleted: false,
        });
        const user = await User.findOne({ username, deleted: false });

        if (friend === null || user === null) {
            return res
                .status(404)
                .json({
                    message: `User ${req.body.friendUsername} was not found`,
                });
        }

        // checking user authorization to perform the action
        if (user.username != req.user.username) {
            return res
                .status(401)
                .json({
                    message: "User is not authorized to perform this action",
                });
        }

        // checking if the user is trying to add self
        if (friend.username == user.username) {
            return res
                .status(500)
                .json({ message: "You can not add yourself to friends!" });
        }

        // checking if this friend is already user's friend
        const checkFriendExist = user.friends.find((item) => {
            return item.user.equals(friend._id);
        });

        if (checkFriendExist) {
            return res
                .status(400)
                .json({
                    message: `This user is already in your friends' list`,
                });
        }

        // adding a new friend to the friends' list
        await user.updateOne(
            {
                $addToSet: { friends: { user: friend._id } },
            },
            { new: true }
        );

        res.status(200).json({
            message: `${friend.username} successfully added to your friends' list`,
        });
    } catch (error) {
        res.status(400).send({
            message: "Error occurred",
            error: error.message,
        });
    }
};

// PUT - delete a friend from a user - editing a user
exports.deleteFriend = async (req, res) => {
    try {
        const { username, friendUsername } = req.body;

        // checking if the friend and user exist in our DB (and not deleted)
        const friend = await User.findOne({
            username: friendUsername,
            deleted: false,
        });
        const user = await User.findOne({ username, deleted: false });

        if (friend === null || user === null) {
            return res
                .status(404)
                .json({
                    message: `User ${req.body.friendUsername} was not found`,
                });
        }

        // checking if this friend is user's friend
        const checkFriendExist = user.friends.find((item) => {
            return item.user.equals(friend._id);
        });

        if (!checkFriendExist) {
            return res
                .status(400)
                .json({
                    message: `User ${req.body.friendUsername} is not in your friends' list!`,
                });
        }

        // checking user authorization to perform the action
        if (user.username != req.user.username) {
            return res
                .status(401)
                .json({
                    message: "User is not authorized to perform this action",
                });
        }

        // deleting a friend from the friends' list
        await user.updateOne(
            {
                $pull: { friends: { user: friend._id } },
            },
            { new: true }
        );

        res.status(200).json({
            message: `${friend.username} deleted from your friends' list`,
        });
    } catch (error) {
        res.status(400).send({
            message: "Error occurred",
            error: error.message,
        });
    }
};
