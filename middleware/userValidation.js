const { body, validationResult } = require('express-validator');
const { capitalizeFirstLetter } = require('../helpers/capitalizeFirstLetter');

module.exports.validateUser = [
	body('firstname').exists().trim().isAlphanumeric().withMessage('First name should be alphanumeric'),
	function (req, res, next) {
		let errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).json({
				title: 'An error occurred',
				error: errors,
			});
		next();
	},
	body('lastname').exists().trim().isAlphanumeric().withMessage('Last name should be alphanumeric'),
	function (req, res, next) {
		let errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).json({
				title: 'An error occurred',
				error: errors,
			});
		next();
	},
	body('email').exists().trim().isEmail().withMessage('This is not a valid E-mail'),
	function (req, res, next) {
		let errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).json({
				title: 'An error occurred',
				error: errors,
			});
		next();
	},
	body('favoriteGenres').exists().isArray().isLength({ min: 3, max: 3 }), // check if works
	function (req, res, next) {
		let errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).json({
				title: 'An error occurred',
				error: errors,
			});
		next();
	},
];

module.exports.sanitizeUser = [
	body('email').normalizeEmail(),

	function (req, res, next) {
		req.body.firstName = capitalizeFirstLetter(req.body.firstName);
		req.body.lastName = capitalizeFirstLetter(req.body.lastName);
		next();
	},
];
