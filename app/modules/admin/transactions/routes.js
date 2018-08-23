var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();
var moment = require('moment');

router.get('/transactions1',(req, res) => {
    console.log('=================================');
    console.log('ADMIN: TRANSACTIONS - 1');
    console.log('=================================');

    res.render('admin/transactions/views/transactions1');
});

router.get('/transactions2',(req, res) => {
    var queryString = `SELECT * FROM tbl_problemstatement pr
    JOIN tbl_category cat ON pr.int_categoryID=cat.int_categoryID 
    ORDER BY pr.int_statementID DESC `


    db.query(queryString,(err, results, fields) => {
        if (err) console.log(err);
        var date_results = results;

        for (var i = 0; i < date_results.length;i++){
            date_results[i].date_createdDate = moment(date_results[i].date_createdDate).format('MM-DD-YYYY');
        }
        console.log(results);

        var queryString2 = `SELECT * FROM tbl_category`
    
        db.query(queryString2,(err, results2) => {
    
        if (err) console.log(err);
            console.log('=================================');
            console.log('BARANGAY: GET PROJECT CATEGORY');
            console.log('=================================');
            
    
            res.render('admin/transactions/views/transactions2',{
                tbl_problemstatement:results,
                tbl_projectcategory:results2});
        });
    });
});

router.get('/transactions3',(req, res) => {
    console.log('=================================');
    console.log('ADMIN: TRANSACTIONS - 3');
    console.log('=================================');

    res.render('admin/transactions/views/transactions3');
});


module.exports = router;