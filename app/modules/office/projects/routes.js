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
     res.render('office/projects/views/ongoingproject',{tbl_project:results});


});
});
router.get('/ongoingproject/:int_projectID/viewproj',(req, res) => {
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
     res.render('office/projects/views/ongoingproject', {tbl_project:results});


});
});

router.get('/finishedproject',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: FINISHED PROJECT');
    console.log('=================================');
    var queryString =`SELECT * FROM tbl_project pr
    JOIN tbl_projectproposal prpro ON pr.int_projectID=prpro.int_projectID
    JOIN tbl_projectcategory prcat ON prpro.int_categoryID=prcat.int_categoryID
    JOIN tbl_proposalapproval prapp ON pr.int_projectID=prapp.int_projectID
    WHERE pr.enum_projectStatus = 'Closed' 
    AND prapp.enum_propapprovalStatus = 'Received'
    ORDER BY pr.int_projectID DESC`
    
    db.query(queryString, (err, results, fields) => {        
        if (err) throw err;
        console.log('OFFICE: PROB - viewproj');
        res.render('office/projects/views/finishedproject',{tbl_project:results});
    });

});
router.get('/finishedproject/:int_projectID/viewproj',(req, res) => {
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
     res.render('office/projects/views/finishedproject', {tbl_project:results});


});
});


module.exports = router;
