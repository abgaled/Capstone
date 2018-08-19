var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();


router.get('/',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: PROPOSALS');
    console.log('=================================');
    
    var queryString =`SELECT * FROM tbl_projectcategory WHERE enum_projCategState = 'Active'`
    
    db.query(queryString, (err, results, fields) => {
        console.log(results);
        if (err) console.log(err);
        // console.log(results);
        res.render('office/proposals/views/proposals', {tbl_projectcategory: results});

});
});

router.post('/',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: PROPOSALS');
    console.log('=================================');
    
    var queryString = `INSERT INTO \`tbl_projectproposal\` (
        
        \`varchar_projectName\`,
        \`int_projectCategID\`,
        \`varchar_releaseLocation\`,
        \`varchar_projectRationale\`,
        \`text_projectDescription\`,
        \`text_expectedOutput\`,
        \`int_allotedSlot\`,
        \`decimal_estimatedBudget\`,
        \`decimal_individualBudget\`,
        \`enum_proposalStatus\`)
                
        VALUES(
        "${req.body.projectname}",
        "${req.body.projectcategory}",
        "${req.body.releaselocation}",
        "${req.body.projectrationale}",
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

            var toproject = results1[0];

            var queryString2 = `INSERT INTO \`tbl_project\` (
                \`int_projectID\`,
                \`date_startDate\`,
                \`date_endDate\`,
                \`date_releaseDate\`,
                \`enum_projectState\`)
                
                VALUES(
                "${project.int_projectID}",
                "${req.body.startdate}",
                "${req.body.enddate}",
                "${req.body.releasedate}",
                "Active");`;

                        db.query(queryString2, (err, results2, fields) => {        
                            if (err) throw err;

                            console.log(results2);
                    
                res.redirect('/admin/maintenance/projects');
        });
        });

    });
});

router.get('/submittedproposals',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: PROPOSALS');
    console.log('=================================');
 

    var queryString =`SELECT * FROM tbl_projectproposal pp
    JOIN tbl_projectcategory pc
    ON pp.int_projectID = pc.int_projectID
    JOIN tbl_category cat
    ON pc.int_categoryID = cat.int_categoryID
    WHERE pp.enum_proposalStatus = "Pending"`


    db.query(queryString, (err, results, fields) => {
        console.log(results);
        if (err) console.log(err);
        
        res.render('office/proposals/views/submittedproposals', {
            tbl_projectproposal: results});
    });
});

router.get('/submittedproposals/:int_projectID/proposaldetails',(req, res) => {
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

module.exports = router;