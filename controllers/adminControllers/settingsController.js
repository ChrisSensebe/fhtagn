/**
 * Created by csensebe on 31/01/2016.
 */
var express     = require('express');
var router      = express.Router();
var adminLayout = require('../../config/adminLayout');
var adminPages  = require('../../config/adminPages');

router.get('/', function(req, res){
    res.render('adminViews/settings', {
        adminLayout : adminLayout,
        page : adminPages.themePage
    });
});

router.post('/', function(req, res){
    res.redirect('/admin/siteSettings');
});

module.exports = router;