var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();



router.get('/applications',(req, res) => {
    console.log('=================================');
    console.log('BARANGAY: RESIDENTS-APPLICATIONS');
    console.log('=================================');

    res.render('barangay/residents/views/applications');

});

router.get('/beneficiaries',(req, res) => {
    console.log('=================================');
    console.log('BARANGAY: RESIDENTS-BENEFICIARIES');
    console.log('=================================');

    res.render('barangay/residents/views/beneficiaries');

});


module.exports = router;