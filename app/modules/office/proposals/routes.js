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
    
    var queryString =`SELECT * FROM tbl_projectcategory WHERE enum_projCategState = 'Active'`
    
    db.query(queryString, (err, results, fields) => {
        console.log(results);
        if (err) console.log(err);
        // console.log(results);
        res.render('office/proposals/views/submittedproposals', {tbl_projectcategory: results});

});
});

module.exports = router;