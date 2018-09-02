var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();
var moment = require('moment');

//- SCRIPT FOR CURRENT DATE
var n =  new Date();
var y = n.getFullYear();
var m = n.getMonth() + 1;
var d = n.getDate();
var hr = n.getHours();
var min = n.getMinutes();
var sec = n.getSeconds();
var now = y +"-"+ m +"-"+ d; 

var currentDate = y + "-" + m + "-" + d;

router.get('/',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: Releasing');
    console.log('=================================');
    
    console.log(now);
    
    var queryStringSelectUpdate = `SELECT * FROM tbl_project
    WHERE enum_projectStatus = 'Closed'`;

    // db.query(queryStringSelectUpdate, (err, resultsproj, fields) => {
    //     console.log(resultsproj);
    //     if (err) console.log(err);
    
    //         var proj = resultsproj;

    //         for (var i = 0; i < proj.length;i++){
                
    //             proj[i].date_releaseDate=moment(proj[i].date_releaseDate).format('YYYY MM DD');
    //             console.log(proj[i].date_releaseDate);
    //             if (proj[i].date_releaseDate = now)
    //                 {
    //                     var queryStringUpdateUpdate = `UPDATE tbl_project SET
    //                     enum_projectStatus = "Releasing"
    //                     WHERE tbl_project.int_projectID = "${proj[i].int_projectID}"`;

    //                     db.query(queryStringUpdateUpdate, (err, resultsUPDATE, fields) => {
    //                         console.log(resultsUPDATE);
    //                         if (err) console.log(err);
    //                     });
    //                 }
    //         }
    
    //     });

    var queryString =`SELECT * FROM tbl_project pr
    JOIN tbl_projectproposal prpro 
    ON pr.int_projectID=prpro.int_projectID
    WHERE pr.enum_projectStatus = 'Releasing'
    ORDER BY pr.date_releaseDate DESC`
    

    db.query(queryString, (err, results, fields) => {
        console.log(results);
        if (err) console.log(err);

        var date_results = results;

        for (var i = 0; i < date_results.length;i++){
            date_results[i].datetime_releaseDate = moment(date_results[i].datetime_releaseDate).format('MM-DD-YYYY');
            console.log(date_results[i].datetime_releaseDate);
        }

        res.render('office/releasing/views/releasing',{tbl_project:results});
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

    var queryString5 =`SELECT * FROM tbl_projectcategory pc
    JOIN tbl_projectproposal pr 
    ON pr.int_projectID=pc.int_projectID
    JOIN tbl_category cat 
    ON cat.int_categoryID=pc.int_categoryID
    WHERE pr.int_projectID = "${req.params.int_projectID}"`
    
    var queryString7 =`SELECT * FROM tbl_problemstatement ps
    WHERE ps.int_projectID = "${req.params.int_projectID}"`
    

    db.query(queryString, (err, results, fields) => {
        console.log(results);

        var date_results = results;

        for (var i = 0; i < date_results.length;i++){
            date_results[i].date_createdDate = moment(date_results[i].date_createdDate).format('MM-DD-YYYY');
            date_results[i].datetime_releasingEnd = moment(date_results[i].datetime_releasingEnd).format('MM-DD-YYYY');
        }


        if (err) console.log(err);
        db.query(queryString2, (err, results2, fields) => {
            console.log(results2);
            if (err) console.log(err);
            db.query(queryString3, (err, results3, fields) => {
                console.log(results3);
                if (err) console.log(err);
                    db.query(queryString5, (err, results5, fields) => {
                        console.log(results5);
                        if (err) console.log(err);

                        var queryString6 =`SELECT * FROM tbl_application ap
                        JOIN tbl_personalinformation pi 
                        ON ap.int_applicationID = pi.int_applicationID
                        WHERE ap.int_projectID = "${req.params.int_projectID}"`
                        
                        db.query(queryString6, (err, results6, fields) => {
                            console.log(results6);
                            db.query(queryString7, (err, results7, fields) => {
                                console.log(results7);

                            res.render('office/releasing/views/viewproj', {
                                tbl_projectproposal:results, 
                                tbl_projectrequirement:results2, 
                                tbl_projectbeneficiary:results3, 
                                tbl_projectcategory:results5,
                                applications:results6,
                                tbl_problemstatement:results7});
                            });
                        });
                    
                });
            });
        });
    });
});

router.get('/:int_projectID/finproj', (req, res) => {
    console.log('=================================');
    console.log('OFFICE: releasing finproj get');
    console.log('=================================');
    
    var queryString =`SELECT * FROM tbl_project
    WHERE enum_projectStatus = 'Releasing' 
    AND tbl_project.int_projectID=${req.params.int_projectID}`
    resultIndex = `${req.params.int_projectID}`;

    console.log(resultIndex);
    console.log('${req.params.int_projectID}');
    db.query(queryString, (err, results, fields) => {
        console.log(results);
        if (err) console.log(err);
    
        res.render(`office/releasing/views/finproj`,{tbl_project:results});
    });
});

router.post('/:int_projectID/finproj', (req, res) => {
    console.log('=================================');
    console.log('OFFICE: releasing finproj POST');
    console.log('=================================');
    resultIndex = `${req.body.int_projectID}`;

    console.log(resultIndex);
    var queryString1 = `UPDATE tbl_project SET
    enum_projectStatus = 'ClosedRel'
    WHERE tbl_project.int_projectID = ${req.body.int_projectID}`
            
    db.query(queryString1, (err, results) => {        
        if (err) throw err;
        res.redirect('/office/releasing');
    });
});

router.get('/:int_projectID/viewben',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: RELEASING PROJECT - VIEW BENEFICIARIES');
    console.log('=================================');

    var queryString1 =`SELECT * FROM tbl_application app
    JOIN tbl_project proj ON app.int_projectID = proj.int_projectID
    JOIN tbl_personalinformation pi ON app.int_applicationID = pi.int_applicationID
    JOIN tbl_projectproposal propr ON propr.int_projectID = proj.int_projectID
    WHERE app.int_projectID = "${req.params.int_projectID}"
    AND app.enum_applicationStatus = 'Approved' 
    OR app.enum_applicationStatus = 'Received'` 
    
    db.query(queryString1, (err, results1, fields) => {
        console.log(results1);
        if (err) console.log(err);

        req.session.office.sesReleasingProjectID = req.params.int_projectID

        console.log("=====SESSION SESRELEASINGPROJECTID=====");
        console.log(req.session.office.sesReleasingProjectID);

        var queryString2 =`SELECT * FROM tbl_project proj
        JOIN tbl_projectproposal propr ON propr.int_projectID = proj.int_projectID
        WHERE proj.int_projectID = "${req.params.int_projectID}"`

        db.query(queryString2, (err, results2, fields) => {
            console.log(results2);
            if (err) console.log(err);
        
            res.render('office/releasing/views/beneficiary', {
                tbl_application:results1,
                tbl_project:results2});
        });
    });
});

router.get('/viewben/:int_applicationID/receiveben', (req, res) => {
    console.log('=================================');
    console.log('OFFICE: project - 1 acceptapplication GET');
    console.log('=================================');
    
    var queryString =`SELECT * FROM tbl_application
    WHERE enum_applicationStatus = 'Approved' 
    AND tbl_application.int_applicationID=${req.params.int_applicationID}`
        
    db.query(queryString, (err, results, fields) => {
        console.log(results);
        if (err) console.log(err);
    
        res.render(`office/releasing/views/receiveben`,{tbl_application:results});
    });
});

router.post('/viewben/:int_applicationID/receiveben', (req, res) => {
    console.log('=================================');
    console.log('OFFICE: releasing - 1 releasedben POST');
    console.log('=================================');
    
    var queryString = `UPDATE tbl_application SET
    enum_applicationStatus = 'Received',
    datetime_receivedDate = "${now}"
    WHERE tbl_application.int_applicationID=${req.body.int_applicationID}`
            
    db.query(queryString, (err, results) => {        
        if (err) throw err;

        var queryString1 =`SELECT * FROM tbl_projectproposal pr
        JOIN tbl_project proj ON pr.int_projectID = proj.int_projectID
        WHERE pr.int_projectID = "${req.params.int_projectID}"`

    db.query(queryString1, (err, results1, fields) => {
        if (err) console.log(err);
  
    
        res.redirect(`/office/releasing/${req.session.office.sesReleasingProjectID}/viewben`);
        });
    });
});

// AJAX GET DETAILS RELEASING PROJECT - VIEW APPLICANT DETAILS
router.post('/:int_projectID/viewben/ajaxapplicantdetails',(req,res) => {
    console.log('=================================');
    console.log('OFFICE: RELEASING-VIEW APPLICATION-AJAX GET DETAILS (POST)');
    console.log('=================================');
    console.log(`${req.body.ajApplicationID}`);

    var queryString = `SELECT * FROM tbl_personalinformation pi
    JOIN tbl_application ap 
    ON pi.int_applicationID=ap.int_applicationID 
    WHERE pi.int_applicationID=${req.body.ajApplicationID}
    AND ap.enum_applicationStatus = "Approved"`


    db.query(queryString,(err, results, fields) => {
        if (err) console.log(err);

        console.log(results);

        var date_results = results;

        for (var i = 0; i < date_results.length;i++){
            date_results[i].date_birthDate = moment(date_results[i].date_birthDate).format('MM-DD-YYYY');
        }

        var resultss = results[0];

        console.log("===================RESULTSS")
        console.log(resultss)

        return res.send({tbl_application:resultss});
    });
});


module.exports = router;