var router = require('express').Router();
var authMiddleware = require('../auth/middlewares/auth');

router.use(authMiddleware.hasAuthadmin);

router.use('/dashboard', require('./dashboard/routes'));
router.use('/maintenance', require('./maintenance/routes'));
router.use('/transactions', require('./transactions/routes'));
router.use('/queries', require('./queries/routes'));
router.use('/reports', require('./reports/routes'));
router.use('/utilities', require('./utilities/routes'));



router.use('/profile', require('./profile/routes'));
router.use('/profile/editprofile', require('./profile/routes'));

exports.admin = router;