var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();
var moment = require("moment");

router.get('/',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: PROBLEM STATEMENT-SUBMITTED');
    console.log('=================================');

    var queryString = `SELECT * FROM tbl_problemstatement pr
    JOIN tbl_projectcategory prcat 
    ON pr.int_categoryID=prcat.int_categoryID 
    JOIN tbl_category cat
    ON pr.int_categoryID = cat.int_categoryID
    ORDER BY pr.int_statementID DESC `


    db.query(queryString,(err, results, fields) => {
        if (err) console.log(err);       

        res.render('office/problems/views/problems',{tbl_problemstatement:results});
    });

});

router.post('/ajaxgetdetails',(req,res) => {
    console.log('=================================');
    console.log('OFFICE: PROBLEM STATEMENT-PREVIOUS-AJAX GET DETAILS (POST)');
    console.log('=================================');
    console.log(`${req.body.ajStatementID}`);

    var queryString = `SELECT * FROM tbl_problemstatement pr
    JOIN tbl_category cat ON pr.int_categoryID=cat.int_categoryID 
    WHERE pr.int_statementID = ${req.body.ajStatementID}`


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

        return res.send({tbl_problemstatement1:resultss});
    });
});

router.post('/:int_statementID/acknowledge', (req, res) => {
    console.log('=================================');
    console.log('OFFICE: problem - 1 acknowledge POST');
    console.log('=================================');
    
    var queryString1 = `UPDATE tbl_problemstatement SET
    enum_problemStatus = 'Acknowledged'
    WHERE tbl_problemstatement.int_statementID=${req.body.int_statementID}`
            
    db.query(queryString1, (err, results) => {        
        if (err) throw err;
        res.redirect('/office/problems/submittedproblems');
    });
});

router.post('/:int_statementID/rejectstatement', (req, res) => {
    console.log('=================================');
    console.log('OFFICE: problem - 1 reject POST');
    console.log('=================================');
    
    var queryString1 = `UPDATE tbl_problemstatement SET
    enum_problemStatus = 'Rejected'
    WHERE tbl_problemstatement.int_statementID=${req.body.int_statementID}`
            
    db.query(queryString1, (err, results) => {        
        if (err) throw err;
        res.redirect('/office/problems/submittedproblems');
    });
});

module.exports = router;