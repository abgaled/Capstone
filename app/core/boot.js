var morgan = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var methodOverride = require('method-override');
var session = require('express-session');

module.exports = app => {
    
    app.set('port', process.argv[2] || process.env.PORT || 3050);
    app.set('view engine', 'pug');
    app.set('views', path.join(path.dirname(__dirname), 'modules'));
    app.use(morgan('dev'));
    app.use(serveStatic(path.join(path.dirname(path.dirname(__dirname)), 'public')));
    app.use(session({
        resave: false,
        saveUninitialized: true,
        secret: 'WQcptX3p4W'
    }));

    app.use(methodOverride('X-HTTP-Method-Override'));
    app.use(methodOverride('_method'));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
}