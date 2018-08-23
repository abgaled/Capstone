var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();
var resultIndex;
var checknumber;


router.get('/pending',(req, res) => {
    console.log('=================================');
    console.log('BUDGET: PROPOSALS-NEW');
    console.log('=================================');

    var newQuery = `SELECT * 
        FROM tbl_projectproposal propr
        JOIN tbl_proposalapproval proapp 
        ON propr.int_projectID = proapp.int_projectID`;

    db.query(newQuery, (err, newResult, fields) => {

        if(err) console.log(err);

        console.log(newResult);

        res.render('budget/proposals/views/pendingproposals', {pendingproposals:newResult});
    });
});

router.post('/pending',(req, res) => {
    console.log('=================================');
    console.log('BUDGET: PROPOSALS-APPROVAL-CHECKNUMBER');
    console.log('=================================');
    
    console.log(req.body.chequeNumber);
    var insertCheckQuery = `UPDATE tbl_proposalapproval
    SET varchar_checkNumber = "${req.body.chequeNumber}"
    WHERE int_projectID = ${req.body.PROJECT_idcheq}`;
    db.query(insertCheckQuery, (err, insertCheckResult, fields) => {
    if(err) console.log(err);

    

    console.log("Succesfully inserted the check number");
    console.log(insertCheckResult);

    
        res.redirect('/budget/proposals/pending');
});
});

router.get('/approved',(req, res) => {
    console.log('=================================');
    console.log('BUDGET: PROPOSALS-APPROVED');
    console.log('=================================');

    
    var approveQuery = `SELECT * 
        FROM tbl_projectproposal PP JOIN tbl_projectcategory PC 
        ON PP.int_projectID=PC.int_projectID
        JOIN tbl_category C ON PC.int_categoryID=C.int_categoryID
        WHERE PP.enum_proposalStatus='Approved'
        GROUP BY PP.int_projectID`;

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
        FROM tbl_projectproposal 
        WHERE int_projectID= ${resultIndex}`;

    db.query(selectDetailQuery, (err, projDetailResult, fields) => {
        if(err) console.log(err);
        console.log('Succesfully retrieved project proposal data from the database');


        var beneficiaryDetailQuery = `SELECT varchar_beneficiaryName
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

                var timelineDetailQuery = `SELECT date_projectStart, date_projectEnd, datetime_releasingStart, datetime_releasingEnd
                    FROM tbl_project
                    WHERE int_projectID= ${resultIndex}`;

                db.query(timelineDetailQuery, (err, timelineDetailResult, fields) => {
                    if(err) console.log(err);
                    console.log('Succesfully retrieved project timeline data from the database');
                
                    var budgetDetailQuery = `SELECT int_allotedSlot, decimal_estimatedBudget, int_dayDuration
                        FROM tbl_projectproposal
                        WHERE int_projectID= ${resultIndex}`;

                    db.query(budgetDetailQuery, (err, budgetDetailResult, fields) => {
                        if(err) console.log(err);
                        console.log('Succesfully retrieved project budget data from the database');
                            
                        var formDetailQuery = `SELECT varchar_formName
                            FROM tbl_formtype FT JOIN tbl_projectform PF
                            ON FT.int_formTypeID=PF.int_formtypeID
                            JOIN tbl_projectproposal PP ON PF.int_projectID=PP.int_projectID
                            WHERE PP.int_projectID= ${resultIndex}`;

                        db.query(formDetailQuery, (err, formDetailResult, fields) => {
                            if(err) console.log(err);
                            console.log('Succesfully retrieved project form data from the database');
                            
                            var categoryDetailQuery = `SELECT varchar_categoryName
                                FROM tbl_projectcategory PC JOIN tbl_category C
                                ON PC.int_categoryID=C.int_categoryID
                                WHERE int_projectID= ${resultIndex}`;

                            db.query(categoryDetailQuery, (err, categoryDetailResult, fields) => {
                                if(err) console.log(err);
                                console.log('Succesfully retrieved project category data from the database');
                                
                                var locationDetailQuery = ` SELECT *
                                    FROM tbl_projectproposal PP JOIN tbl_projectlocation PL
                                    ON PP.int_projectID=PL.int_projectID
                                    JOIN tbl_releaselocation RL ON PL.int_locationID=RL.int_locationID
                                    JOIN tbl_address A ON RL.int_locationAddressID=A.int_addressID
                                    WHERE PP.int_projectID= ${resultIndex}`;

                                db.query(locationDetailQuery, (err, locationDetailResult, fields) => {
                                    if(err) console.log(err);
                                    console.log('Succesfully retrieved project location data from the database');


                                    res.render('budget/proposals/views/proposaldetails', 
                                    {
                                        details:projDetailResult, 
                                        beneficiaries:beneDetailResult, 
                                        requirements:requireDetailResult, 
                                        timelines:timelineDetailResult, 
                                        forms:formDetailResult, 
                                        budgets:budgetDetailResult, 
                                        categories:categoryDetailResult, 
                                        locations:locationDetailResult
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});



router.get('/:int_projectID/rejectproposal', (req, res) => {
    console.log('=================================');
    console.log('BUDGET: PROPOSAL - 1 reject GET');
    console.log('=================================');
    
    var queryString =`SELECT * FROM tbl_projectproposal
    WHERE enum_proposalStatus = 'Pending' 
    AND tbl_projectproposal.int_projectID=${req.params.int_projectID}`
    resultIndex = `${req.params.int_projectID}`;

    console.log(resultIndex);
    console.log('${req.params.int_projectID}');
    db.query(queryString, (err, results, fields) => {
        console.log(results);
        if (err) console.log(err);
    
        res.render(`budget/proposals/views/rejectproposal`,{tbl_projectproposal:results});
    });
});

router.post('/:int_projectID/rejectproposal', (req, res) => {
    console.log('=================================');
    console.log('BUDGET: PROPOSAL - 1 reject POST');
    console.log('=================================');
    resultIndex = `${req.body.int_projectID}`;

    console.log(resultIndex);
    var queryString1 = `UPDATE tbl_projectproposal SET
    enum_proposalStatus = 'Rejected'
    WHERE tbl_projectproposal.int_projectID = ${req.body.int_projectID}`
            
    db.query(queryString1, (err, results) => {        
        if (err) throw err;
        res.redirect('/budget/proposals/pending');
    });
});



router.post('/revision',(req, res) => {
    console.log('=================================');
    console.log('BUDGET: PROPOSALS-REVISION');
    console.log('=================================');

    var insertRevisionQuery = `INSERT INTO \`tbl_revisioncomment\`
        (
            \`int_projectID\`, 
            \`text_commentContent\`
        )

        VALUES
        (
            "${req.body.PROJECT_idrev}",
            "${req.body.revision}"
        )`;

    db.query(insertRevisionQuery, (err, insertRevisionResult, fields) => {
        if(err) console.log(err);

        console.log("Succesfully inserted the revision comment");
        console.log(insertRevisionResult);

        var updateProjStatQuery = `UPDATE tbl_projectproposal
            SET enum_proposalStatus="Revision"
            WHERE int_projectID= ${req.body.PROJECT_idrev}`;

        db.query(updateProjStatQuery, (err, updateProjStatResult, fields) => {
            if(err) console.log(err);

            console.log("Succesfully updated the proposal status");
            console.log(updateProjStatResult);

            res.redirect('/budget/proposals/pending');
        });
    });
});


router.post('/revisiondetails',(req, res) => {
    console.log('=================================');
    console.log('BUDGET: PROPOSALS-REVISION');
    console.log('=================================');

    var approveQuery = `SELECT * 
        FROM tbl_projectproposal PP JOIN tbl_projectcategory PC 
        ON PP.int_projectID=PC.int_projectID
        JOIN tbl_category C ON PC.int_categoryID=C.int_categoryID
        WHERE PP.enum_proposalStatus='Approved'
        GROUP BY PP.int_projectID`;

    var selectRevisionQuery = `SELECT * FROM tbl_revisioncomment`;

    db.query(selectRevisionQuery, (err, selectRevisionResult, fields) => {
        if(err) console.log(err);

        console.log("Succesfully inserted the revision comment");
        console.log(selectRevisionResult);

            res.redirect('/budget/proposals/pending');
        });
});


// AJAX GET REVISION DETAILS
router.post('/pending/ajaxrevisiondetails',(req,res) => {
    console.log('=================================');
    console.log('BUDGET: PROPOSALS-REVISION-GET DETAILS AJAX');
    console.log('=================================');

    var viewRevisionQuery = `SELECT * FROM tbl_revisioncomment 
    WHERE int_projectID = ${req.body.ajProjRevisionID}`;

    db.query(viewRevisionQuery,(err, results, fields) => {
        if (err) console.log(err);


        console.log(results);

        var resultss = results[0];

        console.log("===================RESULTSS")
        console.log(resultss)

        return res.send({tbl_revision:resultss});
    });
});


router.post('/approval',(req, res) => {
    console.log('=================================');
    console.log('BUDGET: PROPOSALS-APPROVAL');
    console.log('=================================');

    resultIndex = `${req.body.PROJECT_id}`;


    console.log(resultIndex);
    console.log(req.body.letterfile);
    console.log(req.body.actualbudget);


        var updateProjStatQuery = `UPDATE tbl_projectproposal SET 
            enum_proposalStatus = 'Approved'
            WHERE int_projectID= ${req.body.PROJECT_id}`;

        db.query(updateProjStatQuery, (err, updateProjStatResult, fields) => {
            if(err) console.log(err);

            console.log("Succesfully updated the proposal status");
            console.log(updateProjStatResult);

            var updateBudgetQuery = `UPDATE tbl_project
                SET decimal_actualBudget = ${req.body.actual_budget}
                WHERE int_projectID = ${req.body.PROJECT_id}`;

            db.query(updateBudgetQuery, (err, updateBudgetResult, fields) => {
                if(err) console.log(err);

                console.log("Succesfully updated the project actual budget");
                console.log(updateBudgetResult);

                res.redirect('/budget/proposals/approved');
        });
    });
});


router.post('/checkinsertid',(req, res) => {
    console.log('=================================');
    console.log('BUDGET: PROPOSALS-APPROVAL-ID');
    console.log('=================================');


    resultIndex = req.body.resultIndex

    console.log(resultIndex);
});



// router.post('/checknumberget', (req,res) => {
//     console.log('=================================');
//     console.log('BUDGET: PROPOSALS-APPROVAL-CHECKNUMBER');
//     console.log('=================================');
    
//     console.log(req.body.chequeNumber);
//     var insertCheckQuery = `UPDATE tbl_proposalapproval
//     SET varchar_checkNumber = "${req.body.chequeNumber}"
//     WHERE int_projectID = ${req.body.PROJECT_idcheq}`;
//     db.query(insertCheckQuery, (err, insertCheckResult, fields) => {
//     if(err) console.log(err);

//     console.log("Succesfully inserted the check number");
//     console.log(insertCheckResult);

    
//         res.redirect('/budget/proposals/pending');
//     });
// });





module.exports = router;