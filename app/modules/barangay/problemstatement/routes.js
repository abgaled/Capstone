var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();



router.get('/new',(req, res) => {
    console.log('=================================');
    console.log('BARANGAY: PROBLEM STATEMENT-NEW');
    console.log('=================================');

        
    res.render('barangay/problemstatement/views/newproblem');
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
    (10,
    "${req.body.problem_category}",
    "${req.body.problem_title}",
    "${req.body.problem_description}",
    "${req.body.problem_createdValue}",
    "Pending");`;

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
    JOIN tbl_problemcategory prcat ON pr.int_problemCategID=prcat.int_problemCategID
    ORDER BY pr.int_problemID DESC`


    db.query(queryString,(err, results, fields) => {
        if (err) console.log(err);
        

    res.render('barangay/problemstatement/views/previousproblem',{tbl_problemstatement:results});
    });
});



module.exports = router;