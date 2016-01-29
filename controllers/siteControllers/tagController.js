/**
 * Created by csensebe on 29/01/2016.
 */
var express    = require('express');
var router     = express.Router();
var siteLayout = require('../../config/siteLayout.js');
var pages      = require('../../config/sitePages.js');

router.get('/', function(req ,res){
    res.render('siteViews/tags', {
        siteLayout : siteLayout,
        page : pages.tagsPage
    });
});

module.exports = router;