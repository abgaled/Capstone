var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();


router.get('/',(req, res) => {
    console.log('=================================');
    console.log('BARANGAY: NOTIFICATIONS');
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
        console.log(countrow)


        res.render('barangay/notification/views/notification',
            {notifications:notifications,
             numbernotif:countrow});
    });
});

router.get('/:int_notifID',(req, res) => {
    console.log('=================================');
    console.log('BARANGAY: NOTIFICATIONS - SPECIFIC');
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
        var saveNotifications = notifications[0];
        console.log(countrow)
       

        var queryString2 = `SELECT * FROM tbl_notification 
        JOIN tbl_user ON tbl_notification.int_notifSenderID = tbl_user.int_userID 
        WHERE tbl_notification.int_notifReceiverID=${req.session.barangay.int_userID}
        AND tbl_notification.int_notifID=${req.params.int_notifID}`

        db.query(queryString2,(err, results2) => {
            var view = results2[0];
            console.log("==========VIEW=========");
            console.log(view);
            console.log(view.enum_notifInfo)

            req.session.barangay.int_linkID = view.int_linkID;
            console.log("============INT LINK ID===========")
            console.log(req.session.barangay.int_linkID)

            var queryString3 = `UPDATE tbl_notification SET enum_notifStatus = 'Read' WHERE int_notifID = ?`

            db.query(queryString3,[req.params.int_notifID],(err, results3) => {
                if(view.enum_notifInfo == "Problem Statement"){
                    console.log("=====NOTIF INFO: PROBLEM STATEMENT=====");
                            
                    res.redirect(`/barangay/problemstatement/view`)
                }
                if(view.enum_notifInfo == "Barangay Award"){
                    console.log("=====NOTIF INFO: BARANGAY AWARD=====");
                        
                    res.redirect(`/barangay/awards`)
                }
                if(view.enum_notifInfo == "Project Application"){
                    console.log("=====NOTIF INFO: PROJECT APPLICATION=====");
                        
                    res.redirect(`/barangay/projects/view`);
                }
                if(view.enum_notifInfo == "Project Proposal"){
                    console.log("=====NOTIF INFO: PROJECT PROPOSAL=====");
                        
                    res.redirect(`/barangay/proposals/view`)
                }
                if(view.enum_notifInfo == "Project Releasing"){
                    console.log("=====NOTIF INFO: PROJECT RELEASING=====");
                        
                    res.redirect(`/barangay/releasing`)
                }
            });
        });
    });
});

module.exports = router;