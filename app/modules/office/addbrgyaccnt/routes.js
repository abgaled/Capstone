var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();
var nodemailer = require('nodemailer');

router.get('/',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: addbrgyaccnt');
    console.log('=================================');

    var queryString =`SELECT * FROM tbl_barangay 
    ORDER BY int_barangayID DESC`
    
    db.query(queryString, (err, results, fields) => {
        console.log(results);
        if (err) console.log(err);

    res.render('office/addbrgyaccnt/views/brgylist', {tbl_barangay: results});
});
});

router.post('/',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: ADDBARANGAY - POST');
    console.log('=================================');

    var queryString = `INSERT INTO \`tbl_user\` (
        
        \`varchar_userEmailAddress\`,
        \`varchar_userPassword\`,
        \`enum_userType\`)
                
        VALUES(
        "${req.body.barangayEmail}",
        "${req.body.barangayPassword}",
        "Barangay Staff ");`;

        db.query(queryString, (err, results, fields) => {        
            if (err) throw err;    
            console.log(results);
       
        var queryString1 =`SELECT * FROM tbl_user ORDER BY int_userID DESC`

        db.query(queryString1, (err, results1, fields) => {        
            if (err) throw err;

            var tobrgy = results1[0];

            var getCityID =`SELECT * FROM tbl_city
            WHERE int_userID = ${req.session.office.int_userID}`

            db.query(getCityID, (err, results3, fields) => {        
                if (err) throw err;

                var getcity = results3[0];     
                
                var queryString2 = `UPDATE tbl_barangay SET
                int_userID = "${tobrgy.int_userID}"
                WHERE int_barangayID = ${req.body.brgyID}`;

                db.query(queryString2, (err, results2, fields) => {        
                    if (err) throw err;
                    console.log(results2);
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
                        res.redirect('/office/addbrgyaccnt');
                    
                });
            });
        });

    });
});

module.exports = router;