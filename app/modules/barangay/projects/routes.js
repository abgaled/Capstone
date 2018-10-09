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

    var queryString1 = `SELECT * FROM tbl_projectdetail 
    JOIN tbl_projectapplicationtype
    ON tbl_projectdetail.int_projectID = tbl_projectapplicationtype.int_projectID
    WHERE tbl_projectdetail.enum_projectStatus = "Ongoing" 
    OR tbl_projectdetail.enum_projectStatus = "Closed Releasing"`

    db.query(queryString1,(err, results1) => {

        for (var i = 0; i < results1.length;i++){
            results1[i].date_targetEndApp = moment(results1[i].date_targetEndApp).format('MMMM DD[,] YYYY');
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

                    for (var i = 0; i < results1.length;i++){
                        var approvedSlotsFinal = results1[i].int_allotedSlot ;
                        console.log("APPROVED SLOTS FINAL ===============")
                        console.log(approvedSlotsFinal);
                        console.log("APPROVED SLOTS FINAL ===============")

                        var countSlotsFinal = results1[i].int_projectID ;

                            console.log("INT PROJECT ID")
                            console.log(countSlotsFinal)
                            console.log("INT PROJECT ID")

                        // for (var a = 0; a < approvedslots.length; a++){
                        // console.log("APPROVED SLOTS FINAL ===============")
                        // console.log(approvedSlotsFinal);
                        // console.log("APPROVED SLOTS FINAL ===============")
                        // }
                    }
                    var countSlots = `SELECT COUNT(*) FROM tbl_application 
                            JOIN tbl_projectdetail 
                            ON tbl_application.int_projectID = tbl_projectdetail.int_projectID
                            WHERE tbl_application.enum_applicationStatus = "Approved"
                            AND tbl_application.int_projectID = ${countSlotsFinal}`

                        db.query(countSlots,(err, approvedslots) => {
                            if (err) console.log(err);

                            console.log("APPROVED SLOTS COUNT ===============")
                            console.log(approvedslots);
                            console.log("APPROVED SLOTS COUNT ===============")

                        });
                    
            
                    res.render('barangay/projects/views/projects',{
                        tbl_project:results1,
                        notifications:notifications,
                        numbernotif:countrow
                    });
        });
    });
});

// AJAX - GET PROJECT DETAILS (VIEW)
router.post('/projectdetails',(req,res) => {
    console.log('=================================');
    console.log('BARANGAY: PROJECTS-AJAX GET DETAILS (POST)');
    console.log('=================================');
    console.log(`${req.body.ajProjectID}`);

    
    var queryString = `SELECT * FROM tbl_projectdetail 
        WHERE tbl_projectdetail.enum_projectStatus = "Ongoing" 
        AND tbl_projectdetail.int_projectID = ${req.body.ajProjectID}`


    db.query(queryString,(err, results, fields) => {
        if (err) console.log(err);

        var resultss = results[0];


        resultss.date_actualStartApp = moment(resultss.date_actualStartApp).format('MMMM DD[,] YYYY');
        resultss.date_targetEndApp = moment(resultss.date_targetEndApp).format('MMMM DD[,] YYYY');

        console.log("=====RESULTSS=====")
        console.log(resultss)

        return res.send({tbl_project:resultss});
    });
});


// AJAX - GET PROJECT DETAILS (VIEW)
router.post('/checkbrgyapp',(req,res) => {
    console.log('=================================');
    console.log('BARANGAY: PROJECTS-AJAX CHECK BARANGAY APPLICATION (POST)');
    console.log('=================================');
    console.log(`${req.body.ajProjectID}`);
    console.log(`${req.session.barangay.int_userID}`);


    var queryString = `SELECT * FROM tbl_officialsaccount 
        JOIN tbl_user
        ON tbl_user.int_userID = tbl_officialsaccount.int_userID
        WHERE tbl_user.int_userID = ${req.session.barangay.int_userID}`

        db.query(queryString,(err, results, fields) => {
            if (err) console.log(err);   

            var brgyID = results[0];
            console.log("=======================BRGY ID")
            console.log(brgyID);
            console.log("=======================BRGY ID END")
            
            
            var queryString1 = `SELECT * FROM tbl_application
                JOIN tbl_barangayapplication
                ON tbl_application.int_applicationID = tbl_barangayapplication.int_applicationID
                JOIN tbl_officialsaccount
                ON tbl_application.int_barangayID = tbl_officialsaccount.int_officialsID 
                WHERE tbl_application.int_projectID = ${req.body.ajProjectID}
                AND tbl_officialsaccount.int_officialsID = ${brgyID.int_officialsID}`


                db.query(queryString1,(err, results1, fields) => {
                    if (err) console.log(err);

                    console.log("=======CHECK IF THERE'S AN APPLICATION======");
                    console.log(results1)
                    console.log("=======CHECK IF THERE'S AN APPLICATION======");

                    if(results1.length > 0 ){
                        
                        console.log("MAY RECORD");

                        var record = true;

                        return res.send({check_app:results1,record:record});
                    }

                    else{
                        console.log("WALANG RECORD");
                        
                        var record = false;
                        
                        return res.send({check_app:results1,record:record});
                                
                        
                    }
                    // END OF ELSE
        });
    });
});

router.get('/:int_projectID/apply',(req,res) => {
    console.log('=================================');
    console.log('BARANGAY: PROJECTS-APPLICATION-FORM-GET');
    console.log('=================================');

    

    var queryString1 = `SELECT * FROM tbl_projectdetail
        JOIN tbl_projectapplicationtype
        ON tbl_projectdetail.int_projectID = tbl_projectapplicationtype.int_projectID
        WHERE tbl_projectdetail.int_projectID = ${req.params.int_projectID}`
    
    db.query(queryString1,(err, results1) => {

        var project = results1[0];

        var queryString2 = `SELECT C.int_categoryID
            FROM tbl_project P JOIN tbl_projectcategory PC
            ON P.int_projectID=PC.int_projectID
            JOIN tbl_category C ON PC.int_categoryID=C.int_categoryID
            WHERE P.int_projectID= ${req.params.int_projectID}`

        db.query(queryString2,(err, results2) => {
            console.log("RESULTS2")
            var int_categoryID = results2;

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
                    console.log(project.enum_applicationType)
                    
                    if (project.enum_applicationType == "Resident"){
            
                        res.render('barangay/projects/views/perresident',{
                            tbl_project:results1,
                            int_categoryID:int_categoryID,
                            requirements:requirementResult,
                            notifications:notifications,
                            numbernotif:countrow
                        });
                    }
                    if (project.enum_applicationType == "Barangay"){
            
                        res.render('barangay/projects/views/perbarangay',{
                            tbl_project:results1,
                            int_categoryID:int_categoryID,
                            requirements:requirementResult,
                            notifications:notifications,
                            numbernotif:countrow
                        });
                    }
                    if (project.enum_applicationType == "Household"){
            
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
    

    console.log(req.session.barangay.int_userID);

    var barangayQuery = `SELECT tbl_barangay.int_barangayID 
        FROM tbl_barangay 
        JOIN tbl_officialsaccount
        ON tbl_barangay.int_barangayID = tbl_officialsaccount.int_officialsID
        WHERE tbl_officialsaccount.int_userID = ${req.session.barangay.int_userID}`

    db.query(barangayQuery, (err, barangay, fields) => {        
        if (err) throw err;

        var barangayFinal = barangay[0];
        console.log(barangayFinal);

        var curdatetime = moment().format('YYYY-MM-DD HH:mm:ss');
        console.log(curdatetime);


        // ===============================================================================
        //                          INSERT INTO TBL_APPLICATION
        // ===============================================================================
        var queryString1 = `INSERT INTO tbl_application 
        (\`int_barangayID\`,
        \`int_projectID\`,
        \`enum_applicationType\`,
        \`enum_applicationStatus\`,
        \`datetime_submittedDate\`) 
        VALUES 
        (${barangayFinal.int_barangayID},
        ${req.params.int_projectID},
        "Resident",
        "Pending",
        "${curdatetime}")`
    

        db.query(queryString1,(err, results1, fields) => {
            if (err) console.log(err);
            console.log("INSERT: Table Application");

            var queryselect1 = `SELECT * FROM tbl_application ORDER BY int_applicationID DESC LIMIT 0,1`;

            db.query(queryselect1,(err, queryselect2, fields) => {
                
                console.log(queryselect2[0].int_applicationID);

                int_applicationID = queryselect2[0].int_applicationID;

                    var insertPersonalInfo = `INSERT INTO tbl_personalinformation
                        (\`int_applicationID\`,
                        \`varchar_firstName\`,
                        \`varchar_middleName\`,
                        \`varchar_lastName\`,
                        \`date_birthDate\`,
                        \`enum_gender\`,
                        \`year_applicantResidency\`,
                        \`enum_civilStatus\`,
                        \`varchar_contactNumber\`,
                        \`varchar_emailAddress\`,
                        \`text_address\`) 
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
                        "${req.body.apply_emailaddress}",
                        "${req.body.apply_address}")`

                    db.query(insertPersonalInfo,(err, personalinfo, fields) => {
                        if (err) console.log(err);

                        // INSERT TABLE APPLICATION REQUIREMENT
                        var requirements = req.body.requirementID;
                        var requirementsloc = req.body.requirementLoc;

                        console.log("==============REQUIREMENT=============");
                        console.log(requirements)
                        console.log("==============REQUIREMENT LOCATION=============");
                        console.log(requirementsloc)


                        for(i = 0 ; i < requirements.length ; i++)
                        {
                            for(j = 0 ; j < requirementsloc.length ; j++)
                            {
                            var appreqQuery = `INSERT INTO tbl_applicationrequirement
                                (
                                    \`int_applicationID\`,
                                    \`int_requirementID\`,
                                    \`varchar_fileLocation\`,
                                    \`enum_appreqStatus\`
                                )
                                VALUES
                                (
                                    ${int_applicationID},
                                    ${requirements[i]},
                                    "${requirementsloc[j]}",
                                    "Passed"
                                )`;
                            
                                db.query(appreqQuery,(err, appreqResult, fields) => {
                                    if(err) console.log(err);
                                    
                                    
                                });
                            }
                        }
                        // END OF FOR LOOP (PASSED & LOCATION)
                        res.redirect('/barangay/projects');

                            
                    });
            });
        });
    });
});

// POST - APPLICATION (BARANGAY)
router.post('/:int_projectID/apply/barangay',(req,res) => {
    console.log('=================================');
    console.log('BARANGAY: PROJECTS-APPLICATION-FORM(BARANGAY)-POST');
    console.log('=================================');

    var barangayQuery = `SELECT tbl_barangay.int_barangayID 
    FROM tbl_barangay 
    JOIN tbl_officialsaccount
    ON tbl_barangay.int_barangayID = tbl_officialsaccount.int_officialsID
    WHERE tbl_officialsaccount.int_userID = ${req.session.barangay.int_userID}`

    db.query(barangayQuery, (err, barangay, fields) => {        
        if (err) throw err;

        var barangayFinal = barangay[0];

        var curdatetime = moment().format('YYYY-MM-DD HH:mm:ss');
        console.log(curdatetime);

        // ===============================================================================
        //                          INSERT INTO TBL_APPLICATION
        // ===============================================================================
        var queryString1 = `INSERT INTO tbl_application 
        (\`int_barangayID\`,
        \`int_projectID\`,
        \`enum_applicationType\`,
        \`enum_applicationStatus\`,
        \`datetime_submittedDate\`) 
        VALUES 
        (${barangayFinal.int_barangayID},
        ${req.params.int_projectID},
        "Barangay",
        "Pending",
        "${curdatetime}")`
    

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

// POST - APPLICATION (HOUSEHOLD)
router.post('/:int_projectID/apply/household',(req,res) => {
    console.log('=================================');
    console.log('BARANGAY: PROJECTS-APPLICATION-FORM(HOUSEHOLD)-POST');
    console.log('=================================');

    console.log("==========FAM NAME ==========");
    console.log(req.body.famfname);
    console.log("==========FAM NAME ==========");
    console.log(req.body.famlname);
    console.log("==========FAM NAME ==========");
    console.log(req.body.fammname);
    console.log("==========FAM CIVIL ==========");
    console.log(req.body.famcivil);
    console.log("==========FAM EDUC ==========");
    console.log(req.body.fameduc);
    console.log("==========FAM OCCU ==========");
    console.log(req.body.famoccu);

    console.log("==============FINANCIAL CONTRIBUTION =============");
    console.log("==========FAM CONPURPOSE ==========");
    console.log(req.body.famconpurpose);
    console.log("==========FAM CONFREQUENCY ==========");
    console.log(req.body.famconfrequency);
    console.log("==========FAM CONANNUAL ==========");
    console.log(req.body.famconannual);

    console.log("==========FAM HOUSE ==========");
    console.log(req.body.apply_famhouse);


    var barangayQuery = `SELECT tbl_barangay.int_barangayID 
    FROM tbl_barangay 
    JOIN tbl_officialsaccount
    ON tbl_barangay.int_barangayID = tbl_officialsaccount.int_officialsID
    WHERE tbl_officialsaccount.int_userID = ${req.session.barangay.int_userID}`

    db.query(barangayQuery, (err, barangay, fields) => {        
        if (err) throw err;

        var barangayFinal = barangay[0];
        
        var curdatetime = moment().format('YYYY-MM-DD HH:mm:ss');
        console.log(curdatetime);
        // ===============================================================================
        //                          INSERT INTO TBL_APPLICATION
        // ===============================================================================
        var queryString1 = `INSERT INTO tbl_application 
        (\`int_barangayID\`,
        \`int_projectID\`,
        \`enum_applicationType\`,
        \`enum_applicationStatus\`,
        \`datetime_submittedDate\`) 
        VALUES 
        (${barangayFinal.int_barangayID},
        ${req.params.int_projectID},
        "Household",
        "Pending",
        "${curdatetime}")`
    

        db.query(queryString1,(err, results1, fields) => {
            if (err) console.log(err);
            console.log("INSERT: Table Application");

            var queryselect1 = `SELECT * FROM tbl_application ORDER BY int_applicationID DESC LIMIT 0,1`;

            db.query(queryselect1,(err, queryselect2, fields) => {
                
                console.log(queryselect2[0].int_applicationID);

                int_applicationID = queryselect2[0].int_applicationID;

                        var insertHousehold = `INSERT INTO tbl_householdapplication
                        (\`int_applicationID\`,
                        \`varchar_familyName\`,
                        \`text_homeAddress\`,
                        \`decimal_totalAnnualIncome\`, 
                        \`enum_houseStatus\`) 
                        VALUES 
                        (${int_applicationID},
                        "${req.body.apply_famname}",
                        "${req.body.apply_famaddress}",
                        "${req.body.apply_famincome}",
                        "${req.body.apply_famhouse}")`

                        db.query(insertHousehold,(err, household, fields) => {
                            if (err) console.log(err);

                            var fname = req.body.famfname;
                            var mname = req.body.fammname;
                            var lname = req.body.famlname;
                            var civil = req.body.famcivil;
                            var educ = req.body.fameduc;
                            var occu = req.body.famoccu;

                            for(var i = 0 ; i < fname.length ; i++) {

                                var insertFamily = `INSERT INTO tbl_familybackground
                                (\`int_applicationID\`,
                                \`varchar_memberFName\`,
                                \`varchar_memberMName\`,
                                \`varchar_memberLName\`, 
                                \`enum_civilStatus\`,
                                \`text_educationalAttainment\`,
                                \`varchar_occupation\`) 
                                VALUES 
                                (${int_applicationID},
                                "${fname[i]}",
                                "${mname[i]}",
                                "${lname[i]}",
                                "${civil[i]}",
                                "${educ[i]}",
                                "${occu[i]}")`

                                db.query(insertFamily,(err, family, fields) => {
                                    if (err) console.log(err);
                                });
                            }
                            
                            var purpose = req.body.famconpurpose;
                            var relationship = req.body.famconrel;
                            var freq = req.body.famconfrequency;
                            var annual = req.body.famconannual;

                            for(var j = 0 ; j < purpose.length ; j++) {
                                
                                var insertFinCon = `INSERT INTO tbl_financialcontribution
                                    (\`int_applicationID\`,
                                    \`text_finconPurpose\`,
                                    \`varchar_relationship\`,
                                    \`enum_frequency\`, 
                                    \`decimal_annualContribution\`) 
                                    VALUES 
                                    (${int_applicationID},
                                    "${purpose[j]}",
                                    "${relationship[j]}",
                                    "${freq[j]}",
                                    "${annual[j]}"
                                )`;

                                db.query(insertFinCon,(err, fincon, fields) => {
                                    if (err) console.log(err);
                                });
                            }

                            res.redirect('/barangay/projects');
                        });
            });
        });
    });          
});

// ================================================================
//  END OF APPLICATIONS (RESIDENT, BARANGAY, HOUSEHOLD)
// ================================================================

// BUTTON - APPLICATIONS
router.get('/:int_projectID/registeredapplicants',(req, res) => {
    console.log('=================================');
    console.log('BARANGAY: PROJECTS-REGISTERED APPLICANTS');
    console.log('=================================');

    var barangayQuery = `SELECT tbl_barangay.int_barangayID 
    FROM tbl_barangay 
    JOIN tbl_officialsaccount
    ON tbl_barangay.int_barangayID = tbl_officialsaccount.int_officialsID
    WHERE tbl_officialsaccount.int_userID = ${req.session.barangay.int_userID}`;
    
    db.query(barangayQuery, (err, brgyID, fields) => {
        console.log('============================')
        console.log(brgyID[0].int_barangayID);
        console.log("======REQUIREMENT SELECTED======")
    
        barangayID = brgyID[0].int_barangayID;
        console.log(barangayID);
    
        var queryString1 = `SELECT * FROM tbl_projectdetail
            JOIN tbl_projectapplicationtype
            ON tbl_projectdetail.int_projectID = tbl_projectapplicationtype.int_projectID
            WHERE tbl_projectdetail.int_projectID = ${req.params.int_projectID}`

        db.query(queryString1,(err, results1) => {

            var date_results = results1;

            for (var i = 0; i < date_results.length;i++){
                date_results[i].date_projectEnd = moment(date_results[i].date_projectEnd).format('MM-DD-YYYY');
            }

            

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


                // QUERY APPLICATIONS (RESIDENTS)
                var applicantsQuery = `SELECT * FROM tbl_application app 
                    JOIN tbl_personalinformation pi
                    ON app.int_applicationID=pi.int_applicationID
                    WHERE app.int_projectID = ${req.params.int_projectID}
                    AND app.int_barangayID = ${barangayID}`

                db.query(applicantsQuery,(err, applicants) => {
                    if (err) console.log(err);
                    console.log('=================================');
                    console.log('BARANGAY: REGISTERED APPLICANTS - GET APPLICANTS (Resident)');
                    console.log('=================================');

                    var houseQuery = `SELECT * FROM tbl_application app 
                    JOIN tbl_householdapplication pi
                    ON app.int_applicationID=pi.int_applicationID
                    WHERE app.int_projectID = ${req.params.int_projectID}
                    AND app.int_barangayID = ${barangayID}`

                    db.query(houseQuery,(err, household) => {
                        if (err) console.log(err);
                        console.log('=================================');
                        console.log('BARANGAY: REGISTERED APPLICANTS - GET APPLICANTS (Household)');
                        console.log('=================================');

                        // QUERY APPLICATIONS (BARANGAY)
                        var barangayQuery = `SELECT * FROM tbl_application app 
                        JOIN tbl_barangayapplication bap
                        ON app.int_applicationID = bap.int_applicationID
                        WHERE app.int_projectID = ${req.params.int_projectID}
                        AND app.int_barangayID = ${barangayID}`

                        db.query(barangayQuery,(err, barangay) => {
                            if (err) console.log(err);
                            console.log('=================================');
                            console.log('BARANGAY: REGISTERED APPLICANTS - GET APPLICANTS (Barangay)');
                            console.log('=================================');

                
                            res.render('barangay/projects/views/applicationlist',{
                                tbl_project:results1,
                                tbl_applicants:applicants,
                                tbl_barangay:barangay,
                                tbl_household:household,
                                notifications:notifications,
                                numbernotif:countrow});
                        });
                    });
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

router.post('/:int_projectID/registeredapplicants/ajaxhouseholddetails',(req,res) => {
    console.log('=================================');
    console.log('OFFICE: PROJECT VIEW DETAILS-VIEW APPLICATION-AJAX GET DETAILS (POST)');
    console.log('=================================');
    console.log(`${req.body.ajHouseholdID}`);

    var queryString = `SELECT * FROM tbl_householdapplication pi
    JOIN tbl_application ap 
    ON pi.int_applicationID=ap.int_applicationID 
    WHERE pi.int_applicationID=${req.body.ajHouseholdID}`


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

        return res.send({tbl_householdapplication:resultss});
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


router.get('/:int_projectID/liquidation',(req, res) => {
    console.log('=================================');
    console.log('BARANGAY: ONGOING PROJECT - LIQUIDATION');
    console.log('=================================');

    // var queryString = `UPDATE tbl_project SET
    // enum_projectStatus = 'Finished'
    // WHERE tbl_project.int_projectID = "${req.body.int_projectID}"`

    // db.query(queryString, (err, results, fields) => {
    //     console.log(results);
    // });
    var queryNOTIF = `SELECT * FROM tbl_notification 
    JOIN tbl_user ON tbl_notification.int_notifSenderID = tbl_user.int_userID 
    WHERE tbl_notification.int_notifReceiverID=${req.session.barangay.int_userID}
    AND enum_notifStatus = "New"
    ORDER BY tbl_notification.int_notifID DESC`

    db.query(queryNOTIF,(err, notifications) => {
        if (err) console.log(err);
        console.log('=================================');
        console.log('BARANGAY: NOTIFICATIONS - GET NOTIFICATIONS - DATA');
        console.log('=================================');
        console.log(notifications)

        var queryString1 =`SELECT * FROM tbl_expense ex
        JOIN tbl_projectdetail proj ON ex.int_projectID = proj.int_projectID
        WHERE ex.int_projectID = "${req.params.int_projectID}"`

        var queryString2 =`SELECT * FROM tbl_projectdetail proj
        WHERE proj.int_projectID = "${req.params.int_projectID}"`

        var queryString3 =`SELECT SUM(decimal_estimatedAmount) AS "total_estimatedexpense" 
        FROM tbl_expense
        WHERE int_projectID = "${req.params.int_projectID}"`

        var queryString4 =`SELECT SUM(decimal_actualAmount) AS "total_expense" 
        FROM tbl_expense
        WHERE int_projectID = "${req.params.int_projectID}"`

        // var queryString6 =`SELECT (SELECT decimal_amount FROM tbl_checkapproval
        //     WHERE int_projectID = "${req.params.int_projectID}")-(SUM(decimal_actualAmount)) AS "budgetbalance" 
        //     FROM tbl_expense
        //     WHERE int_projectID = "${req.params.int_projectID}"`

            db.query(queryString1, (err, results1, fields) => {
                console.log(results1)
                db.query(queryString2, (err, results2, fields) => { 
                    console.log(results2)
                    db.query(queryString3, (err, results3, fields) => {
                        console.log(results3)
                        db.query(queryString4, (err, results4, fields) => {
                            console.log(results4)
                            // db.query(queryString6, (err, results6, fields) => { 
                                // console.log(results6)
                    
        
                            res.render('barangay/projects/views/liquidation',
                            {
                                tbl_expenses:results1,
                                tbl_project:results2,
                                totalest:results3,
                                total:results4,
                                // tbl_rembal:results6,
                                notifications:notifications
                            });
                        // });
                    });
                });
            });
        });
    });
});

router.post('/senliquidation', (req, res) => {
    console.log('=================================');
    console.log('BARANGAY: Project finproj POST');
    console.log('=================================');

    console.log(req.body.int_projectID);

    var desc = req.body.expenseDesc;
    console.log(desc);

    var expenseID = req.body.int_expenseID;
    console.log(expenseID);

    var total_amount = req.body.total_amount;
    console.log(total_amount);

    var Quantity = req.body.Unit_Quantity;
    console.log(Quantity);

    var unitPrice = req.body.decimal_unitPrice;
    console.log(unitPrice);

    console.log(expenseID.length);
    console.log(total_amount.length);
    for(var i=0;i<total_amount.length;i++)
    {
        console.log(expenseID[i]);
        console.log(total_amount[i]);
        console.log(Quantity[i]);

        if(i<expenseID.length)
        {
            console.log(i);
            var queryString1 = `UPDATE tbl_expense SET
            decimal_actualAmount = ${total_amount[i]},
            int_actualQuantity = ${Quantity[i]}
            WHERE tbl_expense.int_expenseID = ${expenseID[i]}`
            db.query(queryString1, (err, results) => {        
                if (err) throw err;
            });
        }
        else if(total_amount[i]!= ""){
            
            console.log(i);
            console.log(desc[i-expenseID.length]);
            console.log("hello");
            var insertEXPENSE = `INSERT INTO \`tbl_expense\`
            (
                \`int_projectID\`,
                \`decimal_unitPrice\`,
                \`text_expenseDescription\`,
                \`decimal_actualAmount\`,
                \`int_actualQuantity\`
            )
            VALUES
            (
                "${req.body.int_projectID}",
                "${unitPrice[i]}",
                "${desc[i-expenseID.length]}",
                "${total_amount[i]}",
                "${Quantity[i]}"
            )`;
            db.query(insertEXPENSE, (err, addEx) => {        
                if (err) throw err;
                console.log(addEx);
            });
        }
    }

    // var queryString1 = `UPDATE tbl_expense SET
    // enum_projectStatus = 'Finished'
    // WHERE tbl_project.int_projectID = ${req.body.projID}`
            
    // db.query(queryString1, (err, results) => {        
    //     if (err) throw err;
        res.redirect('/barangay/projects');
    // });
});

module.exports = router;