var router = require('express').Router();
var authMiddleware = require('../auth/middlewares/auth');

router.use(authMiddleware.hasAuthOffice);

router.use('/home', require('./home/routes'));
router.use('/maintenance', require('./maintenance/routes'));
router.use('/problems', require('./problems/routes'));
router.use('/proposals', require('./proposals/routes'));
router.use('/projects', require('./projects/routes'));
router.use('/releasing', require('./releasing/routes'));
router.use('/reports', require('./reports/routes'));
router.use('/profile', require('./profile/routes'));


exports.office = router;