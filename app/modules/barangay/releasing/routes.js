var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();

router.get('/',(req, res) => {
    console.log('=================================');
    console.log('BARANGAY: RELEASING');
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

            res.render('barangay/releasing/views/releasing',{
                notifications:notifications,
                numbernotif:countrow});
        });
});

// FOR NOTIFICATIONS (VIEW SPECIFIC RELEASING)
router.get('/view',(req,res) => {
    console.log("RELEASING: NOTIFICATIONS - SPECIFIC")
    console.log(req.session.barangay.int_linkID)

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

        var queryString2 = `SELECT * FROM tbl_problemstatement
        WHERE int_barangayID = ${req.session.barangay.int_userID}
        AND int_statementID = ${req.session.barangay.int_linkID}`

        db.query(queryString2,(err, viewspecific) => {
            var view = viewspecific[0];

            res.render('barangay/releasing/views/specificreleasing',{
                view:view,
                notifications:notifications,
                numbernotif:countrow});
        }); 
    });
});


module.exports = router;