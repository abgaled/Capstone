var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();
var moment = require('moment');



router.get('/ongoingproject',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: ONGOING PROJECT');
    console.log('=================================');

    var queryString =`SELECT *, GROUP_CONCAT(DISTINCT varchar_categoryName) varchar_categoryName 
    FROM tbl_project pr
    JOIN tbl_projectproposal prpro 
    ON pr.int_projectID=prpro.int_projectID
    JOIN tbl_projectcategory projcat
    ON pr.int_projectID = projcat.int_projectID
    JOIN tbl_category cat
    ON cat.int_categoryID = projcat.int_categoryID
    JOIN tbl_proposalapproval propapp
    ON propapp.int_projectID = prpro.int_projectID
    WHERE propapp.enum_propappStatus = "Received"
    GROUP BY pr.int_projectID 
    ORDER BY pr.int_projectID DESC`
    
    db.query(queryString, (err, results, fields) => {
        console.log(results);
        if (err) console.log(err);

        res.render('office/projects/views/ongoingproject',{tbl_project:results});

});
});

router.get('/ongoingproject/:int_projectID/viewproj',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: ONGOING PROJECT - VIEW DETAILS');
    console.log('=================================');

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

        var date_results = results;

        for (var i = 0; i < date_results.length;i++){
            date_results[i].date_createdDate = moment(date_results[i].date_createdDate).format('MM-DD-YYYY');
            date_results[i].datetime_releasingEnd = moment(date_results[i].datetime_releasingEnd).format('MM-DD-YYYY');
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

                        var queryString6 =`SELECT * FROM tbl_application ap
                        JOIN tbl_personalinformation pi 
                        ON ap.int_applicationID = pi.int_applicationID
                        WHERE ap.int_projectID = "${req.params.int_projectID}"`
                        
                        db.query(queryString6, (err, results6, fields) => {
                            console.log(results6);
                            db.query(queryString7, (err, results7, fields) => {
                                console.log(results7);

                            res.render('office/projects/views/viewproj', {
                                tbl_projectproposal:results, 
                                tbl_projectrequirement:results2, 
                                tbl_projectbeneficiary:results3, 
                                tbl_projectcategory:results5,
                                applications:results6,
                                tbl_problemstatement:results7});
                            });
                        });
                    
                });
            });
        });
    });
});

router.post('/ongoingproject/:int_projectID/viewproj/accept',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: ONGOING PROJECT - VIEW APPLICATIONS -ACCEPT APPLICATION');
    console.log('=================================');
    console.log("BUTTON ACCEPT ID:"+ req.body.int_applicationID);

    var queryString1 =`UPDATE tbl_application
    SET enum_applicationStatus = 'Approved' 
    WHERE int_applicationID = ${req.body.int_applicationID}`

    db.query(queryString1, (err, results1, fields) => {

        res.redirect(`/office/projects/ongoingproject/${req.params.int_projectID}/viewproj`);
    });
});

router.post('/ongoingproject/:int_projectID/viewproj/reject',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: ONGOING PROJECT - VIEW APPLICATIONS -REJECT APPLICATION');
    console.log('=================================');

    var queryString1 =`UPDATE tbl_application
    SET enum_applicationStatus = 'Rejected' 
    WHERE int_applicationID = ${req.body.int_applicationID}`

    db.query(queryString1, (err, results1, fields) => {

        res.redirect(`/office/projects/ongoingproject/${req.params.int_projectID}/viewproj`);
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

                
            res.redirect(`/office/projects/ongoingproject`);
            
        });
});

// AJAX GET DETAILS VIEW DETAILS PROJECT - VIEW APPLICANT DETAILS
router.post('/ongoingproject/:int_projectID/viewproj/ajaxapplicantdetails',(req,res) => {
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

router.get('/ongoingproject/:int_projectID/viewapp',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: ONGOING PROJECT - VIEW APPLICATIONS');
    console.log('=================================');

    var queryString1 =`SELECT * FROM tbl_projectproposal pr
    JOIN tbl_project proj ON pr.int_projectID = proj.int_projectID
    WHERE pr.int_projectID = "${req.params.int_projectID}"`

    db.query(queryString1, (err, results1, fields) => {
        console.log("=========RESULTS1==========")
        console.log(results1);

        var queryString2 =`SELECT * FROM tbl_application ap
        JOIN tbl_personalinformation pi 
        ON ap.int_applicationID = pi.int_applicationID
        WHERE ap.int_projectID = "${req.params.int_projectID}"
        AND ap.enum_applicationStatus = "Approved"`

        db.query(queryString2, (err, results2, fields) => {
    
            res.render('office/projects/views/viewapplication',{
                    tbl_project:results1,
                    tbl_application:results2
                });
        });
    });
});





// AJAX GET DETAILS ONGOING PROJECT - VIEW APPLICANT DETAILS
router.post('/ongoingproject/:int_projectID/viewapp/ajaxapplicantdetails',(req,res) => {
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

router.get('/ongoingproject/:int_projectID/startproj', (req, res) => {
    console.log('=================================');
    console.log('OFFICE: Project - 1 Startproject GET');
    console.log('=================================');
    
    var queryString =`SELECT * FROM tbl_project
    WHERE enum_projectStatus = 'Approved' 
    AND tbl_project.int_projectID=${req.params.int_projectID}`
        
    db.query(queryString, (err, results, fields) => {
        console.log(results);
        if (err) console.log(err);
    
        res.render(`office/projects/views/startproj`,{tbl_project:results});
    });
});

router.post('/ongoingproject/:int_projectID/startproj', (req, res) => {
    console.log('=================================');
    console.log('OFFICE: Project - 1 Startproject POST');
    console.log('=================================');
    
    var queryString1 = `UPDATE tbl_project SET
    enum_projectStatus = 'Ongoing'
    WHERE tbl_project.int_projectID=${req.body.int_projectID}`
            
    db.query(queryString1, (err, results) => {        
        if (err) throw err;

        var updateProject = `UPDATE tbl_project
        SET date_startApplication=CURDATE(),
        date_endApplication=DATE_ADD(CURDATE(), 
        INTERVAL (SELECT int_applicationDuration 
        FROM tbl_projectproposal WHERE int_projectID=${req.body.int_projectID}) DAY),
        date_releaseDate=DATE_ADD(DATE_ADD(CURDATE(), 
        INTERVAL (SELECT int_applicationDuration FROM tbl_projectproposal 
        WHERE int_projectID=${req.body.int_projectID}) DAY), INTERVAL (SELECT int_beforeReleasingDuration 
        FROM tbl_projectproposal WHERE int_projectID=${req.body.int_projectID}) DAY)
        WHERE int_projectID=${req.body.int_projectID};`

        db.query(updateProject, (err, results) => {        
            if (err) throw err;
    

            res.redirect('/office/projects/ongoingproject');
        });
    });
});
router.get('/finishedproject',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: FINISHED PROJECT');
    console.log('=================================');

    var queryString =`SELECT * FROM tbl_project pr
    JOIN tbl_projectproposal prpro 
    ON pr.int_projectID=prpro.int_projectID
    WHERE pr.enum_projectStatus = 'Finished' 
    ORDER BY pr.int_projectID DESC`

    
    db.query(queryString, (err, results, fields) => {
        console.log(results);
        if (err) console.log(err);

            var queryString2=`SELECT *, GROUP_CONCAT(DISTINCT varchar_categoryName) varchar_categoryName
                FROM tbl_projectcategory PC JOIN tbl_projectproposal PR ON pr.int_projectID=pc.int_projectID
                JOIN tbl_category C ON C.int_categoryID=PC.int_categoryID
                JOIN tbl_project P ON P.int_projectID = PR.int_projectID
                WHERE P.enum_projectStatus="Finished"
                GROUP BY P.int_projectID`;

        db.query(queryString2, (err, results2, fields) => {
            console.log("-----------RESULTS2")
            console.log(results2);

            res.render('office/projects/views/finishedproject',{
                tbl_project:results2});
        });
    });
});


router.get('/finishedproject/:int_projectID/viewfinished',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: ONGOING PROJECT');
    console.log('=================================');
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

    var queryString4 =`SELECT * FROM tbl_projectlocation pl
    JOIN tbl_projectproposal pr ON pr.int_projectID=pl.int_projectID
    JOIN tbl_releaselocation rl ON pl.int_locationID=rl.int_locationID
    WHERE pr.int_projectID = "${req.params.int_projectID}"`

    var queryString5 =`SELECT * FROM tbl_projectcategory pc
    JOIN tbl_projectproposal pr ON pr.int_projectID=pc.int_projectID
    JOIN tbl_category cat ON cat.int_categoryID=pc.int_categoryID
    WHERE pr.int_projectID = "${req.params.int_projectID}"`
    

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
                db.query(queryString4, (err, results4, fields) => {
                    console.log(results4);
                    if (err) console.log(err);
                    db.query(queryString5, (err, results5, fields) => {
                        console.log(results5);
                        if (err) console.log(err);
        res.render('office/projects/views/viewfinished', {tbl_projectproposal:results, tbl_projectrequirement:results2, tbl_projectbeneficiary:results3, tbl_releaselocation:results4,tbl_projectcategory:results5});

    });});});});
});
});

router.get('/finishedproject/:int_projectID/viewapp',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: FINISHED PROJECT - VIEW APPLICATION');
    console.log('=================================');

    var queryString =`SELECT * FROM tbl_project pr
    JOIN tbl_application app
    ON pr.int_projectID=app.int_projectID
    JOIN tbl_personalinformation pi
    ON pi.int_applicationID = app.int_applicationID
    WHERE pr.enum_projectStatus = 'Finished'
    AND app.int_projectID=${req.params.int_projectID}`

    
    db.query(queryString, (err, results, fields) => {
        console.log(results);
        if (err) console.log(err);

        var queryString2= `SELECT * FROM tbl_project pr
        JOIN tbl_projectproposal pp 
        ON pr.int_projectID = pp.int_projectID
        WHERE pr.enum_projectStatus = 'Finished'
        AND pr.int_projectID=${req.params.int_projectID}`

        db.query(queryString2, (err, results2, fields) => {

            res.render('office/projects/views/appfinishedproject',{
                tbl_project:results,
                project:results2});
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

router.get('/ongoingproject/:int_projectID/liquidation',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: ONGOING PROJECT - VIEW APPLICATIONS');
    console.log('=================================');

    var queryString1 =`SELECT * FROM tbl_expense ex
    JOIN tbl_project proj ON ex.int_projectID = proj.int_projectID
    WHERE ex.int_projectID = "${req.params.int_projectID}"`

    var queryString2 =`SELECT * FROM tbl_project proj
    JOIN tbl_projectproposal pr ON proj.int_projectID = pr.int_projectID
    WHERE proj.int_projectID = "${req.params.int_projectID}"`

    var queryString3 =`SELECT SUM(decimal_estimatedAmount) AS "total_expense" 
    FROM tbl_expense
    WHERE int_projectID = "${req.params.int_projectID}"`

        db.query(queryString1, (err, results1, fields) => {
            db.query(queryString2, (err, results2, fields) => { 
                db.query(queryString3, (err, results3, fields) => {
                
    
            res.render('office/projects/views/liquidation',{
                tbl_expenses:results1,
                tbl_project:results2,
                total:results3
                });
            });
        });
    });
});
module.exports = router;
