var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();



router.get('/',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: PROPOSALS');
    console.log('=================================');
 

    var queryString =`SELECT * FROM tbl_projectproposal pr
    JOIN tbl_proposalapproval proapp ON pr.int_projectID=proapp.int_projectID
    JOIN tbl_project proj ON pr.int_projectID=proj.int_projectID
    WHERE proj.enum_projectStatus="Proposed"`


    db.query(queryString, (err, results, fields) => {
        console.log(results);
        if (err) console.log(err);
        
        res.render('office/proposals/views/proposals', {
            tbl_projectproposal: results});
    });
    
});

router.get('/proposals/:int_projectID/proposaldetails',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: ONGOING PROJECT');
    console.log('=================================');
    console.log(req.params.int_projectID);
    var queryString =`SELECT * FROM tbl_projectproposal pr
    JOIN tbl_project proj ON pr.int_projectID = proj.int_projectID
    WHERE pr.int_projectID = "${req.params.int_projectID}"`

    var queryString2 =`SELECT * FROM tbl_projectrequirement prcat
    JOIN tbl_projectproposal pr ON pr.int_projectID=prcat.int_projectID
    JOIN tbl_requirement rq ON rq.int_requirementID=prcat.int_requirementID
    WHERE pr.int_projectID = "${req.params.int_projectID}"`

    var queryString3 =`SELECT * FROM tbl_projectbeneficiary prbf
    JOIN tbl_projectproposal pr ON pr.int_projectID=prbf.int_projectID
    JOIN tbl_beneficiary bf ON prbf.int_beneficiaryID=bf.int_beneficiaryID
    WHERE pr.int_projectID = "${req.params.int_projectID}"`

    var queryString4 =`SELECT * FROM tbl_projectlocation pl
    JOIN tbl_projectproposal pr ON pr.int_projectID=pl.int_projectID
    JOIN tbl_releaselocation rl ON pl.int_locationID=rl.int_locationID
    WHERE pr.int_projectID = "${req.params.int_projectID}"`

    var queryString5 =`SELECT * FROM tbl_projectcategory pc
    JOIN tbl_projectproposal pr ON pr.int_projectID=pc.int_projectID
    JOIN tbl_category cat ON cat.int_categoryID=pc.int_categoryID
    WHERE pr.int_projectID = "${req.params.int_projectID}"`
    

    db.query(queryString, (err, results, fields) => {
        console.log(results);
        if (err) console.log(err);
        db.query(queryString2, (err, results2, fields) => {
            console.log(results2);
            if (err) console.log(err);
            db.query(queryString3, (err, results3, fields) => {
                console.log(results3);
                if (err) console.log(err);
                db.query(queryString4, (err, results4, fields) => {
                    console.log(results4);
                    if (err) console.log(err);
                    db.query(queryString5, (err, results5, fields) => {
                        console.log(results5);
                        if (err) console.log(err);

                    res.render('office/proposals/views/proposaldetails', {tbl_projectproposal:results, tbl_projectrequirement:results2, tbl_projectbeneficiary:results3, tbl_releaselocation:results4,tbl_projectcategory:results5});

                 }); 
            });
        });
    });
});
});

// INSERT PROJECT PROPOSAL
router.post('/',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: PROPOSALS POST');
    console.log('=================================');

    // UPDATE TABLE PROBLEM STATEMENT 
    var statements = req.body.statementID;
    console.log("==============REQUIREMENT=============");
    console.log(req.body.statementID)

        for(i = 0 ; i < statements.length ; i++)
        {
            var updateProbStatus =  `UPDATE tbl_problemstatement SET
            enum_problemStatus = "Proposed"
            WHERE tbl_problemstatement.int_statementID = ${req.body.statementID}`;
            
        }

        db.query(updateProbStatus, (err, results, fields) => {        
            if (err) throw err;    
            console.log(results);

            var insertprojProposal = `INSERT INTO \`tbl_projectproposal\` (
        
                \`varchar_projectName\`,
                \`varchar_projectRationale\`,
                \`text_projectDescription\`,
                \`text_projectObjective\`,
                \`int_allotedSlot\`,
                \`int_dayDuration\`,
                \`decimal_estimatedBudget\`,
                \`date_createdDate\`,
                \`enum_proposalStatus\`)
                        
                VALUES(
                "${req.body.projectname}",
                "${req.body.projectrationale}",
                "${req.body.projectdescription}",
                "${req.body.projectobjectives}",
                "${req.body.allotedslot}",
                "${req.body.allotedslot}",
                "${req.body.estimatedbudget}",
                CURDATE(),
                "Accepted");`;

            db.query(insertprojProposal, (err, results, fields) => {        
                if (err) throw err;    
                console.log(results);
            
        
            var getProposalID =`SELECT * FROM tbl_projectproposal ORDER BY int_projectID DESC LIMIT 0,1`

            db.query(getProposalID, (err, proposalID, fields) => {        
                if (err) throw err;

                var toproject = proposalID[0];

                var inserttblProject = `INSERT INTO \`tbl_project\` (
                    \`int_projectID\`,
                    \`date_startDate\`,
                    \`date_endDate\`,
                    \`date_releaseDate\`,
                    \`enum_projectState\`)
                    
                    VALUES(
                    "${toproject.int_projectID}",
                    "${req.body.startdate}",
                    "${req.body.enddate}",
                    "${req.body.releasedate}",
                    "Active");`;

                    db.query(inserttblProject, (err, tblproject, fields) => {        
                        if (err) throw err;

                        console.log(tbl_project);

                        var inserttblProject = `INSERT INTO \`tbl_projectbeneficiary\` (
                            \`int_projectID\`,
                            \`int_beneficiaryID\`)
                            
                            VALUES(
                            "${toproject.int_projectID}",
                            "${req.body.apbeneficiary}");`;

                            db.query(inserttblProject, (err, tbl_projectbeneficiary, fields) => {        
                                if (err) throw err;

                                var inserttblRequirements = `INSERT INTO \`tbl_projectrequirement\` (
                                    \`int_requirementID\`,
                                    \`int_projectID\`)
                                    
                                    VALUES(
                                    "${req.body.aprequirement}",
                                    "${toproject.int_projectID}");`;

                                db.query(inserttblRequirements, (err, tblprojectrequirement, fields) => {        
                                    if (err) throw err;

                                    var insertTimeline = `INSERT INTO \`tbl_projectrequirement\` (
                                        \`int_requirementID\`,
                                        \`int_projectID\`)
                                        
                                        VALUES(
                                        "${req.body.aprequirement}",
                                        "${toproject.int_projectID}");`;

                                    db.query(insertTimeline, (err, tblprojectrequirement, fields) => {        
                                        if (err) throw err;
                        
                                        res.redirect('/office/proposals');
                                    });
                                })
                            });
                    });
        });
    });

    });
});

router.get('/createproposals',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: PROPOSALS');
    console.log('=================================');
 

    console.log('=================================');
    console.log('OFFICE: PROPOSALS');
    console.log('=================================');
    
    var queryString =`SELECT * FROM tbl_category WHERE enum_categoryStatus = 'Active'`
    
    var queryString2 =`SELECT * FROM tbl_beneficiary WHERE enum_beneficiaryStatus = 'Active'`

    var queryString3 =`SELECT * FROM tbl_requirement WHERE enum_requirementStatus = 'Active'`

    var queryString4 =`SELECT * FROM tbl_barangay WHERE enum_barangayStatus = 'Active'`
    
    var queryString5 =`SELECT * FROM tbl_problemstatement ps
    JOIN tbl_category cat ON ps.int_categoryID = cat.int_categoryID
    WHERE enum_problemStatus = 'Acknowledged'`

    db.query(queryString, (err, results, fields) => {
        console.log(results);
        if (err) console.log(err);
        db.query(queryString2, (err, results2, fields) => {
            console.log(results2);
            if (err) console.log(err);
            db.query(queryString3, (err, results3, fields) => {
                console.log(results3);
                if (err) console.log(err);
                db.query(queryString4, (err, results4, fields) => {
                    console.log(results4);
                    if (err) console.log(err);
                    db.query(queryString5, (err, results5, fields) => {
                        console.log(results5);
                        if (err) console.log(err);
                        res.render('office/proposals/views/createproposals', {tbl_category: results,tbl_beneficiary:results2,tbl_requirement:results3,tbl_barangay:results4,tbl_problemstatement:results5});
                    });
                });
            });
        });
    });
});

router.post('/',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: PROPOSALS-APPROVAL-CHECKNUMBER');
    console.log('=================================');
    
    console.log(req.body.chequeNumber);
    var insertCheckQuery = `UPDATE tbl_proposalapproval
    SET enum_propappStatus = "Received"
    WHERE int_projectID = ${req.body.PROJECT_id}`;                                                                                                                                   
    db.query(insertCheckQuery, (err, insertCheckResult, fields) => {
    if(err) console.log(err);

    console.log("Succesfully inserted the check number");
    console.log(insertCheckResult);

    
        res.redirect('/office/proposals/');
    });
});

module.exports = router;