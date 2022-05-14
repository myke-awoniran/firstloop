const router = require('express').Router();
const authRouter = require('../routes/auth/auth');
const userRouter = require('../routes/users/users');
const postRouter = require('../routes/posts/posts');
// const messageRouter = require('../routes/messages/messages');
const notificationRouter = require('../routes/notifications/notifications');

router.use('/api/v1', authRouter);
router.use('/api/v1', userRouter);
router.use('/api/v1', postRouter);
// router.use('/api/v1', messageRouter);
router.use('/api/v1', notificationRouter);

module.exports = router;
