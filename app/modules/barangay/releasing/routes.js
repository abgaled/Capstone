var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();
var moment = require('moment');

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

            var queryString2 = `SELECT * FROM tbl_project 
            JOIN tbl_application ON tbl_project.int_projectID = tbl_application.int_projectID
            JOIN tbl_projectproposal ON tbl_project.int_projectID = tbl_projectproposal.int_projectID
            WHERE tbl_project.enum_projectStatus = "Releasing"
            AND tbl_application.int_barangayID = ${req.session.barangay.int_userID}
            ORDER BY tbl_project.int_projectID ASC`

            db.query(queryString2,(err, results2) => {
                console.log("=====RELEASING PROJECTS=====");
                console.log(results2);
                console.log("=====RELEASING PROJECTS=====");

                for (var i = 0; i < results2.length;i++){
                    results2[i].datetime_releasingStart = moment(results2[i].datetime_releasingStart).format('MM-DD-YYYY');
                }

                res.render('barangay/releasing/views/releasing',{
                    releasingprojects:results2,
                    notifications:notifications,
                    numbernotif:countrow});
            });
        });
});


router.get('/:int_projectID/beneficiaries',(req,res) => {
    console.log('=================================');
    console.log('BARANGAY: RELEASING-SPECIFIC PROJECT--GET');
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

            var queryString3 = `SELECT * FROM tbl_project p JOIN tbl_projectproposal pp 
            ON p.int_projectID=pp.int_projectID WHERE p.int_projectID = ${req.params.int_projectID}`
            
            db.query(queryString3,(err, results3) => {

                var queryString4 = `SELECT * FROM tbl_application ap 
                JOIN tbl_personalinformation pi 
                ON ap.int_applicationID=pi.int_applicationID
                WHERE ap.int_barangayID = ${req.session.barangay.int_userID}
                AND ap.int_projectID = ${req.params.int_projectID}
                AND ap.enum_applicationStatus = "Approved"`

                db.query(queryString4,(err, results4) => {

                
                res.render('barangay/releasing/views/projectbeneficiaries',{
                    projects:results3,
                    applications:results4,
                    notifications:notifications,
                    numbernotif:countrow});
            });
        });
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