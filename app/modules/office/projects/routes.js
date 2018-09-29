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
    console.log(req.session.office.int_userID);

    var queryString4 =`SELECT DISTINCT * FROM tbl_city WHERE int_userID=${req.session.office.int_userID}`

    db.query(queryString4, (err, cityResult, fields ) => {
        if (err) console.log(err);
        var cityid = cityResult[0];
    

        // var queryString =`SELECT *, GROUP_CONCAT(DISTINCT varchar_categoryName) varchar_categoryName 
        //     FROM tbl_project pr
        //     JOIN tbl_projectproposal prpro 
        //     ON pr.int_projectID=prpro.int_projectID
        //     JOIN tbl_projectcategory projcat
        //     ON pr.int_projectID = projcat.int_projectID
        //     JOIN tbl_category cat
        //     ON cat.int_categoryID = projcat.int_categoryID
        //     JOIN tbl_checkapproval propapp
        //     ON propapp.int_projectID = prpro.int_projectID
        //     WHERE propapp.enum_checkappStatus = "Claimed"
        //     GROUP BY pr.int_projectID 
        //     ORDER BY pr.int_projectID DESC`

        var queryString = `SELECT * 
            FROM tbl_projectproposal PR JOIN tbl_project P
            ON PR.int_projectID=P.int_projectID
            WHERE int_cityID=${cityid.int_cityID}
            AND enum_proposalStatus='Approved'`;
        
        db.query(queryString, (err, results, fields) => {
            console.log(results);
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
                tbl_projectproposal`
            db.query(queryString2, (err, result2, fields) => {
                if (err) console.log(err);
                console.log(result2);
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
                    enum_applicationType = "Barangay" AND enum_applicationStatus = "Approved"`

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

                        console.log("pr");
                        console.log(result2);
                        console.log("bar");
                        console.log(result3);
                        console.log("proj");
                        console.log(proj);
            
                        res.render('office/projects/views/projects',{tbl_project:results,slotcount:proj});
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
    var queryString =`SELECT * FROM tbl_projectproposal pr
    JOIN tbl_project proj ON pr.int_projectID = proj.int_projectID
    WHERE pr.int_projectID = "${req.params.int_projectID}"`

    var queryString2 =`SELECT * FROM tbl_projectrequirement prcat
    JOIN tbl_projectproposal pr ON pr.int_projectID=prcat.int_projectID
    JOIN tbl_requirement rq ON rq.int_requirementID=prcat.int_requirementID
    WHERE pr.int_projectID = "${req.params.int_projectID}"`

    var queryString3 =`SELECT * FROM tbl_projectbeneficiary prbf
    JOIN tbl_projectproposal pr ON pr.int_projectID=prbf.int_projectID
    JOIN tbl_beneficiary bf ON prbf.int_beneficiaryID=bf.int_beneficiaryID
    WHERE pr.int_projectID = "${req.params.int_projectID}"`

    var queryString5 =`SELECT * FROM tbl_projectcategory pc
    JOIN tbl_projectproposal pr 
    ON pr.int_projectID=pc.int_projectID
    JOIN tbl_category cat 
    ON cat.int_categoryID=pc.int_categoryID
    WHERE pr.int_projectID = "${req.params.int_projectID}"`
    
    var queryString7 =`SELECT * FROM tbl_problemstatement ps
    JOIN tbl_project pr ON pr.int_projectID=ps.int_projectID
    WHERE ps.int_projectID = "${req.params.int_projectID}"`

    db.query(queryString, (err, results, fields) => {
        console.log(results);

        for (var i = 0; i < results.length;i++){
            results[i].date_createdDate = moment(results[i].date_createdDate).format('MMMM DD[,] YYYY');
            results[i].date_targetStartApp = moment(results[i].date_targetStartApp).format('MMMM DD[,] YYYY');
            results[i].date_targetEndApp = moment(results[i].date_targetEndApp).format('MMMM DD[,] YYYY');
            results[i].date_targetStartRelease = moment(results[i].date_targetStartRelease).format('MMMM DD[,] YYYY');
            results[i].date_targetEndRelease = moment(results[i].date_targetEndRelease).format('MMMM DD[,] YYYY');
            results[i].date_targetClosing = moment(results[i].date_targetClosing).format('MMMM DD[,] YYYY');
            results[i].date_startApplication = moment(results[i].date_startApplication).format('MMMM DD[,] YYYY');
            results[i].date_endApplication = moment(results[i].date_endApplication).format('MMMM DD[,] YYYY');
            results[i].date_startReleaseDate = moment(results[i].date_startReleaseDate).format('MMMM DD[,] YYYY');
            results[i].date_endReleaseDate = moment(results[i].date_endReleaseDate).format('MMMM DD[,] YYYY');
            results[i].date_projectClose = moment(results[i].date_projectClose).format('MMMM DD[,] YYYY');
        }

        if (err) console.log(err);
        db.query(queryString2, (err, results2, fields) => {
            console.log(results2);
            if (err) console.log(err);
            db.query(queryString3, (err, results3, fields) => {
                console.log(results3);
                if (err) console.log(err);
                    db.query(queryString5, (err, results5, fields) => {
                        console.log(results5);
                        if (err) console.log(err);

                        //-applicantdetails
                        var queryAPPRES =`SELECT * FROM tbl_application app
                        JOIN tbl_project proj ON app.int_projectID = proj.int_projectID
                        JOIN tbl_personalinformation pi ON app.int_applicationID = pi.int_applicationID
                        WHERE app.int_projectID = "${req.params.int_projectID}"
                        AND (app.enum_applicationStatus = 'Pending' 
                        OR app.enum_applicationStatus = 'Approved')
                        AND app.enum_applicationType = 'Resident'`
                        
                        var queryAPPBAR =`SELECT * FROM tbl_application app
                        JOIN tbl_project proj ON app.int_projectID = proj.int_projectID
                        JOIN tbl_barangay brgy ON app.int_barangayID = brgy.int_barangayID
                        JOIN tbl_barangayapplication brgyapp ON app.int_applicationID = brgyapp.int_applicationID
                        WHERE app.int_projectID = "${req.params.int_projectID}"
                        AND (app.enum_applicationStatus = 'Pending' 
                        OR app.enum_applicationStatus = 'Approved')
                        AND app.enum_applicationType = 'Barangay'` 
                        
                        var queryAPPHOUSE =`SELECT * FROM tbl_application app 
                        JOIN tbl_householdapplication pi
                        ON app.int_applicationID=pi.int_applicationID
                        WHERE app.int_projectID = ${req.params.int_projectID}
                        AND (app.enum_applicationStatus = 'Pending' 
                        OR app.enum_applicationStatus = 'Approved')
                        AND app.enum_applicationType = 'Household'`
                        
                        db.query(queryString7, (err, results7, fields) => {
                            console.log(results7);
                            db.query(queryAPPRES, (err, resultres, fields) => {
                                console.log(results7);
                                db.query(queryAPPBAR, (err, resultbar, fields) => {
                                    console.log(results7);
                                    db.query(queryAPPHOUSE, (err, resulthou, fields) => {
                                        console.log(results7);

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
                                                tbl_projectproposal`
                                            db.query(queryslot, (err, projslot, fields) => {
                                                if (err) console.log(err);
                                                console.log(projslot);
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
                                                tbl_projectproposal:results, 
                                                tbl_projectrequirement:results2, 
                                                tbl_projectbeneficiary:results3, 
                                                tbl_projectcategory:results5,
                                                tbl_appres:resultres,
                                                tbl_appbar:resultbar,
                                                tbl_apphou:resulthou,
                                                tbl_problemstatement:results7,
                                                slotcount:proj});
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

router.post('/confirmcheck',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: CONFIRM CHECK');
    console.log('=================================');
    console.log(req.body.PROJECT_idcheq)
    console.log(req.body.chequeNumber)

    var confirmCheck = `UPDATE tbl_proposalapproval
        SET enum_propappStatus = 'Received'
        WHERE varchar_checkNumber = ${req.body.chequeNumber}
        AND int_projectID = ${req.body.PROJECT_idcheq}`
            
        
        db.query(confirmCheck, (err, results1, fields) => {

                
            res.redirect(`/office/projects`);
            
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

router.get('/:int_projectID/viewapp',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: RELEASING PROJECT - VIEW BENEFICIARIES');
    console.log('=================================');
    
    var queryString1 =`SELECT * FROM tbl_application app
    JOIN tbl_project proj ON app.int_projectID = proj.int_projectID
    JOIN tbl_personalinformation pi ON app.int_applicationID = pi.int_applicationID
    WHERE app.int_projectID = "${req.params.int_projectID}"
    AND (app.enum_applicationStatus = 'Approved' 
    OR app.enum_applicationStatus = 'Received')
    AND app.enum_applicationType = 'Resident'` 
    
    var queryString2 =`SELECT * FROM tbl_application app
    JOIN tbl_project proj ON app.int_projectID = proj.int_projectID
    JOIN tbl_barangay brgy ON app.int_barangayID = brgy.int_barangayID
    JOIN tbl_barangayapplication brgyapp ON app.int_applicationID = brgyapp.int_applicationID
    WHERE app.int_projectID = "${req.params.int_projectID}"
    AND (app.enum_applicationStatus = 'Approved' 
    OR app.enum_applicationStatus = 'Received')
    AND app.enum_applicationType = 'Barangay'` 
    
    var queryString3 =`SELECT * FROM tbl_application app
    JOIN tbl_project proj ON app.int_projectID = proj.int_projectID
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

                    var queryString2 =`SELECT * FROM tbl_project proj
                    JOIN tbl_projectproposal propr ON propr.int_projectID = proj.int_projectID
                    WHERE proj.int_projectID = "${req.params.int_projectID}"`

                    var queryString3 =`SELECT * FROM tbl_applicantbenefit proj
                    JOIN tbl_project appben ON proj.int_projectID = appben.int_projectID
                    WHERE proj.int_projectID = "${req.params.int_projectID}"`

                    db.query(queryString2, (err, results2, fields) => {
                        console.log(results2);
                        if (err) console.log(err);
                        db.query(queryString3, (err, results3, fields) => {
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


// AJAX GET DETAILS ONGOING PROJECT - VIEW APPLICANT DETAILS
router.post('/:int_projectID/viewapp/ajaxapplicantdetails',(req,res) => {
    console.log('=================================');
    console.log('OFFICE: PROJECT ONGOING-VIEW APPLICATION-AJAX GET DETAILS (POST)');
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
    
    var queryString1 = `UPDATE tbl_project SET
    enum_projectStatus = 'Ongoing'
    WHERE tbl_project.int_projectID=${req.body.int_projectID}`
            
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
        \`date_projectDateStarted\`)
        VALUES
        ("${req.body.projectID}",
        "${req.body.projectReason}",
        "${req.body.current_date}");`;

    db.query(queryString, (err, results) => {        
        if (err) throw err;
        console.log(results);

        var queryString1 = `UPDATE tbl_project SET
        enum_projectStatus = 'Ongoing'
        WHERE tbl_project.int_projectID = ${req.body.projectID}`
                
        db.query(queryString1, (err, results2) => {        
            if (err) throw err;
            console.log(results);

            res.redirect('/office/projects');
        });
    });
});
// router.get('/finishedproject',(req, res) => {
//     console.log('=================================');
//     console.log('OFFICE: FINISHED PROJECT');
//     console.log('=================================');

//     var queryString =`SELECT * FROM tbl_project pr
//     JOIN tbl_projectproposal prpro 
//     ON pr.int_projectID=prpro.int_projectID
//     WHERE pr.enum_projectStatus = 'Finished' 
//     ORDER BY pr.int_projectID DESC`

    
//     db.query(queryString, (err, results, fields) => {
//         console.log(results);
//         if (err) console.log(err);

//             var queryString2=`SELECT *, GROUP_CONCAT(DISTINCT varchar_categoryName) varchar_categoryName
//                 FROM tbl_projectcategory PC JOIN tbl_projectproposal PR ON pr.int_projectID=pc.int_projectID
//                 JOIN tbl_category C ON C.int_categoryID=PC.int_categoryID
//                 JOIN tbl_project P ON P.int_projectID = PR.int_projectID
//                 WHERE P.enum_projectStatus="Finished"
//                 GROUP BY P.int_projectID`;

//         db.query(queryString2, (err, results2, fields) => {
//             console.log("-----------RESULTS2")
//             console.log(results2);

//             res.render('office/projects/views/finishedproject',{
//                 tbl_project:results2});
//         });
//     });
// });


// router.get('/finishedproject/:int_projectID/viewfinished',(req, res) => {
//     console.log('=================================');
//     console.log('OFFICE: ONGOING PROJECT');
//     console.log('=================================');
//     var queryString =`SELECT * FROM tbl_projectproposal pr
//     JOIN tbl_project proj ON pr.int_projectID = proj.int_projectID
//     WHERE pr.int_projectID = "${req.params.int_projectID}"`

//     var queryString2 =`SELECT * FROM tbl_projectrequirement prcat
//     JOIN tbl_projectproposal pr ON pr.int_projectID=prcat.int_projectID
//     JOIN tbl_requirement rq ON rq.int_requirementID=prcat.int_requirementID
//     WHERE pr.int_projectID = "${req.params.int_projectID}"`

//     var queryString3 =`SELECT * FROM tbl_projectbeneficiary prbf
//     JOIN tbl_projectproposal pr ON pr.int_projectID=prbf.int_projectID
//     JOIN tbl_beneficiary bf ON prbf.int_beneficiaryID=bf.int_beneficiaryID
//     WHERE pr.int_projectID = "${req.params.int_projectID}"`

//     var queryString4 =`SELECT * FROM tbl_projectlocation pl
//     JOIN tbl_projectproposal pr ON pr.int_projectID=pl.int_projectID
//     JOIN tbl_releaselocation rl ON pl.int_locationID=rl.int_locationID
//     WHERE pr.int_projectID = "${req.params.int_projectID}"`

//     var queryString5 =`SELECT * FROM tbl_projectcategory pc
//     JOIN tbl_projectproposal pr ON pr.int_projectID=pc.int_projectID
//     JOIN tbl_category cat ON cat.int_categoryID=pc.int_categoryID
//     WHERE pr.int_projectID = "${req.params.int_projectID}"`
    

//     db.query(queryString, (err, results, fields) => {
//         console.log(results);
//         if (err) console.log(err);
//         // console.log(results);
//         db.query(queryString2, (err, results2, fields) => {
//             console.log(results2);
//             if (err) console.log(err);
//             db.query(queryString3, (err, results3, fields) => {
//                 console.log(results3);
//                 if (err) console.log(err);
//                 db.query(queryString4, (err, results4, fields) => {
//                     console.log(results4);
//                     if (err) console.log(err);
//                     db.query(queryString5, (err, results5, fields) => {
//                         console.log(results5);
//                         if (err) console.log(err);
//         res.render('office/projects/views/viewfinished', {tbl_projectproposal:results, tbl_projectrequirement:results2, tbl_projectbeneficiary:results3, tbl_releaselocation:results4,tbl_projectcategory:results5});

//     });});});});
// });
// });

// router.get('/finishedproject/:int_projectID/viewapp',(req, res) => {
//     console.log('=================================');
//     console.log('OFFICE: FINISHED PROJECT - VIEW APPLICATION');
//     console.log('=================================');

//     var queryString =`SELECT * FROM tbl_project pr
//     JOIN tbl_application app
//     ON pr.int_projectID=app.int_projectID
//     JOIN tbl_personalinformation pi
//     ON pi.int_applicationID = app.int_applicationID
//     WHERE pr.enum_projectStatus = 'Finished'
//     AND app.int_projectID=${req.params.int_projectID}`

    
//     db.query(queryString, (err, results, fields) => {
//         console.log(results);
//         if (err) console.log(err);

//         var queryString2= `SELECT * FROM tbl_project pr
//         JOIN tbl_projectproposal pp 
//         ON pr.int_projectID = pp.int_projectID
//         WHERE pr.enum_projectStatus = 'Finished'
//         AND pr.int_projectID=${req.params.int_projectID}`

//         db.query(queryString2, (err, results2, fields) => {

//             res.render('office/projects/views/appfinishedproject',{
//                 tbl_project:results,
//                 project:results2});
//         });
//     });
// });

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

            var queryString =`SELECT * FROM tbl_project pr
            JOIN tbl_projectproposal prpro 
            ON pr.int_projectID=prpro.int_projectID
            WHERE pr.int_projectID = ${req.body.ajProjectID}`

            db.query(queryString,(err, results, fields) => {
                if (err) console.log(err);

                console.log(results);

                var date_results = results;

                for (var i = 0; i < date_results.length;i++){
                    date_results[i].date_targetStartApp= moment(date_results[i].date_targetStartApp).format('M-D-YYYY');
                    console.log(`${date_results[i].date_targetStartApp}`);
                }

                // for (var i = 0; i < date_results.length;i++){
                //     date_results[i].date_startApplication= moment(date_results[i].date_startApplication).format('M-D-YYYY');
                //     console.log(`${date_results[i].date_startApplication}`);
                // }

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
    resultIndex = `${req.body.projID}`;

    console.log(resultIndex);
    var queryString1 = `UPDATE tbl_project SET
    enum_projectStatus = 'Closed'
    WHERE tbl_project.int_projectID = ${req.body.projID}`
            
    db.query(queryString1, (err, results) => {        
        if (err) throw err;
        res.redirect('/office/projects');
    });
});

router.get('/:int_projectID/liquidation',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: ONGOING PROJECT - LIQUIDATION');
    console.log('=================================');

    // var queryString = `UPDATE tbl_project SET
    // enum_projectStatus = 'Finished'
    // WHERE tbl_project.int_projectID = "${req.body.int_projectID}"`

    // db.query(queryString, (err, results, fields) => {
    //     console.log(results);
    // });

    var queryString1 =`SELECT * FROM tbl_expense ex
    JOIN tbl_project proj ON ex.int_projectID = proj.int_projectID
    WHERE ex.int_projectID = "${req.params.int_projectID}"`

    var queryString2 =`SELECT * FROM tbl_project proj
    JOIN tbl_projectproposal pr ON proj.int_projectID = pr.int_projectID
    WHERE proj.int_projectID = "${req.params.int_projectID}"`

    var queryString3 =`SELECT SUM(decimal_estimatedAmount) AS "total_estimatedexpense" 
    FROM tbl_expense
    WHERE int_projectID = "${req.params.int_projectID}"`

    var queryString4 =`SELECT SUM(decimal_actualAmount) AS "total_expense" 
    FROM tbl_expense
    WHERE int_projectID = "${req.params.int_projectID}"`

    var queryString5 =`SELECT * FROM tbl_checkapproval
    WHERE int_projectID = "${req.params.int_projectID}"`

    var queryString6 =`SELECT (SELECT decimal_amount FROM tbl_checkapproval
        WHERE int_projectID = "${req.params.int_projectID}")-(SUM(decimal_actualAmount)) AS "budgetbalance" 
        FROM tbl_expense
        WHERE int_projectID = "${req.params.int_projectID}"`

        db.query(queryString1, (err, results1, fields) => {
            db.query(queryString2, (err, results2, fields) => { 
                db.query(queryString3, (err, results3, fields) => {
                    db.query(queryString4, (err, results4, fields) => {
                        db.query(queryString5, (err, results5, fields) => {
                            db.query(queryString6, (err, results6, fields) => { 
                
    
                        res.render('office/projects/views/liquidation',{
                            tbl_expenses:results1,
                            tbl_project:results2,
                            totalest:results3,
                            total:results4,
                            tbl_check:results5,
                            tbl_rembal:results6
                            });
                        });
                    });
                });
            });
        });
    });
});

router.post('/endproj', (req, res) => {
    console.log('=================================');
    console.log('OFFICE: Project finproj POST');
    console.log('=================================');
    resultIndex = `${req.body.projID}`;

    console.log(resultIndex);
    var queryString1 = `UPDATE tbl_project SET
    enum_projectStatus = 'Finished'
    WHERE tbl_project.int_projectID = ${req.body.projID}`
            
    db.query(queryString1, (err, results) => {        
        if (err) throw err;
        res.redirect('/office/projects');
    });
});

// PINACOPY NI JAKE

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

    var queryString4 =`SELECT DISTINCT * FROM tbl_city WHERE int_userID=${req.session.office.int_userID}`
    
    var queryString5 =`SELECT * FROM tbl_problemstatement ps
        JOIN tbl_category cat ON ps.int_categoryID = cat.int_categoryID
        WHERE enum_problemStatus = 'Acknowledged'`

    var queryString6 = `SELECT *
        FROM tbl_barangay B JOIN tbl_city C
        ON B.int_cityID=C.int_cityID
        WHERE C.int_userID=${req.session.office.int_userID}`;

    var queryString7 = `SELECT * FROM tbl_agency WHERE enum_agencyStatus='Active'`;

    db.query(queryString, (err, results, fields) => {
        console.log(results);
        if (err) console.log(err);
        db.query(queryString2, (err, results2, fields) => {
            console.log(results2);
            if (err) console.log(err);
            db.query(queryString3, (err, results3, fields) => {
                console.log(results3);
                if (err) console.log(err);
                db.query(queryString4, (err, results4, fields) => {
                    console.log(results4);
                    cityID = results4[0];
                    if (err) console.log(err);
                    db.query(queryString5, (err, results5, fields) => {
                        console.log(results5);
                        if (err) console.log(err);
                        db.query(queryString6, (err, results6, fields) => {
                            console.log(results6);
                            if (err) console.log(err);
                            db.query(queryString7, (err, results7, fields) => {
                                console.log(results7);
                                if (err) console.log(err);
                                res.render('office/projects/views/createproject', 
                                {
                                    tbl_category: results,
                                    tbl_beneficiary:results2,
                                    tbl_requirement:results3,
                                    tbl_barangay:results4,
                                    tbl_problemstatement:results5,
                                    tbl_location:results6,
                                    tbl_agency: results7
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
    var beneName = req.body.benefitname;
    console.log(beneName);
    var beneQuantity = req.body.benefitquantity;
    console.log(beneQuantity);
    console.log("PROJECT EXPENSE:");
    var expName = req.body.expenseName;
    var expQuantity = req.body.expenseQuantity;
    var expUPrice = req.body.expenseUnitPrice;
    var expAmount = req.body.expenseAmount;
    console.log(expName);
    console.log(expQuantity);
    console.log(expUPrice);
    console.log(expAmount);
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
    console.log(estimatedbudget);
    console.log("PROJECT CATEGORY:")
    var categ = req.body.projectlist;
    console.log(categ);
    console.log("PROJECT BENEFICIARY:");
    var beneficiaries = req.body.projectbeneficiaries;
    console.log(beneficiaries);
    console.log("PROJECT REQUIREMENT:");
    var require = req.body.projectrequirement;
    console.log(require);
    console.log("PROJECT IMPLEMENTING AGENCY:")
    var agency = req.body.projectagency;
    console.log(agency);
    console.log("PROBLEM STATEMENT:")
    var statementList = req.body.statementsList;
    console.log(statementList);
    console.log("PROBLEM LOCATION:")
    var locationList = req.body.projectlocation;
    console.log(locationList);
    console.log("CITY ID:")
    console.log(cityID.int_cityID);

    var insertprojProposal = `INSERT INTO \`tbl_projectproposal\` 
    (
        \`int_cityID\`,
        \`varchar_projectName\`,
        \`varchar_projectRationale\`,
        \`text_projectDescription\`,
        \`text_projectObjective\`,
        \`int_allotedSlot\`,
        \`date_targetStartApp\`,
        \`date_targetEndApp\`,
        \`date_targetStartRelease\`,
        \`date_targetEndRelease\`,
        \`date_targetClosing\`,
        \`decimal_estimatedBudget\`,
        \`date_createdDate\`,
        \`enum_proposalStatus\`
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
        CURDATE(),
        "Approved"
    )`;

    db.query(insertprojProposal, (err, results, fields) => {        
        if (err) throw err;    
        console.log("==============INSERT PROJECT PROPOSAL CREDENTIALS SUCCESS====================");
            
        
        var getProposalID =`SELECT * FROM tbl_projectproposal ORDER BY int_projectID DESC LIMIT 0,1`

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

                var updateStatus =  `UPDATE tbl_problemstatement 
                    SET enum_problemStatus = "Proposed",
                    int_projectID = ${toproject.int_projectID}
                    WHERE int_statementID = ${statementList[o]}`;

                 db.query(updateStatus, (err, results) => {        
                    if (err) throw err;

                    console.log(results)
                });
            }


            // INSERT PROJECT BENEFICIARIES
            console.log("==============INSERT PROJECT BENEFICIARIES====================");

            console.log(beneficiaries);
            console.log(beneficiaries.length);

            for(var j = 0 ; j < beneficiaries.length ; j++ ) 
            {
                console.log(j);
                console.log(beneficiaries[j]);
                
                var insertBeneficiaries = `INSERT INTO \`tbl_projectbeneficiary\`
                    (
                        \`int_projectID\`,
                        \`int_beneficiaryID\`,
                        \`enum_beneficiaryLink\`
                    )

                    VALUES
                    (
                        "${toproject.int_projectID}",
                        "${beneficiaries[j]}",
                        "Project Proposal"
                    )`;

                db.query(insertBeneficiaries, (err, insertResult) => {        
                    if (err) throw err;
                    console.log(insertResult);
                });
            }



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
            
            var statementCategoryQuery = `SELECT int_categoryID 
                FROM tbl_problemstatement
                WHERE int_statementID IN (${statementList})`;

            db.query(statementCategoryQuery, (err, categResult, fields) => {
                if(err) console.log(err);

                var categ = categResult;
                console.log(categ);
                
                for(var l = 0 ; l < categ.length ; l++)
                {
                    console.log(l);
                    var insertTimeline = `INSERT INTO \`tbl_projectcategory\`
                        (
                            \`int_categoryID\`,
                            \`int_projectID\`
                        )
                            
                            VALUES(
                            "${categ[l].int_categoryID}",
                            "${toproject.int_projectID}"
                        );`;
    
                    db.query(insertTimeline, (err, tblprojectrequirement, fields) => {        
                        if (err) throw err;
                    });
                }
            });

            // INSERT APPLICATION TYPE
            console.log("==============INSERT APPLICATION TYPE====================");
            

            console.log(appType);
            console.log(appType.length);


            for(var n = 0 ; n < appType.length ; n++ ) 
            {
                console.log(n);
                var insertAppType = `INSERT INTO \`tbl_projectapplicationtype\`
                    (
                        \`enum_applicationType\`,
                        \`int_projectID\`
                    )
                    
                    VALUES
                    (
                        "${appType[n]}",
                        "${toproject.int_projectID}"
                    )`;

                db.query(insertAppType, (err, inserResult, fields) => {        
                    if (err) throw err;
                });
            }

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
                        \`int_projectID\`
                    )
                    
                    VALUES
                    (
                        "${beneName[p]}",
                        "${beneQuantity[p]}",
                        "${toproject.int_projectID}"
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
                            \`int_quantity\`,
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

            // INSERT PROJECT LOCATION
            console.log("==============INSERT PROJECT LOCATION====================");

            console.log(locationList);
            console.log(locationList.length);

            for(var r = 0 ; r < locationList.length ; r++ ) 
            {
                console.log(r);
                console.log(locationList[r]);
                
                var insertLocation = `INSERT INTO \`tbl_projectlocation\`
                    (
                        \`int_projectID\`,
                        \`enum_locationTarget\`,
                        \`int_locationID\`
                    )

                    VALUES
                    (
                        "${toproject.int_projectID}",
                        "Barangay",
                        "${locationList[r]}"
                    )`;

                db.query(insertLocation, (err, insertResult) => {        
                    if (err) throw err;
                    console.log(insertResult);
                });
            }

            var insertCheckQuery2 = `INSERT INTO \`tbl_project\` 
                (\`int_projectID\`,
                \`enum_projectStatus\`)
                VALUES
                (${toproject.int_projectID},
                "Approved")`
            
            db.query(insertCheckQuery2, (err, insertCheckquery2, fields) => {
                if(err) console.log(err);

                res.redirect('/office/projects');  
            });
        });
    });
});



module.exports = router;
