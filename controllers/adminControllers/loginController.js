/**
 * Created by csensebe on 29/01/2016.
 */
var express    = require('express');
var router     = express.Router();
var adminLayout = require('../../config/adminLayout');
var adminPages  = require('../../config/adminPages');

router.get('/', function(req, res){

    var pageContent = {
        adminLayout : adminLayout,
        page : adminPages.loginPage
    };
    res.render('adminViews/login', pageContent);
});

module.exports = router;