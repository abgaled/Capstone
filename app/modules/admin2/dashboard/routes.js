var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();


router.get('/',(req, res) => {
    console.log('=================================');
    console.log('ADMIN: DASHBOARD');
    console.log('=================================');
   
    var queryString =`SELECT * FROM tbl_announcement`
    db.query(queryString, (err, results, fields) => {
        if (err) console.log(err);
        console.log(results);
        res.render('admin/dashboard/views/dashboard', {tbl_announcement:results,user:req.session.user});
    });
});

router.post('/', (req, res)=>{
    var queryString1 = ` INSERT INTO tbl_announcement(
    \`date_announceDate\`,
    \`varchar_announceTitle\`,
    \`varchar_announceContent\`,
    \`int_userID\`) 
    
    
    VALUES(
    "${req.body.date_announcementDate}",
    "${req.body.title}",
    "${req.body.post}",
    "${req.body.userid}")`;

   
    db.query(queryString1, (err, results1, fields) => {        
        if (err) throw err;    
        res.redirect('/admin');
    });
}); 



module.exports = router;