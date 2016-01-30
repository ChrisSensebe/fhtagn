/**
 * Created by csensebe on 29/01/2016.
 */
var express     = require('express');
var router      = express.Router();
var adminLayout = require('../../config/adminLayout');
var adminPages  = require('../../config/adminPages');
var passport    = require('passport');

router.get('/', function(req, res){

    var pageContent = {
        adminLayout : adminLayout,
        page : adminPages.loginPage
    };
    res.render('adminViews/login', pageContent);
});

router.post('/', passport.authenticate('local-login', {
    successRedirect : '/admin/',
    failureRedirect : '/login',
    failureFlash    : true
}));

module.exports = router;