const express = require('express');
const router = express.Router();
const passport = require('passport');

const { createComment, getCommentsToMovie, editComment, deleteComment } = require('../controllers/commentControllers');

// tt10288566
router.get('/:movieId', getCommentsToMovie);
router.post('/create/:userId/:movieId', passport.authenticate('jwt', { session: false }), createComment);
router.put('/edit/:userId/:commentId', passport.authenticate('jwt', { session: false }), editComment);
router.delete('/delete/:userId/:commentId', passport.authenticate('jwt', { session: false }), deleteComment);

module.exports = router;
