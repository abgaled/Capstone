var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();
var moment = require('moment');
var cityID;


//- SCRIPT FOR CURRENT DATE
var n =  new Date();
var y = n.getFullYear();
var m = n.getMonth() + 1;
var d = n.getDate();
var hr = n.getHours();
var min = n.getMinutes();
var sec = n.getSeconds();
var now = y +"-"+ m +"-"+ d; 

var currentDate = y + "-" + m + "-" + d;

router.get('/',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: ONGOING PROJECT');
    console.log('=================================');

    var queryString4 =`SELECT offacc.int_userID
        FROM tbl_officialsaccount offacc JOIN tbl_city C 
            ON offacc.int_officialsID=C.int_cityID
        WHERE offacc.int_userID=${req.session.office.int_userID}`

    db.query(queryString4, (err, cityResult, fields ) => {
        if (err) console.log(err);
        var cityid = cityResult[0];

        var queryString = `SELECT * 
            FROM tbl_projectdetail
            WHERE int_cityID = ${cityid.int_userID}`;
        
        db.query(queryString, (err, results, fields) => {
            if (err) console.log(err);

            var queryString2 =`
                SELECT
                    int_projectID AS projID,
                    (
                        int_allotedSlot - (
                        SELECT
                            COUNT(*)
                        FROM
                            tbl_application
                        WHERE
                            int_projectID = projID AND enum_applicationStatus = "Approved" AND (enum_applicationType = "Resident" OR enum_applicationType = "Household")
                            
                    )
                    ) AS slotCount
                    
                FROM
                    tbl_projectdetail`;

            db.query(queryString2, (err, result2, fields) => {
                if (err) console.log(err);

                var queryString3 =`
                    SELECT int_projectID AS projID,
                        (
                        SELECT
                            int_slot
                        FROM
                            tbl_barangayapplication
                        WHERE
                            int_applicationID = tbl_application.int_applicationID
                    ) AS barcount
                    FROM
                        tbl_application
                    WHERE
                        enum_applicationType = "Barangay" AND enum_applicationStatus = "Approved"`;

                db.query(queryString3, (err, result3, fields) => {
                    if (err) console.log(err);
                    var proj = result2;
                    var bar = result3;
                    
                    for (var i = 0; i < proj.length;i++){
                        for (var j = 0; j < bar.length;j++){
                            if(proj[i].projID==bar[j].projID)
                            {
                                proj[i].slotCount=proj[i].slotCount-bar[j].barcount;
                            }
                        }
                    }
                    console.log(proj);

                    var statusCreated = `SELECT * 
                        FROM tbl_projectdetail
                        WHERE enum_projectStatus = "Created"`
                        
                        db.query(statusCreated, (err, created, fields) => {
                            if (err) console.log(err);

                            var statusCreated = `SELECT * 
                            FROM tbl_projectdetail
                            WHERE enum_projectStatus = "Ongoing"`

                            db.query(statusCreated, (err, ongoing, fields) => {
                                if (err) console.log(err);

                                var statusClosedApplication = `SELECT * 
                                FROM tbl_projectdetail
                                WHERE enum_projectStatus = "Closed Application"`
                                
                                db.query(statusClosedApplication, (err, closedapp, fields) => {
                                    if (err) console.log(err);
                                    
                                    var statusReleasing= `SELECT * 
                                    FROM tbl_projectdetail
                                    WHERE enum_projectStatus = "Releasing"`
                                    
                                    db.query(statusReleasing, (err, releasing, fields) => {
                                        if (err) console.log(err);

                                        var statusClosedReleasing= `SELECT * 
                                        FROM tbl_projectdetail
                                        WHERE enum_projectStatus = "Closed Releasing"`
                                        
                                        db.query(statusClosedReleasing, (err, closedreleasing, fields) => {
                                            if (err) console.log(err);

                                            var statusFinished= `SELECT * 
                                            FROM tbl_projectdetail
                                            WHERE enum_projectStatus = "Finished"`
                                            
                                            db.query(statusFinished, (err, finished, fields) => {
                                                if (err) console.log(err);

                                                res.render('office/projects/views/projects',{
                                                    tbl_project:results,
                                                    slotcount:proj,
                                                    tbl_created:created,
                                                    tbl_ongoing:ongoing,
                                                    tbl_closedapp:closedapp,
                                                    tbl_releasing:releasing,
                                                    tbl_closedreleasing:closedreleasing,
                                                    tbl_finished:finished
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                });
            });
        });
    });
});

router.get('/:int_projectID/viewproj',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: ONGOING PROJECT - VIEW DETAILS');
    console.log('=================================');

    //-projectDetail
    var queryString =`SELECT * FROM tbl_projectdetail pd
    JOIN tbl_projectapplicationtype pat ON pat.int_projectID = pd.int_projectID
        WHERE pd.int_projectID = "${req.params.int_projectID}"`

    var queryString2 =`SELECT varchar_requirementName
        FROM tbl_requirement R JOIN tbl_projectrequirement PR
            ON R.int_requirementID=PR.int_requirementID
            JOIN tbl_projectdetail PD ON PR.int_projectID=PD.int_projectID
        WHERE PD.int_projectID = "${req.params.int_projectID}"`

    var queryString3 =`SELECT varchar_beneficiaryName
        FROM tbl_beneficiary B JOIN tbl_projectbeneficiary PB
            ON B.int_beneficiaryID=PB.int_beneficiaryID
            JOIN tbl_projectdetail PD ON PB.int_linkID=PD.int_projectID
        WHERE PD.int_projectID = 1
            AND PB.enum_beneficiaryLink="Project"
        
            UNION

        SELECT varchar_beneficiaryName
        FROM tbl_beneficiary B JOIN tbl_projectbeneficiary PB
            ON B.int_beneficiaryID=PB.int_beneficiaryID
            JOIN tbl_intentstatement ISS ON ISS.int_statementID=PB.int_linkID
        WHERE enum_beneficiaryLink='Intent Statement' 
            AND int_projectID = "${req.params.int_projectID}"`;

    var queryString5 =`SELECT varchar_categoryName
        FROM tbl_category C JOIN tbl_projectcategory PC
            ON C.int_categoryID=PC.int_categoryID
        WHERE PC.int_projectID = "${req.params.int_projectID}"`
    
    var queryString7 =`SELECT *
        FROM tbl_intentstatement
        WHERE int_projectID="${req.params.int_projectID}"`

    db.query(queryString, (err, results, fields) => {
        if (err) console.log(err);

        for (var i = 0; i < results.length;i++){
            results[i].date_createdDate = moment(results[i].date_createdDate).format('MMMM DD[,] YYYY');
            results[i].date_targetStartApp = moment(results[i].date_targetStartApp).format('MMMM DD[,] YYYY');
            results[i].date_targetEndApp = moment(results[i].date_targetEndApp).format('MMMM DD[,] YYYY');
            results[i].date_targetStartRelease = moment(results[i].date_targetStartRelease).format('MMMM DD[,] YYYY');
            results[i].date_targetEndRelease = moment(results[i].date_targetEndRelease).format('MMMM DD[,] YYYY');
            results[i].date_targetClosing = moment(results[i].date_targetClosing).format('MMMM DD[,] YYYY');
            results[i].date_actualStartApp = moment(results[i].date_actualStartApp).format('MMMM DD[,] YYYY');
            results[i].date_actualEndApp = moment(results[i].date_actualEndApp).format('MMMM DD[,] YYYY');
            results[i].date_startReleaseDate = moment(results[i].date_startReleaseDate).format('MMMM DD[,] YYYY');
            results[i].date_endReleaseDate = moment(results[i].date_endReleaseDate).format('MMMM DD[,] YYYY');
            results[i].date_projectClose = moment(results[i].date_projectClose).format('MMMM DD[,] YYYY');
        }

        console.log(results);

        db.query(queryString2, (err, results2, fields) => {
            if (err) console.log(err);

            db.query(queryString3, (err, results3, fields) => {
                if (err) console.log(err);

                db.query(queryString5, (err, results5, fields) => {
                    if (err) console.log(err);

                    //-applicantdetails
                    var queryAPPRES =`SELECT * 
                        FROM tbl_application A JOIN tbl_projectdetail PD 
                            ON A.int_projectID = PD.int_projectID
                            JOIN tbl_personalinformation PI ON A.int_applicationID = PI.int_applicationID
                        WHERE A.int_projectID = "${req.params.int_projectID}"
                            AND (A.enum_applicationStatus = 'Pending' 
                                OR A.enum_applicationStatus = 'Approved')
                                AND A.enum_applicationType = 'Resident'`;
                    
                    var queryAPPBAR =`SELECT * 
                        FROM tbl_application A JOIN tbl_projectdetail PD 
                            ON A.int_projectID = PD.int_projectID
                            JOIN tbl_barangay BRGY ON A.int_barangayID = BRGY.int_barangayID
                            JOIN tbl_barangayapplication BA ON A.int_applicationID = BA.int_applicationID
                        WHERE A.int_projectID = "${req.params.int_projectID}"
                            AND (A.enum_applicationStatus = 'Pending' 
                                OR A.enum_applicationStatus = 'Approved')
                                AND A.enum_applicationType = 'Barangay'`;
                    
                    var queryAPPHOUSE =`SELECT * 
                        FROM tbl_application A JOIN tbl_householdapplication HA
                            ON A.int_applicationID=HA.int_applicationID
                        WHERE A.int_projectID = "${req.params.int_projectID}"
                            AND (A.enum_applicationStatus = 'Pending' 
                                OR A.enum_applicationStatus = 'Approved')
                                AND A.enum_applicationType = 'Household'`
                    
                    db.query(queryString7, (err, results7, fields) => {
                        if (err) console.log(err);

                        db.query(queryAPPRES, (err, resultres, fields) => {
                            if (err) console.log(err);

                            db.query(queryAPPBAR, (err, resultbar, fields) => {
                                if (err) console.log(err);

                                db.query(queryAPPHOUSE, (err, resulthou, fields) => {
                                    if (err) console.log(err);

                                    var queryslot =`
                                        SELECT
                                            int_projectID AS projID,
                                            (
                                                int_allotedSlot - (
                                                SELECT
                                                    COUNT(*)
                                                FROM
                                                    tbl_application
                                                WHERE
                                                    int_projectID = projID AND enum_applicationStatus = "Approved" AND (enum_applicationType = "Resident" OR enum_applicationType = "Household")
                                                    
                                            )
                                            ) AS slotCount
                                            
                                        FROM
                                            tbl_projectdetail`

                                    db.query(queryslot, (err, projslot, fields) => {
                                        if (err) console.log(err);

                                        var queryslot2 =`
                                            SELECT int_projectID AS projID,
                                                (
                                                SELECT
                                                    int_slot
                                                FROM
                                                    tbl_barangayapplication
                                                WHERE
                                                    int_applicationID = tbl_application.int_applicationID
                                                ) AS barcount
                                            FROM
                                                tbl_application
                                            WHERE
                                                enum_applicationType = "Barangay" AND enum_applicationStatus = "Approved"`

                                        db.query(queryslot2, (err, projslot2, fields) => {
                                            if (err) console.log(err);
                                            var proj = projslot;
                                            var bar = projslot2;
                                            
                                            for (var i = 0; i < proj.length;i++){
                                                for (var j = 0; j < bar.length;j++){
                                                    if(proj[i].projID==bar[j].projID)
                                                    {
                                                        proj[i].slotCount=proj[i].slotCount-bar[j].barcount;
                                                    }
                                                }
                                            }


                                            res.render('office/projects/views/viewproj', {
                                                tbl_projectdetail: results, 
                                                tbl_projectrequirement: results2, 
                                                tbl_projectbeneficiary: results3, 
                                                tbl_projectcategory: results5,
                                                tbl_appres: resultres,
                                                tbl_appbar: resultbar,
                                                tbl_apphou: resulthou,
                                                tbl_problemstatement: results7,
                                                slotcount: proj
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});

router.post('/:int_projectID/viewproj/accept',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: ONGOING PROJECT - VIEW APPLICATIONS -ACCEPT APPLICATION');
    console.log('=================================');
    console.log("BUTTON ACCEPT ID:"+ req.body.int_applicationID);

    var queryString1 =`UPDATE tbl_application
    SET enum_applicationStatus = 'Approved'
    WHERE int_applicationID = ${req.body.int_applicationID}`

    db.query(queryString1, (err, results1, fields) => {

        res.redirect(`/office/projects/${req.params.int_projectID}/viewproj`);
    });
});


router.post('/brgy/accept',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: ONGOING PROJECT - VIEW APPLICATIONS -ACCEPT APPLICATION');
    console.log('=================================');
    console.log("BUTTON ACCEPT ID:"+ req.body.appid);
    console.log("BUTTON ACCEPT PROJECTID:"+ req.body.projID);

    var queryString1 =`UPDATE tbl_application
    SET enum_applicationStatus = 'Approved' 
    WHERE int_applicationID = ${req.body.appid}`

    db.query(queryString1, (err, results1, fields) => {

        var queryString2 =`UPDATE tbl_barangayapplication
        SET int_slot = ${req.body.brgyapp_count} 
        WHERE int_applicationID = ${req.body.appid}`

        db.query(queryString2, (err, results2, fields) => {

            res.redirect(`/office/projects`);
        });
    });
});

router.post('/:int_projectID/viewproj/reject',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: ONGOING PROJECT - VIEW APPLICATIONS -REJECT APPLICATION');
    console.log('=================================');

    var queryString1 =`UPDATE tbl_application
    SET enum_applicationStatus = 'Rejected' 
    WHERE int_applicationID = ${req.body.int_applicationID}`

    db.query(queryString1, (err, results1, fields) => {

        res.redirect(`/office/projects/${req.params.int_projectID}/viewproj`);
    });
});

// AJAX GET DETAILS VIEW DETAILS PROJECT - VIEW APPLICANT DETAILS
router.post('/:int_projectID/viewproj/ajaxapplicantdetails',(req,res) => {
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

// router.get('/:int_projectID/viewapp',(req, res) => {
//     console.log('=================================');
//     console.log('OFFICE: ONGOING PROJECT - VIEW APPLICATIONS');
//     console.log('=================================');

//     var queryString1 =`SELECT * FROM tbl_projectproposal pr
//     JOIN tbl_project proj ON pr.int_projectID = proj.int_projectID
//     WHERE pr.int_projectID = "${req.params.int_projectID}"`

//     db.query(queryString1, (err, results1, fields) => {
//         console.log("=========RESULTS1==========")
//         console.log(results1);

//         var queryString2 =`SELECT * FROM tbl_application ap
//         JOIN tbl_personalinformation pi 
//         ON ap.int_applicationID = pi.int_applicationID
//         WHERE ap.int_projectID = "${req.params.int_projectID}"
//         AND (ap.enum_applicationStatus = "Approved" OR ap.enum_applicationStatus = "Received")`

//         db.query(queryString2, (err, results2, fields) => {
    
//             res.render('office/projects/views/viewapplication',{
//                     tbl_project:results1,
//                     tbl_application:results2
//                 });
//         });
//     });
// });

router.post('/:int_projectID/viewproj/ajaxhouseholddetails',(req,res) => {
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

        for (var i = 0; i < results.length;i++){
            results[i].date_birthDate = moment(results[i].date_birthDate).format('MM-DD-YYYY');
        }

        var resultss = results[0];

        console.log("===================RESULTSS")
        console.log(resultss)

        return res.send({tbl_householdapplication:resultss});
    });
});

router.get('/:int_projectID/viewapp',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: RELEASING PROJECT - VIEW BENEFICIARIES');
    console.log('=================================');
    
    var queryString1 =`SELECT * FROM tbl_application app
        JOIN tbl_projectdetail proj ON app.int_projectID = proj.int_projectID
        JOIN tbl_personalinformation pi ON app.int_applicationID = pi.int_applicationID
        WHERE app.int_projectID = "${req.params.int_projectID}"
        AND (app.enum_applicationStatus = 'Approved' 
        OR app.enum_applicationStatus = 'Received')
        AND app.enum_applicationType = 'Resident'` 
    
    var queryString2 =`SELECT * FROM tbl_application app
        JOIN tbl_projectdetail proj ON app.int_projectID = proj.int_projectID
        JOIN tbl_barangay brgy ON app.int_barangayID = brgy.int_barangayID
        JOIN tbl_barangayapplication brgyapp ON app.int_applicationID = brgyapp.int_applicationID
        WHERE app.int_projectID = "${req.params.int_projectID}"
        AND (app.enum_applicationStatus = 'Approved' 
        OR app.enum_applicationStatus = 'Received')
        AND app.enum_applicationType = 'Barangay'` 
    
    var queryString3 =`SELECT * FROM tbl_application app
        JOIN tbl_projectdetail proj ON app.int_projectID = proj.int_projectID
        JOIN tbl_personalinformation pi ON app.int_applicationID = pi.int_applicationID
        WHERE app.int_projectID = "${req.params.int_projectID}"
        AND (app.enum_applicationStatus = 'Approved' 
        OR app.enum_applicationStatus = 'Received')
        AND app.enum_applicationType = 'Household'` 


    db.query(queryString1, (err, results1, fields) => {
        console.log(results1);
        if (err) console.log(err);

        db.query(queryString2, (err, resultsbar, fields) => {
            console.log(resultsbar);
            if (err) console.log(err);
            db.query(queryString3, (err, resultshouse, fields) => {
                console.log(resultshouse);
                if (err) console.log(err);
                    req.session.office.sesReleasingProjectID = req.params.int_projectID

                    console.log("=====SESSION SESRELEASINGPROJECTID=====");
                    console.log(req.session.office.sesReleasingProjectID);

                    var queryString4 =`SELECT * FROM tbl_projectdetail proj
                    JOIN tbl_projectapplicationtype propr ON propr.int_projectID = proj.int_projectID
                    WHERE proj.int_projectID = "${req.params.int_projectID}"`

                    var queryString5 =`SELECT * FROM tbl_applicantbenefit proj
                    JOIN tbl_projectdetail appben ON proj.int_projectID = appben.int_projectID
                    WHERE proj.int_projectID = "${req.params.int_projectID}"`

                    db.query(queryString4, (err, results2, fields) => {
                        console.log(results2);
                        if (err) console.log(err);
                        db.query(queryString5, (err, results3, fields) => {
                            console.log(results3);
                            if (err) console.log(err);
                    
                            res.render('office/projects/views/viewapplication', {
                                tbl_application:results1,
                                tbl_application2:resultsbar,
                                tbl_application3:resultshouse,
                                tbl_project:results2,
                                tbl_applicantbenefit:results3});
                    });
                });
            });
        });
    });
});
router.get('/:int_applicationID/viewbarben',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: PROJECT - VIEW BARANGAY BENEFICIARY');
    console.log('=================================');
    console.log(req.params.int_applicationID);

    var projectQuery = `SELECT * FROM tbl_projectdetail pd
    JOIN tbl_application app ON pd.int_projectID = app.int_projectID
    WHERE int_applicationID = "${req.params.int_applicationID}"`

    var barangayQuery = `SELECT * FROM tbl_application app
    JOIN tbl_barangay bar ON app.int_barangayID = bar.int_barangayID
    WHERE int_applicationID = "${req.params.int_applicationID}"`

    var queryString =`SELECT * FROM tbl_barangaybeneficiary
    WHERE int_applicationID = "${req.params.int_applicationID}"` 

    db.query(queryString, (err, results1, fields) => {
        console.log(results1);
        if (err) console.log(err);

        db.query(projectQuery, (err, projectresults, fields) => {
            console.log(projectresults);
            if (err) console.log(err);

            db.query(barangayQuery, (err, barangayresults, fields) => {
                console.log(barangayresults);
                if (err) console.log(err);

                res.render('office/projects/views/viewBarBen', 
                {
                    tbl_ben:results1,
                    tbl_project:projectresults,
                    tbl_barangay:barangayresults
                });
            });
        });
    });
});

// AJAX GET DETAILS ONGOING PROJECT - VIEW APPLICANT DETAILS
router.post('/:int_projectID/viewapp/ajaxapplicantdetails',(req,res) => {
    console.log('=================================');
    console.log('BARANGAY: RELEASING-VIEW RESIDENT APPLICATION-AJAX GET DETAILS (POST)');
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

router.post('/:int_projectID/viewapp/ajaxapplicanthouseholddetails',(req,res) => {
    console.log('=================================');
    console.log('BARANGAY: RELEASING-VIEW HOUSEHOLD APPLICATION-AJAX GET DETAILS (POST)');
    console.log('=================================');
    console.log(`${req.body.ajApplicationID}`);

    var queryString = `SELECT * FROM tbl_householdapplication pi
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

// router.get('/:int_projectID/startproj', (req, res) => {
//     console.log('=================================');
//     console.log('OFFICE: Project - 1 Startproject GET');
//     console.log('=================================');
    
//     var queryString =`SELECT * FROM tbl_project
//     WHERE enum_projectStatus = 'Approved' 
//     AND tbl_project.int_projectID=${req.params.int_projectID}`
        
//     db.query(queryString, (err, results, fields) => {
//         console.log(results);
//         if (err) console.log(err);
    
//         res.render(`office/projects/views/startproj`,{tbl_project:results});
//     });
// });

//-start project
router.post('/startproj', (req, res) => {
    console.log('=================================');
    console.log('OFFICE: Project - 1 Startproject POST');
    console.log('=================================');
    console.log(currentDate);
    var queryString1 = `UPDATE tbl_projectdetail SET
    enum_projectStatus = 'Ongoing',
    date_actualStartApp = '${currentDate}'
    WHERE tbl_projectdetail.int_projectID=${req.body.int_projectID}`
            
    db.query(queryString1, (err, results) => {        
        if (err) throw err;

        // var updateProject = `UPDATE tbl_project
        // SET date_startApplication=CURDATE(),
        // date_endApplication=DATE_ADD(CURDATE(), 
        // INTERVAL (SELECT int_applicationDuration 
        // FROM tbl_projectproposal WHERE int_projectID=${req.body.int_projectID}) DAY),
        // date_startReleaseDate=DATE_ADD(DATE_ADD(CURDATE(), 
        // INTERVAL (SELECT int_applicationDuration FROM tbl_projectproposal 
        // WHERE int_projectID=${req.body.int_projectID}) DAY), INTERVAL (SELECT int_beforeReleasingDuration 
        // FROM tbl_projectproposal WHERE int_projectID=${req.body.int_projectID}) DAY)
        // WHERE int_projectID=${req.body.int_projectID};`

        // var updateProject = `UPDATE tbl_project
        // SET enum_projectStatus = "Ongoing"
        // WHERE int_projectID=${req.body.int_projectID};`

        // db.query(updateProject, (err, results) => {        
        //     if (err) throw err;
    

            res.redirect('/office/projects');
    });
});

router.post('/openlateapplication', (req, res) => {
    console.log('=================================');
    console.log('OFFICE: Application open');
    console.log('=================================');
    resultIndex = `${req.body.projectID}`;

    console.log(resultIndex);
            
    var queryString = `INSERT INTO \`tbl_projectreason\` 
        (\`int_projectID\`, 
        \`text_projectReason\`,
        \`enum_projectPhase\`)
        VALUES
        ("${req.body.projectID}",
        "${req.body.projectReason}",
        "Start Application");`;

    db.query(queryString, (err, results) => {        
        if (err) throw err;
        console.log(results);

        var queryString1 = `UPDATE tbl_projectdetail SET
        enum_projectStatus = 'Ongoing',
        date_actualStartApp = '${currentDate}'
        WHERE tbl_projectdetail.int_projectID = ${req.body.projectID}`
                
        db.query(queryString1, (err, results2) => {        
            if (err) throw err;
            console.log(results);

            res.redirect('/office/projects');
        });
    });
});

// AJAX GET DETAILS FINISHED PROJECT - VIEW APPLICANT DETAILS
router.post('/finishedproject/:int_projectID/viewapp/ajaxapplicantdetails',(req,res) => {
    console.log('=================================');
    console.log('OFFICE: PROJECT ONGOING-VIEW APPLICATION-AJAX GET DETAILS (POST)');
    console.log('=================================');
    console.log(`${req.body.ajApplicationID}`);

    var queryString = `SELECT * FROM tbl_personalinformation pi
    JOIN tbl_application ap 
    ON pi.int_applicationID=ap.int_applicationID 
    JOIN tbl_address ad
    ON pi.int_addressID=ad.int_addressID
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

//-projectopenmodal
router.post('/ajaxgetprojectdetails',(req,res) => {
    console.log('=================================');
    console.log('OFFICE: OPEN PROJECT APPLICATION-PREVIOUS-AJAX GET DETAILS (POST)');
    console.log('=================================');
    console.log(`${req.body.ajProjectID}`);

            var queryString =`SELECT * FROM tbl_projectdetail
            WHERE tbl_projectdetail.int_projectID = ${req.body.ajProjectID}`

            db.query(queryString,(err, results, fields) => {
                if (err) console.log(err);

                console.log(results);

                var date_results = results;

                for (var i = 0; i < date_results.length;i++){
                    date_results[i].date_targetStartApp= moment(date_results[i].date_targetStartApp).format('MMMM DD[,] YYYY');
                    date_results[i].date_targetStartRelease= moment(date_results[i].date_targetStartRelease).format('MMMM DD[,] YYYY');
                    console.log(`${date_results[i].date_targetStartApp}`);
                }

                var resultss = results[0];

                console.log("===================RESULTSS")
                console.log(resultss)

                return res.send({tbl_project1:resultss});
        });
});

router.post('/:int_projectID/viewproj/ajaxgetcloseprojectdetails',(req,res) => {
    console.log('=================================');
    console.log('OFFICE: OPEN PROJECT APPLICATION-PREVIOUS-AJAX GET DETAILS (POST)');
    console.log('=================================');
    console.log(`${req.body.ajProjectID}`);

            var queryString =`SELECT * FROM tbl_projectdetail
            WHERE tbl_projectdetail.int_projectID = ${req.body.ajProjectID}`

            db.query(queryString,(err, results, fields) => {
                if (err) console.log(err);

                console.log(results);

                var date_results = results;

                for (var i = 0; i < date_results.length;i++){
                    date_results[i].date_targetEndApp= moment(date_results[i].date_targetEndApp).format('MMMM DD[,] YYYY');
                    date_results[i].date_targetStartRelease= moment(date_results[i].date_targetStartRelease).format('MMMM DD[,] YYYY');
                    console.log(`${date_results[i].date_targetEndApp}`);
                }

                var resultss = results[0];

                console.log("===================RESULTSS")
                console.log(resultss)

                return res.send({tbl_project1:resultss});
        });
}); 
router.post('/closeproj', (req, res) => {
    console.log('=================================');
    console.log('OFFICE: Project finproj POST');
    console.log('=================================');
    resultIndex = `${req.body.int_projectID}`;

    console.log(resultIndex);
    var queryString1 = `UPDATE tbl_projectdetail SET
    enum_projectStatus = 'Closed Application',
    date_actualEndApp = '${currentDate}'
    WHERE tbl_projectdetail.int_projectID = ${req.body.int_projectID}`
            
    db.query(queryString1, (err, results) => {        
        if (err) throw err;
        res.redirect('/office/projects');
    });
});
router.post('/closelateapplication', (req, res) => {
    console.log('=================================');
    console.log('OFFICE: Application open');
    console.log('=================================');
    resultIndex = `${req.body.projectID}`;

    console.log(resultIndex);
            
    var queryString = `INSERT INTO \`tbl_projectreason\` 
    (\`int_projectID\`, 
    \`text_projectReason\`,
    \`enum_projectPhase\`)
    VALUES
    ("${req.body.projectID}",
    "${req.body.projectReason}",
    "Close Application");`;

db.query(queryString, (err, results) => {        
    if (err) throw err;
    console.log(results);

    var queryString1 = `UPDATE tbl_projectdetail SET
    enum_projectStatus = 'Closed Application',
    date_actualEndApp = '${currentDate}'
    WHERE tbl_projectdetail.int_projectID = ${req.body.projectID}`
                
        db.query(queryString1, (err, results2) => {        
            if (err) throw err;
            console.log(results);

            res.redirect('/office/projects');
        });
    });
});



router.post('/openreleasing', (req, res) => {
    console.log('=================================');
    console.log('BARANGAY: Releasing open');
    console.log('=================================');
    resultIndex = `${req.body.projectID}`;

    console.log(resultIndex);
    var queryString1 = `UPDATE tbl_projectdetail SET
    enum_projectStatus = 'Releasing'
    WHERE int_projectID = ${req.body.rint_projectID}`

    var queryProject = 'SELECT DISTINCT int_barangayID from tbl_application WHERE int_projectID = 1'
    
    db.query(queryString1, (err, results) => {        
        if (err) throw err;
        console.log(results);

        db.query(queryProject, (err, resultsPROJECTS) => {        
            if (err) throw err;
            console.log(resultsPROJECTS);

            var projects = resultsPROJECTS;
            for (var i = 0; i < projects.length;i++)
            {
                var queryINSERTBarR = `INSERT INTO \`tbl_barangayreleasing\` 
                (\`int_projectID\`, 
                \`int_barangayID\`)
                VALUES
                ("${req.body.rint_projectID}",
                "${projects[i].int_barangayID}");`;
                db.query(queryINSERTBarR, (err, resultsREL) => {        
                    if (err) throw err;
                    console.log(resultsREL);
                });
            }

            res.redirect('/office/projects');
        });
    });
});



router.post('/openlatereleasing', (req, res) => {
    console.log('=================================');
    console.log('BARANGAY: Releasing open');
    console.log('=================================');
    resultIndex = req.body.rprojectID;

    console.log(resultIndex);
            
    var queryString = `INSERT INTO \`tbl_projectreason\`
        (\`int_projectID\`, 
        \`text_projectReason\`,
        \`enum_projectPhase\`)
        VALUES
        ("${req.body.rprojectID}",
        "${req.body.rprojectReason}",
        "Start Releasing");`;

        db.query(queryString, (err, results) => {        
            if (err) throw err;
            console.log(results);

            var queryString1 = `UPDATE tbl_projectdetail SET
            enum_projectStatus = 'Releasing'
            WHERE tbl_projectdetail.int_projectID = ${req.body.rprojectID}`

            var queryProject = `SELECT DISTINCT int_barangayID from tbl_application 
            WHERE int_projectID = ${req.body.rprojectID}`
            
            db.query(queryString1, (err, results) => {        
                if (err) throw err;
                console.log(results);

                db.query(queryProject, (err, resultsPROJECTS) => {        
                    if (err) throw err;
                    console.log(resultsPROJECTS);

                    var projects = resultsPROJECTS;
                    for (var i = 0; i < projects.length;i++)
                    {
                        var queryINSERTBarR = `INSERT INTO \`tbl_barangayreleasing\`
                        (\`int_projectID\`, 
                        \`int_barangayID\`)
                        VALUES
                        ("${req.body.rprojectID}",
                        "${projects[i].int_barangayID}");`;
                        db.query(queryINSERTBarR, (err, resultsREL) => {        
                            if (err) throw err;
                            console.log(resultsREL);
                        });
                    }

                    
                    db.query(queryString1, (err, results2) => {        
                        if (err) throw err;

                        res.redirect('/office/projects');
                });
            });
        });
    });
});
 


router.get('/:int_projectID/liquidation',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: ONGOING PROJECT - LIQUIDATION');
    console.log('=================================');


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

        var queryString6 =`SELECT (SELECT decimal_actualAmount FROM tbl_projectdetail
            WHERE int_projectID = "${req.params.int_projectID}")-(SUM(decimal_actualAmount)) AS "budgetbalance" 
            FROM tbl_expense
            WHERE int_projectID = "${req.params.int_projectID}"`

        var queryString7 =`SELECT COUNT(*) AS appCount FROM tbl_application proj
        WHERE proj.int_projectID = "${req.params.int_projectID}"
        AND (enum_applicationStatus = "Received")`
    db.query(queryString7, (err, results7, fields) => {
        console.log(results7)
        db.query(queryString1, (err, results1, fields) => {
            console.log(results1)
            db.query(queryString2, (err, results2, fields) => { 
                console.log(results2)
                db.query(queryString3, (err, results3, fields) => {
                    console.log(results3)
                    db.query(queryString4, (err, results4, fields) => {
                        console.log(results4)
                        db.query(queryString6, (err, results6, fields) => {
                            console.log(results6)

                            var queryString8 =`SELECT pc.decimal_allotedBudget, pc.int_projcategID, cat.varchar_categoryName FROM tbl_projectcategory pc
                            JOIN tbl_category cat ON pc.int_categoryID = cat.int_categoryID
                            WHERE pc.int_projectID = "${req.params.int_projectID}"`
                            db.query(queryString8, (err, results8, fields) => {
                                var categbud = results8;
                                console.log(categbud)
                                var projBud = 0.00;
                                for(var i =0; i < categbud.length; i++)
                                {
                                    console.log(i)
                                    console.log(categbud[i].decimal_allotedBudget)
                                    projBud += categbud[i].decimal_allotedBudget;
                                }
                                console.log(projBud)
                                var oneP = projBud/100;
                                console.log(oneP)
                                var percent = [];
                                var categoryName = [];
                                var categoryID = [];
                                var categoryAllotedBudget = []
                                for(var i =0; i < categbud.length; i++)
                                {
                                    console.log(i)
                                    console.log(categbud[i].decimal_allotedBudget)
                                    percent[i] = categbud[i].decimal_allotedBudget/oneP;
                                    percent[i]= Math.round(percent[i]);
                                    categoryName[i] = categbud[i].varchar_categoryName;
                                    categoryID[i] = categbud[i].int_projcategID;
                                    categoryAllotedBudget[i] = categbud[i].decimal_allotedBudget;
                                }
                                console.log(percent)
                                var categoryPercentage = {percentage:percent , catName:categoryName , catID:categoryID , catAllBud:categoryAllotedBudget};
                                console.log(categoryPercentage)
                                res.render('office/projects/views/liquidation',
                                {
                                    tbl_expenses:results1,
                                    tbl_project:results2,
                                    totalest:results3,
                                    total:results4,
                                    tbl_rembal:results6,
                                    tbl_appCount:results7,
                                    categPerc:categoryPercentage
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});

router.post('/sendliquidation', (req, res) => {
    console.log('=================================');
    console.log('OFFICE: Project send liq POST');
    console.log('=================================');
    console.log("int_projectID");
    console.log(req.body.int_projectID);

    var expenseID = req.body.int_expenseID;
    console.log("expenseID");
    console.log(expenseID);

    var total_amount = req.body.total_amount;
    console.log("total_amount");
    console.log(total_amount);
    

    var addAmount = req.body.addAmount;
    console.log("addAmount");
    console.log(addAmount);

    var Quantity = req.body.Unit_Quantity;
    console.log("Quantity");
    console.log(Quantity);

    for(var i=0;i<total_amount.length;i++)
    {
        console.log(i);
        var queryString1 = `UPDATE tbl_expense SET
        decimal_actualAmount = ${total_amount[i]},
        int_actualQuantity = ${Quantity[i]}
        WHERE tbl_expense.int_expenseID = ${expenseID[i]}`
        db.query(queryString1, (err, results) => {        
            if (err) throw err;
            console.log(results);
        });
    }
    var addEx_desc = req.body.addEx_desc;
    console.log("addEx_desc");
    console.log(addEx_desc);

    var addUnit_Price = req.body.addUnit_Price;
    console.log("addUnit_Price");
    console.log(addUnit_Price);

    var addQuanity = req.body.addQuanity;
    console.log("addQuanity");
    console.log(addQuanity);

    for(var i=0;i<addAmount.length;i++)
    {
        console.log(addEx_desc[i] || addUnit_Price[i] || addQuanity[i]);
        console.log(addUnit_Price[i]);
        console.log(addQuanity[i]);
        if(addEx_desc[i] == 0)
        { 
            console.log("WALANG LAMAN");
        }
        else{
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
                    "${addUnit_Price[i]}",
                    "${addEx_desc[i]}",
                    "${addAmount[i]}",
                    "${addQuanity[i]}"
                )`;
            db.query(insertEXPENSE, (err, results2) => {        
                if (err) throw err;
                console.log(results2);
            });
            console.log("MAY LAMAN");
        }
        
    }
    var catID = req.body.categoryID;
    console.log("catID");
    console.log(catID);

    var remCat = req.body.remainingCat;
    console.log("remCat");
    console.log(remCat);
    
    var counter = 0;
    for(var l=0;l<catID.length;l++)
    {
        console.log("y");
        console.log(y);
        console.log("catID" + l);
        console.log(catID[l]);
        console.log(l);

        var queryString2 = `SELECT * FROM tbl_categorybudget cb
        JOIN tbl_projectcategory pc ON cb.int_categoryID = pc.int_categoryID
        JOIN tbl_annualbudget ab ON cb.int_budgetID = ab.int_budgetID
        WHERE pc.int_projcategID = ${catID[l]}
        AND ab.date_budgetYear = ${y}`

        db.query(queryString2, (err, results2) => {        
            if (err) throw err;
            
            categBudget = results2;
            console.log("categBudget");
            console.log(categBudget);
                for(var j=0;j<categBudget.length;j++)
                {
            
                    remCat[counter]=parseFloat(remCat[counter]);
                    console.log("remCat" + counter);
                    console.log(remCat[counter]);
                    categBudget[j].decimal_categRemaining=parseFloat(categBudget[j].decimal_categRemaining);
                    console.log("categBudget[j].decimal_categRemaining");
                    console.log(categBudget[j].decimal_categRemaining);

                    var remaining = categBudget[j].decimal_categRemaining + remCat[counter];
                    console.log("remaining");
                    console.log(remaining);

                    var queryString4 = `UPDATE tbl_categorybudget SET
                    decimal_categRemaining = ${remaining}
                    WHERE int_categbudID = ${categBudget[j].int_categbudID}`
                    db.query(queryString4, (err, results4) => { 
                        console.log(results4);
                    });
                    counter++;
                }
        });
        
    }
    

    var totExpense = req.body.ovtotalExpense;
    console.log("totExpense");
    console.log(totExpense);
    var queryString3 = `UPDATE tbl_projectdetail SET
        decimal_actualBudget = ${totExpense}
        WHERE int_projectID = ${req.body.int_projectID}`
        db.query(queryString3, (err, results3) => {        
            if (err) throw err;
            console.log(results3);
        });
    var queryEND = `UPDATE tbl_projectdetail SET
    enum_projectStatus = 'Finished',
    date_actualClosing = "${currentDate}"
    WHERE tbl_projectdetail.int_projectID = ${req.body.int_projectID}`
    db.query(queryEND, (err, resultse) => {        
        if (err) throw err;
        console.log(resultse);
        res.redirect('/office/projects');
    });
});

console.log('=================================');
console.log('CREATE PROJECT');
console.log('=================================');


router.get('/createproject',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: PROPOSALS');
    console.log('=================================');
 

    console.log('=================================');
    console.log('OFFICE: PROPOSALS');
    console.log('=================================');
    
    var queryString =`SELECT * FROM tbl_category WHERE enum_categoryStatus = 'Active'`
    
    var queryString2 =`SELECT * FROM tbl_beneficiary WHERE enum_beneficiaryStatus = 'Active'`

    var queryString3 =`SELECT * FROM tbl_requirement WHERE enum_requirementStatus = 'Active'`

    var queryString4 =`SELECT DISTINCT * 
        FROM tbl_city C JOIN tbl_officialsaccount OA
            ON OA.int_officialsID=C.int_cityID
        WHERE OA.int_userID=${req.session.office.int_userID}`
    
    var queryString5 =`SELECT * FROM tbl_intentstatement ps
        JOIN tbl_category cat ON ps.int_categoryID = cat.int_categoryID
        WHERE enum_problemStatus = 'Acknowledged'`

    var queryString6 = `SELECT *
        FROM tbl_barangay B JOIN tbl_city C
            ON B.int_cityID=C.int_cityID
            JOIN tbl_officialsaccount OA ON OA.int_officialsID=C.int_cityID
        WHERE OA.int_userID=${req.session.office.int_userID}`;

    var queryString7 = `SELECT * 
        FROM tbl_unitmeasure
        WHERE enum_unitStatus="Active"`;

    var queryString8 = `SELECT PB.* 
        FROM tbl_projectbeneficiary PB JOIN tbl_intentstatement ISS 
            ON PB.int_linkID=ISS.int_statementID 
        WHERE enum_beneficiaryLink = 'Intent Statement'`;

    db.query(queryString, (err, results, fields) => {
        if (err) console.log(err);
        
        db.query(queryString2, (err, results2, fields) => {
            if (err) console.log(err);
            
            db.query(queryString3, (err, results3, fields) => {
                if (err) console.log(err);
                
                db.query(queryString4, (err, results4, fields) => {
                    if (err) console.log(err);
                    
                    cityID = results4[0];
                    db.query(queryString5, (err, results5, fields) => {
                        if (err) console.log(err);
                        
                        db.query(queryString6, (err, results6, fields) => {
                            if (err) console.log(err);
                            
                            db.query(queryString7, (err, results7, fields) => {
                                if (err) console.log(err);

                                db.query(queryString8, (err, results8, fields) => {
                                    if (err) console.log(err);

                                    res.render('office/projects/views/createproject', 
                                    {
                                        tbl_category: results,
                                        tbl_beneficiary:results2,
                                        tbl_requirement:results3,
                                        tbl_barangay:results4,
                                        tbl_problemstatement:results5,
                                        tbl_location:results6,
                                        tbl_unitmeasure: results7
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});

router.post('/createproject',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: PROPOSALS POST');
    console.log('=================================');


    console.log("PROJECT DETAILS:");
    var name = req.body.projectname;
    console.log(name);
    var ratioanale = req.body.projectrationale;
    console.log(ratioanale);
    var description = req.body.projectdescription;
    console.log(description);
    var objective = req.body.projectobjective;
    console.log(objective);
    var appType = req.body.applicationType;
    console.log(appType);
    console.log("PROJECT BENEFIT:");
    var beneName = req.body.benefitName;
    var beneQuantity = req.body.benefitQuantity;
    var beneUnit = req.body.unitMeasure;
    var beneUPrice = req.body.benefitUnitPrice;
    var beneAmount = req.body.benefitExAmount;
    console.log(beneName);
    console.log(beneQuantity);
    console.log(beneUnit);
    console.log(beneUPrice);
    console.log(beneAmount);
    console.log("PROJECT EXPENSE:");
    var expName = req.body.expenseName;
    var expQuantity = req.body.expenseQuantity;
    var expUnit = req.body.expensemeasure;
    var expUPrice = req.body.expenseUnitPrice;
    var expAmount = req.body.expenseAmount;
    console.log(expName);
    console.log(expQuantity);
    console.log(expUPrice);
    console.log(expAmount);
    console.log(expUnit);
    console.log("PROJECT SLOTS:");
    var allotedslot = req.body.allotedslots;
    console.log(allotedslot);
    console.log("PROJECT DATES:")
    var startApp = req.body.startApp;
    console.log(startApp);
    var endApp = req.body.endApp;
    console.log(endApp);
    var startRel = req.body.startRel;
    console.log(startRel);
    var endRel = req.body.endRel;
    console.log(endRel);
    var closeProj = req.body.closeProj;
    console.log(closeProj);
    console.log("PROJECT BUDGET:")
    var estimatedbudget = req.body.estimatedbudget;
    var appCategBudget = req.body.appCategBudget;
    var appropriatedBudget = req.body.appropriatedBudget;
    console.log(estimatedbudget);
    console.log(appCategBudget);
    console.log(appropriatedBudget);
    console.log("PROJECT CATEGORY:")
    var categ = req.body.projectlist;
    console.log(categ);
    console.log("PROJECT BENEFICIARY:");
    var beneficiaries = req.body.projectbeneficiaries;
    console.log(beneficiaries);
    console.log("PROJECT REQUIREMENT:");
    var require = req.body.projectrequirement;
    console.log(require);
    console.log("PROBLEM STATEMENT:")
    var statementList = req.body.statementsList;
    console.log(statementList);
    console.log("CITY ID:")
    console.log(cityID.int_cityID);

    var insertprojProposal = `INSERT INTO \`tbl_projectdetail\` 
    (
        \`int_cityID\`,
        \`varchar_projectName\`,
        \`text_projectRationale\`,
        \`text_projectDescription\`,
        \`text_projectObjective\`,
        \`int_allotedSlot\`,
        \`date_targetStartApp\`,
        \`date_targetEndApp\`,
        \`date_targetStartRelease\`,
        \`date_targetEndRelease\`,
        \`date_targetClosing\`,
        \`decimal_estimatedBudget\`,
        \`decimal_appropriatedBudget\`,
        \`date_createdDate\`,
        \`enum_projectStatus\`
    )
                
    VALUES
    (
        ${cityID.int_cityID},
        "${req.body.projectname}",
        "${req.body.projectrationale}",
        "${req.body.projectdescription}",
        "${req.body.projectobjective}",
        "${req.body.allotedslots}",
        "${req.body.startApp}",
        "${req.body.endApp}",
        "${req.body.startRel}",
        "${req.body.endRel}",
        "${req.body.closeProj}",
        "${req.body.estimatedbudget}",
        "${req.body.appropriatedBudget}",
        CURDATE(),
        "Created"
    )`;

    db.query(insertprojProposal, (err, results, fields) => {        
        if (err) throw err;    
        console.log("==============INSERT PROJECT PROPOSAL CREDENTIALS SUCCESS====================");
            
        
        var getProposalID =`SELECT * FROM tbl_projectdetail ORDER BY int_projectID DESC LIMIT 0,1`

        db.query(getProposalID, (err, proposalID, fields) => {        
            if (err) throw err;
            console.log("==============GET PROJECT PROPOSAL ID SUCCESS====================");

            var toproject = proposalID[0];

            console.log("Project Proposal ID:");
            console.log(toproject);

            // UPDATE TABLE PROBLEM STATEMENT 
            console.log("==============INSERT PROBLEM STATEMENT=============");

            console.log(statementList);
            console.log(statementList.length);

            for(var o = 0 ; o < (statementList.length) ; o++)
            {
                console.log(o);
                console.log(statementList[o]);

                var updateStatus =  `UPDATE tbl_intentstatement 
                    SET enum_problemStatus = "Solved",
                    int_projectID = ${toproject.int_projectID}
                    WHERE int_statementID = ${statementList[o]}`;

                 db.query(updateStatus, (err, results) => {        
                    if (err) throw err;

                    console.log(results)
                });
            }


            // INSERT PROJECT BENEFICIARIES
            console.log("==============INSERT PROJECT BENEFICIARIES====================");


            // for(var j = 0 ; j < beneficiaries.length ; j++ ) 
            // {
            //     console.log(j);
            //     console.log(beneficiaries[j]);
                
            //     var insertBeneficiaries = `INSERT INTO \`tbl_projectbeneficiary\`
            //         (
            //             \`int_linkID\`,
            //             \`int_beneficiaryID\`,
            //             \`enum_beneficiaryLink\`
            //         )

            //         VALUES
            //         (
            //             "${toproject.int_projectID}",
            //             "${beneficiaries[j]}",
            //             "Project"
            //         )`;

            //     db.query(insertBeneficiaries, (err, insertResult) => {        
            //         if (err) throw err;
            //         console.log(insertResult);
            //     });
            // }



            // INSERT PROJECT REQUIREMENT
            console.log("==============INSERT PROJECT REQUIREMENT====================");
            

            console.log(require);
            console.log(require.length);


            for(var k = 0 ; k < require.length ; k++ ) 
            {
                console.log(k);
                var inserReq = `INSERT INTO \`tbl_projectrequirement\`
                    (
                        \`int_requirementID\`,
                        \`int_projectID\`
                    )
                    
                    VALUES
                    (
                        "${require[k]}",
                        "${toproject.int_projectID}"
                    )`;

                db.query(inserReq, (err, inserResult, fields) => {        
                    if (err) throw err;
                });
            }
                

            //  INSERT PROJECT CATEGORY
            console.log("==============INSERT PROJECT CATEGORY====================");
            
            // var statementCategoryQuery = `SELECT int_categoryID 
            //     FROM tbl_problemstatement
            //     WHERE int_statementID IN (${statementList})`;

            // db.query(statementCategoryQuery, (err, categResult, fields) => {
            //     if(err) console.log(err);

                // var categ = categResult;
                // console.log(categ);
                
                // for(var l = 0 ; l < categ.length ; l++)
                // {
                //     console.log(l);
                //     var insertTimeline = `INSERT INTO \`tbl_projectcategory\`
                //         (
                //             \`int_categoryID\`,
                //             \`int_projectID\`
                //         )
                            
                //             VALUES(
                //             "${categ[l]}",
                //             "${toproject.int_projectID}"
                //         );`;
    
                //     db.query(insertTimeline, (err, tblprojectrequirement, fields) => {        
                //         if (err) throw err;
                //     });
                // }
            // });

            // INSERT APPLICATION TYPE
            console.log("==============INSERT APPLICATION TYPE====================");
            

            console.log(appType);

            var insertAppType = `INSERT INTO \`tbl_projectapplicationtype\`
                (
                    \`enum_applicationType\`,
                    \`int_projectID\`
                )
                
                VALUES
                (
                    "${appType}",
                    "${toproject.int_projectID}"
                )`;

            db.query(insertAppType, (err, inserResult, fields) => {        
                if (err) throw err;
            });

            // INSERT PROJECT BENEFIT
            console.log("==============INSERT PROJECT BENEFIT====================");
            

            console.log(beneName);
            console.log(beneName.length);


            for(var p = 0 ; p < (beneName.length-1) ; p++ ) 
            {
                console.log(p);
                var insertBenefits = `INSERT INTO \`tbl_applicantbenefit\`
                    (
                        \`text_benefitName\`,
                        \`int_benefitQuantity\`,
                        \`int_projectID\`,
                        \`char_itemUnit\`
                    )
                    
                    VALUES
                    (
                        "${beneName[p]}",
                        "${beneQuantity[p]}",
                        "${toproject.int_projectID}",
                        "${beneUnit[p]}"
                    )`;

                db.query(insertBenefits, (err, inserResult, fields) => {        
                    if (err) throw err;
                });
            }

            // INSERT PROJECT ESTIMATED EXPENSES
            console.log("==============INSERT PROJECT ESTIMATED EXPENSES====================");
            

            console.log(expName);
            console.log(expName.length);


            for(var q = 0 ; q < (expName.length-1) ; q++ ) 
            {
                if( expName[q] === '' && expQuantity[q] == '' && expUPrice[q] == '' && expAmount[q] == '' ){
                    console.log("continue lang");
                }

                else {
                    var insertExpense = `INSERT INTO \`tbl_expense\`
                        (
                            \`text_expenseDescription\`,
                            \`int_estimatedQuantity\`,
                            \`decimal_unitPrice\`,
                            \`decimal_estimatedAmount\`,
                            \`int_projectID\`
                        )
                        
                        VALUES
                        (
                            "${expName[q]}",
                            "${expQuantity[q]}",
                            "${expUPrice[q]}",
                            "${expAmount[q]}",
                            "${toproject.int_projectID}"
                        )`;
                        
                    db.query(insertExpense, (err, inserResult, fields) => {        
                        if (err) throw err;
                    });
                }
            }
            res.redirect('/office/projects');
        });
    });
});



router.post('/createproject/ajaxBeneficiary', (req, res) => {

    var beneList = [];
    var beneficiaries = "";

    var statement = req.body.statementID;

    for(var a = 0 ; a < statement.length ; a++) {
        if( a == (statement.length - 1)){
            beneficiaries += statement[a];
        }
        else {
            beneficiaries += statement[a]+",";
        }
    }

    console.log(beneficiaries);

    var stateBeneQuery = `SELECT varchar_beneficiaryName
        FROM tbl_beneficiary B JOIN tbl_projectbeneficiary PB
        ON B.int_beneficiaryID=PB.int_beneficiaryID
        JOIN tbl_intentstatement ISS ON PB.int_linkID=ISS.int_statementID
        WHERE enum_beneficiaryLink='Intent Statement' AND ISS.int_statementID IN (${beneficiaries})`;
    
    db.query(stateBeneQuery, (err, stateBeneResult, fields) => {
        if(err) console.log(err);
        for (var l = 0; l < stateBeneResult.length ; l++) {
            beneList.push(stateBeneResult[l].varchar_beneficiaryName);
        }
        console.log(beneList);
        return res.send({tbl_beneficiary: beneList});
    });
});

module.exports = router;
