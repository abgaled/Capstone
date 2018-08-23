var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();

router.get('/',(req, res) => {
    console.log('=================================');
    console.log('BUDGET: liquidation REPORTS');
    console.log('=================================');
    var queryString =`SELECT * FROM tbl_project pr
    JOIN tbl_projectproposal prpro 
    ON pr.int_projectID=prpro.int_projectID
    WHERE pr.enum_projectStatus = 'Finished' 
    ORDER BY pr.int_projectID DESC`

    
    db.query(queryString, (err, results, fields) => {
        console.log(results);
        if (err) console.log(err);

            var queryString2=`SELECT *, GROUP_CONCAT(DISTINCT varchar_categoryName) varchar_categoryName
                FROM tbl_projectcategory PC JOIN tbl_projectproposal PR ON pr.int_projectID=pc.int_projectID
                JOIN tbl_category C ON C.int_categoryID=PC.int_categoryID
                JOIN tbl_project P ON P.int_projectID = PR.int_projectID
                WHERE P.enum_projectStatus="Finished"
                GROUP BY P.int_projectID`;

        db.query(queryString2, (err, results2, fields) => {
            console.log("-----------RESULTS2")
            console.log(results2);

            res.render('budget/reports/views/reports',{
                tbl_project:results2});
        });
    });
});


module.exports = router;