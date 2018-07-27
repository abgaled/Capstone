var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();


router.get('/',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: PROBLEM STATEMENT-PREVIOUS');
    console.log('=================================');

    var queryString = `SELECT * FROM tbl_problemstatement pr
    JOIN tbl_projectcategory prcat ON pr.int_categoryID=prcat.int_categoryID
    ORDER BY pr.int_statementID DESC`


    db.query(queryString,(err, results, fields) => {
        if (err) console.log(err);
        

    res.render('office/problems/views/problems',{tbl_problemstatement:results});
    });

});

router.post('/viewprobcategory',(req,res) => {
    console.log('=================================');
    console.log('BARANGAY: PROBLEM STATEMENT-PREVIOUS-SPECIFIC CATEGORY');
    console.log('=================================');

        if(`${req.body.project_category}`== "All"){
            console.log("ALLLLLLLL"); 
            var queryString = `SELECT * FROM tbl_problemstatement pr
            JOIN tbl_projectcategory prcat ON pr.int_categoryID=prcat.int_categoryID
            ORDER BY pr.int_statementID DESC`
        
            db.query(queryString,(err, results, fields) => {

                res.redirect('office/problems/views/problems',{tbl_problemstatement:results});
                });
        }
        else{
            console.log("ELSEEEE")
            var queryString = `SELECT * FROM tbl_problemstatement pr
            JOIN tbl_projectcategory prcat ON pr.int_categoryID=prcat.int_categoryID
            WHERE pr.int_categoryID=${req.body.project_category}
            ORDER BY pr.int_statementID DESC`

            db.query(queryString,(err, results, fields) => {
               
                res.redirect('office/problems/views/problems',{tbl_problemstatement:results});
                });
        }
});

module.exports = router;