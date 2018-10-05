var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();
var moment = require('moment');

//- SCRIPT FOR CURRENT DATE
var n =  new Date();
var y = n.getFullYear();
var m = n.getMonth() + 1;
var d = n.getDate();
var hr = n.getHours();
var min = n.getMinutes();
var sec = n.getSeconds();
var now = y +"-"+ m +"-"+ d + " "+ hr +":"+ min +":"+ sec 

var currentDate = y + "-" + m + "-" + d
var user_results;
router.get('/',(req, res) => {
    console.log('=================================');
    console.log('BARANGAY: Releasing');
    console.log('=================================');
    
    console.log(now);
    console.log(req.session.barangay.int_userID)

    var queryuser =`SELECT * FROM tbl_user us
    JOIN tbl_officialsaccount oa ON us.int_userID = oa.int_userID
    JOIN tbl_barangay bar ON oa.int_officialsID = bar.int_barangayID
    AND us.int_userID = ${req.session.barangay.int_userID}`

    db.query(queryuser, (err, resultsuser, fields) => {
        if (err) console.log(err);
        console.log('=================================');
        console.log('BARANGAY: BARANGAYuser');
        console.log('=================================');
        console.log(resultsuser);

        user_results = resultsuser;

        var queryString =`SELECT DISTINCT app.int_projectID, enum_projectStatus, enum_barangayReleaseStatus, varchar_projectName, date_targetStartRelease, decimal_estimatedBudget, pat.enum_applicationType
        FROM tbl_projectdetail pd
        JOIN tbl_projectapplicationtype pat ON pd.int_projectID = pat.int_projectID
        JOIN tbl_application app ON pd.int_projectID = app.int_projectID
        JOIN tbl_barangayreleasing br ON pd.int_projectID = br.int_projectID
        WHERE 
        (
            (pd.enum_projectStatus = 'Releasing')
            AND 
            (
            br.enum_barangayReleaseStatus ='Releasing'
            OR 
            br.enum_barangayReleaseStatus = 'Closed' )
        )
        AND br.int_barangayID = ${user_results[0].int_barangayID}`
    

        db.query(queryString, (err, results, fields) => {
            if (err) console.log(err);
            console.log('=================================');
            console.log('BARANGAY: PROJECT DETAIL');
            console.log('=================================');
            console.log(results);

            var date_results = results;
            for (var i = 0; i < date_results.length;i++){
                
                date_results[i].date_targetStartRelease = moment(date_results[i].date_targetStartRelease).format('MMMM DD[,] YYYY');
                console.log(date_results[i].date_targetStartRelease);
            }

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

                res.render('barangay/releasing/views/releasing',{
                    tbl_project:date_results,
                    notifications:notifications,
                    numbernotif:countrow});
                });
            });
    });
});

//- =========================================
//-             OPEN PROJECT
//- =========================================
router.post('/ajaxgetprojectdetails',(req,res) => {
    console.log('=================================');
    console.log('BARANGAY: RELEASING - date comparison -AJAX GET DETAILS (POST)');
    console.log('=================================');
    console.log(`${req.body.ajProjectID}`);

            var queryString =`SELECT * FROM tbl_projectdetail
            WHERE int_projectID = ${req.body.ajProjectID}`

            db.query(queryString,(err, results, fields) => {
                if (err) console.log(err);

                console.log(results);

                var date_results = results;

                for (var i = 0; i < date_results.length;i++){
                    date_results[i].date_targetStartRelease = moment(date_results[i].date_targetStartRelease).format('MMMM D[,] YYYY');
                    console.log(date_results[i].date_targetStartRelease);
                }

                var resultss = results[0];

                console.log("===================RESULTSS")
                console.log(resultss)

                return res.send({tbl_project1:resultss});
        });
});

router.post('/openreleasing', (req, res) => {
    console.log('=================================');
    console.log('BARANGAY: Releasing open');
    console.log('=================================');
    resultIndex = `${req.body.projectID}`;

    console.log(resultIndex);
    // var queryString1 = `UPDATE tbl_projectdetail SET
    // enum_projectStatus = 'Releasing',
    // date_actualStartRelease = "${currentDate}"
    // WHERE int_projectID = ${req.body.int_projectID}`
    var queryString = `UPDATE tbl_barangayreleasing SET
    enum_barangayReleaseStatus = 'Releasing',
    date_startRelease = "${now}"
    WHERE tbl_barangayreleasing.int_barangayID=${user_results[0].int_barangayID}
    AND tbl_barangayreleasing.int_projectID=${req.body.srint_projectID} `

    
    db.query(queryString, (err, results) => {        
        if (err) throw err;

        res.redirect('/barangay/releasing');
    });
});

router.post('/openlatereleasing', (req, res) => {
    console.log('=================================');
    console.log('BARANGAY: Releasing open');
    console.log('=================================');
    resultIndex = `${req.body.projectID}`;

    console.log(resultIndex);

    console.log(req.session.barangay.int_userID)

    var queryuser =`SELECT * FROM tbl_user us
    JOIN tbl_officialsaccount oa ON us.int_userID = oa.int_userID
    JOIN tbl_barangay bar ON oa.int_officialsID = bar.int_barangayID
    AND us.int_userID = ${req.session.barangay.int_userID}`

    db.query(queryuser, (err, resultsuser, fields) => {
        console.log(resultsuser);
        if (err) console.log(err);
        var user_results = resultsuser;
            
    var queryString = `INSERT INTO \`tbl_projectreason\` 
        (\`int_barangayID\`,
        \`int_projectID\`, 
        \`text_projectReason\`,
        \`enum_projectPhase\`)
        VALUES
        ("${user_results[0].int_barangayID}",
        "${req.body.projectID}",
        "${req.body.projectReason}",
        "Start Releasing");`;

        db.query(queryString, (err, results) => {        
            if (err) throw err;
            console.log(results);

            // var queryString1 = `UPDATE tbl_projectdetail SET
            // enum_projectStatus = 'Releasing',
            // date_actualStartRelease = "${currentDate}"
            // WHERE tbl_projectdetail.int_projectID = ${req.body.projectID}`
            var queryString1 = `UPDATE tbl_barangayreleasing SET
            enum_barangayReleaseStatus = 'Releasing',
            date_startRelease = "${now}"
            WHERE tbl_barangayreleasing.int_barangayID=${user_results[0].int_barangayID}
            AND tbl_barangayreleasing.int_projectID=${req.body.projectID} `
                    
            db.query(queryString1, (err, results2) => {        
                if (err) throw err;

                res.redirect('/barangay/releasing');
            });
        });
    });
});

//- =========================================
//-             VIEW PROJECT DETAILS
//- =========================================
router.get('/:int_projectID/viewproj',(req, res) => {
    console.log('=================================');
    console.log('Barangay: releasing PROJECT');
    console.log('=================================');
    var queryString =`SELECT * FROM tbl_projectdetail
    WHERE int_projectID = "${req.params.int_projectID}"`

    var queryString2 =`SELECT * FROM tbl_projectrequirement prreq
    JOIN tbl_projectdetail prd ON prd.int_projectID=prreq.int_projectID
    JOIN tbl_requirement rq ON rq.int_requirementID=prreq.int_requirementID
    WHERE prreq.int_projectID = "${req.params.int_projectID}"`

    var queryString3 =`SELECT * FROM tbl_projectbeneficiary prbf
    JOIN tbl_projectdetail pr ON pr.int_projectID=prbf.int_linkID
    JOIN tbl_beneficiary bf ON prbf.int_beneficiaryID=bf.int_beneficiaryID
    WHERE prbf.int_linkID = "${req.params.int_projectID}"`

    var queryString5 =`SELECT * FROM tbl_projectcategory pc
    JOIN tbl_projectdetail pr ON pr.int_projectID=pc.int_projectID
    JOIN tbl_category cat ON cat.int_categoryID=pc.int_categoryID
    WHERE pr.int_projectID = "${req.params.int_projectID}"`

    var queryString7 =`SELECT * FROM tbl_intentstatement ins
    JOIN tbl_projectdetail pr ON pr.int_projectID=ins.int_projectID
    WHERE ins.int_projectID = "${req.params.int_projectID}"`
    

    db.query(queryString, (err, results, fields) => {
        console.log(results);
        if (err) console.log(err);
        // console.log(results);
        db.query(queryString2, (err, results2, fields) => {
            console.log(results2);
            if (err) console.log(err);
            db.query(queryString3, (err, results3, fields) => {
                console.log(results3);
                if (err) console.log(err);
               
                    db.query(queryString5, (err, results5, fields) => {
                        console.log(results5);
                        if (err) console.log(err);
                        
                        db.query(queryString7, (err, results7, fields) => {
                            console.log(results7);
                            if (err) console.log(err);

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
                            
                            var date_results = results;

                            for (var i = 0; i < date_results.length;i++){
                                date_results[i].date_targetStartApp = moment(date_results[i].date_targetStartApp).format('MMMM D[,] YYYY');
                                date_results[i].date_targetEndApp = moment(date_results[i].date_targetEndApp).format('MMMM D[,] YYYY');
                                date_results[i].date_targetStartRelease = moment(date_results[i].date_targetStartRelease).format('MMMM D[,] YYYY');
                                date_results[i].date_targetEndRelease = moment(date_results[i].date_targetEndRelease).format('MMMM D[,] YYYY');
                                date_results[i].date_targetClosing = moment(date_results[i].date_targetClosing).format('MMMM D[,] YYYY');

                                date_results[i].date_actualStartApp = moment(date_results[i].date_actualStartApp).format('MMMM D[,] YYYY');
                                date_results[i].date_actualEndApp = moment(date_results[i].date_actualEndApp).format('MMMM D[,] YYYY');
                                date_results[i].date_actualStartRelease = moment(date_results[i].date_actualStartRelease).format('MMMM D[,] YYYY');
                                date_results[i].date_actualEndRelease = moment(date_results[i].date_actualEndRelease).format('MMMM D[,] YYYY');
                                date_results[i].date_actualClosing = moment(date_results[i].date_actualClosing).format('MMMM D[,] YYYY');
                            }
                            console.log(date_results)

                            res.render('barangay/releasing/views/viewproj', 
                            {
                                tbl_projectproposal:date_results,
                                tbl_projectrequirement:results2,
                                tbl_projectbeneficiary:results3, 
                                tbl_projectcategory:results5,
                                notifications:notifications,
                                numbernotif:countrow,
                                tbl_problemstatement:results7
                            });
                        });      
                    });      
                });
            });
        });
    });
});

//- =========================================
//-         VIEW PROJECT BENEFICIARY
//- =========================================

router.get('/:int_projectID/viewben',(req, res) => {
    console.log('=================================');
    console.log('BARANGAY: RELEASING PROJECT - VIEW BENEFICIARIES');
    console.log('=================================');
    var queryBarangayUser =`SELECT * FROM tbl_officialsaccount OA
    JOIN tbl_barangay BR ON OA.int_officialsID = BR.int_barangayID
    WHERE OA.int_userID = ${req.session.barangay.int_userID}`
                     
    db.query(queryBarangayUser,(err, barUser) => {
    if (err) console.log(err);
        console.log(barUser);

        var queryRes =`SELECT * FROM tbl_application app
            JOIN tbl_personalinformation pi ON app.int_applicationID = pi.int_applicationID
            WHERE app.int_projectID = "${req.params.int_projectID}"
            AND (app.enum_applicationStatus = 'Approved' 
            OR app.enum_applicationStatus = 'Received')
            AND app.enum_applicationType = 'Resident'
            AND app.int_barangayID = "${barUser[0].int_barangayID}"` ;

        var queryHouse =`SELECT * FROM tbl_application app
            JOIN tbl_householdapplication HA ON app.int_applicationID=HA.int_applicationID
            WHERE app.int_projectID = "${req.params.int_projectID}"
            AND (app.enum_applicationStatus = 'Approved' 
            OR app.enum_applicationStatus = 'Received')
            AND app.enum_applicationType = 'Household'
            AND app.int_barangayID = "${barUser[0].int_barangayID}"`;
        
        db.query(queryRes, (err, results1, fields) => {
            console.log(results1);
            if (err) console.log(err);
            console.log('=================================');
            console.log('BARANGAY: RESIDENT');
            console.log('=================================');
            db.query(queryHouse, (err, resultshouse, fields) => {
                console.log(resultshouse);
                if (err) console.log(err);
                console.log('=================================');
                console.log('BARANGAY: HOUSEHOLD');
                console.log('=================================');

                req.session.barangay.sesReleasingProjectID = req.params.int_projectID

                console.log("=====SESSION SESRELEASINGPROJECTID=====");
                console.log(req.session.barangay.sesReleasingProjectID);

                var queryString2 =`SELECT * FROM tbl_projectdetail prd
                JOIN tbl_projectapplicationtype apptype ON apptype.int_projectID = prd.int_projectID
                WHERE prd.int_projectID = "${req.params.int_projectID}"`

                db.query(queryString2, (err, results2, fields) => {
                    console.log(results2);
                    if (err) console.log(err);

                        var notificationsQuery = `SELECT * FROM tbl_notification 
                        JOIN tbl_user ON tbl_notification.int_notifSenderID = tbl_user.int_userID 
                        WHERE tbl_notification.int_notifReceiverID=${req.session.barangay.int_userID}
                        AND enum_notifStatus = "New"
                        ORDER BY tbl_notification.int_notifID DESC`

                        var queryString3 =`SELECT * FROM tbl_applicantbenefit proj
                        JOIN tbl_projectdetail appben ON proj.int_projectID = appben.int_projectID
                        WHERE proj.int_projectID = "${req.params.int_projectID}"`
                            
                        db.query(notificationsQuery,(err, notifications) => {
                        if (err) console.log(err);
                        console.log('=================================');
                        console.log('BARANGAY: NOTIFICATIONS - GET NOTIFICATIONS - DATA');
                        console.log('=================================');
                        console.log(notifications)
                        var countrow = notifications.length;

                            db.query(queryString3,(err, results3) => {
                            if (err) console.log(err);
                    
                            res.render('barangay/releasing/views/beneficiary', 
                            {
                                tbl_application:results1,
                                tbl_project:results2,
                                notifications:notifications,
                                numbernotif:countrow,
                                tbl_household:resultshouse,
                                tbl_applicantbenefit:results3
                            });
                        });
                    });
                });
            });
        });
    });
});

router.post('/receipt', (req, res) => {
    console.log('=================================');
    console.log('BARANGAY: project - 1 acceptapplication GET');
    console.log('=================================');
    
    var dayNow = moment().format('Do');
    var monthNow = moment().format('MMMM');
    var yearNow = moment().format('YYYY');
    var dateNow = moment().format('DD MMMM YYYY');
    
    var dateToday = {day: dayNow, month:monthNow, year: yearNow, dateNow:dateNow};
    
    var queryString = `UPDATE tbl_application SET
    enum_applicationStatus = 'Received',
    datetime_receivedDate = "${now}"
    WHERE tbl_application.int_applicationID=${req.body.int_applicationID}`

    db.query(queryString, (err, results, fields) => {
        console.log(results);
        if (err) console.log(err);

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
    
                var queryProject =`SELECT * FROM tbl_application app
                JOIN tbl_projectdetail pd ON app.int_projectID = pd.int_projectID
                JOIN tbl_personalinformation pi ON app.int_applicationID = pi.int_applicationID
                WHERE app.enum_applicationStatus = 'Received' 
                AND app.int_applicationID=${req.body.int_applicationID}`

                var queryHousehold =`SELECT * FROM tbl_application app
                JOIN tbl_projectdetail pd ON app.int_projectID = pd.int_projectID
                JOIN tbl_householdapplication pi ON app.int_applicationID = pi.int_applicationID
                WHERE app.enum_applicationStatus = 'Received' 
                AND app.int_applicationID=${req.body.int_applicationID}`
    
                db.query(queryProject,(err, app) => {
                if (err) console.log(err);
                console.log(app)
                    db.query(queryHousehold,(err, house) => {
                    if (err) console.log(err);
                        console.log(house)

                        var queryPROJECTDETAIL =`SELECT * FROM tbl_projectdetail prd
                        JOIN tbl_projectapplicationtype apptype ON apptype.int_projectID = prd.int_projectID
                        WHERE prd.int_projectID = "${app[0].int_projectID}"`

                        db.query(queryPROJECTDETAIL,(err, proDET) => {
                        if (err) console.log(err);
                            console.log(proDET)
                    

                            var queryBENEFITS =`SELECT * FROM tbl_applicantbenefit proj
                            JOIN tbl_projectdetail appben ON proj.int_projectID = appben.int_projectID
                            WHERE proj.int_projectID = "${app[0].int_projectID}"
                            OR proj.int_projectID = "${proDET[0].int_projectID}"`

                            db.query(queryBENEFITS,(err, results5) => {
                            if (err) console.log(err);
                                console.log('=================================');
                                console.log(results5)
                                
                                res.render(`barangay/releasing/views/receipt`,{
                                    tbl_app:app,
                                    tbl_benefits:results5,
                                    notifications:notifications,
                                    dateNow:dateToday,
                                    projectDETAILS:proDET,
                                    tbl_house:house
                                });
                            });
                        });
                    });
            });
        });
    });
});


router.post('/projectdetails',(req,res) => {
    console.log('=================================');
    console.log('BARANGAY: PROJECTS-AJAX GET DETAILS (POST)');
    console.log('=================================');
    console.log(`${req.body.ajProjectID}`);

    
    var queryString = `SELECT * FROM tbl_projectdetail 
        WHERE tbl_projectdetail.int_projectID = ${req.body.ajProjectID}`


    db.query(queryString,(err, results, fields) => {
        if (err) console.log(err);

        var resultss = results[0];

        // for (var i = 0; i <= resultss.length ; i++){
        //     // resultss[i].date_startApplication = moment(resultss[i].date_startApplication).format('MMMM DD[,] YYYY[,] h[:]mm');
        //     // resultss[i].date_endApplication = moment(resultss[i].date_endApplication).format('MMMM DD[,] YYYY[,] h[:]mm');
        //     console.log("EEyyyy: "+i);
        // }

        resultss.date_actualStartRelease = moment(resultss.date_actualStartRelease).format('MMMM DD[,] YYYY');
        resultss.date_targetEndRelease = moment(resultss.date_targetEndRelease) .format('MMMM DD[,] YYYY');

        console.log("=====RESULTSS=====")
        console.log(resultss)

        return res.send({tbl_project:resultss});
    });
});

router.get('/:int_projectID/viewbarangay',(req, res) => {
    console.log('=================================');
    console.log('BARANGAY: RELEASING PROJECT - VIEW BENEFICIARIES BARANGAY');
    console.log('=================================');
    
    var queryString =`SELECT * FROM tbl_projectdetail
    WHERE int_projectID = "${req.params.int_projectID}"`

    db.query(queryString, (err, results) => {        
    if (err) throw err;
    console.log('=================================');
    console.log('BARANGAY: PROJECT');
    console.log('=================================');
    console.log(results)
        
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

            var queryString2 =`SELECT * FROM tbl_officialsaccount OA
            JOIN tbl_barangay BR ON OA.int_officialsID = BR.int_barangayID
            WHERE OA.int_userID = ${req.session.barangay.int_userID}`

            db.query(queryString2,(err, results2) => {
            if (err) console.log(err);
                console.log('=================================');
                console.log('BARANGAY: OFFICIALS ACCOUNT');
                console.log('=================================');
                console.log(results2)

                var resultss = results2;
                console.log(resultss[0].int_barangayID)

                var queryString3 =`SELECT * FROM tbl_barangaybeneficiary bb
                JOIN tbl_application app ON app.int_applicationID = bb.int_applicationID
                WHERE app.int_projectID = "${req.params.int_projectID}"
                AND app.int_barangayID = ${resultss[0].int_barangayID}`

                db.query(queryString3,(err, results3) => {
                if (err) console.log(err);
                    console.log('=================================');
                    console.log('BARANGAY: BARANGAY BEN');
                    console.log('=================================');
                    var resBAR = results3;
                    console.log(resBAR)
                        var queryString4 =`SELECT int_applicationID FROM tbl_application 
                        WHERE int_barangayID = ${resultss[0].int_barangayID}
                        AND int_projectID = "${req.params.int_projectID}"
                        AND enum_applicationStatus = "Approved"
                        AND enum_applicationType = "Barangay"`
    
                        db.query(queryString4,(err, results4) => {
                        if (err) console.log(err);
                        console.log('=================================');
                        console.log('BARANGAY: APPLICATION');
                        console.log('=================================');
                        console.log(results4)
    
                        var resultAPP = results4[0];
    
                            res.render('barangay/releasing/views/viewbarbeneficiary', 
                            {
                                tbl_project:results,
                                notifications:notifications,
                                tbl_beneficiary:results3,
                                appID:resultAPP
                            });
                        });
                });
            });
        });
    });
});
var appID;

router.post('/addbeneficiary',(req, res) => {
    console.log('=================================');
    console.log('BARANGAY: RELEASING PROJECT - ADD BENEFICIARIES BARANGAY');
    console.log('=================================');

    var queryString = `INSERT INTO \`tbl_barangaybeneficiary\` 
        (\`int_applicationID\`, 
        \`varchar_FName\`,
        \`varchar_MName\`,
        \`varchar_LName\`,
        \`datetime_received\`,
        \`text_remarks\`)
        VALUES
        (${req.body.appID},
        "${req.body.benFNAME}",
        "${req.body.benMNAME}",
        "${req.body.benLNAME}",
        "${now}",
        "${req.body.benREMARKS}")`;

        appID = req.body.appID;
        console.log(appID);
    
    db.query(queryString,(err, results) => {
    if (err) console.log(err);
        console.log('=================================');
        console.log(results)
        
                        
        res.redirect(`/barangay/releasing/receiptSign`);
    });
});

console.log(appID);
router.get('/receiptSign',(req, res) => {
    console.log('=================================');
    console.log('BARANGAY: RELEASING PROJECT - ADD BENEFICIARIES RECEIPT');
    console.log('=================================');
    console.log(appID);
        
        var dayNow = moment().format('Do');
        var monthNow = moment().format('MMMM');
        var yearNow = moment().format('YYYY');
        var dateNow = moment().format('DD MMMM YYYY');
        
        var dateToday = {day: dayNow, month:monthNow, year: yearNow, dateNow:dateNow};

        var queryString2 =`SELECT * FROM tbl_barangaybeneficiary
        WHERE int_applicationID = ${appID} 
        ORDER BY int_brgybeneID DESC`

        db.query(queryString2,(err, results2) => {
        if (err) console.log(err);
            console.log('=================================');
            console.log(results2)

            var queryString3 =`SELECT * FROM tbl_barangaybeneficiary
            WHERE int_brgybeneID = ${results2[0].int_brgybeneID}`
            

            
            db.query(queryString3,(err, results3) => {
            if (err) console.log(err);
                console.log('=================================');
                console.log(results3)

                var queryString4 =`SELECT * FROM tbl_application app
                JOIN tbl_projectdetail pd ON app.int_projectID = pd.int_projectID
                WHERE app.int_applicationID = ${appID}`

                db.query(queryString4,(err, results4) => {
                if (err) console.log(err);
                    console.log('=================================');
                    console.log(results4)

                    var queryString5 =`SELECT * FROM tbl_applicantbenefit proj
                    JOIN tbl_projectdetail appben ON proj.int_projectID = appben.int_projectID
                    WHERE proj.int_projectID = "${results4[0].int_projectID}"`

                    db.query(queryString5,(err, results5) => {
                    if (err) console.log(err);
                        console.log('=================================');
                        console.log(results5)
                
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

                            res.render('barangay/releasing/views/addbeneficiary', 
                            {
                                receipt:results3,
                                dateNow:dateToday,
                                tbl_proj:results4,
                                tbl_benefits:results5,
                                notifications:notifications
                            });
                        });
                    });
                });
            });
        });
});

// AJAX GET DETAILS RELEASING PROJECT - VIEW APPLICANT DETAILS
router.post('/:int_projectID/viewben/ajaxapplicantdetails',(req,res) => {
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

router.post('/:int_projectID/viewben/ajaxapplicanthouseholddetails',(req,res) => {
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



// AJAX GET DETAILS RELEASING PROJECT - VIEW RECEIPT DETAILS
router.post('/:int_projectID/viewben/ajaxreceiptapplicantdetails',(req,res) => {
    console.log('=================================');
    console.log('BARANGAY: RELEASING-VIEW APPLICATION-AJAX GET DETAILS receipt!!!!!(POST)');
    console.log('=================================');
    console.log(`${req.body.ajApplicationID}`);

    
    console.log(`${req.body.ajApplicationID}`);
    
    var queryString = `SELECT * FROM tbl_personalinformation pi
    JOIN tbl_application app ON pi.int_applicationID = app.int_applicationID
    JOIN tbl_projectdetail propo ON propo.int_projectID = app.int_projectID
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

router.post('/:int_projectID/viewben/ajaxreceipthousedetails',(req,res) => {
    console.log('=================================');
    console.log('BARANGAY: RELEASING-VIEW HOUSEHOLD-AJAX GET DETAILS receipt!!!!!(POST)');
    console.log('=================================');
    console.log(`${req.body.ajHouseID}`);

    
    console.log(`${req.body.ajHouseID}`);
    
    var queryString = `SELECT * FROM tbl_householdapplication pi
    JOIN tbl_application app ON pi.int_applicationID = app.int_applicationID
    JOIN tbl_projectdetail propo ON propo.int_projectID = app.int_projectID
    WHERE pi.int_applicationID=${req.body.ajHouseID}`


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

            return res.send({tbl_household:resultss});
    });
});
//print benefit and update application status
router.post('/printbenefit', (req, res) => {
    console.log('=================================');
    console.log('BARANGAY: releasing - 1 print POST');
    console.log('=================================');
    
    var queryString = `UPDATE tbl_application SET
    enum_applicationStatus = 'Received',
    datetime_receivedDate = "${now}"
    WHERE tbl_application.int_applicationID=${req.body.aj_appID}`
            
    db.query(queryString, (err, results) => {        
    if (err) throw err;

    res.redirect(`/barangay/releasing`);
    });
});
router.post('/printbenefithouse', (req, res) => {
    console.log('=================================');
    console.log('BARANGAY: releasing - 1 print POST');
    console.log('=================================');
    
    var queryString = `UPDATE tbl_application SET
    enum_applicationStatus = 'Received',
    datetime_receivedDate = "${now}"
    WHERE tbl_application.int_applicationID=${req.body.ah_appID}`
            
    db.query(queryString, (err, results) => {        
    if (err) throw err;

    res.redirect(`/barangay/releasing`);
    });
});

router.post('/ajaxgetclosedetails',(req,res) => {
    console.log('=================================');
    console.log('BARANGAY: RELEASING - date comparison -AJAX GET DETAILS (POST)');
    console.log('=================================');
    console.log(`${req.body.ajProjectID}`);

            var queryString =`SELECT * FROM tbl_projectdetail
            WHERE int_projectID = ${req.body.ajProjectID}`

            db.query(queryString,(err, results, fields) => {
                if (err) console.log(err);

                console.log(results);

                var date_results = results;

                for (var i = 0; i < date_results.length;i++){
                    date_results[i].date_targetEndRelease = moment(date_results[i].date_targetEndRelease).format('MMMM D[,] YYYY');
                    console.log(date_results[i].date_targetEndRelease);
                }

                var resultss = results[0];

                console.log("===================RESULTSS")
                console.log(resultss)

                return res.send({tbl_project1:resultss});
        });
});
router.post('/closerel', (req, res) => {
    console.log('=================================');
    console.log('BARANGAY: Releasing close');
    console.log('=================================');
    resultIndex = `${req.body.eprojectID}`;

    console.log(resultIndex);
    var queryString1 = `UPDATE tbl_barangayreleasing SET
    enum_barangayReleaseStatus = 'Closed',
    date_endRelease = "${currentDate}"
    WHERE tbl_barangayreleasing.int_barangayID=${user_results[0].int_barangayID}
    AND tbl_barangayreleasing.int_projectID=${req.body.int_projectID} `
            
    db.query(queryString1, (err, results) => {        
        if (err) throw err;

        res.redirect('/barangay/releasing');
    });
});

router.post('/closelaterel', (req, res) => {
    console.log('=================================');
    console.log('BARANGAY: Releasing close');
    console.log('=================================');
    resultIndex = `${req.body.projectID}`;

    console.log(resultIndex);
            
    var queryString = `INSERT INTO \`tbl_projectreason\` 
        (\`int_projectID\`, 
        \`text_projectReason\`,
        \`enum_projectPhase\`)
        VALUES
        ("${req.body.eprojectID}",
        "${req.body.eprojectReason}",
        "Close Releasing");`;

    db.query(queryString, (err, results) => {        
        if (err) throw err;
        console.log(results);

        var queryString1 = `UPDATE tbl_barangayreleasing SET
        enum_barangayReleaseStatus = 'Closed',
        date_endRelease = "${currentDate}"
        WHERE tbl_barangayreleasing.int_barangayID=${user_results[0].int_barangayID}
        AND tbl_barangayreleasing.int_projectID=${req.body.eprojectID} `

                
        db.query(queryString1, (err, results2) => {        
            if (err) throw err;

            res.redirect('/barangay/releasing');
        });
    });
});

module.exports = router;