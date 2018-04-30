var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();

router.get('/',(req, res) => {
    console.log('=================================');
    console.log('STUDENT PROFILE:');
    console.log('=================================');
   
    var queryString =`SELECT * FROM tbl_user WHERE int_userID = ?`
    var queryString2 =`SELECT p.*, C.varchar_courseName FROM tbl_petition p, tbl_course C WHERE p.int_userID =${req.session.user.int_userID} && p.char_subjCode=C.char_courseCode`
    var queryString3 = `SELECT p.*, C.varchar_courseName FROM tbl_petition p, tbl_course C WHERE p.int_petitID IN(SELECT int_petitID FROM tbl_petitmemb WHERE int_userID=${req.session.user.int_userID}) && p.char_subjCode=C.char_courseCode;`
    var queryString4 = `SELECT DISTINCT tbl_schedsave.int_schedID FROM tbl_schedsave JOIN tbl_sched ON tbl_schedsave.int_schedID=tbl_sched.int_schedID WHERE int_userID = ${req.session.user.int_userID}`
    var queryString5 = `SELECT * 
    FROM tbl_sched
    WHERE int_schedID IN (SELECT DISTINCT int_schedID
    FROM tbl_schedSave
    WHERE int_userID=${req.session.user.int_userID});`

    db.query(queryString,[req.session.user.int_userID], (err, results1, fields) => {
        if (err) console.log(err);
        console.log(results1);

        db.query(queryString2, (err, results2, fields) => {
            if (err) console.log(err);
            console.log(results2);

            db.query(queryString3,(err, results3, fields) => {
                if (err) console.log(err);
                console.log(results3);

                db.query(queryString5,(err, results5, fields) => {
                    if (err) console.log(err);
                    console.log(results5);

                    res.render('student/profile/views/index', {tbl_user:results1,tbl_petition:results2,tbl_join:results3,tbl_savedsched:results5});
                })
            })
        })
    });
});

router.post('/editprofile', (req, res) => {
    console.log("============================");
    console.log('STUDENT EDITPROFILE:');
    console.log("============================");
    const queryString = `UPDATE tbl_user SET        
    varchar_userFName = ("${req.body.user_fname}"),
    varchar_userLName = ("${req.body.user_lname}"),
    varchar_userEmailAdd = ("${req.body.user_email}"),
    varchar_userPassword = ("${req.body.user_password}"),
    varchar_userAddress = ("${req.body.user_address}")
    WHERE int_userID = ${req.session.user.int_userID};`;

    db.query(queryString, (err, results, fields) => {        
        if (err) throw err;         
        
        return res.redirect('/student/profile'); 
        
    });
});

router.get('/:int_petitID/sendlist', (req, res) => {
    console.log("PUMASOK SA GET REQ.PARAMS")

    var queryString = `SELECT * FROM tbl_petition JOIN tbl_user ON tbl_petition.int_userID=tbl_user.int_userID
    WHERE int_petitID= ${req.params.int_petitID}`;

    var queryString1 = `SELECT * FROM tbl_petition JOIN tbl_petitmemb ON tbl_petition.int_petitID=tbl_petitmemb.int_petitID JOIN tbl_user ON tbl_petitmemb.int_userID=tbl_user.int_userID
    WHERE tbl_petition.int_petitID= ${req.params.int_petitID}`;
    
    db.query(queryString, (err, results, fields) => {        
        if (err) throw err;

        db.query(queryString1, (err, results1, fields) => {        
            if (err) throw err;

        res.render(`student/profile/views/sendlist`,{petition_list:results,petition_list1:results1});
        });
    });
});

router.get('/:int_petitID/sendlist/verify', (req, res) => {
    console.log("PUMASOK SA VERIFY LIST");
    console.log("SENDING TO OFFICE");


    var queryString = `UPDATE tbl_petition SET        
    varchar_petitStatus = ("Sending")
    WHERE int_petitID = ${req.params.int_petitID};`;


    
    db.query(queryString, (err, results, fields) => {        
        if (err) throw err;

        res.redirect('/student/profile');
    });
});

module.exports = router;