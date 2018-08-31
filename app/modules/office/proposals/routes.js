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

            var proposalCheque =`SELECT * FROM tbl_projectproposal PP
            JOIN tbl_proposalapproval PA
            ON PP.int_projectID=PA.int_projectID`;

            db.query(proposalCheque, (err, results1, fields) => {
                console.log(results1);
                if (err) console.log(err);

            
                res.render('office/proposals/views/proposals', {
                    tbl_projectproposal: results,
                    tbl_cheque:results1});
            });
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
    var name = req.body.projectname;
    console.log(name);
    var ratioanale = req.body.projectrationale;
    console.log(ratioanale);
    var description = req.body.projectdescription;
    console.log(description);
    var objective = req.body.projectobjective;
    console.log(objective);
    console.log("PROJECT SLOTS:")
    var allotedslot = req.body.allotedslots;
    console.log(allotedslot);
    console.log("PROJECT DATES:")
    var applicationdays = req.body.applicationDays;
    console.log(applicationdays);
    var releasingday = req.body.releasingday;
    console.log(releasingday);
    var releasedate = req.body.releasedate;
    console.log(releasedate);
    console.log("PROJECT BUDGET:")
    var estimatedbudget = req.body.estimatedbudget;
    console.log(estimatedbudget);
    console.log("PROJECT CATEGORY:")
    var categ = req.body.projectcategory;
    console.log(categ);
    console.log("PROJECT BENEFICIARY:")
    var beneficiaries = req.body.projectbeneficiaries;
    console.log(beneficiaries);
    console.log("PROJECT REQUIREMENT:")
    var require = req.body.projectrequirement;
    console.log(require);
    console.log("PROBLEM STATEMENT:")
    var statementList = req.body.statementsList;
    console.log(statementList);
    console.log("CITY ID:")
    console.log(cityID.int_cityID);

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

            console.log(statementList);
            console.log(statementList.length);

            for(var o = 0 ; o < (statementList.length) ; o++)
            {
                console.log(o);
                console.log(statementList[o]);

                var updateStatus =  `UPDATE tbl_problemstatement 
                    SET enum_problemStatus = "Proposed",
                    int_projectID = ${toproject.int_projectID}
                    WHERE int_statementID = ${statementList[o]}`;

                 db.query(updateStatus, (err, results) => {        
                    if (err) throw err;

                    console.log(results)
                });
            }


            // INSERT PROJECT BENEFICIARIES
            console.log("==============INSERT PROJECT BENEFICIARIES====================");

            console.log(beneficiaries);
            console.log(beneficiaries.length);

            for(var j = 0 ; j < beneficiaries.length ; j++ ) 
            {
                console.log(j);
                console.log(beneficiaries[j]);
                
                var insertBeneficiaries = `INSERT INTO \`tbl_projectbeneficiary\`
                    (
                        \`int_projectID\`,
                        \`int_beneficiaryID\`
                    )

                    VALUES
                    (
                        "${toproject.int_projectID}",
                        "${beneficiaries[j]}"
                    )`;

                db.query(insertBeneficiaries, (err, insertResult) => {        
                    if (err) throw err;
                    console.log(insertResult);
                });
            }
            

            // INSERT PROJECT REQUIREMENT
            console.log("==============INSERT PROJECT REQUIREMENT====================");
            

            console.log(require);
            console.log(require.length);


            for(var k = 0 ; k < require.length ; k++ ) 
            {
                console.log(k);
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
                });
            }
                

            //  INSERT PROJECT CATEGORY
            console.log("==============INSERT PROJECT CATEGORY====================");
            
            console.log(categ);
            console.log(categ.length);


            for(var l = 0 ; l < categ.length ; l++)
            {
                console.log(l);
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

router.post('/checknumberget',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: PROPOSALS-APPROVAL-CHECKNUMBER');
    console.log('=================================');
    
    console.log(req.body.chequeNumber);
    console.log(req.body.PROJECT_idcheq);

    var insertCheckQuery = `UPDATE tbl_proposalapproval
    SET enum_propappStatus = "Received"
    WHERE varchar_checkNumber = ${req.body.chequeNumber}`;  

    db.query(insertCheckQuery, (err, insertCheckResult, fields) => {
    if(err) console.log(err);

    console.log("Succesfully inserted the check number");
    console.log(insertCheckResult);

    
        res.redirect('/office/proposals/');
    });
});

// AJAX GET REVISION DETAILS
router.post('/ajaxrevisiondetails',(req,res) => {
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

router.post('/revise',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: PROPOSALS');
    console.log('=================================');
    console.log(req.body.PROJECT_idrev);

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

    var queryString7 =`SELECT * FROM tbl_projectproposal projpro
    JOIN tbl_project proj ON projpro.int_projectID = proj.int_projectID
    WHERE projpro.int_projectID = '${req.body.PROJECT_idrev}'`
    
    var queryString8 =`SELECT * FROM tbl_projectcategory projcat
    JOIN tbl_category cat ON projcat.int_categoryID = cat.int_categoryID
    WHERE projcat.int_projectID = '${req.body.PROJECT_idrev}'`

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
                            db.query(queryString7, (err, results7, fields) => {
                                console.log(results7);
                                if (err) console.log(err);
                                db.query(queryString8, (err, results8, fields) => {
                                    console.log(results8);
                                    if (err) console.log(err);
                                    res.render('office/proposals/views/revise', 
                                    {
                                        tbl_category: results,
                                        tbl_beneficiary:results2,
                                        tbl_requirement:results3,
                                        tbl_barangay:results4,
                                        tbl_problemstatement:results5,
                                        tbl_location:results6,
                                        tbl_projectproposal:results7,
                                        tbl_projectcategory:results8
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

module.exports = router;