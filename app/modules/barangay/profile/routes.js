var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();

router.get('/',(req, res) => {
    console.log('=================================');
    console.log('BARANGAY: PROFILE');
    console.log('=================================');

    var queryString = `SELECT * FROM tbl_user 
    JOIN tbl_officialsaccount
    ON tbl_user.int_userID=tbl_officialsaccount.int_userID 
    JOIN tbl_barangay
    ON tbl_officialsaccount.int_officialsID=tbl_barangay.int_barangayID
    JOIN tbl_city 
    ON tbl_barangay.int_cityID=tbl_city.int_cityID
    WHERE tbl_user.int_userID=${req.session.barangay.int_userID}`

    db.query(queryString,(err, results1) => {

        if (err) console.log(err);
        console.log('=================================');
        console.log('BARANGAY: PROFILE - GET PROFILE INFO');
        console.log('=================================');

        var queryString1 = `SELECT * FROM tbl_notification 
        JOIN tbl_user ON tbl_notification.int_notifSenderID = tbl_user.int_userID 
        WHERE tbl_notification.int_notifReceiverID=${req.session.barangay.int_userID}
        AND enum_notifStatus = "New"
        ORDER BY tbl_notification.int_notifID DESC`

            db.query(queryString1,(err, notifications) => {
                if (err) console.log(err);
                console.log('=================================');
                console.log('BARANGAY: NOTIFICATIONS - GET NOTIFICATIONS - DATA');
                console.log('=================================');
                console.log(notifications)
        
                var countrow = notifications.length;


                res.render('barangay/profile/views/profile',{
                    barangay_info:results1,
                    notifications:notifications,
                    numbernotif:countrow});
            });
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


        var queryString2 = `UPDATE tbl_barangay 
        JOIN tbl_officialsaccount
        ON tbl_barangay.int_barangayID=tbl_officialsaccount.int_officialsID
        SET
        tbl_barangay.varchar_barangayContact = "${req.body.barangay_contact}"
        WHERE tbl_officialsaccount.int_userID = ${req.session.barangay.int_userID}`;

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