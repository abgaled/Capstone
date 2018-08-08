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

    db.query(queryString1,(err, results1) => {

        if (err) console.log(err);
        console.log('=================================');
        console.log('BARANGAY: HOME - GET NOTIFICATIONS - DATA');
        console.log('=================================');
        console.log(results1)

        var countrow = results1.length;
        console.log(countrow)
    
        res.render('barangay/home/views/home',
            {notifications:results1,
            numbernotif:countrow});
    
    });
});

router.post('/changenotif', (req, res) => {
    console.log('=================================');
    console.log('NOTIFICATIONS - VIEW NOTIF ');
    console.log('=================================');
    console.log(`${req.body.notif_id}`)

    // var queryString1 = `UPDATE tbl_notification SET
    // enum_notifStatus = "Viewed"
    // WHERE tbl_notification.int_notifID = ${req.body.notif_id}`;

    queryString2 = `SELECT * FROM tbl_notification WHERE int_notifID= ? ${req.body.notif_id}`

    // db.query(queryString1,[req.body.notif_id], (err, results, fields) =>{
        var queryString1 = `SELECT * FROM tbl_notification
    JOIN tbl_user ON tbl_notification.int_notifSenderID = tbl_user.int_userID 
    WHERE tbl_notification.int_notifReceiverID=${req.session.barangay.int_userID}
    AND enum_notifStatus = "New"
    ORDER BY tbl_notification.int_notifID DESC`

    db.query(queryString1,(err, results1) => {

        if (err) console.log(err);
        console.log('=================================');
        console.log('BARANGAY: HOME - GET NOTIFICATIONS - DATA');
        console.log('=================================');
        

        var countrow = results1.length;
        console.log(countrow)
        
    res.render('barangay/home/views/home',{notifications:results1,
        numbernotif:countrow})    
    });
});



module.exports = router;