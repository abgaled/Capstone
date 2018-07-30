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



router.get('/approved',(req, res) => {
    console.log('=================================');
    console.log('BUDGET: PROPOSALS-APPROVED');
    console.log('=================================');

    
    var approveQuery = `SELECT * 
        FROM tbl_projectproposal PP JOIN tbl_projectcategory PC 
        ON PP.int_categoryID=PC.int_categoryID
        WHERE PP.enum_proposalStatus='Approved'
        GROUP BY int_projectID`;

    db.query(approveQuery, (err, approveResult, fields) => {

        if(err) console.log(err);

        console.log(approveResult);

        res.render('budget/proposals/views/approvedproposals', {approvedproposals:approveResult});
    });
});




router.get('/:int_projectID/details',(req, res) => {
    console.log('=================================');
    console.log('BUDGET: PROPOSALS-REVIEWED-DETAILS');
    console.log('=================================');

    resultIndex = `${req.params.int_projectID}`;

    console.log(resultIndex);

    res.redirect('/budget/proposals/viewdetail');
});



router.get('/viewdetail', (req, res) => {
    console.log('=================================');
    console.log('BUDGET: PROPOSALS-DETAILS');
    console.log('=================================');
    console.log(resultIndex);

    var selectDetailQuery = `SELECT * 
        FROM tbl_projectproposal PP JOIN tbl_projectcategory PC 
        ON PP.int_categoryID=PC.int_categoryID
        JOIN tbl_releaseLocation RL ON PP.int_releaseLocationID=RL.int_locationID 
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

                var timelineDetailQuery = `SELECT date_createdDate, int_dayDuration
                    FROM tbl_projectproposal
                    WHERE int_projectID= ${resultIndex}`;

                db.query(timelineDetailQuery, (err, timelineDetailResult, fields) => {
                    if(err) console.log(err);
                    console.log('Succesfully retrieved project timeline data from the database');
                
                    var budgetDetailQuery = `SELECT int_allotedSlot, decimal_estimatedBudget
                        FROM tbl_projectproposal
                        WHERE int_projectID= ${resultIndex}`;

                    db.query(budgetDetailQuery, (err, budgetDetailResult, fields) => {
                        if(err) console.log(err);
                        console.log('Succesfully retrieved project budget data from the database');
                            
                        var formDetailQuery = `SELECT varchar_formName, text_formDescription
                            FROM tbl_formtype FT JOIN tbl_categoryform CF
                            ON FT.int_formtypeID=CF.int_formtypeID
                            JOIN tbl_projectcategory C ON CF.int_categoryID=C.int_categoryID
                            JOIN tbl_projectproposal PP ON C.int_categoryID=PP.int_categoryID
                            WHERE PP.int_projectID= ${resultIndex}`;

                        db.query(formDetailQuery, (err, formDetailResult, fields) => {
                            if(err) console.log(err);
                            console.log('Succesfully retrieved project form data from the database');
                            
                            res.render('budget/proposals/views/proposaldetails', {details:projDetailResult, beneficiaries:beneDetailResult, requirements:requireDetailResult, timelines:timelineDetailResult, forms:formDetailResult, budgets:budgetDetailResult});

                        });
                    });
                });
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
});



router.get('/:int_projectID/revision',(req, res) => {
    console.log('=================================');
    console.log('BUDGET: PROPOSALS-REVISION');
    console.log('=================================');

    // var updateDeleteQuery = `UPDATE tbl_projectproposal
    //     SET enum_proposalStatus='Rejected'
    //     WHERE int_projectID= ${req.params.int_projectID}`;

    // db.query(updateDeleteQuery, (err, deleteResult, fields) => {
    //     if(err) console.log(err);

    //     console.log('Succesfully updated the data from reviewed to rejected');
    //     res.redirect('/budget/proposals/new');
    // });

    var content = `${req.body.revision}`;

    console.log(`${req.params.int_projectID}`);
    console.log(content);


    res.redirect('/budget/proposals/new');
});



router.get('/:int_projectID/approval',(req, res) => {
    console.log('=================================');
    console.log('BUDGET: PROPOSALS-APPROVAL');
    console.log('=================================');

    // var updateDeleteQuery = `UPDATE tbl_projectproposal
    //     SET enum_proposalStatus='Rejected'
    //     WHERE int_projectID= ${req.params.int_projectID}`;

    // db.query(updateDeleteQuery, (err, deleteResult, fields) => {
    //     if(err) console.log(err);

    //     console.log('Succesfully updated the data from reviewed to rejected');
    //     res.redirect('/budget/proposals/new');
    // });

    var content = `${req.body.revision}`;

    console.log(`${req.params.int_projectID}`);
    console.log(content);


    res.redirect('/budget/proposals/reviewed');
});

module.exports = router;