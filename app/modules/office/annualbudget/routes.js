var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();
var nodemailer = require('nodemailer');
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
var yr = y + 1;

//============================================================
// MAINTENANCE Annual Budget
//============================================================

router.get('/annualbudget',(req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - ANNUAL BUDGET');
    console.log('=================================');
    var queryString =`SELECT * FROM tbl_annualbudget`

    db.query(queryString, (err, results, fields) => {
        if (err) console.log(err);
        console.log(results);
        // This year's budget
        
        var queryString2 =`SELECT * FROM tbl_annualbudget
            WHERE date_budgetYear = "${yr}"`
        
        db.query(queryString2, (err, results2, fields) => {
            if (err) console.log(err);
            console.log(results2);
            //next year's budget

            var queryString3 =`SELECT * FROM tbl_category 
            WHERE enum_categoryStatus = "Active"`
        
            db.query(queryString3, (err, results3, fields) => {
                if (err) console.log(err);
                console.log(results3);

                var queryString4 =`SELECT * FROM tbl_categorybudget`
            
                db.query(queryString4, (err, results4, fields) => {
                    if (err) console.log(err);
                    console.log(results4);

                    res.render('office/annualbudget/views/annualbudget', 
                    {
                        tbl_annualbudget: results,
                        nextyear:results2,
                        tbl_category:results3,
                        tbl_categorybudget:results4
                    });
                });
            });
        });
    });
});

router.post('/annualbudget', (req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - ANNUAL BUDGET POST');
    console.log('=================================');
    
    var queryString = `INSERT INTO \`tbl_annualbudget\` 
    (\`decimal_annualBudget\`, 
    \`decimal_annualRemaining\`,
    \`date_budgetYear\`, 
    \`int_cityID\`)
    VALUES
    ("${req.body.totalBudget}",
    "${req.body.totalBudget}",
    "${yr}",
    "1");`;
    
    db.query(queryString, (err, results, fields) => {        
        if (err) throw err;
        console.log(results);
        
        var queryString2 = `SELECT * FROM tbl_annualbudget WHERE date_budgetYear = "${yr}"`

        db.query(queryString2,(err, results2, fields) => {
            if (err) console.log(err);
            console.log(results2);
            var resAn = results2;
            console.log(resAn);
            
            var categoryID = req.body.categID;
            console.log("categoryID");
            console.log(categoryID);
            
            var categoryBudget = req.body.categBudget;
            console.log("categoryBudget");
            console.log(categoryBudget);

            for(var i = 0; i < categoryID.length; i++)
            {
                var queryString3 = `INSERT INTO \`tbl_categorybudget\` 
                (\`int_budgetID\`, 
                \`int_categoryID\`, 
                \`decimal_categBudget\`, 
                \`decimal_categRemaining\`)
                VALUES
                ("${resAn[0].int_budgetID}",
                "${categoryID[i]}",
                "${categoryBudget[i]}",
                "${categoryBudget[i]}");`;
                
                db.query(queryString3,(err, results3, fields) => {
                    if (err) console.log(err);
                    console.log(results3);
                });
    
            }
            
            res.redirect('/office/annualbudget/annualbudget');
        });
    });
});

router.post('/annualbudget/budgetdetails',(req,res) => {
    console.log('=================================');
    console.log('BARANGAY: PROJECTS-AJAX GET DETAILS (POST)');
    console.log('=================================');
    console.log(`${req.body.ajProjectID}`);

    
    var queryString = `SELECT * FROM tbl_annualbudget ORDER BY date_budgetYear DESC`


    db.query(queryString,(err, results, fields) => {
        if (err) console.log(err);


        console.log("=====RESULTSS=====")
        console.log(results)
        var resultsss = results[0];
        console.log(resultsss)

        return res.send({tbl_budget:results});
    });
});
router.post('/annualbudget/ajaxbudgetdetails',(req,res) => {
    console.log('=================================');
    console.log('BARANGAY: PROJECTS-AJAX GET DETAILS (POST)');
    console.log('=================================');
    console.log(`${req.body.ajBudgetID}`);

    
    var queryString = `SELECT * FROM tbl_categorybudget cb
    JOIN tbl_annualbudget ab ON ab.int_budgetID = cb.int_budgetID
    WHERE cb.int_budgetID = "${req.body.ajBudgetID}"`


    db.query(queryString,(err, results, fields) => {
        if (err) console.log(err);


        console.log("=====RESULTSS=====")
        console.log(results)

        return res.send({tbl_budget:results});
    });
});



module.exports = router;