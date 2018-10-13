var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();
var moment = require('moment');
var resultIndex;
var checknumber;


router.get('/',(req, res) => {
    var queryString=`SELECT * FROM tbl_projectdetail`

    db.query(queryString, (err, results, fields) => {
        console.log("-----------RESULTS")
        console.log(results);

        var date_results = results;

        for (var i = 0; i < date_results.length;i++){
            date_results[i].date_actualClosing= moment(date_results[i].date_actualClosing).format('MMMM DD[,] YYYY');
            date_results[i].date_actualClosing= moment(date_results[i].date_actualClosing).format('MMMM DD[,] YYYY');
            console.log(`${date_results[i].date_actualClosing}`);
        }

        res.render('budget/projects/views/project',{
            tbl_project:date_results});
    });
});


router.get('/:int_projectID/viewproj',(req, res) => {
    console.log('=================================');
    console.log('Budge: PROJECT - VIEW DETAILS');
    console.log('=================================');
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
                    db.query(queryString7, (err, results7, fields) => {
                        if (err) console.log(err);
                        res.render('budget/projects/views/viewproj', 
                        {
                            tbl_projectdetail: results, 
                            tbl_projectrequirement: results2, 
                            tbl_projectbeneficiary: results3, 
                            tbl_projectcategory: results5,
                            tbl_problemstatement: results7
                        });

                    });
                });
            });
        });
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
                    
                            res.render('budget/projects/views/viewapplication', {
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
        console.log("tbl_projectdetail");
        console.log(results1);
        if (err) console.log(err);

        db.query(projectQuery, (err, projectresults, fields) => {
            console.log(projectresults);
            if (err) console.log(err);

            db.query(barangayQuery, (err, barangayresults, fields) => {
                console.log("barangayresults");
                console.log(barangayresults);
                if (err) console.log(err);
                var date_bar = results1;
                
                for (var i = 0; i < date_bar.length;i++){
                    date_bar[i].datetime_received = moment(date_bar[i].datetime_received).format('MMMM DD[,] YYYY');
                }
                console.log("date_bar");
                console.log(date_bar);

                res.render('budget/projects/views/viewBarBen', 
                {
                    tbl_ben:date_bar,
                    tbl_project:projectresults,
                    tbl_barangay:barangayresults
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
                                res.render('budget/projects/views/liquidation',
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
module.exports = router;