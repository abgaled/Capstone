var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();

router.get('/',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: releasing');
    console.log('=================================');
    var queryString =`SELECT * FROM tbl_project pr
    JOIN tbl_projectproposal prpro ON pr.int_projectID=prpro.int_projectID
    WHERE pr.enum_projectStatus = 'Releasing' 
    ORDER BY pr.int_projectID DESC`
    db.query(queryString, (err, results, fields) => {
        console.log(results);
        if (err) console.log(err);

    res.render('office/releasing/views/releasing',{tbl_project:results});

});
});

router.get('/:int_projectID/viewben',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: releasing PROJECT');
    console.log('=================================');
    var queryString =`SELECT * FROM tbl_application app
    JOIN tbl_project proj ON app.int_projectID = proj.int_projectID
    JOIN tbl_personalinformation pi ON app.int_applicationID = pi.int_applicationID
    JOIN tbl_projectproposal propr ON propr.int_projectID = proj.int_projectID
    WHERE app.int_projectID = "${req.params.int_projectID}"`
    
    db.query(queryString, (err, results, fields) => {
        console.log(results);
        if (err) console.log(err);
        // console.log(results);
     res.render('office/releasing/views/beneficiary', {tbl_application:results});


});
});

router.get('/:int_projectID/viewproj',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: releasing PROJECT');
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
     res.render('office/releasing/views/viewproj', {tbl_projectproposal:results, tbl_projectrequirement:results2, tbl_projectbeneficiary:results3, tbl_releaselocation:results4,tbl_projectcategory:results5});

    });});});});
});
});


router.post('/:int_projectID/viewben/ajaxgetdetailsapplication',(req,res) => {
    console.log('=================================');
    console.log('OFFICE: RELEASING--AJAX GET DETAILS (POST)');
    console.log('=================================');
    console.log(`${req.body.ajApplicationID}`);

    // var queryString = `SELECT * FROM tbl_personalinformation pi
    // JOIN tbl_address ad ON pi.int_addressID = ad.int_addressID
    // JOIN tbl_application ap ON ap.int_applicationID = pi.int_applicationID
    // WHERE pi.int_applicationID = ${req.bodyaj.ApplicationID}`
    var queryString= `SELECT * FROM tbl_application app
    JOIN tbl_project proj ON app.int_projectID = proj.int_projectID
    JOIN tbl_personalinformation pi ON app.int_applicationID = pi.int_applicationID
    JOIN tbl_projectproposal propr ON propr.int_projectID = proj.int_projectID
    WHERE app.int_projectID = "${req.params.int_projectID}"`


    db.query(queryString,(err, applicantdetail, fields) => {
        if (err) console.log(err);

        // var date_results = results;

        // for (var i = 0; i < date_results.length;i++){
        //     date_results[i].date_createdDate = moment(date_results[i].date_createdDate).format('MM-DD-YYYY');
        // }

        var applicantdetails = applicantdetail[0];

        console.log("===================RESULTSS")
        console.log(applicantdetails)

        return res.send({applicantdetails:applicantdetails});
    });
});
module.exports = router;