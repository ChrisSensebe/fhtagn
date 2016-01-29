/**
 * Created by csensebe on 29/01/2016.
 */
var express    = require('express');
var router     = express.Router();
var Post       = require('../../models/post.js');
var siteLayout = require('../../config/siteLayout.js');
var pages      = require('../../config/sitePages.js');

exports.getPostById = function(req,res, next){

    var id = req.params.id;

    var pageContent = {
        siteLayout :siteLayout,
        page : pages.postPage
    };

    Post.findOne({_id : id}, function(err, doc){
        if(err){
            return next(err);
        }
        pageContent.page.post = doc;
        res.render('siteViews/post', pageContent);
    });
};

module.exports = router;
