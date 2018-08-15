var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();

router.get('/',(req, res) => {
    console.log('=================================');
    console.log('BARANGAY: PROFILE');
    console.log('=================================');

    var queryString = `SELECT * FROM tbl_user 
    JOIN tbl_barangay ON tbl_user.int_userID=tbl_barangay.int_userID 
    JOIN tbl_city ON tbl_barangay.int_cityID=tbl_city.int_cityID
    WHERE tbl_user.int_userID=${req.session.barangay.int_userID}`

    db.query(queryString,(err, results1) => {

        if (err) console.log(err);
        console.log('=================================');
        console.log('BARANGAY: PROFILE - GET PROFILE INFO');
        console.log('=================================');


        res.render('barangay/profile/views/profile',{barangay_info:results1});
    });
});

router.post('/', (req, res) => {
    console.log('=================================');
    console.log('BARANGAY: PROFILE - UPDATE PROFILE INFO');
    console.log('=================================');

    var queryString1 = `UPDATE tbl_user SET
    varchar_userEmailAddress = "${req.body.barangay_email}",
    varchar_userPassword = "${req.body.barangay_password}"
    WHERE tbl_user.int_userID = ${req.session.barangay.int_userID}`;
    
    db.query(queryString1, (err, results1, fields) => {        
        if (err) throw err;

        console.log('=================================');
        console.log('BARANGAY: PROFILE - UPDATE PROFILE INFO - UPDATE QUERY 1');
        console.log('=================================');


        var queryString2 = `UPDATE tbl_barangay SET
        varchar_barangayContact = "${req.body.barangay_contact}"
        WHERE tbl_barangay.int_userID = ${req.session.barangay.int_userID}`;

        db.query(queryString2, (err, results2, fields) => {        
        console.log('=================================');
        console.log('BARANGAY: PROFILE - UPDATE PROFILE INFO - UPDATE QUERY 2');
        console.log('=================================');

        if (err) throw err;


        res.redirect('/barangay/profile');

        });
    });
});

module.exports = router;