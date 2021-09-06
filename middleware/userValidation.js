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

	// not working - because isLength apparently
	// ******************************************
	// body('favoriteGenres').exists().isArray().isLength({ min: 3, max: 3 }), // check if works
	// function (req, res, next) {
	// 	let errors = validationResult(req);
	// 	if (!errors.isEmpty())
	// 		return res.status(400).json({
	// 			title: 'An error occurred',
	// 			error: errors,
	// 		});
	// 	next();
	// },

	// works without isLength:
	// body('favoriteGenres').exists().isArray().withMessage('Please, indicate you favorite movie genre'),
	// function (req, res, next) {
	// 	let errors = validationResult(req);
	// 	if (!errors.isEmpty())
	// 		return res.status(400).json({
	// 			title: 'An error occurred',
	// 			error: errors,
	// 		});
	// 	next();
	// },
];

module.exports.sanitizeUser = [
	body('email').normalizeEmail(),

	function (req, res, next) {
		req.body.firstname = capitalizeFirstLetter(req.body.firstname);
		req.body.lastname = capitalizeFirstLetter(req.body.lastname);
		next();
	},
];
