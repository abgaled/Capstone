var express = require('express');
var homepage = express.Router();
// var staff = express.Router();
var signup = express.Router();
var logoutRouter = express.Router();
var authMiddleware = require('./middlewares/auth');
var db = require('../../lib/database')();


homepage.get('/',authMiddleware.noAuthed,(req, res) => {
    res.render('auth/views/index');
});

homepage.post('/', (req, res) =>{
    console.log('POST: Home Modal');

    var db = require('../../lib/database')();
    db.query(`SELECT * FROM tbl_user WHERE varchar_userEmail="${req.body.user_email}"`, (err, results, fields) => {
        if (err) throw err;
        if (results.length === 0) return res.redirect('/login?incorrect');

        var user = results[0];
        
        if (user.varchar_userPassword !== req.body.user_password) return res.redirect('/login?incorrect');
        
        if(user.varchar_userType == "Admin"){
            delete user.varchar_userPassword;
            req.session.user = user;
            console.log("Admin User:");
            console.log('Admin: '+user.varchar_userEmail);
            
            return res.redirect('/admin/dashboard');
            
        }
    
        if(user.varchar_userType == "Office Staff"){
            delete user.varchar_userPassword;
            req.session.user = user;
            console.log('Office Staff User:');
            return res.redirect('/office/home');
        }

        if(user.varchar_userType == "Barangay Staff"){
            delete user.varchar_userPassword;
            req.session.user = user;
            console.log('Barangay Staff User:');
            return res.redirect('/barangay/home');
        }

        if(user.varchar_userType == "Budget Staff"){
            delete user.varchar_userPassword;
            req.session.user = user;
            console.log('Budget Staff User:');
            return res.redirect('/budget/home');
        }

    });

});
// ----End login student


signup.get('/', (req,res) => {
    res.render('auth/views/signup');
});

signup.get('/1', (req,res) => {
    res.render('auth/views/signup1');
});

signup.get('/2', (req,res) => {
    res.render('auth/views/signup2');
});

signup.post('/1', (req, res) => {
    
    var queryString1 = `INSERT INTO \`tbl_user\`(\`varchar_userFName\`, \`varchar_userLName\`, \`varchar_userMName\`, \`varchar_userAddress\`,\`varchar_userEmail\`, \`varchar_userContact\`, \`varchar_userPassword\`, \`varchar_userType\`)
    VALUES
    ("${req.body.parent_fname}","${req.body.parent_lname}", "${req.body.parent_mname}",
    "${req.body.user_address}", "${req.body.user_email}", "${req.body.user_contact}", 
    "${req.body.user_password}","Parent")
    (SELECT * FROM tbl_student WHERE varchar_studentClass="${req.body.student_class}" AND varchar_studentFName="${req.body.student_fname}" AND varchar_studentLName="${req.body.student_lname}" AND varchar_studentLName="${req.body.student_lname}" AND char_studentStatus="Enrolled");`;

    
    db.query(queryString1, (err, results1, fields) => {
        if (err) throw err;
            console.log("===========================");
            console.log("Processing Registration Step 1 ...");
            console.log("===========================");
            db.query(queryString2, (err, results2, fields) => {
                if (err) throw err;
                    console.log("===========================");
                    console.log("Processing Registration Step 2 ...");
                    console.log("===========================");
                    var results2 = results2[0];

                   
                    console.log("Successfully Registered!");
                    res.redirect('/home');
            });
});
});


signup.post('/2', (req, res) => {
    
    var queryString1 = `INSERT INTO \`tbl_user\`(\`varchar_userFName\`, \`varchar_userLName\`, \`varchar_userMName\`, \`varchar_userAddress\`,\`varchar_userEmail\`, \`varchar_userContact\`, \`varchar_userPassword\`, \`varchar_userType\`)
    VALUES("${req.body.parent_fname}","${req.body.parent_lname}", "${req.body.parent_mname}","${req.body.user_address}", "${req.body.user_email}", "${req.body.user_contact}", "${req.body.user_password}","Parent");`;

    var queryString2 =`SELECT * FROM tbl_user ORDER BY int_userID DESC LIMIT 0,1`
    
    db.query(queryString1, (err, results1, fields) => {
        if (err) throw err;
            console.log("===========================");
            console.log("Processing Registration Step 1 ...");
            console.log("===========================");
            db.query(queryString2, (err, results2, fields) => {
                if (err) throw err;
                    console.log("===========================");
                    console.log("Processing Registration Step 2 ...");
                    console.log("===========================");
                    var results2 = results2[0];

                    var queryString3 = `INSERT INTO \`tbl_student\`(\`varchar_studentFName\`, \`varchar_studentLName\`, \`varchar_studentMName\`, \`date_studentBirthday\`,\`varchar_studentClass\`, \`char_studentStatus\`, \`int_userID\`, \`char_studentGender\`)
                    VALUES("${req.body.student_fname}","${req.body.student_lname}", "${req.body.student_mname}", "${req.body.student_birthday}", "${req.body.student_level}", "Enrollee", ${results2.int_userID}, "${req.body.student_gender}");`;
                
                    db.query(queryString3, (err, results3, fields) => {
                        if (err) throw err;
                            console.log("===========================");
                            console.log("Processing Registration Step 3 ...");
                            console.log("===========================");
                    console.log("Successfully Registered!");
                    res.redirect('/home');
                    });
            });
    });
    });

logoutRouter.get('/', (req, res) => {
    req.session.destroy(err => {
        if (err) throw err;
        console.log("===========================");
        console.log("Router: LOG OUT");
        console.log("===========================");
        res.redirect('/home');
    });
});



exports.home = homepage;
exports.signup = signup;
exports.logout = logoutRouter;