var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();

router.get('/newproject',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: newprojects');
    console.log('=================================');

    var queryString =`SELECT * FROM tbl_project pr
    JOIN tbl_projectproposal prpro ON pr.int_projectID=prpro.int_projectID
    JOIN tbl_projectcategory prcat ON prpro.int_categoryID=prcat.int_categoryID
    JOIN tbl_proposalapproval prapp ON pr.int_projectID=prapp.int_projectID
    WHERE pr.enum_projectStatus = 'Open' 
    AND prapp.enum_propapprovalStatus = 'Received'
    ORDER BY pr.int_projectID DESC`
    
    db.query(queryString, (err, results, fields) => {
        console.log(results);
        if (err) console.log(err);
        // console.log(results);
        res.render('office/projects/views/newproject', {tbl_project: results});

});
});


router.get('/newproject/:int_projectID/viewproj',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: ONGOING PROJECT');
    console.log('=================================');
    var queryString =`SELECT * FROM tbl_project pr
    JOIN tbl_projectproposal prpro ON pr.int_projectID=prpro.int_projectID
    JOIN tbl_projectcategory prcat ON prpro.int_categoryID=prcat.int_categoryID
    WHERE pr.int_projectID = "${req.params.int_projectID}"`
    
    db.query(queryString, (err, results, fields) => {
        console.log(results);
        if (err) console.log(err);
        // console.log(results);
     res.render('office/projects/views/viewproj', {tbl_project:results});


});
});
router.get('/ongoingproject',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: ONGOING PROJECT');
    console.log('=================================');

    var queryString =`SELECT * FROM tbl_project pr
    JOIN tbl_projectproposal prpro 
    ON pr.int_projectID=prpro.int_projectID
    JOIN tbl_projectcategory projcat
    ON pr.int_projectID = projcat.int_categoryID
    JOIN tbl_category cat
    ON cat.int_categoryID = projcat.int_categoryID
    WHERE pr.enum_projectStatus = 'Ongoing' 
    ORDER BY pr.int_projectID DESC`
    
    db.query(queryString, (err, results, fields) => {
        console.log(results);
        if (err) console.log(err);
        
        res.render('office/projects/views/ongoingproject',{tbl_project:results});

});
});

router.get('/ongoingproject/:int_projectID/viewproj',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: ONGOING PROJECT - VIEW DETAILS');
    console.log('=================================');

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
    JOIN tbl_projectproposal pr 
    ON pr.int_projectID=pc.int_projectID
    JOIN tbl_category cat 
    ON cat.int_categoryID=pc.int_categoryID
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

                            res.render('office/projects/views/viewproj', {
                                tbl_projectproposal:results, 
                                tbl_projectrequirement:results2, 
                                tbl_projectbeneficiary:results3, 
                                tbl_releaselocation:results4,
                                tbl_projectcategory:results5});

    });
});
});
});
});
});

router.get('/ongoingproject/:int_projectID/viewapp',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: ONGOING PROJECT - VIEW APPLICATIONS');
    console.log('=================================');

    var queryString1 =`SELECT * FROM tbl_projectproposal pr
    JOIN tbl_project proj ON pr.int_projectID = proj.int_projectID
    WHERE pr.int_projectID = "${req.params.int_projectID}"`

    db.query(queryString1, (err, results1, fields) => {
        console.log("=========RESULTS1==========")
        console.log(results1);

        var queryString2 =`SELECT * FROM tbl_application ap
        JOIN tbl_personalinformation pi 
        ON ap.int_applicationID = pi.int_applicationID
        WHERE ap.int_projectID = "${req.params.int_projectID}"`

        db.query(queryString2, (err, results2, fields) => {
    
    
            res.render('office/projects/views/viewapplication',{
                    tbl_project:results1,
                    tbl_application:results2
                });
        });
    });
});

router.get('/finishedproject',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: FINISHED PROJECT');
    console.log('=================================');
    var queryString =`SELECT * FROM tbl_project pr
    JOIN tbl_projectproposal prpro ON pr.int_projectID=prpro.int_projectID
    WHERE pr.enum_projectStatus = 'Finished' 
    ORDER BY pr.int_projectID DESC`

    var queryString2 =`SELECT * FROM tbl_projectcategory pr
    JOIN tbl_projectproposal prcat ON pr.int_projectID=prcat.int_projectID
    JOIN tbl_category cat ON pr.int_categoryID=cat.int_categoryID
    WHERE pr.int_projectID = "${req.params.int_projectID}"
    ORDER BY pr.int_projectID DESC `
    
    db.query(queryString, (err, results, fields) => {
        console.log(results);
        if (err) console.log(err);
        // console.log(results);
        db.query(queryString2, (err, results2, fields) => {
            console.log(results2);
            if (err) console.log(err);
            // console.log(results);
        res.render('office/projects/views/finishedproject',{tbl_project:results});
    });
    });

});
router.get('/finishedproject/:int_projectID/viewfinished',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: ONGOING PROJECT');
    console.log('=================================');
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
        // console.log(results);
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
     res.render('office/projects/views/viewfinished', {tbl_projectproposal:results, tbl_projectrequirement:results2, tbl_projectbeneficiary:results3, tbl_releaselocation:results4,tbl_projectcategory:results5});

    });});});});
});
});


module.exports = router;
