var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();



router.get('/new',(req, res) => {
    console.log('=================================');
    console.log('BARANGAY: PROBLEM STATEMENT-NEW');
    console.log('=================================');

    var queryString = `SELECT * FROM tbl_user JOIN tbl_barangay ON 
    tbl_user.int_userID=tbl_barangay.int_barangayUserID WHERE tbl_user.int_userID=${req.session.barangay.int_userID}`

    db.query(queryString,(err, results) => {

        if (err) console.log(err);
        console.log('=================================');
        console.log('BARANGAY: GET PROFILE INFO');
        console.log('=================================');

        
        res.render('barangay/problemstatement/views/newproblem',{barangay_info:results});
    });
});


router.post('/new',(req, res) => {
    var queryString = `INSERT INTO \`tbl_problemstatement\` 
    (\`int_barangayID\`, 
    \`int_problemCategID\`,
    \`varchar_statementTitle\`,
    \`varchar_statementDescription\`,
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
       
        res.redirect('/barangay/home');
    });
});


router.get('/previous',(req,res) => {
    console.log('=================================');
    console.log('BARANGAY: PROBLEM STATEMENT-PREVIOUS');
    console.log('=================================');

    var queryString = `SELECT * FROM tbl_problemstatement pr
    JOIN tbl_problemcategory prcat ON pr.int_problemCategID=prcat.int_problemCategID WHERE 
    pr.int_barangayID=${req.session.barangay.int_userID} ORDER BY pr.int_problemID DESC `


    db.query(queryString,(err, results, fields) => {
        if (err) console.log(err);

        var queryString = `SELECT * FROM tbl_user JOIN tbl_barangay ON 
        tbl_user.int_userID=tbl_barangay.int_barangayUserID 
        WHERE tbl_user.int_userID=${req.session.barangay.int_userID}`

        db.query(queryString,(err, results1) => {

            if (err) console.log(err);
            console.log('=================================');
            console.log('BARANGAY: GET PROFILE INFO');
            console.log('=================================');
        

            res.render('barangay/problemstatement/views/previousproblem',{tbl_problemstatement:results,barangay_info:results1});
        });
    });
});


router.post('/viewprobcategory',(req,res) => {
    console.log('=================================');
    console.log('BARANGAY: PROBLEM STATEMENT-PREVIOUS-SPECIFIC CATEGORY');
    console.log('=================================');

    var queryString = `SELECT * FROM tbl_user JOIN tbl_barangay ON 
    tbl_user.int_userID=tbl_barangay.int_barangayUserID WHERE tbl_user.int_userID=${req.session.barangay.int_userID}`

    db.query(queryString,(err, results1) => {

        if (err) console.log(err);
        console.log('=================================');
        console.log('BARANGAY: GET PROFILE INFO');
        console.log('=================================');

        if(`${req.body.problem_category}`== "All"){
            console.log("ALLLLLLLL"); 
            var queryString = `SELECT * FROM tbl_problemstatement pr
            JOIN tbl_problemcategory prcat ON pr.int_problemCategID=prcat.int_problemCategID
            WHERE pr.int_barangayID=${req.session.barangay.int_userID} ORDER BY pr.int_problemID DESC`
        
            db.query(queryString,(err, results, fields) => {

                res.render('barangay/problemstatement/views/previousproblem',{tbl_problemstatement:results,barangay_info:results1});
                });
        }
        else{
            console.log("ELSEEEE")
            var queryString = `SELECT * FROM tbl_problemstatement pr
            JOIN tbl_problemcategory prcat ON pr.int_problemCategID=prcat.int_problemCategID
            WHERE pr.int_barangayID=${req.session.barangay.int_userID} 
            AND pr.int_problemCategID = ${req.body.problem_category}
            ORDER BY pr.int_problemID DESC`

            db.query(queryString,(err, results, fields) => {
               
                res.render('barangay/problemstatement/views/previousproblem',{tbl_problemstatement:results,barangay_info:results1});
                });
        }
    });
});



module.exports = router;