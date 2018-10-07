var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();

router.get('/',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: QUERIES');
    console.log('=================================');

    var queryString =`SELECT * FROM tbl_projectdetail
    WHERE NOT enum_projectStatus = "Finished"`;

    db.query(queryString, (err, results, fields) => {
        console.log(results);
        if (err) console.log(err);
        
        res.render('office/queries/views/queries', {
            tbl_ongoing: results
        }); 
    });

});

router.get('/finishedprojects',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: QUERIES');
    console.log('=================================');

    var queryString =`SELECT * FROM tbl_projectdetail
    WHERE enum_projectStatus = "Finished"`;

    db.query(queryString, (err, results, fields) => {
        console.log(results);
        if (err) console.log(err);
        
        res.render('office/queries/views/finishedprojects', {
            tbl_finished: results
        }); 
    });

});

router.get('/approvedApp',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: QUERIES');
    console.log('=================================');

    var queryString =`SELECT * FROM tbl_application APP
    JOIN tbl_personalinformation pi ON APP.int_applicationID = pi.int_applicationID
    WHERE APP.enum_applicationType = "Resident"`;

    db.query(queryString, (err, results, fields) => {
        console.log(results);
        if (err) console.log(err);
        
        res.render('office/queries/views/approvedapp', {
            tbl_resAPP: results
        }); 
    });

});

router.get('/householdApp',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: QUERIES');
    console.log('=================================');

    var queryString =`SELECT * FROM tbl_application APP
    JOIN tbl_householdapplication ha ON APP.int_applicationID = ha.int_applicationID
    WHERE APP.enum_applicationType = "Household"`;

    db.query(queryString, (err, results, fields) => {
        console.log(results);
        if (err) console.log(err);
        
        res.render('office/queries/views/householdapp', {
            tbl_houseAPP: results
        }); 
    });

});

router.get('/barangayBen',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: QUERIES');
    console.log('=================================');

    var queryString =`SELECT * FROM tbl_barangaybeneficiary`;

    db.query(queryString, (err, results, fields) => {
        console.log(results);
        if (err) console.log(err);
        
        res.render('office/queries/views/barangayBen', {
            tbl_barBen: results
        }); 
    });

});

module.exports = router;