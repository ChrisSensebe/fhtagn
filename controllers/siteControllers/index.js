/**
 * Created by csensebe on 29/01/2016.
 */
var express = require('express');
var router  = express.Router();

router.use('/', require('./homeController.js'));

module.exports = router;