var router = require('express').Router();
var authMiddleware = require('../auth/middlewares/auth');

router.use(authMiddleware.hasAuth);

router.use('/home', require('./home/routes'));
router.use('/residents', require('./residents/routes'));
router.use('/reports', require('./reports/routes'));
router.use('/mailbox', require('./mailbox/routes'));
router.use('/awards', require('./awards/routes'));






router.use('/profile', require('./profile/routes'));
router.use('/profile/editprofile', require('./profile/routes'));

exports.barangay = router;