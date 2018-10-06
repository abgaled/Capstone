var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();
var nodemailer = require('nodemailer');
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
var yr = y + 1;

//============================================================
// MAINTENANCE REQUIREMENTS
//============================================================

router.get('/requirements',(req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 5');
    console.log('=================================');
    var queryString =`SELECT * FROM tbl_requirement `
    
    db.query(queryString, (err, results, fields) => {
        console.log(results);
        if (err) console.log(err);
        // console.log(results);
        res.render('office/maintenance/views/maintain-requirement', {tbl_requirement: results});
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
                    
                res.redirect('/office/maintenance/requirements');
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
        res.render(`office/maintenance/views/editrequirement`,{tbl_requirement:results});
    });
});

router.post('/requirements/:int_requirementID/editrequirement', (req, res) => {
    console.log("PUMASOK SA POST REQ.PARAMS")
    
    var queryString = `UPDATE tbl_requirement SET
    varchar_requirementName = "${req.body.requirementname}",
    enum_requirementStatus = "Active"
    WHERE tbl_requirement.int_requirementID = "${req.body.int_requirementID}"`;
    
    db.query(queryString, (err, results, fields) => {        
        if (err) throw err;
        console.log(results);
        res.redirect('/office/maintenance/requirements');
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
            return res.redirect('/office/maintenance/requirements')
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
            return res.redirect('/office/maintenance/requirements')
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
        res.render('office/maintenance/views/maintain-category', {tbl_category: results});
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
                    
                res.redirect('/office/maintenance/projectcategory');
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
        res.render(`office/maintenance/views/editprojectcategory`,{tbl_projectcategory:results});
    });
});


router.post('/projectcategory/:int_projectCategID/editprojectcategory', (req, res) => {
    console.log("PUMASOK SA POST REQ.PARAMS")
    
    var queryString = `UPDATE tbl_category SET
        varchar_categoryName = "${req.body.projectcategoryname}",
        enum_categoryStatus = "Active"
        WHERE tbl_category.int_categoryID = "${req.body.int_categoryID}"`

    db.query(queryString, (err, results, fields) => {        
        if (err) throw err;
        console.log(results);
        res.redirect('/office/maintenance/projectcategory');
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
            return res.redirect('/office/maintenance/projectcategory')
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
            return res.redirect('/office/maintenance/projectcategory')
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
        res.render('office/maintenance/views/maintain-beneficiary', {tbl_beneficiary: results});
        console.log(results);
    });
});

router.post('/targetbeneficiary',(req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 4 POST');
    console.log('=================================');

    var queryString = `INSERT INTO \`tbl_beneficiary\` (
        
        \`varchar_beneficiaryName\`,
        \`enum_beneficiaryStatus\`)
                
        VALUES(
        "${req.body.beneficiaryname}",
        "Active");`;

        db.query(queryString, (err, results, fields) => {        
            if (err) throw err;    
            console.log(results);
       
        var queryString1 =`SELECT * FROM tbl_beneficiary ORDER BY int_beneficiaryID DESC LIMIT 0,1`

        db.query(queryString1, (err, results1, fields) => {        
            if (err) throw err;
            var results1 = results1;
            console.log(results1);
                    
                res.redirect('/office/maintenance/targetbeneficiary');
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
        res.render(`office/maintenance/views/edittargetbeneficiary`,{tbl_beneficiary:results});
    });
});

router.post('/targetbeneficiary/:int_beneficiaryID/edittargetbeneficiary', (req, res) => {
    console.log("PUMASOK SA POST REQ.PARAMS")
    
    var queryString = `UPDATE tbl_beneficiary SET
    varchar_beneficiaryName = "${req.body.beneficiaryname}",
    enum_beneficiaryStatus = "Active"
    WHERE tbl_beneficiary.int_beneficiaryID = "${req.body.int_beneficiaryID}"`;
    
    db.query(queryString, (err, results, fields) => {        
        if (err) throw err;
        console.log(results);
        res.redirect('/office/maintenance/targetbeneficiary');
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
            return res.redirect('/office/maintenance/targetbeneficiary')
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
            return res.redirect('/office/maintenance/targetbeneficiary')
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
        res.render('office/maintenance/views/maintain-barangay', {tbl_barangay: results});
        console.log(results);
    });
});

router.post('/barangay',(req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 1 POST');
    console.log('=================================');

    console.log(req.session.office.int_userID);
    var queryString0 = `SELECT int_cityID FROM tbl_city WHERE int_userID= ${req.session.office.int_userID}`;

    db.query(queryString0, (err, result0, fields) => {
        if(err) console.log(err);
        console.log(result0);
        var cityID = result0;

        console.log(cityID[0].int_cityID);

        var queryString = `INSERT INTO \`tbl_barangay\` (
            \`int_cityID\`,
            \`varchar_barangayName\`,
            \`text_barangayAddress\`,
            \`varchar_barangayContact\`,
            \`enum_barangayStatus\`)
                    
            VALUES(
            ${cityID[0].int_cityID},
            "${req.body.barangayname}",
            "${req.body.address}",
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
                        
                res.redirect('/office/maintenance/barangay');
            });
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
        res.render(`office/maintenance/views/editbarangay`,{tbl_barangay:results});
    });
});

router.post('/barangay/:int_barangayID/editbarangay', (req, res) => {
    
    var queryString = `UPDATE tbl_barangay SET
    varchar_barangayName = "${req.body.barangayname}",
    varchar_barangayContact = "${req.body.barangaycontact}",
    enum_barangayStatus = "Active"
    WHERE tbl_barangay.int_barangayID = "${req.body.int_barangayID}"`;
    
    db.query(queryString, (err, results, fields) => {        
        if (err) throw err;
        console.log(results);
        res.redirect('/office/maintenance/barangay');
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
            return res.redirect('/office/maintenance/barangay')
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
            return res.redirect('/office/maintenance/barangay')
        }
    });

});

//add brgy accnt
router.get('/brgyaccnt',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: addbrgyuser');
    console.log('=================================');

    var queryString =`SELECT * FROM tbl_barangay 
    WHERE enum_barangayStatus = 'Active'
    ORDER BY int_barangayID DESC`
    
    db.query(queryString, (err, results, fields) => {
        console.log(results);
        if (err) console.log(err);

    res.render('office/maintenance/views/brgyaccnt', {tbl_barangay: results});
});
});

router.get('/brgyaccnt/:int_barangayID/brgyuser', (req, res) => {
    console.log('=================================');
    console.log('OFFICE: brgyuserss');
    console.log('=================================');
        var queryString =`SELECT * FROM tbl_officialsaccount off
        JOIN tbl_user us ON off.int_userID = us.int_userID
        JOIN tbl_barangay brgy ON off.int_officialsID = brgy.int_barangayID
        WHERE off.int_officialsID = "${req.params.int_barangayID}"`;
        
       var queryString2 =`SELECT * FROM tbl_barangay 
        WHERE int_barangayID = "${req.params.int_barangayID}"`;
        
        db.query(queryString, (err, results, fields) => {
            console.log(results);
            if (err) console.log(err);

            db.query(queryString2, (err, results2, fields) => {
                console.log(results2);
                if (err) console.log(err);

            res.render('office/maintenance/views/brgyuser', {tbl_barangayusers: results,tbl_barangay: results2});
        });
    });
});


router.post('/brgyaccnt/:int_barangayID/brgyuser',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: ADDBARANGAY - POST');
    console.log('=================================');

    var queryString = `INSERT INTO \`tbl_user\` (
        
        \`text_userName\`,
        \`varchar_userEmailAddress\`,
        \`text_userAddress\`,
        \`varchar_userContact\`,
        \`varchar_userPassword\`,
        \`varchar_userPosition\`,
        \`enum_userType\`,
        \`enum_accountStatus\`)
                
        VALUES(
        "${req.body.barangayName}",
        "${req.body.barangayEmail}",
        "${req.body.barangayAddress}",
        "${req.body.barangayContact}",
        "${req.body.barangayPassword}",
        "${req.body.barangayPosition}",
        "Barangay Staff ",
        "Active ");`;

        db.query(queryString, (err, results, fields) => {        
            if (err) throw err;    
            console.log(results);
            console.log('=================================');
            console.log('OFFICE: ADDBARANGAY - POST tbl_user');
            console.log('=================================');
       
        var queryString1 =`SELECT * FROM tbl_user ORDER BY int_userID DESC`

        db.query(queryString1, (err, results1, fields) => {        
            if (err) throw err;

            var tobrgy = results1[0];
            
            var queryBarangayuser = `INSERT INTO \`tbl_officialsaccount\` (
        
                \`int_userID\`,
                \`int_officialsID\`)
                VALUES(
                "${tobrgy.int_userID}",
                "${req.body.brgyID}");`;

            db.query(queryBarangayuser, (err, resultsbrgy, fields) => {        
                if (err) throw err;
                console.log(resultsbrgy);
                console.log('=================================');
                console.log('OFFICE: ADDBARANGAY - POST tbl_barangayuser');
                console.log('=================================');

            var getCityID =`SELECT * FROM tbl_city`

            db.query(getCityID, (err, results3, fields) => {        
                if (err) throw err;

                var getcity = results3[0];     
                
                    console.log('=================================');
                    
                    // START OF NODE MAILER
                    nodemailer.createTestAccount((err, account) => {
                        // create reusable transporter object using the default SMTP transport
                        var transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                   user: 'cityprojmsoffice@gmail.com',
                                   pass: 'cityprojmsofficeoffice'
                            },
                            tls: {
                                rejectUnauthorized: false
                            }
                           });
                    
                        // setup email data with unicode symbols
                        let mailOptions = {
                            from: '"City Project - Office" <cityprojmsoffice@gmail.com>', // sender address
                            to: `${req.body.barangayEmail}`, // list of receivers
                            subject: 'City Project Application and Beneficiary Releasing Management System - Barangay Account Details', // Subject line
                            html: `<b>Welcome to City Project Application and Beneficiary Releasing Managament System. 
                            <br>The following information will be your current login details.
                            </b> <p>You can edit/update your information anytime, once you login using these account details.
                            <hr> Email: ${req.body.barangayEmail} 
                            <br> Password: ${req.body.barangayPassword} <hr><br> Thank You!` // html body
                        };
                        console.log("==================================");
                        console.log("SENDING TO:");
                        console.log(req.body.barangayEmail);
                        console.log("==================================");
                    
                        // send mail with defined transport object
                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                return console.log(error);
                            }
                            console.log('Message sent: %s', info.messageId);
                            // Preview only available when sending through an Ethereal account
                            // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                    
                            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
                            });
                            
                        });
                        // END OF NODE MAILER
                        var queryString3 =`SELECT * FROM tbl_officialsaccount brgyus
                        JOIN tbl_user us ON brgyus.int_userID = us.int_userID
                        JOIN tbl_barangay brgy ON brgyus.int_officialsID = brgy.int_barangayID
                        WHERE brgyus.int_officialsID = "${req.body.brgyID}"`;
                        
                       var queryString4 =`SELECT * FROM tbl_barangay 
                        WHERE int_barangayID = "${req.body.brgyID}"`;
                        
                        db.query(queryString3, (err, results3, fields) => {
                            console.log(results3);
                            if (err) console.log(err);
                
                            db.query(queryString4, (err, results4, fields) => {
                                console.log(results4);
                                if (err) console.log(err);
                
                            res.render('office/maintenance/views/brgyuser', {tbl_barangayusers: results3,tbl_barangay: results4});
                        });
                    });
                });
            });
        });

    });
});

router.post('/brgyaccnt/activate', (req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 1 Status Active POST');
    console.log('=================================');

    resultIndex = `${req.body.brgyid}`;
    console.log(resultIndex);
    console.log('=================================');

    db.query("UPDATE tbl_user SET enum_accountStatus = 'Active' WHERE int_userID = ?",[req.body.id], (err, results, fields) =>{
        if(err)
            console.log(err);
        else{
            
            console.log(results);
            var queryString3 =`SELECT * FROM tbl_officialsaccount brgyus
            JOIN tbl_user us ON brgyus.int_userID = us.int_userID
            JOIN tbl_barangay brgy ON brgyus.int_officialsID = brgy.int_barangayID
            WHERE brgyus.int_officialsID = "${resultIndex}"`;
                        
            var queryString4 =`SELECT * FROM tbl_barangay 
            WHERE int_barangayID = "${resultIndex}"`;
                        
            db.query(queryString3, (err, results3, fields) => {
            console.log(results3);
            if (err) console.log(err);
                
                db.query(queryString4, (err, results4, fields) => {
                console.log(results4);
                if (err) console.log(err);
                
                res.render('office/maintenance/views/brgyuser', {tbl_barangayusers: results3,tbl_barangay: results4});
                });
            });
        }
    });

});

router.post('/brgyaccnt/inactive', (req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 6 Status Inactive POST');
    console.log('=================================');

    resultIndex = `${req.body.brgyid}`;
    console.log(resultIndex);
    console.log('=================================');
    db.query("UPDATE tbl_user SET enum_accountStatus = 'Inactive' WHERE int_userID = ?",[req.body.id], (err, results, fields) =>{
        if(err)
            console.log(err);
        else{
            console.log(results);
            var queryString3 =`SELECT * FROM tbl_officialsaccount brgyus
            JOIN tbl_user us ON brgyus.int_userID = us.int_userID
            JOIN tbl_barangay brgy ON brgyus.int_officialsID = brgy.int_barangayID
            WHERE brgyus.int_officialsID = "${resultIndex}"`;
                        
            var queryString4 =`SELECT * FROM tbl_barangay 
            WHERE int_barangayID = "${resultIndex}"`;
                        
            db.query(queryString3, (err, results3, fields) => {
            console.log(results3);
            if (err) console.log(err);
                
                db.query(queryString4, (err, results4, fields) => {
                console.log(results4);
                if (err) console.log(err);
                
                res.render('office/maintenance/views/brgyuser', {tbl_barangayusers: results3,tbl_barangay: results4});
                });
            });
        }
    });

});

// add budget user
router.get('/budgetaccnt',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: ADDBudgetAccnt');
    console.log('=================================');

    var queryString =`SELECT * FROM tbl_user
    WHERE enum_userType = "Budget Office Staff" 
    ORDER BY int_userID DESC`
    
    db.query(queryString, (err, results, fields) => {
        console.log(results);
        if (err) console.log(err);

    res.render('office/maintenance/views/budgetaccnt', {tbl_user: results});
});
});

router.post('/budgetaccnt',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: ADDBudgetAccnt - POST');
    console.log('=================================');

    var queryString = `INSERT INTO \`tbl_user\` (
        \`text_userName\`,
        \`varchar_userEmailAddress\`,
        \`text_userAddress\`,
        \`varchar_userContact\`,
        \`varchar_userPassword\`,
        \`varchar_userPosition\`,
        \`enum_userType\`,
        \`enum_accountStatus\`)
                
        VALUES(
        "${req.body.budgetName}",
        "${req.body.budgetEmail}",
        "${req.body.budgetAddress}",
        "${req.body.budgetContact}",
        "${req.body.budgetPassword}",
        "${req.body.budgetPosition}",
        "Budget Office Staff ",
        "Active ");`;

        db.query(queryString, (err, results, fields) => {        
            if (err) throw err;    
            console.log(results);
       
        var queryString1 =`SELECT * FROM tbl_user ORDER BY int_userID DESC`

        db.query(queryString1, (err, results1, fields) => {        
            if (err) throw err;

            var tobrgy = results1[0];

            var getCityID =`SELECT * FROM tbl_city`

            db.query(getCityID, (err, results3, fields) => {        
                if (err) throw err;

                    
                    // START OF NODE MAILER
                    nodemailer.createTestAccount((err, account) => {
                        // create reusable transporter object using the default SMTP transport
                        var transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                   user: 'cityprojmsoffice@gmail.com',
                                   pass: 'cityprojmsofficeoffice'
                            },
                            tls: {
                                rejectUnauthorized: false
                            }
                           });
                    
                        // setup email data with unicode symbols
                        let mailOptions = {
                            from: '"City Project - Office" <cityprojmsoffice@gmail.com>', // sender address
                            to: `${req.body.budgetEmail}`, // list of receivers
                            subject: 'City Project Application and Beneficiary Releasing Management System - Budget Office Account Details', // Subject line
                            html: `<b>Welcome to City Project Application and Beneficiary Releasing Managament System. 
                            <br>The following information will be your current login details.
                            </b> <p>You can edit/update your information anytime, once you login using these account details.
                            <hr> Email: ${req.body.budgetEmail} 
                            <br> Password: ${req.body.budgetPassword} <hr><br> Thank You!` // html body
                        };
                        console.log("==================================");
                        console.log("SENDING TO:");
                        console.log(req.body.budgetEmail);
                        console.log("==================================");
                    
                        // send mail with defined transport object
                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                return console.log(error);
                            }
                            console.log('Message sent: %s', info.messageId);
                            // Preview only available when sending through an Ethereal account
                            // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                    
                            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
                            });
                            
                        });
                        // END OF NODE MAILER
                        res.redirect('/office/maintenance/budgetaccnt');
                    
                });
        });

    });
});


router.post('/budgetaccnt/activate', (req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 1 Status Active POST');
    console.log('=================================');

    db.query("UPDATE tbl_user SET enum_accountStatus = 'Active' WHERE int_userID = ?",[req.body.id], (err, results, fields) =>{
        if(err)
            console.log(err);
        else{
            return res.redirect('/office/maintenance/budgetaccnt')
        }
    });

});

router.post('/budgetaccnt/inactive', (req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 6 Status Inactive POST');
    console.log('=================================');

    db.query("UPDATE tbl_user SET enum_accountStatus = 'Inactive' WHERE int_userID = ?",[req.body.id], (err, results, fields) =>{
        if(err)
            console.log(err);
        else{
            return res.redirect('/office/maintenance/budgetaccnt')
        }
    });

});

//add officeuser
router.get('/officeaccnt',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: ADDBudgetAccnt');
    console.log('=================================');

    var queryString =`SELECT * FROM tbl_user
    WHERE enum_userType = "Office Staff" 
    ORDER BY int_userID DESC`
    
    db.query(queryString, (err, results, fields) => {
        console.log(results);
        if (err) console.log(err);

    res.render('office/maintenance/views/officeaccnt', {tbl_user: results});
});
});
router.post('/officeaccnt',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: ADDBudgetAccnt - POST');
    console.log('=================================');

    var queryString = `INSERT INTO \`tbl_user\` (
        \`text_userName\`,
        \`varchar_userEmailAddress\`,
        \`text_userAddress\`,
        \`varchar_userContact\`,
        \`varchar_userPassword\`,
        \`varchar_userPosition\`,
        \`enum_userType\`,
        \`enum_accountStatus\`)
                
        VALUES(
        "${req.body.officeName}",
        "${req.body.officeEmail}",
        "${req.body.officeAddress}",
        "${req.body.officeContact}",
        "${req.body.officePassword}",
        "${req.body.officePosition}",
        "Office Staff ",
        "Active ");`;

        db.query(queryString, (err, results, fields) => {        
            if (err) throw err;    
            console.log(results);
       
        var queryString1 =`SELECT * FROM tbl_user ORDER BY int_userID DESC`

        db.query(queryString1, (err, results1, fields) => {        
            if (err) throw err;

            var tobrgy = results1[0];

            var getCityID =`SELECT * FROM tbl_city`

            db.query(getCityID, (err, results3, fields) => {        
                if (err) throw err;

                    
                    // START OF NODE MAILER
                    nodemailer.createTestAccount((err, account) => {
                        // create reusable transporter object using the default SMTP transport
                        var transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                   user: 'cityprojmsoffice@gmail.com',
                                   pass: 'cityprojmsofficeoffice'
                            },
                            tls: {
                                rejectUnauthorized: false
                            }
                           });
                    
                        // setup email data with unicode symbols
                        let mailOptions = {
                            from: '"City Project - Office" <cityprojmsoffice@gmail.com>', // sender address
                            to: `${req.body.officeEmail}`, // list of receivers
                            subject: 'City Project Application and Beneficiary Releasing Management System - Office Account Details', // Subject line
                            html: `<b>Welcome to City Project Application and Beneficiary Releasing Managament System. 
                            <br>The following information will be your current login details.
                            </b> <p>You can edit/update your information anytime, once you login using these account details.
                            <hr> Email: ${req.body.officeEmail} 
                            <br> Password: ${req.body.officePassword} <hr><br> Thank You!` // html body
                        };
                        console.log("==================================");
                        console.log("SENDING TO:");
                        console.log(req.body.officeEmail);
                        console.log("==================================");
                    
                        // send mail with defined transport object
                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                return console.log(error);
                            }
                            console.log('Message sent: %s', info.messageId);
                            // Preview only available when sending through an Ethereal account
                            // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                    
                            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
                            });
                            
                        });
                        // END OF NODE MAILER
                        res.redirect('/office/maintenance/officeaccnt');
                    
                });
        });

    });
});

router.post('/officeaccnt/activate', (req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 1 Status Active POST');
    console.log('=================================');

    db.query("UPDATE tbl_user SET enum_accountStatus = 'Active' WHERE int_userID = ?",[req.body.id], (err, results, fields) =>{
        if(err)
            console.log(err);
        else{
            return res.redirect('/office/maintenance/officeaccnt')
        }
    });

});

router.post('/officeaccnt/inactive', (req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 6 Status Inactive POST');
    console.log('=================================');

    db.query("UPDATE tbl_user SET enum_accountStatus = 'Inactive' WHERE int_userID = ?",[req.body.id], (err, results, fields) =>{
        if(err)
            console.log(err);
        else{
            return res.redirect('/office/maintenance/officeaccnt')
        }
    });

});


//============================================================
// MAINTENANCE IMPLEMENTING AGENCY
//============================================================

router.get('/agency',(req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 7');
    console.log('=================================');
    var queryString =`SELECT * FROM tbl_agency `
    
    db.query(queryString, (err, results, fields) => {
        console.log(results);
        if (err) console.log(err);
        // console.log(results);
        res.render('office/maintenance/views/maintain-agency', {tbl_agency: results});
        console.log(results);
    });
});

router.post('/agency',(req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 7 POST');
    console.log('=================================');

    var queryString = `INSERT INTO \`tbl_agency\` (
        
        \`varchar_agencyName\`)
                
        VALUES(
        "${req.body.agencyname}")`;

        db.query(queryString, (err, results, fields) => {        
            if (err) throw err;    
            console.log(results);
       
        var queryString1 =`SELECT * FROM tbl_agency ORDER BY int_agencyID DESC LIMIT 0,1`

        db.query(queryString1, (err, results1, fields) => {        
            if (err) throw err;
            var results1 = results1;
            console.log(results1);
                    
            res.redirect('/office/maintenance/agency');
        });

    });
});

router.get('/agency/:int_agencyID/editagency',(req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 7');
    console.log('=================================');
    console.log("PUMASOK SA GET REQ.PARAMS")
    
    var queryString = `SELECT * FROM tbl_agency
    WHERE tbl_agency.int_agencyID = "${req.params.int_agencyID}"`;
    
    db.query(queryString, (err, results, fields) => {        
        if (err) throw err;
        res.render(`office/maintenance/views/editimplementingagency`,{tbl_agency:results});
    });
});

router.post('/agency/:int_agencyID/editagency', (req, res) => {
    console.log("PUMASOK SA POST REQ.PARAMS")
    
    var queryString = `UPDATE tbl_agency SET
    varchar_agencyName = "${req.body.agencyname}"
    WHERE tbl_agency.int_agencyID = "${req.body.int_editagencyID}"`;
    
    db.query(queryString, (err, results, fields) => {        
        if (err) throw err;
        console.log(results);
        res.redirect('/office/maintenance/agency');
});
});

router.post('/agency/activate', (req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 7 Status Active POST');
    console.log('=================================');

    db.query("UPDATE tbl_agency SET enum_agencyStatus = 'Active' WHERE int_agencyID = ?",[req.body.id], (err, results, fields) =>{
        if(err)
            console.log(err);
        else{
            return res.redirect('/office/maintenance/agency')
        }
    });

});

router.post('/agency/inactive', (req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 7 Status Inactive POST');
    console.log('=================================');

    db.query("UPDATE tbl_agency SET enum_agencyStatus = 'Inactive' WHERE int_agencyID = ?",[req.body.id], (err, results, fields) =>{
        if(err)
            console.log(err);
        else{
            return res.redirect('/office/maintenance/agency')
        }
    });

});


//============================================================
// MAINTENANCE Annual Budget
//============================================================

router.get('/annualbudget',(req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - ANNUAL BUDGET');
    console.log('=================================');
    var queryString =`SELECT * FROM tbl_annualbudget`

    db.query(queryString, (err, results, fields) => {
        if (err) console.log(err);
        console.log(results);
        // This year's budget
        
        var queryString2 =`SELECT * FROM tbl_annualbudget
            WHERE date_budgetYear = "${yr}"`
        
        db.query(queryString2, (err, results2, fields) => {
            if (err) console.log(err);
            console.log(results2);
            //next year's budget

            res.render('office/maintenance/views/maintain-budget', 
            {
                tbl_annualbudget: results,
                nextyear:results2
            });
        });
    });
});

router.post('/annualbudget', (req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - ANNUAL BUDGET POST');
    console.log('=================================');
    
    var queryString = `INSERT INTO \`tbl_annualbudget\` 
    (\`decimal_annualBudget\`, 
    \`date_budgetYear\`, 
    \`int_cityID\`)
    VALUES
    ("${req.body.budget}",
    "${req.body.year}",
    "1");`;
    
    db.query(queryString, (err, results, fields) => {        
        if (err) throw err;
        console.log(results);
        res.redirect('/office/maintenance/annualbudget');
    });
});


//============================================================
// MAINTENANCE Unit oF Measure
//============================================================

router.get('/unitofmeasure',(req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - UNIT OF MEASURE');
    console.log('=================================');
    var queryString =`SELECT * FROM tbl_unitmeasure`

    db.query(queryString, (err, results, fields) => {
        if (err) console.log(err);
        console.log(results);

        res.render('office/maintenance/views/maintain-uom', 
        {
           tbl_uom: results,
        });
    });
});

router.post('/unitofmeasure',(req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - UNIT OF MEASURE POST');
    console.log('=================================');
    var queryString =`INSERT INTO \`tbl_unitmeasure\` 
    (\`varchar_unitName\`, 
    \`char_unitSymbol\`, 
    \`enum_unitStatus\`)
    VALUES
    ("${req.body.input_UOM}",
    "${req.body.input_Abbreviation}",
    "Active");`;

    db.query(queryString, (err, results, fields) => {
        if (err) console.log(err);
        console.log(results);

        res.redirect('/office/maintenance/unitofmeasure');
    });
});


router.post('/unitofmeasure/activate', (req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - unitofmeasure Status Active POST');
    console.log('=================================');

    db.query("UPDATE tbl_unitmeasure SET enum_unitStatus = 'Active' WHERE int_unitMeasureID = ?",[req.body.id], (err, results, fields) =>{
        if(err)
            console.log(err);
        else{
            return res.redirect('/office/maintenance/unitofmeasure')
        }
    });

});

router.post('/unitofmeasure/inactive', (req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - unitofmeasure Status Inactive POST');
    console.log('=================================');

    db.query("UPDATE tbl_unitmeasure SET enum_unitStatus = 'Inactive' WHERE int_unitMeasureID = ?",[req.body.id], (err, results, fields) =>{
        if(err)
            console.log(err);
        else{
            return res.redirect('/office/maintenance/unitofmeasure')
        }
    });

});

router.get('/unitofmeasure/:int_unitMeasureID/edituom',(req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - unitofmeasure Status EDIT GET');
    console.log('=================================');
    
    var queryString = `SELECT * FROM tbl_unitmeasure
    WHERE tbl_unitmeasure.int_unitMeasureID = "${req.params.int_unitMeasureID}"`;
    
    db.query(queryString, (err, results, fields) => {        
        if (err) throw err;
        res.render(`office/maintenance/views/editUOM`,{tbl_unitofmeasure:results});
    });
});

router.post('/unitofmeasure/:int_unitMeasureID/edituom', (req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - unitofmeasure Status EDIT POST');
    console.log('=================================');
    
    var queryString = `UPDATE tbl_unitmeasure SET
    varchar_unitName = "${req.body.uomName}",
    char_unitSymbol = "${req.body.uomAcronym}"
    WHERE tbl_unitmeasure.int_unitMeasureID = "${req.body.int_unitMeasureID}"`;
    
    db.query(queryString, (err, results, fields) => {        
        if (err) throw err;
        console.log(results);
        res.redirect('/office/maintenance/unitofmeasure');
});
});


module.exports = router;