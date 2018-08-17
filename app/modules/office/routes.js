var router = require('express').Router();
var authMiddleware = require('../auth/middlewares/auth');

router.use(authMiddleware.hasAuthOffice);

router.use('/home', require('./home/routes'));
router.use('/projects', require('./projects/routes'));
router.use('/problems', require('./problems/routes'));

router.use('/problems/submittedproblems', require('./problems/routes'));
router.use('/proposals', require('./proposals/routes'));
router.use('/schedule', require('./schedule/routes'));
router.use('/reports', require('./reports/routes'));
router.use('/releasing', require('./releasing/routes'));
router.use('/awards', require('./awards/routes'));
router.use('/addbrgyaccnt', require('./addbrgyaccnt/routes'));







router.use('/profile', require('./profile/routes'));
router.use('/profile/editprofile', require('./profile/routes'));

exports.office = router;