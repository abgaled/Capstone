var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();

router.get('/',(req, res) => {
    console.log('=================================');
    console.log('BARANGAY: CALENDAR');
    console.log('=================================');

    res.render('barangay/calendar/views/calendar');

});

module.exports = router;