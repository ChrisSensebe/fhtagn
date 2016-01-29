var express    = require('express');
var router     = express.Router();
var Post       = require('../../models/post.js');
var siteLayout = require('../../config/siteLayout.js');
var pages      = require('../../config/sitePages.js');

router.get('/', function (req, res, next){

    var pageContent = {
        siteLayout : siteLayout,
        page : pages.homePage
    };

    Post.find().sort('-created').limit(10).exec(function(err, docs){
        if(err){
            return next(err);
        }
        pageContent.page.posts = docs;
        res.render('siteViews/index', pageContent);
    });
});

module.exports = router;