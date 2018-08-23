var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();

router.get('/',(req, res) => {
    console.log('=================================');
    console.log('BARANGAY: HOME - GET');
    console.log('=================================');

    var queryString1 = `SELECT * FROM tbl_notification 
    JOIN tbl_user ON tbl_notification.int_notifSenderID = tbl_user.int_userID 
    WHERE tbl_notification.int_notifReceiverID=${req.session.barangay.int_userID}
    AND enum_notifStatus = "New"
    ORDER BY tbl_notification.int_notifID DESC`

    db.query(queryString1,(err, notifications) => {

        if (err) console.log(err);
        console.log('=================================');
        console.log('BARANGAY: HOME - GET NOTIFICATIONS - DATA');
        console.log('=================================');
        console.log(notifications)

        var countrow = notifications.length;
        console.log(countrow)
    
        res.render('barangay/home/views/home',
            {notifications:notifications,
            numbernotif:countrow});
    
    });
});

router.post('/changenotif', (req, res) => {
    console.log('=================================');
    console.log('NOTIFICATIONS - VIEW NOTIF ');
    console.log('=================================');
    console.log(`${req.body.notif_id}`)


    var queryString1 = `SELECT * FROM tbl_notification
    JOIN tbl_user ON tbl_notification.int_notifSenderID = tbl_user.int_userID 
    WHERE tbl_notification.int_notifReceiverID=${req.session.barangay.int_userID}
    AND enum_notifStatus = "New"
    ORDER BY tbl_notification.int_notifID DESC`

    var queryString2 = `SELECT * FROM tbl_notification WHERE int_notifID= ? ${req.body.notif_id}`


    db.query(queryString1,(err, notifications) => {

        if (err) console.log(err);
        console.log('=================================');
        console.log('BARANGAY: HOME - GET NOTIFICATIONS - DATA');
        console.log('=================================');
        

        var countrow = results1.length;
        console.log(countrow)
        
    res.render('barangay/home/views/home',
        {notifications:notifications,
        numbernotif:countrow})    
    });
});



module.exports = router;