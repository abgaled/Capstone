var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();

//============================================================
// MAINTENANCE REQUIREMENTS
//============================================================

router.get('/requirements',(req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 5');
    console.log('=================================');
    var queryString =`SELECT * FROM tbl_requirement`
    
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
    console.log('ADMIN: MAINTENANCE - 5 POST');
    console.log('=================================');

    var queryString = `INSERT INTO \`tbl_requirement\` (
        
        \`varchar_requirementName\`,
        \`enum_requirementStatus\`)
                
        VALUES(
        "${req.body.requirementname}",
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
    console.log('ADMIN: MAINTENANCE - 5');
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
    enum_requirementStatus = "Active"
    WHERE tbl_requirement.int_requirementID = "${req.body.int_requirementID}"`;
    
    db.query(queryString, (err, results, fields) => {        
        if (err) throw err;
        console.log(results);
        res.redirect('/admin/maintenance/requirements');
});
});

router.post('/requirements/activate', (req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 5 Status Active POST');
    console.log('=================================');

    db.query("UPDATE tbl_requirement SET enum_requirementStatus = 'Active' WHERE int_requirementID = ?",[req.body.id], (err, results, fields) =>{
        if(err)
            console.log(err);
        else{
            return res.redirect('/admin/maintenance/requirements')
        }
    });

});

router.post('/requirements/inactive', (req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 5 Status Inactive POST');
    console.log('=================================');

    db.query("UPDATE tbl_requirement SET enum_requirementStatus = 'Inactive' WHERE int_requirementID = ?",[req.body.id], (err, results, fields) =>{
        if(err)
            console.log(err);
        else{
            return res.redirect('/admin/maintenance/requirements')
        }
    });

});

//============================================================
// MAINTENANCE PROJECT CATEGORY
//============================================================

router.get('/projectcategory',(req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 2');
    console.log('=================================');

    var queryString =`SELECT * FROM tbl_category`
    
    db.query(queryString, (err, results, fields) => {
        console.log(results);
        if (err) console.log(err);
        // console.log(results);
        res.render('admin/maintenance/views/maintenance3', {tbl_category: results});
        console.log(results);
    });
});

router.post('/projectcategory',(req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 2 POST');
    console.log('=================================');

    var queryString = `INSERT INTO \`tbl_category\` (
        
        \`varchar_categoryName\`,
        \`enum_categoryStatus\`)
                
        VALUES(
        "${req.body.projectcategoryname}",
        "Active");`;

        db.query(queryString, (err, results, fields) => {        
            if (err) throw err;    
            console.log(results);
       
        var queryString1 =`SELECT * FROM tbl_category ORDER BY int_categoryID DESC LIMIT 0,1`

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
    console.log('ADMIN: MAINTENANCE - 2');
    console.log('=================================');
    console.log("PUMASOK SA GET REQ.PARAMS")
    
    var queryString = `SELECT * FROM tbl_category
    WHERE tbl_category.int_categoryID = "${req.params.int_projectCategID}"`;
    
    db.query(queryString, (err, results, fields) => {        
        if (err) throw err;
        res.render(`admin/maintenance/views/editprojectcategory`,{tbl_projectcategory:results});
    });
});

router.post('/projectcategory/:int_projectCategID/editprojectcategory', (req, res) => {
    console.log("PUMASOK SA POST REQ.PARAMS")
    
    var queryString = `UPDATE tbl_category SET
    varchar_categoryName = "${req.body.projectcategoryname}",
    text_categoryDescription = "${req.body.projectcategorydescription}",
    enum_categoryStatus = "Active"
    WHERE tbl_category.int_categoryID = "${req.body.int_categoryID}"`
    db.query(queryString, (err, results, fields) => {        
        if (err) throw err;
        console.log(results);
        res.redirect('/admin/maintenance/projectcategory');
});
});

router.post('/projectcategory/activate', (req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 2 Status Active POST');
    console.log('=================================');

    db.query("UPDATE tbl_category SET enum_categoryStatus = 'Active' WHERE int_categoryID = ?",[req.body.id], (err, results, fields) =>{
        if(err)
            console.log(err);
        else{
            return res.redirect('/admin/maintenance/projectcategory')
        }
    });

});

router.post('/projectcategory/inactive', (req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 2 Status Inactive POST');
    console.log('=================================');

    db.query("UPDATE tbl_category SET enum_categoryStatus = 'Inactive' WHERE int_categoryID = ?",[req.body.id], (err, results, fields) =>{
        if(err)
            console.log(err);
        else{
            return res.redirect('/admin/maintenance/projectcategory')
        }
    });

});

//============================================================
// MAINTENANCE TARGET BENEFICIARY
//============================================================

router.get('/targetbeneficiary',(req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 4');
    console.log('=================================');
    
    var queryString =`SELECT * FROM tbl_beneficiary`
    
    db.query(queryString, (err, results, fields) => {
        console.log(results);
        if (err) console.log(err);
        // console.log(results);
        res.render('admin/maintenance/views/maintenance5', {tbl_beneficiary: results});
        console.log(results);
    });
});

router.post('/targetbeneficiary',(req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 4 POST');
    console.log('=================================');

    var queryString = `INSERT INTO \`tbl_beneficiary\` (
        
        \`varchar_beneficiaryName\`,
        \`text_beneficiaryDescription\`,
        \`enum_beneficiaryStatus\`)
                
        VALUES(
        "${req.body.beneficiaryname}",
        "${req.body.beneficiarydescription}",
        "Active");`;

        db.query(queryString, (err, results, fields) => {        
            if (err) throw err;    
            console.log(results);
       
        var queryString1 =`SELECT * FROM tbl_beneficiary ORDER BY int_beneficiaryID DESC LIMIT 0,1`

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
    console.log('ADMIN: MAINTENANCE - 4');
    console.log('=================================');
    console.log("PUMASOK SA GET REQ.PARAMS")
    
    var queryString = `SELECT * FROM tbl_beneficiary
    WHERE tbl_beneficiary.int_beneficiaryID = "${req.params.int_beneficiaryID}"`;
    
    db.query(queryString, (err, results, fields) => {        
        if (err) throw err;
        console.log(results);
        res.render(`admin/maintenance/views/edittargetbeneficiary`,{tbl_beneficiary:results});
    });
});

router.post('/targetbeneficiary/:int_beneficiaryID/edittargetbeneficiary', (req, res) => {
    console.log("PUMASOK SA POST REQ.PARAMS")
    
    var queryString = `UPDATE tbl_beneficiary SET
    varchar_beneficiaryName = "${req.body.beneficiaryname}",
    text_beneficiaryDescription = "${req.body.beneficiarydescription}",
    enum_beneficiaryStatus = "Active"
    WHERE tbl_beneficiary.int_beneficiaryID = "${req.body.int_beneficiaryID}"`;
    
    db.query(queryString, (err, results, fields) => {        
        if (err) throw err;
        console.log(results);
        res.redirect('/admin/maintenance/targetbeneficiary');
});
});

router.post('/targetbeneficiary/activate', (req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 4 Status Active POST');
    console.log('=================================');

    db.query("UPDATE tbl_beneficiary SET enum_beneficiaryStatus = 'Active' WHERE int_beneficiaryID = ?",[req.body.id], (err, results, fields) =>{
        if(err)
            console.log(err);
        else{
            return res.redirect('/admin/maintenance/targetbeneficiary')
        }
    });

});

router.post('/targetbeneficiary/inactive', (req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 4 Status Inactive POST');
    console.log('=================================');

    db.query("UPDATE tbl_beneficiary SET enum_beneficiaryStatus = 'Inactive' WHERE int_beneficiaryID = ?",[req.body.id], (err, results, fields) =>{
        if(err)
            console.log(err);
        else{
            return res.redirect('/admin/maintenance/targetbeneficiary')
        }
    });

});

//============================================================
// MAINTENANCE BARANGAY
//============================================================

router.get('/barangay',(req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 1');
    console.log('=================================');
    
    var queryString =`SELECT * FROM tbl_barangay`
    
    db.query(queryString, (err, results, fields) => {
        console.log(results);
        if (err) console.log(err);
        // console.log(results);
        res.render('admin/maintenance/views/maintenance', {tbl_barangay: results});
        console.log(results);
    });
});

router.post('/barangay',(req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 1 POST');
    console.log('=================================');

    var queryString = `INSERT INTO \`tbl_barangay\` (
        
        \`int_cityID\`,
        \`varchar_barangayName\`,
        \`varchar_barangayContact\`,
        \`enum_barangayStatus\`)
                
        VALUES(
        "1",
        "${req.body.barangayname}",
        "${req.body.barangaycontact}",
        "Active");`;

        db.query(queryString, (err, results, fields) => {        
            if (err) throw err;    
            console.log(results);
       
        var queryString1 =`SELECT * FROM tbl_barangay ORDER BY int_barangayID DESC LIMIT 0,1`

        db.query(queryString1, (err, results1, fields) => {        
            if (err) throw err;
            var results1 = results1;
            console.log(results1);
                    
                res.redirect('/admin/maintenance/barangay');
        });

    });
});

router.get('/barangay/:int_barangayID/editbarangay',(req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 1');
    console.log('=================================');
    console.log("PUMASOK SA GET REQ.PARAMS")
    
    var queryString = `SELECT * FROM tbl_barangay
    WHERE tbl_barangay.int_barangayID = "${req.params.int_barangayID}"`;
    
    db.query(queryString, (err, results, fields) => {        
        if (err) throw err;
        console.log(results);
        res.render(`admin/maintenance/views/editbarangay`,{tbl_barangay:results});
    });
});

router.post('/barangay/:int_barangayID/editbarangay', (req, res) => {
    console.log("PUMASOK SA POST REQ.PARAMS")
    
    var queryString = `UPDATE tbl_barangay SET
    varchar_barangayName = "${req.body.barangayname}",
    varchar_barangayContact = "${req.body.barangaycontact}",
    enum_barangayStatus = "Active"
    WHERE tbl_barangay.int_barangayID = "${req.body.int_barangayID}"`;
    
    db.query(queryString, (err, results, fields) => {        
        if (err) throw err;
        console.log(results);
        res.redirect('/admin/maintenance/barangay');
});
});

router.post('/barangay/activate', (req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 1 Status Active POST');
    console.log('=================================');

    db.query("UPDATE tbl_barangay SET enum_barangayStatus = 'Active' WHERE int_barangayID = ?",[req.body.id], (err, results, fields) =>{
        if(err)
            console.log(err);
        else{
            return res.redirect('/admin/maintenance/barangay')
        }
    });

});

router.post('/barangay/inactive', (req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 6 Status Inactive POST');
    console.log('=================================');

    db.query("UPDATE tbl_barangay SET enum_barangayStatus = 'Inactive' WHERE int_barangayID = ?",[req.body.id], (err, results, fields) =>{
        if(err)
            console.log(err);
        else{
            return res.redirect('/admin/maintenance/barangay')
        }
    });

});

module.exports = router;