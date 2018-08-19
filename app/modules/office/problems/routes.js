var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();


router.get('/',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: PROBLEM STATEMENT-PREVIOUS');
    console.log('=================================');

    var queryString = `SELECT * FROM tbl_problemstatement pr
    JOIN tbl_category prcat ON pr.int_categoryID=prcat.int_categoryID
    WHERE enum_problemStatus = 'Submitted' ORDER BY pr.int_categoryID DESC`


    db.query(queryString,(err, results, fields) => {
        if (err) console.log(err);
        

    res.render('office/problems/views/problems',{tbl_problemstatement:results});
    });

});

router.post('/viewprobcategory',(req,res) => {
    console.log('=================================');
    console.log('OFFICE: PROBLEM STATEMENT-PREVIOUS-SPECIFIC CATEGORY');
    console.log('=================================');

        if(`${req.body.problem_category}`== "All"){
            console.log("ALLLLLLLL"); 
            var queryString = `SELECT * FROM tbl_problemstatement pr
            JOIN tbl_category prcat ON pr.int_problemCategID=prcat.int_problemCategID
            ORDER BY pr.int_problemID DESC`
        
            db.query(queryString,(err, results, fields) => {

                res.redirect('office/problems/views/submittedproblems',{tbl_problemstatement:results});
                });
        }
        else{
            console.log("ELSEEEE")
            var queryString = `SELECT * FROM tbl_problemstatement pr
            JOIN tbl_problemcategory prcat ON pr.int_problemCategID=prcat.int_problemCategID
            WHERE pr.int_problemCategID=${req.body.problem_category}
            ORDER BY pr.int_problemID DESC`

            db.query(queryString,(err, results, fields) => {
               
                res.redirect('office/problems/views/submittedproblems',{tbl_problemstatement:results});
                });
        }
});

router.get('/submittedproblems',(req, res) => {
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

        res.render('office/problems/views/submittedproblems',{tbl_problemstatement:results});
    });

});

router.post('/acknowledge', (req, res) => {
    console.log('=================================');
    console.log('OFFICE: Problems - 2 Status Acknowledge POST');
    console.log('=================================');

    db.query("UPDATE tbl_problemstatement SET enum_problemStatus = 'Acknowledged' WHERE int_statementID = ?",[req.body.id], (err, results, fields) =>{
        if(err)
            console.log(err);
        else{
            return res.redirect('/office/problems')
        }
    });

});


module.exports = router;