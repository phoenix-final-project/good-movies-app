const { body, validationResult } = require('express-validator');
const { capitalizeFirstLetter } = require('../helpers/capitalizeFirstLetter');

module.exports.validateUser = [
	body('username').exists().trim().isAlphanumeric().withMessage('Username should be alphanumeric'),
	function (req, res, next) {
		let errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).json({
				title: 'An error occurred',
				error: errors,
			});
		next();
	},
	body('firstname').exists().trim().withMessage('First name should be alphanumeric'),
	function (req, res, next) {
		let errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).json({
				title: 'An error occurred',
				error: errors,
			});
		next();
	},
	body('lastname').exists().trim().withMessage('Last name should be alphanumeric'),
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

];

module.exports.sanitizeUser = [
	body('email').normalizeEmail(),

	function (req, res, next) {
		req.body.firstname = capitalizeFirstLetter(req.body.firstname);
		req.body.lastname = capitalizeFirstLetter(req.body.lastname);
		next();
	},
];
