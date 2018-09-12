var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();
var moment = require('moment');



router.get('/',(req,res) => {
    console.log('=================================');
    console.log('BARANGAY: PROBLEM STATEMENT-PREVIOUS');
    console.log('=================================');

    var barangayQuery = `SELECT * 
    FROM tbl_barangay br
    JOIN tbl_barangayuser bru
    ON br.int_barangayID = bru.int_barangayID
    WHERE bru.int_userID = ${req.session.barangay.int_userID}`

    db.query(barangayQuery, (err, barangay, fields) => {        
        if (err) throw err;

        var barangayFinal = barangay[0];

        var queryString = `SELECT * FROM tbl_problemstatement pr
        JOIN tbl_category cat ON pr.int_categoryID=cat.int_categoryID WHERE 
        pr.int_barangayID=${barangayFinal.int_barangayID} ORDER BY pr.int_statementID DESC `


        db.query(queryString,(err, results, fields) => {
            if (err) console.log(err);

            var date_results = results;

            for (var i = 0; i < date_results.length;i++){
                date_results[i].date_createdDate = moment(date_results[i].date_createdDate).format('MM-DD-YYYY');
            }
            console.log(results);

            var queryString1 = `SELECT * FROM tbl_notification 
            JOIN tbl_user ON tbl_notification.int_notifSenderID = tbl_user.int_userID 
            WHERE tbl_notification.int_notifReceiverID=${req.session.barangay.int_userID}
            AND enum_notifStatus = "New"
            ORDER BY tbl_notification.int_notifID DESC`

            db.query(queryString1,(err, notifications) => {
                if (err) console.log(err);
                console.log('=================================');
                console.log('BARANGAY: NOTIFICATIONS - GET NOTIFICATIONS - DATA');
                console.log('=================================');
                console.log(notifications)
        
                var countrow = notifications.length;

                var queryString2 = `SELECT * FROM tbl_category`
        
                db.query(queryString2,(err, results2) => {
        
                    if (err) console.log(err);
                    console.log('=================================');
                    console.log('BARANGAY: GET PROJECT CATEGORY');
                    console.log('=================================');
                
        
                    res.render('barangay/problemstatement/views/problemstatement',{
                        tbl_problemstatement:results,
                        tbl_projectcategory:results2,
                        notifications:notifications,
                        numbernotif:countrow});
                });
            });
        });
    });
});

router.post('/',(req, res) => {
    console.log("===============================createdValue");
    console.log(`${req.body.problem_createdValue}`);
    console.log("===============================createdValue");

        var barangayQuery = `SELECT br.int_barangayID 
        FROM tbl_barangay br
        JOIN tbl_barangayuser bru
        ON br.int_barangayID = bru.int_barangayID
        WHERE bru.int_userID = ${req.session.barangay.int_userID}`

        db.query(barangayQuery, (err, results1, fields) => {        
            if (err) throw err;

        var results1Final = results1[0];
        console.log(results1Final);

        var queryString = `INSERT INTO \`tbl_problemstatement\` 
        (\`int_barangayID\`, 
        \`int_categoryID\`,
        \`varchar_statementTitle\`,
        \`text_statementContent\`,
        \`date_createdDate\`,
        \`enum_problemStatus\`)
        VALUES
        (${results1Final.int_barangayID},
        "${req.body.problem_category}",
        "${req.body.problem_title}",
        "${req.body.problem_description}",
        "${req.body.problem_createdValue}",
        "Submitted");`;

        console.log('=================================');
        console.log('BARANGAY: PROBLEM STATEMENT-NEW?POST');
        console.log('=================================');

            db.query(queryString, (err, results2, fields) => {        
                
                
            
                res.redirect('problemstatement');
            
            });
        });
    
});

// VIEW PROBLEM STATEMENT
router.post('/ajaxgetdetails',(req,res) => {
    console.log('=================================');
    console.log('BARANGAY: PROBLEM STATEMENT-PREVIOUS-AJAX GET DETAILS (POST)');
    console.log('=================================');
    console.log(`${req.body.ajStatementID}`);

    var barangayQuery = `SELECT br.int_barangayID 
    FROM tbl_barangay br
    JOIN tbl_barangayuser bru
    ON br.int_barangayID = bru.int_barangayID
    WHERE bru.int_userID = ${req.session.barangay.int_userID}`

        db.query(barangayQuery, (err, barangay, fields) => {        
            if (err) throw err;

            var barangayFinal = barangay[0];

            var queryString = `SELECT * FROM tbl_problemstatement pr
            JOIN tbl_category cat ON pr.int_categoryID=cat.int_categoryID WHERE 
            pr.int_barangayID=${barangayFinal.int_barangayID} 
            AND pr.int_statementID = ${req.body.ajStatementID}`


            db.query(queryString,(err, results, fields) => {
                if (err) console.log(err);

                console.log(results);

                var date_results = results;

                for (var i = 0; i < date_results.length;i++){
                    date_results[i].date_createdDate = moment(date_results[i].date_createdDate).format('MM-DD-YYYY');
                }

                var resultss = results[0];

                console.log("===================RESULTSS")
                console.log(resultss)

                return res.send({tbl_problemstatement1:resultss});
            });
        });
});


// FOR NOTIFICATIONS (VIEW SPECIFIC PROBLEM STATEMENT)
router.get('/view',(req,res) => {
    console.log("PROBLEM STATEMENT: NOTIFICATIONS - SPECIFIC")
    console.log(req.session.barangay.int_linkID)

    var queryString1 = `SELECT * FROM tbl_notification 
    JOIN tbl_user ON tbl_notification.int_notifSenderID = tbl_user.int_userID 
    WHERE tbl_notification.int_notifReceiverID=${req.session.barangay.int_userID}
    AND enum_notifStatus = "New"
    ORDER BY tbl_notification.int_notifID DESC`

    db.query(queryString1,(err, notifications) => {
        if (err) console.log(err);
        console.log('=================================');
        console.log('BARANGAY: NOTIFICATIONS - GET NOTIFICATIONS - DATA');
        console.log('=================================');
        console.log(notifications)
    
        var countrow = notifications.length;

        var queryString2 = `SELECT * FROM tbl_problemstatement
        WHERE int_barangayID = ${req.session.barangay.int_userID}
        AND int_statementID = ${req.session.barangay.int_linkID}`

        db.query(queryString2,(err, viewspecific) => {
            var view = viewspecific[0];

            res.render('barangay/problemstatement/views/notif-problemstatement',{
                view:view,
                notifications:notifications,
                numbernotif:countrow});
        }); 
    });
});

module.exports = router;