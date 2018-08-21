var router = require('express').Router();
var authMiddleware = require('../auth/middlewares/auth');

router.use(authMiddleware.hasAuthBarangay);

router.use('/changenotif', require('./home/routes'));
router.use('/notifications', require('./notification/routes'));
router.use('/home', require('./home/routes'));
router.use('/problemstatement', require('./problemstatement/routes'));
router.use('/projects', require('./projects/routes'));
router.use('/releasing', require('./releasing/routes'));
router.use('/reports', require('./reports/routes'));
router.use('/profile', require('./profile/routes'));






exports.barangay = router;