var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();
var moment = require('moment');
var resultIndex;
var checknumber;


router.get('/pending',(req, res) => {
    console.log('=================================');
    console.log('BUDGET: PROPOSALS-NEW');
    console.log('=================================');

    var newQuery = `SELECT * FROM
        (
            SELECT PProj.*, CA.enum_checkAppStatus
            FROM tbl_projectproposal PProj
            LEFT JOIN tbl_checkapproval CA
            ON PProj.int_projectID=CA.int_projectID

            UNION

            SELECT PProj.*, CA.enum_checkAppStatus
            FROM tbl_projectproposal PProj
            RIGHT JOIN tbl_checkapproval CA
            ON PProj.int_projectID=CA.int_projectID
            WHERE CA.int_projectID IS NULL
        ) AS tbl1

        JOIN
        
        (
            SELECT PP.int_projectID, RC.enum_revisionStatus
            FROM tbl_projectproposal PP
            LEFT JOIN tbl_revisioncomment RC
            ON PP.int_projectID=RC.int_projectID
            
            UNION

            SELECT PP.int_projectID, RC.enum_revisionStatus
            FROM tbl_projectproposal PP
            RIGHT JOIN tbl_revisioncomment RC
            ON PP.int_projectID=RC.int_projectID
            WHERE RC.int_projectID IS NULL
        ) AS tbl2
        
        WHERE tbl1.int_projectID=tbl2.int_projectID`;

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
    console.log(req.body.PROJECT_idcheque)

    
    var insertCheckQuery = `INSERT INTO \`tbl_proposalapproval\` 
        (\`int_projectID\`, 
        \`varchar_checkNumber\`,
        \`enum_propappStatus\`)
        VALUES
        (${req.body.PROJECT_idcheque},
        "${req.body.chequeNumber}",
        "Sent")`

        db.query(insertCheckQuery, (err, insertCheckResult, fields) => {
        if(err) console.log(err);

        console.log("Succesfully inserted the check number");
        
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

        res.render('budget/proposals/views/pendingproposals', {approvedproposals:approveResult});
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

        
        var projDetailResult = projDetailResult;

        for (var i = 0; i < projDetailResult.length;i++){
            projDetailResult[i].date_createdDate = moment(projDetailResult[i].date_createdDate).format('MM-DD-YYYY');
        }

        console.log('Succesfully retrieved project proposal data from the database');


        var beneficiaryDetailQuery = `SELECT varchar_beneficiaryName
            FROM tbl_beneficiary BN JOIN tbl_projectbeneficiary PB 
            ON BN.int_beneficiaryID=PB.int_beneficiaryID
            JOIN tbl_projectproposal PP ON PB.int_projectID=PP.int_projectID
            WHERE PP.int_projectID= ${resultIndex}`;
        
        db.query(beneficiaryDetailQuery, (err, beneDetailResult, fields) => {
            if(err) console.log(err);
            console.log('Succesfully retrieved project beneficiary data from the database');

            
            var requirementDetailQuery = `SELECT varchar_requirementName
                FROM tbl_requirement R JOIN tbl_projectrequirement PR
                ON R.int_requirementID=PR.int_requirementID
                JOIN tbl_projectproposal PP ON PR.int_projectID=PP.int_projectID
                WHERE PP.int_projectID= ${resultIndex}`;
            
            db.query(requirementDetailQuery, (err, requireDetailResult, fields) => {
                if(err) console.log(err);
                console.log('Succesfully retrieved project requirement data from the database');

                var timelineDetailQuery = `SELECT date_startApplication, 
                date_endApplication, date_releaseDate, date_projectClose
                FROM tbl_project
                WHERE int_projectID= ${resultIndex}`;

                db.query(timelineDetailQuery, (err, timelineDetailResult, fields) => {
                    if(err) console.log(err);
                    console.log('Succesfully retrieved project timeline data from the database');
                
                    var budgetDetailQuery = `SELECT int_allotedSlot, decimal_estimatedBudget, int_releasingDuration
                        FROM tbl_projectproposal
                        WHERE int_projectID= ${resultIndex}`;

                    db.query(budgetDetailQuery, (err, budgetDetailResult, fields) => {
                        if(err) console.log(err);
                        console.log('Succesfully retrieved project budget data from the database');
                            
                        var categoryDetailQuery = `SELECT varchar_categoryName
                            FROM tbl_projectcategory PC JOIN tbl_category C
                            ON PC.int_categoryID=C.int_categoryID
                            WHERE int_projectID= ${resultIndex}`;

                        db.query(categoryDetailQuery, (err, categoryDetailResult, fields) => {
                            if(err) console.log(err);
                            console.log('Succesfully retrieved project category data from the database');
                
                            var problemDetailQuery = `SELECT *
                                FROM tbl_problemstatement 
                                WHERE int_projectID = ${resultIndex}`;

                            db.query(problemDetailQuery, (err, problemDetailResult, fields) => {
                                if(err) console.log(err);
                                console.log('Successfully retrived the project\'s problem statement to be solved');

                                res.render('budget/proposals/views/proposaldetails', 
                                {
                                    details:projDetailResult, 
                                    beneficiaries:beneDetailResult, 
                                    requirements:requireDetailResult, 
                                    timelines:timelineDetailResult, 
                                    budgets:budgetDetailResult, 
                                    categories:categoryDetailResult, 
                                    problems:problemDetailResult
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

    console.log(req.body.PROJECT_idrev);

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

// AJAX GET REVISION DETAILS
router.post('/pending/ajaxrevisiondetails',(req,res) => {
    console.log('=================================');
    console.log('BUDGET: PROPOSALS-REVISION-GET DETAILS AJAX');
    console.log('=================================');
    console.log(`${req.body.ajaxrevisionID}`);

    var viewRevisionQuery = `SELECT * FROM tbl_revisioncomment WHERE int_projectID = ${req.body.ajaxrevisionID}`;

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
    console.log(req.body.checkfraction);
    console.log(req.body.checkdate);
    console.log(req.body.checkbankinfo);
    console.log(req.body.checkamount);
    console.log(req.body.checkroute);
    console.log(req.body.checkaccount);
    console.log(req.body.checkcheck);
    console.log(req.body.checksendername);

    var insertCheckQuery = `INSERT INTO \`tbl_checkapproval\`
    (
        \`int_projectID\`, 
        \`date_checkDate\`,
        \`varchar_fraction\`, 
        \`varchar_bankInfo\`, 
        \`int_routingNumber\`, 
        \`int_accountNumber\`, 
        \`int_checkNumber\`, 
        \`varchar_senderName\`, 
        \`decimal_amount\`,
        \`enum_checkAppStatus\`
    )

    VALUES
    (
        ${req.body.PROJECT_id},
        "${req.body.checkdate}",
        ${req.body.checkfraction},
        "${req.body.checkbankinfo}",
        ${req.body.checkroute},
        ${req.body.checkaccount},
        ${req.body.checkcheck},
        "${req.body.checksendername}",
        ${req.body.checkamount},
        "Pending"
    )`;

    db.query(insertCheckQuery, (err, insertCheckResult, fields) => {
        if(err) console.log(err);
        console.log("Check Details succesfully inserted");


        var updateProjStatQuery = `UPDATE tbl_projectproposal SET 
            enum_proposalStatus = 'Approved'
            WHERE int_projectID= ${req.body.PROJECT_id}`;

        db.query(updateProjStatQuery, (err, updateProjectResult, fields) => {
            if(err) console.log(err);

            console.log("Succesfully updated the project proposal approval");

            res.redirect('/budget/proposals/pending');
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


module.exports = router;