var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();
var nodemailer = require('nodemailer');



router.get('/',(req, res) => {
    console.log('=================================');
    console.log('UTILITY MAIN');
    console.log('=================================');

    var queryString =`SELECT * FROM tbl_barangay`
    

    db.query(queryString, (err, results, fields) => {
        console.log(results);
        if (err) console.log(err);

        var queryString2 =`SELECT COUNT(*) AS barnum FROM tbl_barangay`

        db.query(queryString2, (err, results2, fields) => {
            console.log(results2);
            if (err) console.log(err);

            res.render('office/utility/views/mainutility',{tbl_barangay:results,barcount:results2});
        });
    });
});


router.post('/addbarangay',(req, res) => {
    console.log('=================================');
    console.log('ADMIN: UTILITY - 1 POST');
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
                        
                res.redirect('/office/utility');
            });
        });
    });
});

router.post('/editbarangay', (req, res) => {
    console.log('=================================');
    console.log('ADMIN: UTILITY - edit barangay POST');
    console.log('=================================');
    
    var queryString = `UPDATE tbl_barangay SET
    varchar_barangayName = "${req.body.e_barangayname}",
    text_barangayAddress = "${req.body.e_address}",
    varchar_barangayContact = "${req.body.e_barangaycontact}",
    enum_barangayStatus = "Active"
    WHERE tbl_barangay.int_barangayID = "${req.body.barangayID}"`;
    
    db.query(queryString, (err, results, fields) => {        
        if (err) throw err;
        console.log(results);
        res.redirect('/office/utility');
    });
});


router.post('/ajaxgetdetails',(req,res) => {
    console.log('=================================');
    console.log('BARANGAY: utility barangay-PREVIOUS-AJAX GET DETAILS (POST)');
    console.log('=================================');
    console.log(`${req.body.ajBarangayID}`);

    var barangayQuery = `SELECT * 
    FROM tbl_barangay 
    WHERE int_barangayID = ${req.body.ajBarangayID}`

        db.query(barangayQuery, (err, resultss, barangay) => {        
            if (err) throw err;

        
    
                    console.log(resultss);

                    return res.send({tbl_barangay:resultss[0]});
        });
});


module.exports = router;