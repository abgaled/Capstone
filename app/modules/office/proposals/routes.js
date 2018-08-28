var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();
var cityID;

// KULANG: 
// - CityID post
// - Yung mga dropdown sa pagdidisplay
// [AS OF 12:09PM - 25/08/2018]

router.get('/',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: PROPOSALS');
    console.log('=================================');
 
    console.log("CITY ID:");
    console.log(req.session.office.int_userID);

    var cityQuery = `SELECT int_cityID FROM tbl_city WHERE int_userID=${req.session.office.int_userID}`;

    db.query(cityQuery, (err, cityResult, fields) => {
        if(err) console.log(err);

        cityID = cityResult[0];
        console.log(cityID);

        var queryString =`SELECT * FROM tbl_projectproposal PP
            WHERE PP.int_cityID= ${cityID.int_cityID}
            ORDER BY PP.date_createdDate DESC`;


        db.query(queryString, (err, results, fields) => {
            console.log(results);
            if (err) console.log(err);
            
            res.render('office/proposals/views/proposals', {
                tbl_projectproposal: results});
        });
    });
});

router.get('/proposals/:int_projectID/proposaldetails',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: ONGOING PROJECT');
    console.log('=================================');
    console.log(req.params.int_projectID);

    var queryString =`SELECT * FROM tbl_projectproposal pr
    WHERE pr.int_projectID = "${req.params.int_projectID}"`

    var queryString2 =`SELECT * 
    FROM tbl_projectrequirement prcat
    JOIN tbl_projectproposal pr ON pr.int_projectID=prcat.int_projectID
    JOIN tbl_requirement rq ON rq.int_requirementID=prcat.int_requirementID
    WHERE pr.int_projectID = "${req.params.int_projectID}"`

    var queryString3 =`SELECT * FROM tbl_projectbeneficiary prbf
    JOIN tbl_projectproposal pr ON pr.int_projectID=prbf.int_projectID
    JOIN tbl_beneficiary bf ON prbf.int_beneficiaryID=bf.int_beneficiaryID
    WHERE pr.int_projectID = "${req.params.int_projectID}"`

    var queryString5 =`SELECT * FROM tbl_projectlocation pl
    JOIN tbl_projectproposal pr ON pr.int_projectID=pl.int_projectID
    JOIN tbl_releaselocation rl ON pl.int_locationID=rl.int_locationID
    WHERE pr.int_projectID = "${req.params.int_projectID}"`

    var queryString4 =`SELECT * FROM tbl_projectcategory pc
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
                    // db.query(queryString5, (err, results5, fields) => {
                    //     console.log(results5);
                    //     if (err) console.log(err);

                    res.render('office/proposals/views/proposaldetails', 
                    {
                        tbl_projectproposal:results, 
                        tbl_projectrequirement:results2, 
                        tbl_projectbeneficiary:results3,
                        // tbl_releaselocation:results5,
                        tbl_projectcategory:results4
                    // });
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


    console.log("PROJECT DETAILS:")
    console.log(req.body.projectname);
    console.log(req.body.projectrationale);
    console.log(req.body.projectdescription);
    console.log(req.body.projectobjective);
    console.log("PROJECT SLOTS:")
    console.log(req.body.allotedslots);
    console.log("PROJECT DATES:")
    console.log(req.body.applicationDays);
    console.log(req.body.releasingday);
    console.log(req.body.releasedate);
    console.log("PROJECT BUDGET:")
    console.log(req.body.estimatedbudget);
    console.log("PROJECT CATEGORY:")
    console.log(req.body.projectcategory);
    var categ = req.body.projectcategory;
    console.log("PROJECT BENEFICIARY:")
    console.log(req.body.projectbeneficiary);
    var bene = req.body.projectbeneficiary;
    console.log("PROJECT REQUIREMENT:")
    console.log(req.body.projectrequirement);
    var require = req.body.projectrequirement;
    console.log("PROBLEM STATEMENT:")
    console.log(req.body.statementID);
    var statements = req.body.statementID;
    console.log("CITY ID:")
    console.log(req.session.office.int_userID);

    var insertprojProposal = `INSERT INTO \`tbl_projectproposal\` 
    (
        \`int_cityID\`,
        \`varchar_projectName\`,
        \`varchar_projectRationale\`,
        \`text_projectDescription\`,
        \`text_projectObjective\`,
        \`int_allotedSlot\`,
        \`int_applicationDuration\`,
        \`int_releasingDuration\`,
        \`int_beforeReleasingDuration\`,
        \`decimal_estimatedBudget\`,
        \`date_createdDate\`,
        \`enum_proposalStatus\`
    )
                
    VALUES
    (
        ${cityID.int_cityID},
        "${req.body.projectname}",
        "${req.body.projectrationale}",
        "${req.body.projectdescription}",
        "${req.body.projectobjective}",
        "${req.body.allotedslots}",
        "${req.body.applicationDays}",
        "${req.body.releasingday}",
        "${req.body.releasedate}",
        "${req.body.estimatedbudget}",
        CURDATE(),
        "Pending"
    )`;

    db.query(insertprojProposal, (err, results, fields) => {        
        if (err) throw err;    
        console.log("==============INSERT PROJECT PROPOSAL CREDENTIALS SUCCESS====================");
            
        
        var getProposalID =`SELECT * FROM tbl_projectproposal ORDER BY int_projectID DESC LIMIT 0,1`

        db.query(getProposalID, (err, proposalID, fields) => {        
            if (err) throw err;
            console.log("==============GET PROJECT PROPOSAL ID SUCCESS====================");

            var toproject = proposalID[0];

            console.log("Project Proposal ID:");
            console.log(toproject);

            // UPDATE TABLE PROBLEM STATEMENT 
            console.log("==============INSERT PROBLEM STATEMENT=============");

            console.log(statements);

            for(var i = 0 ; i < statements.length ; i++)
            {
                var updateProbStatus =  `UPDATE tbl_problemstatement 
                    SET enum_problemStatus = "Proposed"
                    WHERE int_statementID = ${statements[i]}`;

                 db.query(updateProbStatus, (err, results, fields) => {        
                    if (err) throw err;    
                    console.log("==============INSERT PROBLEM STATEMENT SUCCESS====================");
                 });
            }


            // INSERT PROJECT BENEFICIARIES
            console.log("==============INSERT PROJECT BENEFICIARIES====================");

            console.log(bene);

            for(var j = 0 ; j < bene.length ; j++ ) {
                var insertBene = `INSERT INTO \`tbl_projectbeneficiary\`
                (
                    \`int_projectID\`,
                    \`int_beneficiaryID\`
                )

                VALUES
                (
                    "${toproject.int_projectID}",
                    "${bene[j]}"
                )`;

                    db.query(insertBene, (err, insertResult, fields) => {        
                    if (err) throw err;
                    console.log("==============INSERT PROJECT BENEFICIARIES SUCCESS====================");
                    });
                }
            

            // INSERT PROJECT REQUIREMENT
            console.log("==============INSERT PROJECT REQUIREMENT====================");
            

            console.log(require);


            for(var k = 0 ; k < require.length ; k++ ) {
                var inserReq = `INSERT INTO \`tbl_projectrequirement\`
                (
                    \`int_requirementID\`,
                    \`int_projectID\`
                )
                    
                VALUES
                (
                    "${require[k]}",
                    "${toproject.int_projectID}"
                )`;

                db.query(inserReq, (err, inserResult, fields) => {        
                    if (err) throw err;
                    console.log("==============INSERT PROJECT REQUIREMENT SUCCESS====================");
                });
            }
                

            //  INSERT PROJECT CATEGORY
            console.log("==============INSERT PROJECT CATEGORY====================");
            

            console.log(categ);


            for(var l = 0 ; l < categ.length ; l++){
                var insertTimeline = `INSERT INTO \`tbl_projectcategory\`
                (
                    \`int_categoryID\`,
                    \`int_projectID\`
                )
                    
                    VALUES(
                    "${categ[l]}",
                    "${toproject.int_projectID}"
                );`;

                db.query(insertTimeline, (err, tblprojectrequirement, fields) => {        
                    if (err) throw err;
                    console.log("==============INSERT PROJECT CATEGORY SUCCESS====================");
                });
            }

            res.redirect('/office/proposals');  
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

    var queryString4 =`SELECT DISTINCT * FROM tbl_city WHERE int_userID=${req.session.office.int_userID}`
    
    var queryString5 =`SELECT * FROM tbl_problemstatement ps
    JOIN tbl_category cat ON ps.int_categoryID = cat.int_categoryID
    WHERE enum_problemStatus = 'Acknowledged'`

    var queryString6 = `SELECT *
        FROM tbl_barangay B JOIN tbl_city C
        ON B.int_cityID=C.int_cityID
        WHERE C.int_userID=${req.session.office.int_userID}`;

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
                        db.query(queryString6, (err, results6, fields) => {
                            console.log(results6);
                            if (err) console.log(err);
                            res.render('office/proposals/views/createproposals', 
                            {
                                tbl_category: results,
                                tbl_beneficiary:results2,
                                tbl_requirement:results3,
                                tbl_barangay:results4,
                                tbl_problemstatement:results5,
                                tbl_location:results6
                            });
                        });
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