var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();
var moment = require('moment');



router.get('/applications',(req, res) => {
    console.log('=================================');
    console.log('BARANGAY: PROJECTS-APPLICATION-OPEN PROJECTS');
    console.log('=================================');

    var queryString1 = `SELECT * FROM tbl_project p 
    JOIN tbl_projectproposal pp ON p.int_projectID=pp.int_projectID`

    db.query(queryString1,(err, results1) => {

        var date_results = results1;

        for (var i = 0; i < date_results.length;i++){
            date_results[i].date_projectEnd = moment(date_results[i].date_projectEnd).format('MM-DD-YYYY');
        }

        var queryString2 = `SELECT * FROM tbl_user JOIN tbl_barangay ON 
        tbl_user.int_userID=tbl_barangay.int_userID WHERE tbl_user.int_userID=${req.session.barangay.int_userID}`
    
        db.query(queryString2,(err, results2) => {

            console.log('=================================');
            console.log('BARANGAY: GET PROFILE INFO');
            console.log('=================================');
        
            res.render('barangay/projects/views/openprojects',{tbl_project:results1,barangay_info:results2});
        });
    });
});


router.get('/applications/:int_projectID/apply',(req,res) => {
    console.log('=================================');
    console.log('BARANGAY: PROJECTS-APPLICATION-FORM-GET');
    console.log('=================================');

    var queryString1 = `SELECT * FROM tbl_project p JOIN tbl_projectproposal pp 
    ON p.int_projectID=pp.int_projectID WHERE p.int_projectID = ${req.params.int_projectID}`
    
    db.query(queryString1,(err, results1) => {

        var queryString2 = `SELECT tbl_projectproposal.int_categoryID FROM tbl_project JOIN tbl_projectproposal  
        ON tbl_project.int_projectID=tbl_projectproposal.int_projectID WHERE tbl_project.int_projectID = ${req.params.int_projectID}`

        db.query(queryString2,(err, results2) => {
        console.log("RESULTS2")
        var int_categoryID = results2[0];

        var queryString3 = `SELECT * FROM tbl_user JOIN tbl_barangay ON 
        tbl_user.int_userID=tbl_barangay.int_userID WHERE tbl_user.int_userID=${req.session.barangay.int_userID}`

        db.query(queryString3,(err, results3) => {

            console.log('=================================');
            console.log('BARANGAY: GET PROFILE INFO');
            console.log('=================================');

            var queryString4 = `SELECT int_formtypeID FROM tbl_categoryform cf JOIN tbl_projectproposal pp 
            ON cf.int_categoryID=pp.int_categoryID 
            WHERE pp.int_projectID = ${req.params.int_projectID}`

            db.query(queryString4,(err, results4) => {
            console.log("================RESULTS4")
            console.log(results4);

            var int_formtypeID =results4[0];

            res.render('barangay/projects/views/specificproject1',{tbl_project:results1,barangay_info:results3,int_categoryID:int_categoryID,int_formtypeID:int_formtypeID});
            });
        });
    });
    });
});


router.post('/applications/:int_projectID/apply',(req,res) => {
    console.log('=================================');
    console.log('BARANGAY: PROJECTS-APPLICATION-FORM-POST');
    console.log('=================================');

    var queryString1 = `INSERT INTO tbl_application \
    (\`int_barangayID\`,
    \`int_projectID\`,
    \`enum_applicationStatus\`) 
    VALUES 
    (${req.session.barangay.int_userID},
    ${req.params.int_projectID},
    "Pending")`
   

    db.query(queryString1,(req, results, fields) => {
        if (err) console.log(err);
        console.log("INSERT: Table Application");

        var queryString1 = `INSERT INTO tbl_applicationinfo
        (\`varchar_applicantBirthPlace\`,
        \`varchar_applicantFName\`,
        \`varchar_applicantMName\`,
        \`varchar_applicantLName\`,
        \`date_applicantBirthDate\`,
        \`enum_applicantGender\`,
        \`int_applicantResidency\`,
        \`enum_applicantCivilStat\`,
        \`varchar_applicantMobileNumber\`) 
        VALUES 
        ("${req.body.apply_birthplace}",
        "${req.body.apply_fname}",
        "${req.body.apply_mname}",
        "${req.body.apply_lname}",
        ${req.body.apply_birthdate},
        "${req.body.apply_gender}",
        "${req.body.apply_yrres}",
        "${req.body.apply_civilstat}",
        "${req.body.apply_contact}",
        "Pending")`

        db.query(queryString,(req, results, fields) => {

            console.log("INSERT: Table Application Information");

            res.redirect('/barangay/home');
    
        });
    });
});



router.get('/beneficiaries',(req, res) => {
    console.log('=================================');
    console.log('BARANGAY: PROJECTS-REGISTERED APPLICANTS');
    console.log('=================================');

    var queryString = `SELECT * FROM tbl_user JOIN tbl_barangay ON 
    tbl_user.int_userID=tbl_barangay.int_userID WHERE tbl_user.int_userID=${req.session.barangay.int_userID}`

    db.query(queryString,(req, results1) => {

      
        console.log('=================================');
        console.log('BARANGAY: GET PROFILE INFO');
        console.log('=================================');
        res.render('barangay/projects/views/beneficiaries',{barangay_info:results1});
    });
});


module.exports = router;