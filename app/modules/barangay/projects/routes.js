var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();
var moment = require('moment');
var int_formTypeIDD;
var int_applicationID;
var barangayID;

// FOR NOTIFICATIONS (VIEW REGISTERED APPLICANTS)
router.get('/view',(req,res) => {
    console.log("PROJECT REGISTERED APPLICANT: NOTIFICATIONS - SPECIFIC")
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

            res.render('barangay/projects/views/notif-application',{
                view:view,
                notifications:notifications,
                numbernotif:countrow});
        }); 
    });
});


router.get('/',(req, res) => {
    console.log('=================================');
    console.log('BARANGAY: PROJECTS');
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
            
            res.render('barangay/projects/views/projects',{
                tbl_project:results1,
                notifications:notifications,
                numbernotif:countrow});
        });
    });
});

// AJAX - GET PROJECT DETAILS (VIEW)
router.post('/projectdetails',(req,res) => {
    console.log('=================================');
    console.log('BARANGAY: PROJECTS-AJAX GET DETAILS (POST)');
    console.log('=================================');
    console.log(`${req.body.ajProjectID}`);

    
    var queryString = `SELECT * FROM tbl_projectproposal pp
    JOIN tbl_project pro ON pp.int_projectID=pro.int_projectID WHERE 
    pro.enum_projectStatus = "Ongoing" 
    AND pp.int_projectID = ${req.body.ajProjectID}`


    db.query(queryString,(err, results, fields) => {
        if (err) console.log(err);

        console.log(results);

        var date_results = results;

        for (var i = 0; i < date_results.length;i++){
            date_results[i].date_startApplication = moment(date_results[i].date_startApplication).format('MM-DD-YYYY');
            date_results[i].date_endApplication = moment(date_results[i].date_endApplication).format('MM-DD-YYYY');
        }

        var resultss = results[0];

        console.log("=====RESULTSS=====")
        console.log(resultss)

        return res.send({tbl_project:resultss});
    });
});


router.get('/:int_projectID/applicationtype',(req,res) => {
    console.log('=================================');
    console.log('BARANGAY: PROJECTS-APPLICATION TYPE-GET');
    console.log('=================================');


    var queryString1 = `SELECT * FROM tbl_project p JOIN tbl_projectproposal pp 
        ON p.int_projectID=pp.int_projectID WHERE p.int_projectID = ${req.params.int_projectID}`
    
    db.query(queryString1,(err, results1) => {

        var queryString2 = `SELECT * FROM tbl_projectapplicationtype pat
        JOIN tbl_projectproposal pp 
        ON pat.int_projectID=pp.int_projectID
        WHERE pat.int_projectID = ${req.params.int_projectID}`

        db.query(queryString2,(err, results2) => {

            console.log("RESULTS 2");
            console.log(results2);

            var notificationsQuery = `SELECT * FROM tbl_notification 
            JOIN tbl_user ON tbl_notification.int_notifSenderID = tbl_user.int_userID 
            WHERE tbl_notification.int_notifReceiverID=${req.session.barangay.int_userID}
            AND enum_notifStatus = "New"
            ORDER BY tbl_notification.int_notifID DESC`

            db.query(notificationsQuery,(err, notifications) => {
                if (err) console.log(err);
                console.log('=================================');
                console.log('BARANGAY: NOTIFICATIONS - GET NOTIFICATIONS - DATA');
                console.log('=================================');
                console.log(notifications)
        
                var countrow = notifications.length;
   
                res.render('barangay/projects/views/applicationtype',{
                    tbl_project:results1,
                    tbl_applicationtype:results2,
                    notifications:notifications,
                    numbernotif:countrow
                });
            });
        });  
    });
});

router.post('/:int_projectID/applicationtype',(req,res) => {
    console.log('=================================');
    console.log('BARANGAY: PROJECTS-APPLICATION TYPE-POST');
    console.log('=================================');
    console.log(req.body.applicationtype)


    var queryString1 = `SELECT * FROM tbl_project p JOIN tbl_projectproposal pp 
    ON p.int_projectID=pp.int_projectID WHERE p.int_projectID = ${req.params.int_projectID}`

    db.query(queryString1,(err, results1) => {

        var project = results1[0];

        var queryString2 = `SELECT C.int_categoryID
            FROM tbl_project P JOIN tbl_projectcategory PC
            ON P.int_projectID=PC.int_projectID
            JOIN tbl_category C ON PC.int_categoryID=C.int_categoryID
            WHERE P.int_projectID= ${req.params.int_projectID}`

        db.query(queryString2,(err, results2) => {
            console.log("RESULTS2")
            var int_categoryID = results2[0];

            var notificationsQuery = `SELECT * FROM tbl_notification 
            JOIN tbl_user ON tbl_notification.int_notifSenderID = tbl_user.int_userID 
            WHERE tbl_notification.int_notifReceiverID=${req.session.barangay.int_userID}
            AND enum_notifStatus = "New"
            ORDER BY tbl_notification.int_notifID DESC`

            db.query(notificationsQuery,(err, notifications) => {
                if (err) console.log(err);
                console.log('=================================');
                console.log('BARANGAY: NOTIFICATIONS - GET NOTIFICATIONS - DATA');
                console.log('=================================');
                console.log(notifications)
        
                var countrow = notifications.length;


                var requirementQuery = `SELECT *
                    FROM tbl_requirement R JOIN tbl_projectrequirement PR
                    ON R.int_requirementID=PR.int_requirementID
                    WHERE PR.int_projectID= ${req.params.int_projectID}`;

                db.query(requirementQuery,(err, requirementResult) => {
                    console.log('============================')
                    console.log(requirementResult);
                    console.log("======REQUIREMENT SELECTED======")

                    
                    if (req.body.applicationtype == "Resident"){
            
                        res.render('barangay/projects/views/perresident',{
                            tbl_project:results1,
                            int_categoryID:int_categoryID,
                            requirements:requirementResult,
                            notifications:notifications,
                            numbernotif:countrow
                        });
                    }
                    if (req.body.applicationtype == "Barangay"){
            
                        res.render('barangay/projects/views/perbarangay',{
                            tbl_project:results1,
                            int_categoryID:int_categoryID,
                            requirements:requirementResult,
                            notifications:notifications,
                            numbernotif:countrow
                        });
                    }
                    if (req.body.applicationtype == "Household"){
            
                        res.render('barangay/projects/views/perhousehold',{
                            tbl_project:results1,
                            int_categoryID:int_categoryID,
                            requirements:requirementResult,
                            notifications:notifications,
                            numbernotif:countrow
                        });
                    }
                });
            });
        });
    });
});

router.get('/:int_projectID/apply',(req,res) => {
    console.log('=================================');
    console.log('BARANGAY: PROJECTS-APPLICATION-FORM-GET');
    console.log('=================================');

    

    var queryString1 = `SELECT * FROM tbl_project p JOIN tbl_projectproposal pp 
        ON p.int_projectID=pp.int_projectID WHERE p.int_projectID = ${req.params.int_projectID}`
    
    db.query(queryString1,(err, results1) => {

        var project = results1[0];

        var queryString2 = `SELECT C.int_categoryID
            FROM tbl_project P JOIN tbl_projectcategory PC
            ON P.int_projectID=PC.int_projectID
            JOIN tbl_category C ON PC.int_categoryID=C.int_categoryID
            WHERE P.int_projectID= ${req.params.int_projectID}`

        db.query(queryString2,(err, results2) => {
            console.log("RESULTS2")
            var int_categoryID = results2[0];

            var notificationsQuery = `SELECT * FROM tbl_notification 
            JOIN tbl_user ON tbl_notification.int_notifSenderID = tbl_user.int_userID 
            WHERE tbl_notification.int_notifReceiverID=${req.session.barangay.int_userID}
            AND enum_notifStatus = "New"
            ORDER BY tbl_notification.int_notifID DESC`

            db.query(notificationsQuery,(err, notifications) => {
                if (err) console.log(err);
                console.log('=================================');
                console.log('BARANGAY: NOTIFICATIONS - GET NOTIFICATIONS - DATA');
                console.log('=================================');
                console.log(notifications)
        
                var countrow = notifications.length;


                var requirementQuery = `SELECT *
                    FROM tbl_requirement R JOIN tbl_projectrequirement PR
                    ON R.int_requirementID=PR.int_requirementID
                    WHERE PR.int_projectID= ${req.params.int_projectID}`;

                db.query(requirementQuery,(err, requirementResult) => {
                    console.log('============================')
                    console.log(requirementResult);
                    console.log("======REQUIREMENT SELECTED======")

                    
                    if (project.varchar_applicationType == "Resident"){
            
                        res.render('barangay/projects/views/perresident',{
                            tbl_project:results1,
                            int_categoryID:int_categoryID,
                            requirements:requirementResult,
                            notifications:notifications,
                            numbernotif:countrow
                        });
                    }
                    if (project.varchar_applicationType == "Barangay"){
            
                        res.render('barangay/projects/views/perbarangay',{
                            tbl_project:results1,
                            int_categoryID:int_categoryID,
                            requirements:requirementResult,
                            notifications:notifications,
                            numbernotif:countrow
                        });
                    }
                    if (project.varchar_applicationType == "Household"){
            
                        res.render('barangay/projects/views/perhousehold',{
                            tbl_project:results1,
                            int_categoryID:int_categoryID,
                            requirements:requirementResult,
                            notifications:notifications,
                            numbernotif:countrow
                        });
                    }

                    else{
                        res.render('barangay/projects/views/perresident',{
                            tbl_project:results1,
                            int_categoryID:int_categoryID,
                            requirements:requirementResult,
                            notifications:notifications,
                            numbernotif:countrow
                        });
                    }

                });
            });
        });
    });
});

// ===============================================================================
//                                  APPLICATION
// ===============================================================================


// POST - APPLICATION (RESIDENT)
router.post('/:int_projectID/apply/resident',(req,res) => {
    console.log('=================================');
    console.log('BARANGAY: PROJECTS-APPLICATION-FORM(RESIDENT)-POST');
    console.log('=================================');

    var barangayQuery = `SELECT tbl_barangay.int_barangayID 
    FROM tbl_barangay 
    JOIN tbl_barangayuser
    ON tbl_barangay.int_barangayID = tbl_barangayuser.int_barangayID
    WHERE tbl_barangayuser.int_userID = ${req.session.barangay.int_userID}`

    db.query(barangayQuery, (err, barangay, fields) => {        
        if (err) throw err;

        var barangayFinal = barangay[0];

        // ===============================================================================
        //                          INSERT INTO TBL_APPLICATION
        // ===============================================================================
        var queryString1 = `INSERT INTO tbl_application 
        (\`int_barangayID\`,
        \`int_projectID\`,
        \`enum_applicationType\`,
        \`enum_applicationStatus\`) 
        VALUES 
        (${barangayFinal.int_barangayID},
        ${req.params.int_projectID},
        "Resident",
        "Pending")`
    

        db.query(queryString1,(err, results1, fields) => {
            if (err) console.log(err);
            console.log("INSERT: Table Application");

            var queryselect1 = `SELECT * FROM tbl_application ORDER BY int_applicationID DESC LIMIT 0,1`;

            db.query(queryselect1,(err, queryselect2, fields) => {
                
                console.log(queryselect2[0].int_applicationID);

                int_applicationID = queryselect2[0].int_applicationID;

                // var queryString2 = `SELECT * FROM tbl_barangay JOIN tbl_user
                //     ON tbl_user.int_userID = tbl_barangay.int_userID 
                //     JOIN tbl_city ON tbl_barangay.int_cityID = tbl_city.int_cityID
                //     WHERE tbl_user.int_userID = ${req.session.barangay.int_userID}`

                // db.query(queryString2,(err, results2, fields) => {
                //     if (err) console.log(err);
                //     console.log("SELECT & JOIN: USER & OFFICE");
                //     console.log(results2);

                    var insertPersonalInfo = `INSERT INTO tbl_personalinformation
                        (\`int_applicationID\`,
                        \`varchar_firstName\`,
                        \`varchar_middleName\`,
                        \`varchar_lastName\`,
                        \`date_birthDate\`,
                        \`enum_gender\`,
                        \`int_applicantResidency\`,
                        \`enum_civilStatus\`,
                        \`varchar_contactNumber\`,
                        \`varchar_emailAddress\`) 
                        VALUES 
                        (${int_applicationID},
                        "${req.body.apply_fname}",
                        "${req.body.apply_mname}",
                        "${req.body.apply_lname}",
                        "${req.body.apply_birthdate}",
                        "${req.body.apply_gender}",
                        "${req.body.apply_yrres}",
                        "${req.body.apply_civilstat}",
                        "${req.body.apply_contact}",
                        "${req.body.apply_emailaddress}")`

                    db.query(insertPersonalInfo,(err, personalinfo, fields) => {
                        if (err) console.log(err);

                        // INSERT TABLE APPLICATION REQUIREMENT
                        var requirements = req.body.requirementID;
                        console.log("==============REQUIREMENT=============");
                        console.log(requirements)

                        for(i = 0 ; i < requirements.length ; i++)
                        {
                        var appreqQuery = `INSERT INTO tbl_applicationrequirement
                            (
                                \`int_applicationID\`,
                                \`int_requirementID\`,
                                \`enum_appreqStatus\`
                            )
                            VALUES
                            (
                                ${int_applicationID},
                                ${requirements[i]},
                                "Passed"
                            )`;
                            
                            db.query(appreqQuery,(err, appreqResult, fields) => {
                                if(err) console.log(err);
                                
                            });
                        }
                        res.redirect('/barangay/projects');
                    });
                // });
            });
        });
    });
});

// POST - APPLICATION (BARANGAY)
router.post('/:int_projectID/apply/barangay',(req,res) => {
    console.log('=================================');
    console.log('BARANGAY: PROJECTS-APPLICATION-FORM(RESIDENT)-POST');
    console.log('=================================');

    var barangayQuery = `SELECT tbl_barangay.int_barangayID 
    FROM tbl_barangay 
    JOIN tbl_barangayuser
    ON tbl_barangay.int_barangayID = tbl_barangayuser.int_barangayID
    WHERE tbl_barangayuser.int_userID = ${req.session.barangay.int_userID}`

    db.query(barangayQuery, (err, barangay, fields) => {        
        if (err) throw err;

        var barangayFinal = barangay[0];

        // ===============================================================================
        //                          INSERT INTO TBL_APPLICATION
        // ===============================================================================
        var queryString1 = `INSERT INTO tbl_application 
        (\`int_barangayID\`,
        \`int_projectID\`,
        \`enum_applicationType\`,
        \`enum_applicationStatus\`) 
        VALUES 
        (${barangayFinal.int_barangayID},
        ${req.params.int_projectID},
        "Barangay",
        "Pending")`
    

        db.query(queryString1,(err, results1, fields) => {
            if (err) console.log(err);
            console.log("INSERT: Table Application");

            var queryselect1 = `SELECT * FROM tbl_application ORDER BY int_applicationID DESC LIMIT 0,1`;

            db.query(queryselect1,(err, queryselect2, fields) => {
                
                console.log(queryselect2[0].int_applicationID);

                int_applicationID = queryselect2[0].int_applicationID;

                    var insertBrgyApp = `INSERT INTO tbl_barangayapplication
                        (\`int_applicationID\`,
                        \`int_slot\`,
                        \`text_applicationReason\`) 
                        VALUES 
                        (${int_applicationID},
                        ${req.body.apply_slots},
                        "${req.body.apply_reason}")`

                        db.query(insertBrgyApp,(err, barangayapp, fields) => {
                            if (err) console.log(err);

                            res.redirect('/barangay/projects');
                        });
            });
        });
    });
});

// BUTTON - APPLICATIONS
router.get('/:int_projectID/registeredapplicants',(req, res) => {
    console.log('=================================');
    console.log('BARANGAY: PROJECTS-REGISTERED APPLICANTS');
    console.log('=================================');

    var barangayQuery = `SELECT tbl_barangay.int_barangayID 
    FROM tbl_barangay 
    JOIN tbl_barangayuser
    ON tbl_barangay.int_barangayID = tbl_barangayuser.int_barangayID
    WHERE tbl_barangayuser.int_userID = ${req.session.barangay.int_userID}`;
    
    db.query(barangayQuery, (err, brgyID, fields) => {
        console.log('============================')
        console.log(brgyID[0].int_barangayID);
        console.log("======REQUIREMENT SELECTED======")
    
        barangayID = brgyID[0].int_barangayID;
        console.log(barangayID);
    
        var queryString1 = `SELECT * FROM tbl_project p 
            JOIN tbl_projectproposal pp 
            ON p.int_projectID=pp.int_projectID
            WHERE p.int_projectID = ${req.params.int_projectID}`

        db.query(queryString1,(err, results1) => {

            var date_results = results1;

            for (var i = 0; i < date_results.length;i++){
                date_results[i].date_projectEnd = moment(date_results[i].date_projectEnd).format('MM-DD-YYYY');
            }

            var getResults1 = results1[0];

            var notificationQuery = `SELECT * FROM tbl_notification 
            JOIN tbl_user ON tbl_notification.int_notifSenderID = tbl_user.int_userID 
            WHERE tbl_notification.int_notifReceiverID=${req.session.barangay.int_userID}
            AND enum_notifStatus = "New"
            ORDER BY tbl_notification.int_notifID DESC`

            db.query(notificationQuery,(err, notifications) => {
                if (err) console.log(err);
                console.log('=================================');
                console.log('BARANGAY: NOTIFICATIONS - GET NOTIFICATIONS - DATA');
                console.log('=================================');
                console.log(notifications)
            
                var countrow = notifications.length;

                var applicantsQuery = `SELECT * FROM tbl_application app 
                    JOIN tbl_personalinformation pi
                    ON app.int_applicationID=pi.int_applicationID
                    WHERE app.int_projectID = ${req.params.int_projectID}
                    AND app.int_barangayID = ${barangayID}`

                db.query(applicantsQuery,(err, applicants) => {
                    if (err) console.log(err);
                    console.log('=================================');
                    console.log('BARANGAY: REGISTERED APPLICANTS - GET APPLICANTS');
                    console.log('=================================');

            
                    res.render('barangay/projects/views/applicationlist1',{
                        tbl_project:getResults1,
                        tbl_applicants:applicants,
                        notifications:notifications,
                        numbernotif:countrow});
                });
            });
        });
    });
});

// AJAX GET DETAILS VIEW DETAILS PROJECT - VIEW APPLICANT DETAILS
router.post('/:int_projectID/registeredapplicants/ajaxapplicantdetails',(req,res) => {
    console.log('=================================');
    console.log('OFFICE: PROJECT VIEW DETAILS-VIEW APPLICATION-AJAX GET DETAILS (POST)');
    console.log('=================================');
    console.log(`${req.body.ajApplicationID}`);

    var queryString = `SELECT * FROM tbl_personalinformation pi
    JOIN tbl_application ap 
    ON pi.int_applicationID=ap.int_applicationID 
    WHERE pi.int_applicationID=${req.body.ajApplicationID}`


    db.query(queryString,(err, results, fields) => {
        if (err) console.log(err);

        console.log(results);

        var date_results = results;

        for (var i = 0; i < date_results.length;i++){
            date_results[i].date_birthDate = moment(date_results[i].date_birthDate).format('MM-DD-YYYY');
        }

        var resultss = results[0];

        console.log("===================RESULTSS")
        console.log(resultss)

        return res.send({tbl_application:resultss});
    });
});


router.get('/registeredapplicants/:int_projectID/list', (req, res) => {
    console.log('=================================');
    console.log('BARANGAY: PROJECTS-REGISTERED APPLICANTS LIST');
    console.log('=================================');

    var applicantQuery = `SELECT *
        FROM tbl_application A JOIN tbl_personalinformation PI
        ON A.int_applicationID=PI.int_applicationID
        WHERE A.int_barangayID=${req.session.barangay.int_userID}
        AND A.int_projectID=${req.params.int_projectID}`;

    db.query(applicantQuery, (err, applicationlist) => {
        if(err) console.log(err);

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

            res.render('barangay/projects/views/applicationlist', {
                applicants:applicationlist,
                notifications:notifications,
                numbernotif:countrow});
        });
    });
});

module.exports = router;