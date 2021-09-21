const express = require('express');
const router = express.Router();
const passport = require('passport');

const { createNotification, setToRead, getUserNotifications } = require('../controllers/notificationControllers');

router.post('/create', createNotification);
router.put('/set-to-read/:notificationId', setToRead);
router.get('/:userId', getUserNotifications);

module.exports = router;
