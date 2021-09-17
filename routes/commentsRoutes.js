const express = require('express');
const router = express.Router();
const passport = require('passport');

const { createComment, getCommentsToMovie, editComment } = require('../controllers/commentControllers');

// tt10288566
router.get('/:movieId', getCommentsToMovie);
router.post('/create/:userId/:movieId', createComment);
router.put('/edit/:userId/:commentId', editComment);

module.exports = router;
