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
        \`text_requirementDescription\`,
        \`enum_requirementStatus\`)
                
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
        \`text_categoryDescription\`,
        \`enum_categoryStatus\`)
                
        VALUES(
        "${req.body.projectcategoryname}",
        "${req.body.projectcategorydescription}",
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
// MAINTENANCE RELEASE LOCATION
//============================================================

router.get('/releaselocation',(req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 3');
    console.log('=================================');

    var queryString =`SELECT * FROM tbl_releaselocation JOIN tbl_address ON tbl_releaselocation.int_locationAddressID=tbl_address.int_addressID`
    
    db.query(queryString, (err, results, fields) => {
        console.log(results);
        if (err) console.log(err);
        // console.log(results);
        res.render('admin/maintenance/views/maintenance7', {tbl_releaselocation: results});
        console.log(results);
    });
});

router.post('/releaselocation',(req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 3 POST');
    console.log('=================================');

    var queryString = `INSERT INTO \`tbl_address\` (
        
                \`varchar_numberBlockLot\`,
                \`varchar_streetAvenueRoad\`,
                \`varchar_villageSubdivision\`,
                \`varchar_purokSitioZone\`,
                \`enum_addressType\`)
                        
                VALUES(
                "${req.body.blocknumber}",
                "${req.body.street}",
                "${req.body.barangay}",
                "${req.body.city}",
                "Permanent");`;

        db.query(queryString, (err, results, fields) => {        
            if (err) throw err;    
            console.log(results);
            var tolocate = results[0];
            
            var queryString2 = `INSERT INTO \`tbl_releaselocation\` (
                \`varchar_locationName\`,
                \`int_locationAddressID\`,
                \`enum_locationStatus\`)
                        
                VALUES(
                "${req.body.locationname}",
                "${tolocate.int_addressID}",
                "Active");`;
       
            var queryString1 =`SELECT * FROM tbl_releaselocation ORDER BY int_locationID DESC LIMIT 0,1`

        db.query(queryString1, (err, results1, fields) => {        
            if (err) throw err;
            var results1 = results1;
            console.log(results1);

            db.query(queryString2, (err, results1, fields) => {        
                if (err) throw err;
                var results2 = results2;
                console.log(results2);
                    
                res.redirect('/admin/maintenance/releaselocation');
        });
    });
    });

});

router.get('/releaselocation/:int_locationID/editreleaselocation',(req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 3 EDIT GET');
    console.log('=================================');
    console.log("PUMASOK SA GET REQ.PARAMS")
    
    var queryString = `SELECT * FROM tbl_releaselocation JOIN tbl_address ON tbl_releaselocation.int_locationAddressID=tbl_address.int_addressID
    WHERE tbl_releaselocation.int_locationID = "${req.params.int_locationID}"`;
    
    db.query(queryString, (err, results, fields) => {        
        if (err) throw err;
        console.log(results);
        res.render(`admin/maintenance/views/editreleaselocation`,{tbl_releaselocation:results});
    });
});

router.post('/releaselocation/:int_locationID/editreleaselocation', (req, res) => {
    console.log("PUMASOK SA POST REQ.PARAMS")

    var queryString = `UPDATE tbl_address SET
        varchar_addressLine1 = "${req.body.blocknumber}",
        varchar_addressLine2 = "${req.body.street}",
        varchar_addressLine3 = "${req.body.barangay}",
        varchar_cityName = "${req.body.city}",
        enum_addressType = "Permanent"
        WHERE tbl_address.int_addressID = "{req.body.int_locationID}"`;

        db.query(queryString, (err, results, fields) => {        
            if (err) throw err;    
            console.log(results);
            var tolocate = results[0];
            
            var queryString2 = `UPDATE tbl_releaselocation SET
                varchar_locationName = "${req.body.locationname}",
                int_locationAddressID = "${req.body.int_locationID}",
                enum_locationStatus = "Active"
                WHERE tbl_releaselocation.int_addressID = "{req.body.int_locationID}"`;

            var queryString1 =`SELECT * FROM tbl_releaselocation ORDER BY int_locationID DESC LIMIT 0,1`

                db.query(queryString1, (err, results1, fields) => {        
                    if (err) throw err;
                    var results1 = results1;
                    console.log(results1);

                    db.query(queryString2, (err, results1, fields) => {        
                        if (err) throw err;
                        var results2 = results2;
                        console.log(results2);
                });
        });
        });
});

router.post('/releaselocation/activate', (req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 3 Status Active POST');
    console.log('=================================');

    db.query("UPDATE tbl_releaselocation SET enum_locationStatus = 'Active' WHERE int_locationID = ?",[req.body.id], (err, results, fields) =>{
        if(err)
            console.log(err);
        else{
            return res.redirect('/admin/maintenance/releaselocation')
        }
    });

});

router.post('/releaselocation/inactive', (req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 3 Status Inactive POST');
    console.log('=================================');

    db.query("UPDATE tbl_releaselocation SET enum_locationStatus = 'Inactive' WHERE int_locationID = ?",[req.body.id], (err, results, fields) =>{
        if(err)
            console.log(err);
        else{
            return res.redirect('/admin/maintenance/releaselocation')
        }
    });

});

//============================================================
// MAINTENANCE FORMS
//============================================================

router.get('/forms',(req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 6');
    console.log('=================================');
    
    var queryString =`SELECT * FROM tbl_formtype`
    
    db.query(queryString, (err, results, fields) => {
        console.log(results);
        if (err) console.log(err);
        // console.log(results);
        res.render('admin/maintenance/views/maintenance8', {tbl_formtype: results});
        console.log(results);
    });
});

router.post('/forms',(req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 6 POST');
    console.log('=================================');

    var queryString = `INSERT INTO \`tbl_formtype\` (
        
        \`varchar_formName\`,
        \`text_formDescription\`,
        \`enum_formStatus\`)
                
        VALUES(
        "${req.body.formname}",
        "${req.body.formdescription}",
        "Active");`;

        db.query(queryString, (err, results, fields) => {        
            if (err) throw err;    
            console.log(results);
       
        var queryString1 =`SELECT * FROM tbl_formtype ORDER BY int_formTypeID DESC LIMIT 0,1`

        db.query(queryString1, (err, results1, fields) => {        
            if (err) throw err;
            var results1 = results1;
            console.log(results1);
                    
                res.redirect('/admin/maintenance/forms');
        });

    });
});

router.get('/forms/:int_formTypeID/editforms',(req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 6');
    console.log('=================================');
    console.log("PUMASOK SA GET REQ.PARAMS")
    
    var queryString = `SELECT * FROM tbl_formtype
    WHERE tbl_formtype.int_formTypeID = "${req.params.int_formTypeID}"`;
    
    db.query(queryString, (err, results, fields) => {        
        if (err) throw err;
        console.log(results);
        res.render(`admin/maintenance/views/editforms`,{tbl_formtype:results});
    });
});

router.post('/forms/:int_formTypeID/editforms', (req, res) => {
    console.log("PUMASOK SA POST REQ.PARAMS")
    
    var queryString = `UPDATE tbl_formtype SET
    varchar_formName = "${req.body.formname}",
    text_formDescription = "${req.body.formdescription}",
    enum_formStatus = "Active"
    WHERE tbl_formtype.int_formTypeID = "${req.body.int_formTypeID}"`;
    
    db.query(queryString, (err, results, fields) => {        
        if (err) throw err;
        console.log(results);
        res.redirect('/admin/maintenance/forms');
});
});

router.post('/forms/activate', (req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 6 Status Active POST');
    console.log('=================================');

    db.query("UPDATE tbl_formtype SET enum_formStatus = 'Active' WHERE int_formTypeID = ?",[req.body.id], (err, results, fields) =>{
        if(err)
            console.log(err);
        else{
            return res.redirect('/admin/maintenance/forms')
        }
    });

});

router.post('/forms/inactive', (req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 6 Status Inactive POST');
    console.log('=================================');

    db.query("UPDATE tbl_formtype SET enum_formStatus = 'Inactive' WHERE int_formTypeID = ?",[req.body.id], (err, results, fields) =>{
        if(err)
            console.log(err);
        else{
            return res.redirect('/admin/maintenance/forms')
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