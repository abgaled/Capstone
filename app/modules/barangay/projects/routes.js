var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();



router.get('/applications',(req, res) => {
    console.log('=================================');
    console.log('BARANGAY: PROJECTS-APPLICATION-OPEN PROJECTS');
    console.log('=================================');

    var queryString = `SELECT *, DATE(date_endDate) FROM tbl_project p 
    JOIN tbl_projectproposal pp ON p.int_projectID=pp.int_projectID`


    db.query(queryString,(err, results, fields) => {
        if (err) console.log(err);

        var queryString = `SELECT * FROM tbl_user JOIN tbl_barangay ON 
        tbl_user.int_userID=tbl_barangay.int_barangayUserID WHERE tbl_user.int_userID=${req.session.barangay.int_userID}`

        db.query(queryString,(err, results1) => {

            if (err) console.log(err);
            console.log('=================================');
            console.log('BARANGAY: GET PROFILE INFO');
            console.log('=================================');
        
        res.render('barangay/projects/views/openprojects',{tbl_project:results,barangay_info:results1});
        });
    });
});


router.get('/applications/:int_projectID/apply',(req,res) => {
    console.log('=================================');
    console.log('BARANGAY: PROJECTS-APPLICATION-FORM');
    console.log('=================================');

    var queryString = `SELECT * FROM tbl_project p JOIN tbl_projectproposal pp 
    ON p.int_projectID=pp.int_projectID WHERE p.int_projectID = ${req.params.int_projectID}`

    db.query(queryString,(err, results, fields) => {
        if (err) console.log(err);

        var queryString = `SELECT * FROM tbl_user JOIN tbl_barangay ON 
        tbl_user.int_userID=tbl_barangay.int_barangayUserID WHERE tbl_user.int_userID=${req.session.barangay.int_userID}`

        db.query(queryString,(err, results1) => {

            if (err) console.log(err);
            console.log('=================================');
            console.log('BARANGAY: GET PROFILE INFO');
            console.log('=================================');

        res.render('barangay/projects/views/specificproject',{tbl_project:results,barangay_info:results1});
        });
    });
});


router.get('/beneficiaries',(req, res) => {
    console.log('=================================');
    console.log('BARANGAY: PROJECTS-REGISTERED APPLICANTS');
    console.log('=================================');

    var queryString = `SELECT * FROM tbl_user JOIN tbl_barangay ON 
    tbl_user.int_userID=tbl_barangay.int_barangayUserID WHERE tbl_user.int_userID=${req.session.barangay.int_userID}`

    db.query(queryString,(err, results1) => {

        if (err) console.log(err);
        console.log('=================================');
        console.log('BARANGAY: GET PROFILE INFO');
        console.log('=================================');
        res.render('barangay/projects/views/beneficiaries',{barangay_info:results1});
    });
});


module.exports = router;