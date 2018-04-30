var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();

router.get('/',(req, res) => {
    console.log('=================================');
    console.log('STAFF:PROFILE');
    console.log('=================================');
   
    var queryString =`SELECT * FROM tbl_user WHERE int_userID=${req.session.user.int_userID}`
    db.query(queryString,[req.session.user.int_collegeID], (err, results, fields) => {
        if (err) console.log(err);
        console.log(results);
        res.render('staff/profile/views/index', {tbl_user:results});
    });
});

router.post('/editprofile', (req, res) => {
    console.log("============================");
    console.log('STAFF EDITPROFILE:');
    console.log("============================");
   

    
    

    db.query(queryString1, (err, results, fields) => {        
        if (err) throw err;         
            
            return res.redirect('/staff/profile'); 
        
    
});
});

module.exports = router;