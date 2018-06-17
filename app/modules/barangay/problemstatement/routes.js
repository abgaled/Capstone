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
    "${req.body.problem_created}",
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


    res.render('barangay/problemstatement/views/previousproblem');
});



module.exports = router;