/**
 * Created by csensebe on 29/01/2016.
 */
var express    = require('express');
var router     = express.Router();
var Post        = require('../../models/post');
var adminLayout = require('../../config/adminLayout');
var adminPages  = require('../../config/adminPages');

router.get('/', function(req, res, next){

    var pageContent = {
        adminLayout : adminLayout,
        page : adminPages.homePage
    };

    Post.find().sort('-created').exec(function(err, docs){
        if(err){
            return next(err);
        }
        pageContent.page.posts = docs;
        res.render('adminViews/adminHome', pageContent);
    });
});

module.exports = router;
