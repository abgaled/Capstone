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
var now = y +"-"+ m +"-"+ d; 

router.get('/',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: HOME');
    console.log('=================================');

    var currentDate = y + "-" + m + "-" + d;
    var aweek = moment(currentDate).subtract(1, 'w');
    aweek = moment(aweek).format('YYYY-MM-DD');

    console.log(now);
    console.log(currentDate);
    console.log(aweek);

    var queryString =`SELECT COUNT(*) AS openApplicationCount
    FROM tbl_projectdetail
    WHERE enum_projectStatus = "Ongoing"`

    db.query(queryString, (err, resultsopen, fields) => {
    console.log(resultsopen);
    if (err) console.log(err);

        var queryString2 =`SELECT COUNT(*) AS releasingCount
        FROM tbl_projectdetail 
        WHERE enum_projectStatus = "Releasing"`
        
        db.query(queryString2, (err, results2, fields) => {
        console.log(results2);
        if (err) console.log(err);

            var queryString3 =`SELECT COUNT(*) AS latestprobStatement
            FROM tbl_intentstatement
            WHERE tbl_intentstatement.enum_problemStatus = 'Submitted'
            AND tbl_intentstatement.date_createdDate >= "${aweek}"`

            db.query(queryString3, (err, results3, fields) => {
            console.log(results3);
            if (err) console.log(err);

                var queryString4 =`SELECT COUNT(*) AS latestapplication
                FROM tbl_application
                WHERE (tbl_application.datetime_submittedDate >= "${aweek}"
                AND tbl_application.enum_applicationStatus = 'Pending')`

                db.query(queryString4, (err, results4, fields) => {
                console.log(results4);
                if (err) console.log(err);
                var budgetYear=[];
                var appMonth=[];
                
                var budgetQuery =`SELECT * FROM tbl_annualbudget WHERE date_budgetYear = ?`
            
                db.query(budgetQuery,[y-3],(err, results, fields) => {
                    if (err) console.log(err);
                    console.log(results);
                    var Y2015 = results[0]
                    if(results[0]!=null)
                        budgetYear.push(Y2015.decimal_annualBudget)
                    else
                        budgetYear.push("0");
                    db.query(budgetQuery,[y-2],(err, results, fields) => {
                        if (err) console.log(err);
                        console.log(results);
                        var Y2016 = results[0]
                        if(results[0]!=null)
                            budgetYear.push(Y2016.decimal_annualBudget)
                        else
                            budgetYear.push("0");
                        db.query(budgetQuery,[y-1],(err, results, fields) => {
                            if (err) console.log(err);
                            console.log(results);
                            var Y2017 = results[0]
                            if(results[0]!=null)
                                budgetYear.push(Y2017.decimal_annualBudget)
                            else
                                budgetYear.push("0");
                            db.query(budgetQuery,[y],(err, results, fields) => {
                                if (err) console.log(err);
                                console.log(results);
                                var Y2018 = results[0]
                                if(results[0]!=null)
                                    budgetYear.push(Y2018.decimal_annualBudget)
                                else
                                    budgetYear.push("0");
                                db.query(budgetQuery,[y+1],(err, results, fields) => {
                                    if (err) console.log(err);
                                    console.log(results);
                                    var Y2019 = results[0]
                                    if(results[0]!=null)
                                        budgetYear.push(Y2019.decimal_annualBudget)
                                    else
                                        budgetYear.push("0");
                console.log(budgetYear[4]);
                                
                var applicationQuery =`SELECT COUNT(app.int_applicationID) as countt FROM tbl_application app
                JOIN tbl_projectdetail pd ON app.int_projectID = pd.int_projectID
                WHERE month(app.datetime_submittedDate) ="${m}" && app.enum_applicationStatus = ? && pd.enum_projectStatus = "Finished"`
                db.query(applicationQuery,["Pending"],(err, results, fields) => {
                    if (err) console.log(err);
                    console.log(results);
                    var app = results[0]
                    appMonth.push(app.countt)       
                    db.query(applicationQuery,["Approved"],(err, results, fields) => {
                        if (err) console.log(err);
                        console.log(results);
                        var app = results[0]
                        appMonth.push(app.countt)   
                        db.query(applicationQuery,["Rejected"],(err, results, fields) => {
                            if (err) console.log(err);
                            console.log(results);
                            var app = results[0]
                            appMonth.push(app.countt)           

                    return res.render('office/home/views/home',
                    {
                        tbl_projCount:resultsopen,
                        tbl_release:results2,
                        tbl_problem:results3,
                        tbl_app:results4,
                        budgetYear:budgetYear,
                        appMonth:appMonth
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
    });
});

module.exports = router;