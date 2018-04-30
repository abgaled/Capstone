
var express = require('express');

var router = express.Router();

var authMiddleware = require('../auth/middlewares/auth');

router.use(authMiddleware.hasAuth);

var indexController = require('./controllers/index');
router.get('/', indexController);

exports.index = router;