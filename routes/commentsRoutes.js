const express = require('express');
const router = express.Router();
const passport = require('passport');

const { createComment, getCommentsToMovie, editComment, deleteComment } = require('../controllers/commentControllers');

// Get ALL comments to the movie
router.get('/:movieId', getCommentsToMovie);

// CREATE a new comment to the movie
router.post('/create/:userId/:movieId', passport.authenticate('jwt', { session: false }), createComment);

router.put('/edit/:userId/:commentId', passport.authenticate('jwt', { session: false }), editComment);

// DELETE a comment while logged in using PUT method
router.put('/delete/:userId/:commentId', passport.authenticate('jwt', { session: false }), deleteComment);

module.exports = router;
