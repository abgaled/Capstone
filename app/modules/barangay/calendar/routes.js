var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();

router.get('/',(req, res) => {
    console.log('=================================');
    console.log('BARANGAY: CALENDAR');
    console.log('=================================');

    var queryString = `SELECT * FROM tbl_user JOIN tbl_barangay ON 
    tbl_user.int_userID=tbl_barangay.int_barangayUserID WHERE tbl_user.int_userID=${req.session.barangay.int_userID}`

    db.query(queryString,(err, results1) => {

        if (err) console.log(err);
        console.log('=================================');
        console.log('BARANGAY: GET PROFILE INFO');
        console.log('=================================');

        res.render('barangay/calendar/views/calendar',{barangay_info:results1});
    });
});

module.exports = router;