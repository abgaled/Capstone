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

router.get('/',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: HOME');
    console.log('=================================');

    var currentDate = y + "-" + m + "-" + d;
    var aweek = moment(currentDate).subtract(1, 'w');
    aweek = moment(aweek).format('YYYY-MM-DD');

    console.log(now);
    console.log(currentDate);
    console.log(aweek);

    var queryString =`SELECT COUNT(*) AS openApplicationCount
    FROM tbl_projectdetail
    WHERE enum_projectStatus = "Ongoing"`

    db.query(queryString, (err, results, fields) => {
    console.log(results);
    if (err) console.log(err);

        var queryString2 =`SELECT COUNT(*) AS releasingCount
        FROM tbl_projectdetail 
        WHERE enum_projectStatus = "Releasing"`
        
        db.query(queryString2, (err, results2, fields) => {
        console.log(results2);
        if (err) console.log(err);

            var queryString3 =`SELECT COUNT(*) AS latestprobStatement
            FROM tbl_intentstatement
            WHERE tbl_intentstatement.enum_problemStatus = 'Submitted'
            AND tbl_intentstatement.date_createdDate >= "${aweek}"`

            db.query(queryString3, (err, results3, fields) => {
            console.log(results3);
            if (err) console.log(err);

                var queryString4 =`SELECT COUNT(*) AS latestapplication
                FROM tbl_application
                WHERE (tbl_application.datetime_submittedDate >= "${aweek}"
                AND tbl_application.enum_applicationStatus = 'Pending')`

                db.query(queryString4, (err, results4, fields) => {
                console.log(results4);
                if (err) console.log(err);

                    res.render('office/home/views/home',
                    {
                        tbl_projCount:results,
                        tbl_release:results2,
                        tbl_problem:results3,
                        tbl_app:results4
                    });
                });
            });
        });
    });
});

module.exports = router;