module.exports = (req, res) => {
    console.log(req.session);
    
    if (typeof process.env.ENABLE_DATABASE !== 'undefined' && process.env.ENABLE_DATABASE === 'false') {
        
        return render([]);
    }

    var db = require('../../../lib/database')();

    db.query('SELECT * FROM tbl_user', function (err, results, fields) {
        
        if (err) return res.send(err);

        render(results);
    });

    function render() {
        res.render('../../auth/views/index');
    }
}