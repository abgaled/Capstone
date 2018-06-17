var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();



router.get('/new',(req, res) => {
    console.log('=================================');
    console.log('BUDGET: PROPOSALS-NEW');
    console.log('=================================');

    var strQuery1 = `SELECT * 
        FROM tbl_projectproposal P, tbl_projectCategory C 
        WHERE P.int_projectCategID=C.int_projectCategID AND enum_proposalStatus='New'
        GROUP BY int_projectID`;

    db.query(strQuery1, (err, results, fields) => {

        if(err) console.log(err);

        console.log(results);

        res.render('budget/proposals/views/newproposals', {newproposals:results});
    });

});

router.get('/reviewed',(req, res) => {
    console.log('=================================');
    console.log('BUDGET: PROPOSALS-REVIEWED');
    console.log('=================================');

    var strQuery2 = `SELECT * 
        FROM tbl_projectproposal P, tbl_projectCategory C 
        WHERE P.int_projectCategID=C.int_projectCategID AND enum_proposalStatus='Reviewed'
        GROUP BY int_projectID`;

    db.query(strQuery2, (err, results, fields) => {

        if(err) console.log(err);

        console.log(results);

        res.render('budget/proposals/views/reviewedproposals', {reviewedproposals:results});
    });
});


router.get('/new/:int_projectID/details',(req, res) => {
    console.log('=================================');
    console.log('BUDGET: PROPOSALS-DETAILS');
    console.log('=================================');

    var strQuery = `SELECT * FROM tbl_projectproposal P JOIN tbl_projectcategory C ON P.int_projectCategID = C.int_projectCategID 
        WHERE P.int_projectID= ${req.params.int_projectID}`;

    db.query(strQuery, (err, results, fields) => {
        if(err) console.log(err);

        console.log(results);
        res.render('budget/proposals/views/proposaldetails', {details:results});
    });
});

module.exports = router;