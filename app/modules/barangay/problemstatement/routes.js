var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();
var moment = require('moment');

router.get('/',(req,res) => {
    console.log('=================================');
    console.log('BARANGAY: PROBLEM STATEMENT-PREVIOUS');
    console.log('=================================');

    var queryString = `SELECT * FROM tbl_problemstatement pr
    JOIN tbl_category cat ON pr.int_categoryID=cat.int_categoryID WHERE 
    pr.int_barangayID=${req.session.barangay.int_userID} ORDER BY pr.int_statementID DESC `


    db.query(queryString,(err, results, fields) => {
        if (err) console.log(err);

        var date_results = results;

        for (var i = 0; i < date_results.length;i++){
            date_results[i].date_createdDate = moment(date_results[i].date_createdDate).format('MM-DD-YYYY');
        }
        console.log(results);


        var queryString1 = `SELECT * FROM tbl_user JOIN tbl_barangay ON 
        tbl_user.int_userID=tbl_barangay.int_userID WHERE tbl_user.int_userID=${req.session.barangay.int_userID}`
        var queryString2 = `SELECT * FROM tbl_category`

        db.query(queryString1,(err, results1) => {

            if (err) console.log(err);
            console.log('=================================');
            console.log('BARANGAY: GET PROFILE INFO');
            console.log('=================================');
            
           
    
            db.query(queryString2,(err, results2) => {
    
                if (err) console.log(err);
                console.log('=================================');
                console.log('BARANGAY: GET PROJECT CATEGORY');
                console.log('=================================');
            
    
                res.render('barangay/problemstatement/views/problemstatement',{tbl_problemstatement:results,barangay_info:results1,tbl_projectcategory:results2});
            });

        });
    });
});

router.post('/',(req, res) => {
    console.log("===============================createdValue");
    console.log(`${req.body.problem_createdValue}`);
    console.log("===============================createdValue");

    var queryString = `INSERT INTO \`tbl_problemstatement\` 
    (\`int_barangayID\`, 
    \`int_categoryID\`,
    \`varchar_statementTitle\`,
    \`text_statementContent\`,
    \`date_createdDate\`,
    \`enum_problemStatus\`)
    VALUES
    (${req.session.barangay.int_userID},
    "${req.body.problem_category}",
    "${req.body.problem_title}",
    "${req.body.problem_description}",
    "${req.body.problem_createdValue}",
    "Submitted");`;

    console.log('=================================');
    console.log('BARANGAY: PROBLEM STATEMENT-NEW?POST');
    console.log('=================================');

    db.query(queryString, (err, results, fields) => {        
        if (err) throw err;
       
        res.redirect('problemstatement');
    });
});

router.post('/ajaxgetdetails',(req,res) => {
    console.log('=================================');
    console.log('BARANGAY: PROBLEM STATEMENT-PREVIOUS-AJAX GET DETAILS (POST)');
    console.log('=================================');
    console.log(`${req.body.ajStatementID}`);

    var queryString = `SELECT * FROM tbl_problemstatement pr
    JOIN tbl_category cat ON pr.int_categoryID=cat.int_categoryID WHERE 
    pr.int_barangayID=${req.session.barangay.int_userID} 
    AND pr.int_statementID = ${req.body.ajStatementID}`


    db.query(queryString,(err, results, fields) => {
        if (err) console.log(err);

        console.log(results);

        var date_results = results;

        for (var i = 0; i < date_results.length;i++){
            date_results[i].date_createdDate = moment(date_results[i].date_createdDate).format('MM-DD-YYYY');
        }

        var resultss = results[0];

        console.log("===================RESULTSS")
        console.log(resultss)

        var queryString1 = `SELECT * FROM tbl_user JOIN tbl_barangay ON 
        tbl_user.int_userID=tbl_barangay.int_userID WHERE tbl_user.int_userID=${req.session.barangay.int_userID}`

        db.query(queryString1,(err, results1) => {

            if (err) console.log(err);
            console.log('=================================');
            console.log('BARANGAY: GET PROFILE INFO');
            console.log('=================================');
            
           
            
            return res.send({tbl_problemstatement1:resultss});
        });
    });
});



router.get('/viewprobcategory/:int_statementID/viewprob',(req, res) => {
    console.log('=================================');
    console.log('brgy: PROB - READ');
    console.log('=================================');
    console.log("PUMASOK SA GET REQ.PARAMS")
    var queryString = `SELECT * FROM tbl_problemstatement pr 
    JOIN tbl_projectcategory prcat ON pr.int_categoryID=prcat.int_categoryID
    WHERE pr.int_statementID = "${req.params.int_statementID}"`
    
    db.query(queryString, (err, results, fields) => {        
        if (err) throw err;
        console.log('brgy: PROB - viewprob');
        res.render(`barangay/problemstatement/views/viewprob`,{tbl_problemstatement:results});
    });
});



module.exports = router;