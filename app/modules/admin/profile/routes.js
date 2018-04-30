var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();

router.get('/',(req, res) => {
    console.log('=================================');
    console.log('ADMIN PROFILE');
    console.log('=================================');
   
    var queryString =`SELECT * FROM tbl_user WHERE int_userID = ?`
    db.query(queryString,[req.session.user.int_userID], (err, results, fields) => {
        if (err) console.log(err);
        console.log(results);
        res.render('admin/profile/views/index', {tbl_user:results});
    });
});

router.post('/editprofile', (req, res) => {
    console.log("============================");
    console.log('ADMIN EDITPROFILE:');
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
        
        return res.redirect('/admin/profile'); 
        
    });
});


module.exports = router;