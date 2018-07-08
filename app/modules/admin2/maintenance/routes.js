var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();

router.get('/projects',(req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 1');
    console.log('=================================');

    var queryString =`SELECT tbl_projectproposal.int_projectID, tbl_projectproposal.varchar_projectName, tbl_projectproposal.varchar_releaseLocation, tbl_projectproposal.text_projectDescription, tbl_projectproposal.int_allotedSlot, tbl_project.date_startDate, tbl_project.date_endDate FROM tbl_projectproposal JOIN tbl_project ON tbl_projectproposal.int_projectID=tbl_project.int_projectID WHERE enum_proposalStatus = 'Accepted' AND enum_projectState = 'Active'`
    
    db.query(queryString, (err, results, fields) => {
        console.log(results);
        if (err) console.log(err);
        // console.log(results);
        res.render('admin/maintenance/views/maintenance1', {tbl_projectproposal: results});
        console.log(results);
    });
});

router.post('/projects',(req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 1 POST');
    console.log('=================================');

    var queryString = `INSERT INTO \`tbl_projectproposal\` (
        
        \`varchar_projectName\`,
        \`varchar_releaseLocation\`,
        \`varchar_projectRationale\`,
        \`varchar_projectObjective\`,
        \`text_projectDescription\`,
        \`text_expectedOutput\`,
        \`int_allotedSlot\`,
        \`decimal_estimatedBudget\`,
        \`decimal_individualBudget\`,
        \`enum_proposalStatus\`)
                
        VALUES(
        "${req.body.projectname}",
        "${req.body.releaselocation}",
        "${req.body.projectrationale}",
        "${req.body.projectobjective}",
        "${req.body.projectdescription}",
        "${req.body.expectedoutput}",
        "${req.body.allotedslot}",
        "${req.body.estimatedbudget}",
        "${req.body.individualbudget}",
        "Accepted");`;

        db.query(queryString, (err, results, fields) => {        
            if (err) throw err;    
            console.log(results);
       
        var queryString1 =`SELECT * FROM tbl_projectproposal ORDER BY int_projectID DESC LIMIT 0,1`

        db.query(queryString1, (err, results1, fields) => {        
            if (err) throw err;
            var results1 = results1;
            console.log(results1);

            var queryString2 = `INSERT INTO \`tbl_project\` (
                \`int_projectID\`,
                \`date_startDate\`,
                \`date_endDate\`,
                \`date_approvedDate\`,
                \`date_releaseDate\`,
                \`decimal_actualBudget\`,
                \`enum_proposalStatus\`)
                
                VALUES(
                "${results1.int_projectID}",
                "${req.body.startdate}",
                "${req.body.enddate}",
                "${req.body.approveddate}",
                "${req.body.releasedate}",
                "${req.body.actualbudget}",
                "Active");`;

                        db.query(queryString2, (err, results2, fields) => {        
                            if (err) throw err;

                            console.log(results2);
                    
                res.redirect('/admin/maintenance/projects');
        });
        });

    });
});

router.get('/projects/:int_projectID/editproject',(req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 1');
    console.log('=================================');
    console.log("PUMASOK SA GET REQ.PARAMS")
    
    var queryString = `SELECT * FROM tbl_projectproposal JOIN tbl_project ON tbl_projectproposal.int_projectID=tbl_project.int_projectID
    WHERE tbl_projectproposal.int_projectID = "${req.params.int_projectID}"`;
    
    db.query(queryString, (err, results, fields) => {        
        if (err) throw err;
        res.render(`admin/maintenance/views/editproject`,{tbl_projectproposal:results});
    });
});


router.post('/projects/:int_projectID/editproject', (req, res) => {
    console.log("PUMASOK SA POST REQ.PARAMS")
    
    var queryString = `UPDATE tbl_projectproposal SET
    varchar_projectName = "${req.body.projectname}",
    varchar_releaseLocation = "${req.body.releaselocation}",
    varchar_projectRationale = "${req.body.projectrationale}",
    varchar_projectObjective = "${req.body.projectobjective}",
    text_projectDescription = "${req.body.projectdescription}",
    text_expectedOutput = "${req.body.expectedoutput}",
    int_allotedSlot = "${req.body.allotedslot}",
    decimal_estimatedBudget = "${req.body.estimatedbudget}",
    decimal_individualBudget = "${req.body.individualbudget}",
    enum_proposalStatus = "Accepted",
    WHERE tbl_projectproposal.int_projectID = "${req.body.int_projectID}"`;
    
    db.query(queryString, (err, results, fields) => {        
        if (err) throw err;
        console.log(results);

        var queryString1 = `UPDATE tbl_project SET
            date_startDate = "${req.body.startdate}",
            date_endDate = "${req.body.enddate}",
            date_approvedDate = "${req.body.approveddate}",
            date_releaseDate = "${req.body.releasedate}",
            decimal_actualBudget = "${req.body.actualbudget}",
            enum_projectState = "Active"
            WHERE tbl_project.int_projectID = "${req.body.int_projectID}"`;
        
            db.query(queryString1, (err, results1, fields) => {        
            if (err) throw err;
            console.log(results1);
            res.redirect('/admin/maintenance/projects');
    });
});
});


router.get('/projects/:int_projectID/viewproject',(req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 1');
    console.log("PUMASOK SA GET REQ.PARAMS")
    console.log('=================================');
    
    var queryString = `SELECT * FROM tbl_projectproposal JOIN tbl_project ON tbl_projectproposal.int_projectID=tbl_project.int_projectID
    WHERE tbl_projectproposal.int_projectID = "${req.params.int_projectID}"`;
    
    db.query(queryString, (err, results, fields) => {        
        if (err) throw err;
        console.log(results);

        res.render(`admin/maintenance/views/viewproject`,{tbl_projectproposal:results});
    });
});

router.get('/projects/:int_projectID/deleteproject', (req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 1 DELETE GET');
    console.log('=================================');

    var queryString =`SELECT tbl_projectproposal.int_projectID, 
    tbl_projectproposal.varchar_projectName, tbl_projectproposal.varchar_releaseLocation, 
    tbl_projectproposal.text_projectDescription, tbl_projectproposal.int_allotedSlot, 
    tbl_project.date_startDate, tbl_project.date_endDate FROM tbl_projectproposal 
    JOIN tbl_project ON tbl_projectproposal.int_projectID=tbl_project.int_projectID 
    WHERE enum_proposalStatus = 'Accepted' AND enum_projectState = 'Active' 
    AND tbl_projectproposal.int_projectID=${req.params.int_projectID}`
    
    db.query(queryString, (err, results, fields) => {
        console.log(results);
        if (err) console.log(err);

        res.render(`admin/maintenance/views/deleteproject`,{tbl_project:results});
    });
});

router.post('/projects/:int_projectID/deleteproject', (req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 1 DELETE POST');
    console.log('=================================');

    var queryString1 = `UPDATE tbl_project SET
            enum_projectState = 'Inactive'
            WHERE tbl_project.int_projectID = ${req.body.int_projectID}`;
        
            db.query(queryString1, (err, results) => {        
            if (err) throw err;
            res.redirect('/admin/maintenance/projects');
});
});

router.get('/requirements',(req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 2');
    console.log('=================================');
    var queryString =`SELECT * FROM tbl_requirement WHERE enum_requirementState = 'Active'`
    
    db.query(queryString, (err, results, fields) => {
        console.log(results);
        if (err) console.log(err);
        // console.log(results);
        res.render('admin/maintenance/views/maintenance2', {tbl_requirement: results});
        console.log(results);
    });
});

router.post('/requirements',(req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 1 POST');
    console.log('=================================');

    var queryString = `INSERT INTO \`tbl_requirement\` (
        
        \`varchar_requirementName\`,
        \`text_requirementDescription\`,
        \`enum_requirementState\`)
                
        VALUES(
        "${req.body.requirementname}",
        "${req.body.requirementdescription}",
        "Active");`;

        db.query(queryString, (err, results, fields) => {        
            if (err) throw err;    
            console.log(results);
       
        var queryString1 =`SELECT * FROM tbl_requirement ORDER BY int_requirementID DESC LIMIT 0,1`

        db.query(queryString1, (err, results1, fields) => {        
            if (err) throw err;
            var results1 = results1;
            console.log(results1);
                    
                res.redirect('/admin/maintenance/requirements');
        });

    });
});


router.get('/requirements/:int_requirementID/editrequirement',(req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 1');
    console.log('=================================');
    console.log("PUMASOK SA GET REQ.PARAMS")
    
    var queryString = `SELECT * FROM tbl_requirement
    WHERE tbl_requirement.int_requirementID = "${req.params.int_requirementID}"`;
    
    db.query(queryString, (err, results, fields) => {        
        if (err) throw err;
        res.render(`admin/maintenance/views/editrequirement`,{tbl_requirement:results});
    });
});


router.post('/requirements/:int_requirementID/editrequirement', (req, res) => {
    console.log("PUMASOK SA POST REQ.PARAMS")
    
    var queryString = `UPDATE tbl_requirement SET
    varchar_requirementName = "${req.body.requirementname}",
    text_requirementDescription = "${req.body.requirementdescription}",
    enum_requirementState = "Active"
    WHERE tbl_requirement.int_requirementID = "${req.body.int_requirementID}"`;
    
    db.query(queryString, (err, results, fields) => {        
        if (err) throw err;
        console.log(results);
        res.redirect('/admin/maintenance/requirements');
});
});

router.get('/requirements/:int_requirementID/deleterequirement', (req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 1 DELETE GET');
    console.log('=================================');

    var queryString =`SELECT * FROM tbl_requirement
    WHERE enum_requirementState = 'Active' 
    AND tbl_requirement.int_requirementID=${req.params.int_requirementID}`
    
    db.query(queryString, (err, results, fields) => {
        console.log(results);
        if (err) console.log(err);

        res.render(`admin/maintenance/views/deleterequirement`,{tbl_requirement:results});
    });
});

router.post('/requirements/:int_requirementID/deleterequirement', (req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 1 DELETE POST');
    console.log('=================================');

    var queryString1 = `UPDATE tbl_requirement SET
            enum_requirementState = 'Inactive'
            WHERE tbl_requirement.int_requirementID = ${req.body.int_requirementID}`;
        
            db.query(queryString1, (err, results) => {        
            if (err) throw err;
            res.redirect('/admin/maintenance/requirements');
});
});


router.get('/projectcategory',(req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 3');
    console.log('=================================');

    var queryString =`SELECT * FROM tbl_projectcategory WHERE enum_projCategState = 'Active'`
    
    db.query(queryString, (err, results, fields) => {
        console.log(results);
        if (err) console.log(err);
        // console.log(results);
        res.render('admin/maintenance/views/maintenance3', {tbl_projectcategory: results});
        console.log(results);
    });
});

router.post('/projectcategory',(req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 1 POST');
    console.log('=================================');

    var queryString = `INSERT INTO \`tbl_projectcategory\` (
        
        \`varchar_projectCategName\`,
        \`text_projectCategDescription\`,
        \`enum_projCategState\`)
                
        VALUES(
        "${req.body.projectcategoryname}",
        "${req.body.projectcategorydescription}",
        "Active");`;

        db.query(queryString, (err, results, fields) => {        
            if (err) throw err;    
            console.log(results);
       
        var queryString1 =`SELECT * FROM tbl_projectcategory ORDER BY int_projectCategID DESC LIMIT 0,1`

        db.query(queryString1, (err, results1, fields) => {        
            if (err) throw err;
            var results1 = results1;
            console.log(results1);
                    
                res.redirect('/admin/maintenance/projectcategory');
        });

    });
});


router.get('/projectcategory/:int_projectCategID/editprojectcategory',(req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 1');
    console.log('=================================');
    console.log("PUMASOK SA GET REQ.PARAMS")
    
    var queryString = `SELECT * FROM tbl_projectcategory
    WHERE tbl_projectcategory.int_projectCategID = "${req.params.int_projectCategID}"`;
    
    db.query(queryString, (err, results, fields) => {        
        if (err) throw err;
        res.render(`admin/maintenance/views/editprojectcategory`,{tbl_projectcategory:results});
    });
});


router.post('/projectcategory/:int_projectCategID/editprojectcategory', (req, res) => {
    console.log("PUMASOK SA POST REQ.PARAMS")
    
    var queryString = `UPDATE tbl_projectcategory SET
    varchar_projectCategName = "${req.body.projectcategoryname}",
    text_projectCategDescription = "${req.body.projectcategorydescription}",
    enum_projectCategState = "Active"
    WHERE tbl_requirement.int_projectCategID = "${req.body.int_projectCategID}"`;
    
    db.query(queryString, (err, results, fields) => {        
        if (err) throw err;
        console.log(results);
        res.redirect('/admin/maintenance/projectcategory');
});
});

router.get('/projectcategory/:int_projectCategID/deleteprojectcategory', (req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 3 DELETE GET');
    console.log('=================================');

    var queryString =`SELECT * FROM tbl_projectcategory
    WHERE enum_projCategState = 'Active' 
    AND tbl_projectcategory.int_projectCategID=${req.params.int_projectCategID}`
    
    db.query(queryString, (err, results, fields) => {
        console.log(results);
        if (err) console.log(err);

        res.render(`admin/maintenance/views/deleteprojectcategory`,{tbl_projectcategory:results});
    });
});

router.post('/projectcategory/:int_projectCategID/deleteprojectcategory', (req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 3 DELETE POST');
    console.log('=================================');

    var queryString1 = `UPDATE tbl_projectcategory SET
            enum_projCategState = 'Inactive'
            WHERE tbl_projectcategory.int_projectCategID = ${req.body.int_projectCategID}`;
        
            db.query(queryString1, (err, results) => {        
            if (err) throw err;
            res.redirect('/admin/maintenance/projectcategory');
});
});


router.get('/problemcategory',(req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 4');
    console.log('=================================');

    var queryString =`SELECT * FROM tbl_problemcategory WHERE enum_probCategState = 'Active'`
    
    db.query(queryString, (err, results, fields) => {
        console.log(results);
        if (err) console.log(err);
        // console.log(results);
        res.render('admin/maintenance/views/maintenance4', {tbl_problemcategory: results});
        console.log(results);
    });
});

router.get('/problemcategory/:int_problemCategID/deleteproblemcategory', (req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 3 DELETE GET');
    console.log('=================================');

    var queryString =`SELECT * FROM tbl_problemcategory
    WHERE enum_probCategState = 'Active' 
    AND tbl_problemcategory.int_problemCategID=${req.params.int_problemCategID}`
    
    db.query(queryString, (err, results, fields) => {
        console.log(results);
        if (err) console.log(err);

        res.render(`admin/maintenance/views/deleteproblemcategory`,{tbl_problemcategory:results});
    });
});

router.post('/problemcategory/:int_problemCategID/deleteproblemcategory', (req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 3 DELETE POST');
    console.log('=================================');

    var queryString1 = `UPDATE tbl_problemcategory SET
            enum_probCategState = 'Inactive'
            WHERE tbl_problemcategory.int_problemCategID = ${req.body.int_problemCategID}`;
        
            db.query(queryString1, (err, results) => {        
            if (err) throw err;
            res.redirect('/admin/maintenance/problemcategory');
});
});



router.post('/problemcategory',(req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 1 POST');
    console.log('=================================');

    var queryString = `INSERT INTO \`tbl_problemcategory\` (
        
        \`varchar_problemCategName\`,
        \`text_problemCategDescription\`,
        \`enum_probCategState\`)
                
        VALUES(
        "${req.body.problemcategoryname}",
        "${req.body.problemcategorydescription}",
        "Active");`;

        db.query(queryString, (err, results, fields) => {        
            if (err) throw err;    
            console.log(results);
       
        var queryString1 =`SELECT * FROM tbl_problemcategory ORDER BY int_problemCategID DESC LIMIT 0,1`

        db.query(queryString1, (err, results1, fields) => {        
            if (err) throw err;
            var results1 = results1;
            console.log(results1);
                    
                res.redirect('/admin/maintenance/problemcategory');
        });

    });
});

router.get('/problemcategory/:int_problemCategID/editproblemcategory',(req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 1');
    console.log('=================================');
    console.log("PUMASOK SA GET REQ.PARAMS")
    
    var queryString = `SELECT * FROM tbl_problemcategory
    WHERE tbl_problemcategory.int_problemCategID = "${req.params.int_problemCategID}"`;
    
    db.query(queryString, (err, results, fields) => {        
        if (err) throw err;
        res.render(`admin/maintenance/views/editproblemcategory`,{tbl_problemcategory:results});
    });
});


router.post('/problemcategory/:int_problemCategID/editproblemcategory', (req, res) => {
    console.log("PUMASOK SA POST REQ.PARAMS")
    
    var queryString = `UPDATE tbl_problemcategory SET
    varchar_problemCategName = "${req.body.problemcategoryname}",
    text_problemCategDescription = "${req.body.problemcategorydescription}",
    enum_problemCategState = "Active"
    WHERE tbl_problemcategory.int_problemCategID = "${req.body.int_problemCategID}"`;
    
    db.query(queryString, (err, results, fields) => {        
        if (err) throw err;
        console.log(results);
        res.redirect('/admin/maintenance/problemcategory');
});
});


router.get('/targetbeneficiary',(req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 5');
    console.log('=================================');
    
    var queryString =`SELECT * FROM tbl_targetbeneficiary WHERE enum_targetState = 'Active'`
    
    db.query(queryString, (err, results, fields) => {
        console.log(results);
        if (err) console.log(err);
        // console.log(results);
        res.render('admin/maintenance/views/maintenance5', {tbl_targetbeneficiary: results});
        console.log(results);
    });
});

router.post('/targetbeneficiary',(req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 1 POST');
    console.log('=================================');

    var queryString = `INSERT INTO \`tbl_targetbeneficiary\` (
        
        \`varchar_beneficiaryName\`,
        \`text_beneficiaryDescription\`,
        \`enum_targetState\`)
                
        VALUES(
        "${req.body.beneficiaryname}",
        "${req.body.beneficiarydescription}",
        "Active");`;

        db.query(queryString, (err, results, fields) => {        
            if (err) throw err;    
            console.log(results);
       
        var queryString1 =`SELECT * FROM tbl_targetbeneficiary ORDER BY int_beneficiaryID DESC LIMIT 0,1`

        db.query(queryString1, (err, results1, fields) => {        
            if (err) throw err;
            var results1 = results1;
            console.log(results1);
                    
                res.redirect('/admin/maintenance/targetbeneficiary');
        });

    });
});

router.get('/targetbeneficiary/:int_beneficiaryID/edittargetbeneficiary',(req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 1');
    console.log('=================================');
    console.log("PUMASOK SA GET REQ.PARAMS")
    
    var queryString = `SELECT * FROM tbl_targetbeneficiary
    WHERE tbl_targetbeneficiary.int_beneficiaryID = "${req.params.int_beneficiaryID}"`;
    
    db.query(queryString, (err, results, fields) => {        
        if (err) throw err;
        console.log(results);
        res.render(`admin/maintenance/views/edittargetbeneficiary`,{tbl_targetbeneficiary:results});
    });
});


router.post('/targetbeneficiary/:int_beneficiaryID/edittargetbeneficiary', (req, res) => {
    console.log("PUMASOK SA POST REQ.PARAMS")
    
    var queryString = `UPDATE tbl_targetbeneficiary SET
    varchar_beneficiaryName = "${req.body.beneficiaryname}",
    text_beneficiaryDescription = "${req.body.beneficiarydescription}",
    enum_beneficiaryState = "Active"
    WHERE tbl_targetbeneficiary.int_beneficiaryID = "${req.body.int_beneficiaryID}"`;
    
    db.query(queryString, (err, results, fields) => {        
        if (err) throw err;
        console.log(results);
        res.redirect('/admin/maintenance/targetbeneficiary');
});
});

router.get('/targetbeneficiary/:int_beneficiaryID/deletetargetbeneficiary', (req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 5 DELETE GET');
    console.log('=================================');

    var queryString =`SELECT * FROM tbl_targetbeneficiary
    WHERE enum_beneficiaryState = 'Active' 
    AND tbl_targetbeneficiary.int_beneficiaryID=${req.params.int_beneficiaryID}`
    
    db.query(queryString, (err, results, fields) => {
        console.log(results);
        if (err) console.log(err);

        res.render(`admin/maintenance/views/deletetargetbeneficiary`,{tbl_targetbeneficiary:results});
    });
});

router.post('/targetbeneficiary/:int_beneficiaryID/deletetargetbeneficiary', (req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 5 DELETE POST');
    console.log('=================================');

    var queryString1 = `UPDATE tbl_targetbeneficiary SET
            enum_beneficiaryState = 'Inactive'
            WHERE tbl_targetbeneficiary.int_beneficiaryID = ${req.body.int_beneficiaryID}`;
        
            db.query(queryString1, (err, results) => {        
            if (err) throw err;
            res.redirect('/admin/maintenance/targetbeneficiary');
});
});

router.get('/awards',(req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 7');
    console.log('=================================');
    
    var queryString =`SELECT * FROM tbl_award WHERE enum_awardState = 'Active'`
    
    db.query(queryString, (err, results, fields) => {
        console.log(results);
        if (err) console.log(err);
        // console.log(results);
        res.render('admin/maintenance/views/maintenance6', {tbl_award: results});
        console.log(results);
    });
});

router.post('/awards',(req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 1 POST');
    console.log('=================================');

    var queryString = `INSERT INTO \`tbl_award\` (
        
        \`varchar_awardName\`,
        \`text_awardDescription\`,
        \`enum_awardState\`)
                
        VALUES(
        "${req.body.awardname}",
        "${req.body.awarddescription}",
        "Active");`;

        db.query(queryString, (err, results, fields) => {        
            if (err) throw err;    
            console.log(results);
       
        var queryString1 =`SELECT * FROM tbl_award ORDER BY int_awardID DESC LIMIT 0,1`

        db.query(queryString1, (err, results1, fields) => {        
            if (err) throw err;
            var results1 = results1;
            console.log(results1);
                    
                res.redirect('/admin/maintenance/awards');
        });

    });
});

router.get('/awards/:int_awardID/editaward',(req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 1');
    console.log('=================================');
    console.log("PUMASOK SA GET REQ.PARAMS")
    
    var queryString = `SELECT * FROM tbl_award
    WHERE tbl_award.int_awardID = "${req.params.int_awardID}"`;
    
    db.query(queryString, (err, results, fields) => {        
        if (err) throw err;
        res.render(`admin/maintenance/views/editaward`,{tbl_award:results});
    });
});


router.post('/awards/:int_awardID/editaward', (req, res) => {
    console.log("PUMASOK SA POST REQ.PARAMS")
    
    var queryString = `UPDATE tbl_award SET
    varchar_awardName = "${req.body.awardname}",
    text_awardDescription = "${req.body.awarddescription}",
    enum_awardState = "Active"
    WHERE tbl_award.int_awardID = "${req.body.int_awardID}"`;
    
    db.query(queryString, (err, results, fields) => {        
        if (err) throw err;
        console.log(results);
        res.redirect('/admin/maintenance/awards');
});
});

router.get('/awards/:int_awardID/deleteaward', (req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 6 DELETE GET');
    console.log('=================================');

    var queryString =`SELECT * FROM tbl_award
    WHERE enum_awardState = 'Active' 
    AND tbl_award.int_awardID=${req.params.int_awardID}`
    
    db.query(queryString, (err, results, fields) => {
        console.log(results);
        if (err) console.log(err);

        res.render(`admin/maintenance/views/deleteaward`,{tbl_award:results});
    });
});

router.post('/awards/:int_awardID/deleteaward', (req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 6 DELETE POST');
    console.log('=================================');

    var queryString1 = `UPDATE tbl_award SET
            enum_awardState = 'Inactive'
            WHERE tbl_award.int_awardID = ${req.body.int_awardID}`;
        
            db.query(queryString1, (err, results) => {        
            if (err) throw err;
            res.redirect('/admin/maintenance/awards');
});
});

module.exports = router;