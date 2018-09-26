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

                var queryString2 = `SELECT * 
                FROM tbl_category
                WHERE enum_categoryStatus = "Active"`
        
                db.query(queryString2,(err, results2) => {
        
                    if (err) console.log(err);
                    console.log('=================================');
                    console.log('BARANGAY: GET PROJECT CATEGORY');
                    console.log('=================================');

                    var queryString3 = `SELECT * 
                    FROM tbl_beneficiary 
                    WHERE enum_beneficiaryStatus = "Active"`
    
                    db.query(queryString3,(err, results3) => {
            
                        if (err) console.log(err);
                        console.log('=================================');
                        console.log('BARANGAY: GET PROJECT BENEFICIARY');
                        console.log('=================================');
                        console.log(results3);
                        
        
                        res.render('barangay/problemstatement/views/problemstatement',{
                            tbl_problemstatement:results,
                            tbl_projectcategory:results2,
                            tbl_beneficiary:results3,
                            notifications:notifications,
                            numbernotif:countrow});
                    });
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
        \`varchar_residentName\`,
        \`text_residentAddress\`,
        \`enum_problemStatus\`)
        VALUES
        (${results1Final.int_barangayID},
        "${req.body.problem_category}",
        "${req.body.problem_title}",
        "${req.body.problem_description}",
        "${req.body.problem_createdValue}",
        "${req.body.residentName}",
        "${req.body.residentAddress}",
        "Submitted");`;

       

        console.log("PROJECT BENEFICIARY:");
        var beneficiaries = req.body.projectbeneficiaries;
        console.log(beneficiaries);

        console.log('=================================');
        console.log('BARANGAY: PROBLEM STATEMENT-NEW?POST');
        console.log('=================================');

            db.query(queryString, (err, results2, fields) => {        

                var queryString2 = `SELECT * FROM tbl_problemstatement ORDER BY int_statementID DESC LIMIT 0,1`;

                db.query(queryString2, (err, results3, fields) => {  
                    console.log("RESULTS 3");
                    console.log(results3);
                    console.log("===============results3")
                    
                    
                    var statementID = results3[0];
                    console.log(statementID.int_statementID);
                    // console.log(results3.int_statementID);
                    console.log("==============INSERT PROJECT BENEFICIARIES====================");

                    console.log(beneficiaries);
                    console.log(beneficiaries.length);

                    for(var j = 0 ; j < beneficiaries.length ; j++ ) 
                    {
                        console.log(j);
                        console.log(beneficiaries[j]);
                        
                        var insertBeneficiaries = `INSERT INTO \`tbl_projectbeneficiary\`
                            (
                                \`int_projectID\`,
                                \`int_beneficiaryID\`,
                                \`enum_beneficiaryLink\`
                            )

                            VALUES
                            (
                                "${statementID.int_statementID}",
                                "${beneficiaries[j]}",
                                "Problem Statement"
                            )`;

                        db.query(insertBeneficiaries, (err, insertResult) => {        
                            if (err) throw err;
                            console.log(insertResult);
                        });
                    }
            
                    res.redirect('problemstatement');
                });
            
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
                
                var queryStringben = `SELECT * FROM tbl_projectbeneficiary pb
                JOIN tbl_beneficiary bf ON pb.int_beneficiaryID=bf.int_beneficiaryID WHERE 
                pb.enum_beneficiaryLink = "Problem Statement"
                AND pb.int_projectID = ${req.body.ajStatementID}`

                db.query(queryStringben,(err, resultsben, fields) => {
                    if (err) console.log(err);
    
                    console.log(resultsben);

                    return res.send({tbl_problemstatement1:resultss});
                });
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