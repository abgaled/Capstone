var router = require('express').Router();
var authMiddleware = require('../auth/middlewares/auth');

router.use(authMiddleware.hasAuthBudget);

router.use('/home', require('./home/routes'));
router.use('/projects', require('./projects/routes'));
router.use('/reports', require('./reports/routes'));
router.use('/profile', require('./profile/routes'));


exports.budget = router;