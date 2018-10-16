var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();
var moment = require("moment");
var cityID;

router.get('/', (req, res) => {

    var cityIdQuery = `SELECT C.int_cityID
        FROM tbl_officialsaccount offacc JOIN tbl_city C 
            ON offacc.int_officialsID=C.int_cityID
        WHERE offacc.int_userID=${req.session.office.int_userID}`

    db.query(cityIdQuery, (err, cityResult, fields) => {
        if (err) console.log(err);

        cityID = cityResult[0];

        var ongoingProjQuery = `SELECT * FROM tbl_projectdetail
            WHERE int_cityID = ${cityID.int_cityID} 
                AND enum_projectStatus = 'Ongoing'`;

        var finishedProjQuery = `SELECT * FROM tbl_projectdetail
            WHERE int_cityID = ${cityID.int_cityID} 
                AND enum_projectStatus = 'Finished'`;

        var createdProjQuery = `SELECT * FROM tbl_projectdetail
            WHERE int_cityID = ${cityID.int_cityID} 
                AND enum_projectStatus = 'Created'`;

        var releasingProjQuery = `SELECT * FROM tbl_projectdetail
            WHERE int_cityID = ${cityID.int_cityID} 
                AND enum_projectStatus = 'Releasing'`;

        var numAppOngoing = `SELECT varchar_projectName, COUNT(*) AS 'int_count'
            FROM tbl_projectdetail PD JOIN tbl_application A
            ON PD.int_projectID=A.int_projectID
            WHERE PD.enum_projectStatus='Ongoing' AND A.enum_applicationStatus='Approved' AND PD.int_cityID=${cityID.int_cityID}
            GROUP BY varchar_projectName`;

        var receivedBene = `SELECT varchar_projectName, COUNT(*) AS 'int_count'
            FROM tbl_projectdetail PD JOIN tbl_application A
            ON PD.int_projectID=A.int_projectID
            WHERE PD.enum_projectStatus='Releasing' AND A.enum_applicationStatus='Received' AND PD.int_cityID=${cityID.int_cityID}
            GROUP BY varchar_projectName`;

        var intentCount = `SELECT varchar_barangayName, COUNT(*) AS 'int_count'
            FROM tbl_barangay B JOIN tbl_intentstatement ISS
            ON B.int_barangayID=ISS.int_barangayID
            WHERE B.int_cityID = ${cityID.int_cityID} AND (ISS.enum_problemStatus = 'Submitted' OR ISS.enum_problemStatus = 'Acknowledged' OR ISS.enum_problemStatus = 'Solved')
            GROUP BY varchar_barangayName
            ORDER BY COUNT(*) desc`

        var intentAckCount = `SELECT varchar_barangayName, COUNT(*) AS 'int_count'
            FROM tbl_barangay B JOIN tbl_intentstatement ISS
            ON B.int_barangayID=ISS.int_barangayID
            WHERE B.int_cityID = ${cityID.int_cityID} AND ISS.enum_problemStatus = 'Acknowledged'
            GROUP BY varchar_barangayName
            ORDER BY COUNT(*) desc`

        var intentSolvedCount = `SELECT varchar_barangayName, COUNT(*) AS 'int_count'
            FROM tbl_barangay B JOIN tbl_intentstatement ISS
            ON B.int_barangayID=ISS.int_barangayID
            WHERE B.int_cityID = ${cityID.int_cityID} AND ISS.enum_problemStatus = 'Solved'
            GROUP BY varchar_barangayName
            ORDER BY COUNT(*) desc`

        db.query(ongoingProjQuery, (err, ongoingProjResult, fields) => {
            if (err) console.log(err); 

            db.query(finishedProjQuery, (err, finishedProjResult, fields) => {
                if (err) console.log(err); 

                for (var i = 0; i < finishedProjResult.length; i++) {
                    finishedProjResult[i].date_actualClosing = moment(finishedProjResult[i].date_actualClosing).format('MMMM DD[,] YYYY');
                }

                db.query(createdProjQuery, (err, createdProjResult, fields) => {
                    if (err) console.log(err); 

                    for (var i = 0; i < createdProjResult.length; i++) {
                        createdProjResult[i].date_createdDate = moment(createdProjResult[i].date_createdDate).format('MMMM DD[,] YYYY');
                        console.log(createdProjResult[i].date_createdDate);
                    }

                    db.query(releasingProjQuery, (err, releasingProjResult, fields) => {
                        if (err) console.log(err); 

                        db.query(numAppOngoing, (err, numAppOngoingResult, fields) => {
                            if (err) console.log(err);

                            db.query(receivedBene, (err, receivedBeneResult, fields) => {
                                if (err) console.log(err);

                                db.query(intentCount, (err, intentCountResult, fields) => {
                                    if (err) console.log(err);

                                    db.query(intentAckCount, (err, intentAckCountResult, fields) => {
                                        if (err) console.log(err);

                                        db.query(intentSolvedCount, (err, intentSolvedCountResult, fields) => {
                                            if (err) console.log(err);
            
                                            res.render('office/queries/views/queries1', {
                                                tbl_ongoingproject: ongoingProjResult,
                                                tbl_finishedproject: finishedProjResult,
                                                tbl_createdproject: createdProjResult,
                                                tbl_releasingproject: releasingProjResult,
                                                tbl_appongoing: numAppOngoingResult,
                                                tbl_receivedbene: receivedBeneResult,
                                                tbl_releasecounts: intentCountResult,
                                                tbl_acknowledgedcount: intentAckCountResult,
                                                tbl_solvedcount: intentSolvedCountResult
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
    });

   
});

router.get('/finishedprojects',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: QUERIES');
    console.log('=================================');

    var queryString =`SELECT * FROM tbl_projectdetail
    WHERE enum_projectStatus = "Finished"`;

    db.query(queryString, (err, results, fields) => {
        console.log(results);
        if (err) console.log(err);
        
        res.render('office/queries/views/finishedprojects', {
            tbl_finished: results
        }); 
    });

});

router.get('/approvedApp',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: QUERIES');
    console.log('=================================');

    var queryString =`SELECT * FROM tbl_application APP
    JOIN tbl_personalinformation pi ON APP.int_applicationID = pi.int_applicationID
    WHERE APP.enum_applicationType = "Resident"`;

    db.query(queryString, (err, results, fields) => {
        console.log(results);
        if (err) console.log(err);
        
        res.render('office/queries/views/approvedapp', {
            tbl_resAPP: results
        }); 
    });

});

router.get('/householdApp',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: QUERIES');
    console.log('=================================');

    var queryString =`SELECT * FROM tbl_application APP
    JOIN tbl_householdapplication ha ON APP.int_applicationID = ha.int_applicationID
    WHERE APP.enum_applicationType = "Household"`;

    db.query(queryString, (err, results, fields) => {
        console.log(results);
        if (err) console.log(err);
        
        res.render('office/queries/views/householdapp', {
            tbl_houseAPP: results
        }); 
    });

});

router.get('/barangayBen',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: QUERIES');
    console.log('=================================');

    var queryString =`SELECT * FROM tbl_barangaybeneficiary`;

    db.query(queryString, (err, results, fields) => {
        console.log(results);
        if (err) console.log(err);
        
        res.render('office/queries/views/barangayBen', {
            tbl_barBen: results
        }); 
    });

});

module.exports = router;