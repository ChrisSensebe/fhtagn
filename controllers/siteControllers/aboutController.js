/**
 * Created by csensebe on 29/01/2016.
 */
var express    = require('express');
var router     = express.Router();
var siteLayout = require('../../config/siteLayout.js');
var pages      = require('../../config/sitePages.js');

router.get('/', function(req, res){
    // render about page
    res.render('siteViews/about', {
        siteLayout : siteLayout,
        page : pages.aboutPage
    });
});

module.exports = router;