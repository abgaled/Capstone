var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();
var moment = require('moment');
var cityID;


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
    console.log('OFFICE: REPORTS');
    console.log('=================================');

    return res.render('office/reports/views/reports',
    {
    });
});

router.post('/reportquery',(req,res) => {
    console.log('=================================');
    console.log('OFFICE: REPORT-AJAX GET DETAILS (POST)');
    console.log('=================================');
    var rType= req.body.rtype;
    var rmonth= req.body.rmonth;
    var ryear= req.body.ryear;
    var rstatus= req.body.rstatus;
    console.log(rType);
    console.log(rmonth);
    console.log(ryear);
    console.log(rstatus);
    var projectList = [];
    if(rType==1)
    {
        if(rstatus=="Ongoing")
        {
            var queryString1 =`SELECT *
            FROM tbl_projectdetail
            WHERE year(date_actualStartApp) = "${ryear}" AND (month(date_actualStartApp) = "${rmonth}" OR month(date_actualEndApp) = "${rmonth}" ) `
            db.query(queryString1, (err, results1, fields) => {
            console.log(results1);
            if (err) console.log(err);
                return res.send({tbl_project:results1});

            });
        }
        else if(rstatus=="Releasing")
        {
            var queryString1 =`SELECT *
            FROM tbl_projectdetail
            WHERE year(date_actualEndApp) = "${ryear}" AND (month(date_actualEndApp) = "${rmonth}" OR month(date_actualClosing) = "${rmonth}" ) `
            db.query(queryString1, (err, results1, fields) => {
            console.log(results1);
            if (err) console.log(err);
                return res.send({tbl_project:results1});

            });
        }
        if(rstatus=="Finished")
        {
            var queryString1 =`SELECT *
            FROM tbl_projectdetail
            WHERE year(date_actualClosing) = "${ryear}" AND month(date_actualClosing) = "${rmonth}" `
            db.query(queryString1, (err, results1, fields) => {
            console.log(results1);
            if (err) console.log(err);
                return res.send({tbl_project:results1});

            });
        }
        
    }

    



});

module.exports = router;