const express = require('express');
const router = express.Router();
const passport = require('passport');

const { createNotification, setToRead, getUserNotifications, getAllNotifications } = require('../controllers/notificationControllers');

router.post('/create', passport.authenticate('jwt', { session: false }), createNotification);
router.put('/set-to-read/:notificationId', passport.authenticate('jwt', { session: false }), setToRead);
router.get('/:userId', passport.authenticate('jwt', { session: false }), getUserNotifications);
router.get('/all/:userId', getAllNotifications);

module.exports = router;
