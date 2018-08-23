var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();

router.get('/',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: addbrgyaccnt');
    console.log('=================================');

    var queryString =`SELECT * FROM tbl_barangay br
    JOIN tbl_user buser ON br.int_userID=buser.int_userID
    ORDER BY br.int_barangayID DESC`
    
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
        "${req.body.email}",
        "${req.body.password}",
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

                var queryString2 = `INSERT INTO \`tbl_barangay\` (
                    \`int_userID\`,
                    \`int_cityID\`,
                    \`varchar_barangayName\`,
                    \`varchar_barangayContact\`,
                    \`enum_barangayStatus\`)
                    
                    VALUES(
                    "${tobrgy.int_userID}",
                    "${getcity.int_cityID}",
                    "${req.body.barangay_name}",
                    "${req.body.contact_num}",
                    "Active");`;

                db.query(queryString2, (err, results2, fields) => {        
                    if (err) throw err;
                    console.log(results2);
                    console.log('=================================');
                    
                    res.redirect('/office/addbrgyaccnt');
                });
            });
        });

    });
});

module.exports = router;