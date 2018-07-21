var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();



router.get('/new',(req, res) => {
    console.log('=================================');
    console.log('BARANGAY: PROBLEM STATEMENT-NEW');
    console.log('=================================');

    var queryString = `SELECT * FROM tbl_user JOIN tbl_barangay ON 
    tbl_user.int_userID=tbl_barangay.int_userID WHERE tbl_user.int_userID=${req.session.barangay.int_userID}`

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
       
        res.redirect('/barangay/home');
    });
});


router.get('/previous',(req,res) => {
    console.log('=================================');
    console.log('BARANGAY: PROBLEM STATEMENT-PREVIOUS');
    console.log('=================================');

    var queryString = `SELECT * FROM tbl_problemstatement pr
    JOIN tbl_projectcategory prcat ON pr.int_categoryID=prcat.int_categoryID WHERE 
    pr.int_barangayID=${req.session.barangay.int_userID} ORDER BY pr.int_statementID DESC `


    db.query(queryString,(err, results, fields) => {
        if (err) console.log(err);

        var queryString = `SELECT * FROM tbl_user JOIN tbl_barangay ON 
        tbl_user.int_userID=tbl_barangay.int_userID WHERE tbl_user.int_userID=${req.session.barangay.int_userID}`

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
    tbl_user.int_userID=tbl_barangay.int_userID WHERE tbl_user.int_userID=${req.session.barangay.int_userID}`

    db.query(queryString,(err, results1) => {

        if (err) console.log(err);
        console.log('=================================');
        console.log('BARANGAY: GET PROFILE INFO');
        console.log('=================================');

        if(`${req.body.problem_category}`== "All"){
            console.log("ALLLLLLLL"); 
            var queryString = `SELECT * FROM tbl_problemstatement pr
            JOIN tbl_projectcategory prcat ON pr.int_categoryID=prcat.int_categoryID
            WHERE pr.int_barangayID=${req.session.barangay.int_userID} ORDER BY pr.int_statementID DESC`
        
            db.query(queryString,(req, results, fields) => {

                res.render('barangay/problemstatement/views/previousproblem',{tbl_problemstatement:results,barangay_info:results1});
                });
        }
        else{
            console.log("ELSEEEE")
            var queryString = `SELECT * FROM tbl_problemstatement pr
            JOIN tbl_projectcategory prcat ON pr.int_categoryID=prcat.int_categoryID
            WHERE pr.int_barangayID=${req.session.barangay.int_userID} 
            AND pr.int_categoryID = ${req.body.problem_category}
            ORDER BY pr.int_statementID DESC`

            db.query(queryString,(req, results, fields) => {
               
                res.render('barangay/problemstatement/views/previousproblem',{tbl_problemstatement:results,barangay_info:results1});
                });
        }
    });
});



module.exports = router;