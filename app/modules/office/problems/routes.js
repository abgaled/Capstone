var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();
var moment = require("moment");

router.get('/',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: PROBLEM STATEMENT-SUBMITTED');
    console.log('=================================');

    // var queryString = `SELECT *
    //     FROM tbl_problemstatement PS JOIN tbl_category C
    //     ON PS.int_categoryID=C.int_categoryID
    //     JOIN tbl_barangay B ON B.int_barangayID=PS.int_barangayID
    //     ORDER BY FIELD(PS.enum_problemStatus, 'Submitted','Acknowledged','Proposed','Rejected') ASC, PS.date_createdDate DESC`;

    var queryString = `SELECT *
        FROM tbl_problemstatement PS JOIN tbl_category C
        ON PS.int_categoryID=C.int_categoryID
        JOIN tbl_barangay B ON B.int_barangayID=PS.int_barangayID
        ORDER BY PS.date_createdDate DESC`;

    db.query(queryString,(err, results, fields) => {
        if (err) console.log(err);
        
        console.log(results);

        res.render('office/problems/views/problems',{tbl_problemstatement:results});
    });

});

router.post('/ajaxgetdetails',(req,res) => {
    console.log('=================================');
    console.log('OFFICE: PROBLEM STATEMENT-PREVIOUS-AJAX GET DETAILS (POST)');
    console.log('=================================');
    console.log(`${req.body.ajStatementID}`);

    var queryString = `SELECT *
        FROM tbl_problemstatement pr
        JOIN tbl_category cat ON pr.int_categoryID=cat.int_categoryID 
        JOIN tbl_barangay bar ON pr.int_barangayID=bar.int_barangayID
        WHERE pr.int_statementID = ${req.body.ajStatementID}`;


    db.query(queryString,(err, results, fields) => {
        if (err) console.log(err);

        console.log(results);
        
        for (var i = 0; i < results.length;i++){
            results[i].date_createdDate = moment(results[i].date_createdDate).format('MMMM DD[,] YYYY');
        }

        var beneQuery = `SELECT B.varchar_beneficiaryName
            FROM tbl_beneficiary B JOIN tbl_projectbeneficiary PB
                ON B.int_beneficiaryID=PB.int_beneficiaryID
            WHERE PB.int_projectID = ${req.body.ajStatementID} AND PB.enum_beneficiaryLink='Problem Statement'`
        
        var resultss = results[0];

        console.log("===================RESULTSS")
        console.log(resultss)

        db.query(beneQuery,(err, results1, fields) => {
            if (err) console.log(err);
            console.log(results1);

            return res.send({
                tbl_problemstatement1:resultss
            });
        });
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
        res.redirect('/office/problems');
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
        res.redirect('/office/problems');
    });
});

module.exports = router;