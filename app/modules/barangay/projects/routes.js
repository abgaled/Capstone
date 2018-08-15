var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();
var moment = require('moment');


// FOR NOTIFICATIONS (VIEW SPECIFIC PROJECT APPLICATION)
router.get('/view',(req,res) => {
    console.log("PROJECT APPLICATION: NOTIFICATIONS - SPECIFIC")
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

            res.render('barangay/projects/views/specificapplication',{
                view:view,
                notifications:notifications,
                numbernotif:countrow});
        }); 
    });
});


router.get('/applications',(req, res) => {
    console.log('=================================');
    console.log('BARANGAY: PROJECTS-APPLICATION-OPEN PROJECTS');
    console.log('=================================');

    var queryString1 = `SELECT * FROM tbl_project p 
    JOIN tbl_projectproposal pp 
    ON p.int_projectID=pp.int_projectID
    WHERE p.enum_projectStatus = "Ongoing"`

    db.query(queryString1,(err, results1) => {

        var date_results = results1;

        for (var i = 0; i < date_results.length;i++){
            date_results[i].date_projectEnd = moment(date_results[i].date_projectEnd).format('MM-DD-YYYY');
        }

        var queryString2 = `SELECT * FROM tbl_notification 
        JOIN tbl_user ON tbl_notification.int_notifSenderID = tbl_user.int_userID 
        WHERE tbl_notification.int_notifReceiverID=${req.session.barangay.int_userID}
        AND enum_notifStatus = "New"
        ORDER BY tbl_notification.int_notifID DESC`

        db.query(queryString2,(err, notifications) => {
            if (err) console.log(err);
            console.log('=================================');
            console.log('BARANGAY: NOTIFICATIONS - GET NOTIFICATIONS - DATA');
            console.log('=================================');
            console.log(notifications)
        
            var countrow = notifications.length;
        
        
            res.render('barangay/projects/views/openprojects',{
                tbl_project:results1,
                notifications:notifications,
                numbernotif:countrow});
        });
    });
});


router.get('/applications/:int_projectID/apply',(req,res) => {
    console.log('=================================');
    console.log('BARANGAY: PROJECTS-APPLICATION-FORM-GET');
    console.log('=================================');

    var queryString1 = `SELECT * FROM tbl_project p JOIN tbl_projectproposal pp 
    ON p.int_projectID=pp.int_projectID WHERE p.int_projectID = ${req.params.int_projectID}`
    
    db.query(queryString1,(err, results1) => {

        var queryString2 = `SELECT tbl_projectproposal.int_categoryID FROM tbl_project JOIN tbl_projectproposal  
        ON tbl_project.int_projectID=tbl_projectproposal.int_projectID WHERE tbl_project.int_projectID = ${req.params.int_projectID}`

        db.query(queryString2,(err, results2) => {
        console.log("RESULTS2")
        var int_categoryID = results2[0];

        var queryString3 = `SELECT * FROM tbl_user JOIN tbl_barangay ON 
        tbl_user.int_userID=tbl_barangay.int_userID WHERE tbl_user.int_userID=${req.session.barangay.int_userID}`

        db.query(queryString3,(err, results3) => {

            console.log('=================================');
            console.log('BARANGAY: GET PROFILE INFO');
            console.log('=================================');

            var queryString4 = `SELECT DISTINCT (int_formtypeID) FROM tbl_categoryform cf JOIN tbl_projectproposal pp 
            ON cf.int_categoryID=pp.int_categoryID 
            WHERE pp.int_projectID = ${req.params.int_projectID}`

            db.query(queryString4,(err, results4) => {
            console.log("================RESULTS4")
            console.log(results4);

            var int_formtypeID =results4[0];
            var int_formtypeIDD =results4;


            for(var i = 0; i < int_formtypeIDD.length; i++){
                console.log(int_formtypeIDD[i]);
            }
            console.log('============================')
            console.log(int_formtypeIDD);
            console.log("======RESULTS FOR LOOP FORM TYPE ID======")
            var int_formtypeIDDD = int_formtypeIDD;
            console.log('RESULTS IDDD')
            console.log(int_formtypeIDDD);
            
            res.render('barangay/projects/views/specificproject1',{tbl_project:results1,barangay_info:results3,int_categoryID:int_categoryID,int_formtypeID:int_formtypeIDDD});
            });
        });
    });
    });
});


router.post('/applications/:int_projectID/apply',(req,res) => {
    console.log('=================================');
    console.log('BARANGAY: PROJECTS-APPLICATION-FORM-POST');
    console.log('=================================');

    var queryString1 = `INSERT INTO tbl_application 
    (\`int_barangayID\`,
    \`int_projectID\`,
    \`enum_applicationStatus\`) 
    VALUES 
    (${req.session.barangay.int_userID},
    ${req.params.int_projectID},
    "Pending")`
   

    db.query(queryString1,(err, results1, fields) => {
        if (err) console.log(err);
            console.log("INSERT: Table Application");

            var queryString2 = `SELECT * FROM tbl_barangay JOIN tbl_user
            ON tbl_user.int_userID = tbl_barangay.int_userID 
            JOIN tbl_office ON tbl_barangay.int_officeID = tbl_office.int_officeID
            WHERE tbl_user.int_userID = ${req.session.barangay.int_userID}`

            db.query(queryString2,(err, results2, fields) => {
                if (err) console.log(err);
                console.log("SELECT & JOIN: USER & OFFICE");
                console.log(results2);

                var join_useroffice = results2[0];

                var queryString3 = `INSERT INTO tbl_address 
                (\`varchar_addressLine1\`,
                \`varchar_addressLine2\`,
                \`varchar_addressLine3\`,
                \`varchar_cityName\`,
                \`enum_addressType\`) 
                VALUES 
                ("${req.body.apply_address1}",
                "${req.body.apply_address2}",
                "${req.body.apply_province}",
                "${join_useroffice.varchar_officeName}",
                "${req.body.apply_addresstype}")`


            db.query(queryString3,(err, results3, fields) => {
            if (err) console.log(err);
            console.log("SELECT & JOIN: USER & OFFICE");
            
            var queryString4 =`SELECT * FROM tbl_address ORDER BY int_addressID DESC LIMIT 0,1`

            db.query(queryString4,(err, results4, fields) => {
            if (err) console.log(err);
            console.log("SELECT:");
            
            var select_addressID = results4[0];
    

                var queryString5 = `INSERT INTO tbl_personalinformation
                (\`int_addressID\`,
                \`int_infoOwnerID\`,
                \`varchar_firstName\`,
                \`varchar_middleName\`,
                \`varchar_lastName\`,
                \`date_birthday\`,
                \`enum_gender\`,
                \`int_applicantResidency\`,
                \`enum_civilStatus\`,
                \`varchar_contactNumber\`,
                \`varchar_emailAddress\`) 
                VALUES 
                (${select_addressID.int_addressID},
                ${req.session.barangay.int_userID},
                "${req.body.apply_fname}",
                "${req.body.apply_mname}",
                "${req.body.apply_lname}",
                "${req.body.apply_birthdate}",
                "${req.body.apply_gender}",
                "${req.body.apply_yrres}",
                "${req.body.apply_civilstat}",
                "${req.body.apply_contact}",
                "${req.body.apply_emailaddress}")`
            
            db.query(queryString5,(err, results5, fields) => {
                if (err) console.log(err);
                    console.log("INSERT: Table Personal Info");


                res.redirect('/barangay/home');
            });
            });
            });
            });
    });
});



router.get('/beneficiaries',(req, res) => {
    console.log('=================================');
    console.log('BARANGAY: PROJECTS-REGISTERED APPLICANTS');
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
            
            res.render('barangay/projects/views/beneficiaries',{
                notifications:notifications,
                numbernotif:countrow});
    });
});


module.exports = router;