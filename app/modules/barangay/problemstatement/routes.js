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
        JOIN tbl_officialsaccount offacc
        ON br.int_barangayID = offacc.int_officialsID
        WHERE offacc.int_userID = ${req.session.barangay.int_userID}`

    db.query(barangayQuery, (err, barangay, fields) => {        
        if (err) throw err;

        var barangayFinal = barangay[0];

        var queryString = `SELECT * FROM tbl_intentstatement pr
            JOIN tbl_category cat ON pr.int_categoryID=cat.int_categoryID WHERE 
            pr.int_barangayID=${barangayFinal.int_barangayID} ORDER BY pr.int_statementID DESC `


        db.query(queryString,(err, results, fields) => {
            if (err) console.log(err);

            for (var i = 0; i < results.length;i++){
                results[i].date_createdDate = moment(results[i].date_createdDate).format('MMMM DD[,] YYYY');
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
                        
                        // START OF TABS QUERY (SOI STATUS)
                        var statusSubmitted = `SELECT * 
                        FROM tbl_intentstatement 
                        WHERE enum_problemStatus = "Submitted"
                        AND int_barangayID = ${barangayFinal.int_barangayID}`

                        db.query(statusSubmitted,(err, submitted) => {
            
                            if (err) console.log(err);

                            for (var i = 0; i < submitted.length;i++){
                                submitted[i].date_createdDate = moment(submitted[i].date_createdDate).format('MMMM DD[,] YYYY');
                            }

                            var statusAcknowledged = `SELECT * 
                            FROM tbl_intentstatement 
                            WHERE enum_problemStatus = "Acknowledged"
                            AND int_barangayID = ${barangayFinal.int_barangayID}`

                            db.query(statusAcknowledged,(err, acknowledged) => {
                
                                if (err) console.log(err);

                                for (var i = 0; i < acknowledged.length;i++){
                                    acknowledged[i].date_createdDate = moment(acknowledged[i].date_createdDate).format('MMMM DD[,] YYYY');
                                }

                                var statusRejected = `SELECT * 
                                FROM tbl_intentstatement 
                                WHERE enum_problemStatus = "Rejected"
                                AND int_barangayID = ${barangayFinal.int_barangayID}`
    
                                db.query(statusRejected,(err, rejected) => {
                    
                                    if (err) console.log(err);

                                    for (var i = 0; i < rejected.length;i++){
                                        rejected[i].date_createdDate = moment(rejected[i].date_createdDate).format('MMMM DD[,] YYYY');
                                    }

                                    var statusSolved = `SELECT * 
                                    FROM tbl_intentstatement 
                                    WHERE enum_problemStatus = "Solved"
                                    AND int_barangayID = ${barangayFinal.int_barangayID}`
        
                                    db.query(statusSolved,(err, solved) => {
                                        
                                        if (err) console.log(err);

                                        for (var i = 0; i < solved.length;i++){
                                            solved[i].date_createdDate = moment(solved[i].date_createdDate).format('MMMM DD[,] YYYY');
                                        }
                            
            
                                        res.render('barangay/problemstatement/views/problemstatement',{
                                            tbl_problemstatement:results,
                                            tbl_projectcategory:results2,
                                            tbl_beneficiary:results3,
                                            tbl_submitted:submitted,
                                            tbl_acknowledged:acknowledged,
                                            tbl_rejected:rejected,
                                            tbl_solved:solved,
                                            notifications:notifications,
                                            numbernotif:countrow});
                                    });
                                });
                            });
                        });
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
        JOIN tbl_officialsaccount offacc
        ON br.int_barangayID = offacc.int_officialsID
        WHERE offacc.int_userID = ${req.session.barangay.int_userID}`;

    db.query(barangayQuery, (err, results1, fields) => {        
        if (err) throw err;

        var results1Final = results1[0];
        console.log(results1Final);

        var queryString = `INSERT INTO \`tbl_intentstatement\` 
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
            "Submitted")`;

        console.log("PROJECT BENEFICIARY:");
        var beneficiaries = req.body.projectbeneficiaries;
        console.log(beneficiaries);

        console.log('=================================');
        console.log('BARANGAY: PROBLEM STATEMENT-NEW?POST');
        console.log('=================================');

        db.query(queryString, (err, results2, fields) => {        

            var queryString2 = `SELECT * FROM tbl_intentstatement ORDER BY int_statementID DESC LIMIT 0,1`;

            db.query(queryString2, (err, results3, fields) => {  
                if(err) console.log(err);

                var statementID = results3[0];

                for(var j = 0 ; j < beneficiaries.length ; j++ ) 
                {
                    console.log(j);
                    console.log(beneficiaries[j]);
                    
                    var insertBeneficiaries = `INSERT INTO \`tbl_projectbeneficiary\`
                        (
                            \`int_linkID\`,
                            \`int_beneficiaryID\`,
                            \`enum_beneficiaryLink\`
                        )

                        VALUES
                        (
                            "${statementID.int_statementID}",
                            "${beneficiaries[j]}",
                            "Intent Statement"
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
        JOIN tbl_officialsaccount offacc
        ON br.int_barangayID = offacc.int_officialsID
        WHERE offacc.int_userID = ${req.session.barangay.int_userID}`;

    db.query(barangayQuery, (err, barangay, fields) => {        
        if (err) throw err;

        var barangayFinal = barangay[0];

        var queryString = `SELECT * FROM tbl_intentstatement pr
            JOIN tbl_category cat ON pr.int_categoryID=cat.int_categoryID WHERE 
            pr.int_barangayID=${barangayFinal.int_barangayID} 
                AND pr.int_statementID = ${req.body.ajStatementID}`


        db.query(queryString,(err, results, fields) => {
            if (err) console.log(err);

            var resultss = results[0];

            for (var i = 0; i < resultss.length;i++){
                resultss[i].date_createdDate = moment(resultss[i].date_createdDate).format('MMMM DD[,] YYYY');
            }

            console.log("===================RESULTSS")
            console.log(resultss)
            
            return res.send({
                tbl_problemstatement1:resultss
            });
        });
    });
});

router.post('/ajaxbeneficiary', (req,res) => {
    console.log('=================================');
    console.log('OFFICE: PROBLEM STATEMENT-PREVIOUS-AJAX GET DETAILS (POST)');
    console.log('=================================');
    console.log(`${req.body.statementID}`);

    var beneQuery = `SELECT B.varchar_beneficiaryName
        FROM tbl_beneficiary B JOIN tbl_projectbeneficiary PB
            ON B.int_beneficiaryID=PB.int_beneficiaryID
        WHERE PB.int_linkID = ${req.body.statementID} AND PB.enum_beneficiaryLink='Intent Statement'`;
    
    db.query(beneQuery,(err, results1, fields) => {
        if (err) console.log(err);
        console.log(results1);

        return res.send({
            tbl_beneficiary: results1
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
                numbernotif:countrow
            });
        }); 
    });
});

module.exports = router;