var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();
var resultIndex;


router.get('/new',(req, res) => {
    console.log('=================================');
    console.log('BUDGET: PROPOSALS-NEW');
    console.log('=================================');

    var newQuery = `SELECT * 
        FROM tbl_projectproposal PP JOIN tbl_projectcategory PC 
        ON PP.int_categoryID=PC.int_categoryID
        WHERE PP.enum_proposalStatus='New'
        GROUP BY int_projectID`;

    db.query(newQuery, (err, newResult, fields) => {

        if(err) console.log(err);

        console.log(newResult);

        res.render('budget/proposals/views/newproposals', {newproposals:newResult});
    });

});

router.get('/reviewed',(req, res) => {
    console.log('=================================');
    console.log('BUDGET: PROPOSALS-REVIEWED');
    console.log('=================================');

    
    var reviewQuery = `SELECT * 
        FROM tbl_projectproposal PP JOIN tbl_projectcategory PC 
        ON PP.int_categoryID=PC.int_categoryID
        WHERE PP.enum_proposalStatus='Reviewed'
        GROUP BY int_projectID`;

    db.query(reviewQuery, (err, reviewResult, fields) => {

        if(err) console.log(err);

        console.log(reviewResult);

        res.render('budget/proposals/views/reviewedproposals', {reviewedproposals:reviewResult});
    });
});


router.get('/:int_projectID/details',(req, res) => {
    console.log('=================================');
    console.log('BUDGET: PROPOSALS-REVIEWED-DETAILS');
    console.log('=================================');

    var updateNewQuery = `UPDATE tbl_projectproposal
        SET enum_proposalStatus='Reviewed'
        WHERE int_projectID= ${req.params.int_projectID}`;
    
    db.query(updateNewQuery, (err, updateNewResult, fields) => {
        if(err) console.log(err);
        console.log('Succesfully update from new to reviewed');

        resultIndex = `${req.params.int_projectID}`;

        console.log(resultIndex);

        res.redirect('/budget/proposals/viewdetail');
    });
});

router.get('/viewdetail', (req, res) => {
    console.log('=================================');
    console.log('BUDGET: PROPOSALS-DETAILS');
    console.log('=================================');
    console.log(resultIndex);

    var selectDetailQuery = `SELECT * 
        FROM tbl_projectproposal PP JOIN tbl_projectcategory PC 
        ON PP.int_categoryID=PC.int_categoryID 
        WHERE PP.int_projectID= ${resultIndex}`;

    db.query(selectDetailQuery, (err, projDetailResult, fields) => {
        if(err) console.log(err);
        console.log('Succesfully retrieved project proposal data from the database');


        var beneficiaryDetailQuery = `SELECT varchar_beneficiaryName, text_beneficiaryDescription
            FROM tbl_beneficiary BN JOIN tbl_projectbeneficiary PB 
            ON BN.int_beneficiaryID=PB.int_beneficiaryID
            JOIN tbl_projectproposal PP ON PB.int_projectID=PP.int_projectID
            WHERE PP.int_projectID= ${resultIndex}`;
        
        db.query(beneficiaryDetailQuery, (err, beneDetailResult, fields) => {
            if(err) console.log(err);
            console.log('Succesfully retrieved project beneficiary data from the database');

            
            var requirementDetailQuery = `SELECT varchar_requirementName, text_requirementDescription
                FROM tbl_requirement R JOIN tbl_projectrequirement PR
                ON R.int_requirementID=PR.int_requirementID
                JOIN tbl_projectproposal PP ON PR.int_projectID=PP.int_projectID
                WHERE PP.int_projectID= ${resultIndex}`;
            
            db.query(requirementDetailQuery, (err, requireDetailResult, fields) => {
                if(err) console.log(err);
                console.log('Succesfully retrieved project requirement data from the database');

                res.render('budget/proposals/views/proposaldetails', {details:projDetailResult, beneficiaries:beneDetailResult, requirements:requireDetailResult});
            });
        });
    });
});

router.get('/:int_projectID/delete',(req, res) => {
    console.log('=================================');
    console.log('BUDGET: PROPOSALS-DELETE');
    console.log('=================================');

    var updateDeleteQuery = `UPDATE tbl_projectproposal
        SET enum_proposalStatus='Rejected'
        WHERE int_projectID= ${req.params.int_projectID}`;

    db.query(updateDeleteQuery, (err, deleteResult, fields) => {
        if(err) console.log(err);

        console.log('Succesfully updated the data from reviewed to rejected');
        res.redirect('/budget/proposals/new');
    });
})

module.exports = router;