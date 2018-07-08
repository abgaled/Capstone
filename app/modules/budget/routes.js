var router = require('express').Router();
var authMiddleware = require('../auth/middlewares/auth');

router.use(authMiddleware.hasAuthBudget);

router.use('/home', require('./home/routes'));
router.use('/proposals', require('./proposals/routes'));
router.use('/schedule', require('./schedule/routes'));
router.use('/reports', require('./reports/routes'));
router.use('/mailbox', require('./mailbox/routes'));






router.use('/profile', require('./profile/routes'));
router.use('/profile/editprofile', require('./profile/routes'));

exports.budget = router;