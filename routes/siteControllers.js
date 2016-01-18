var Post       = require('../models/post.js');
var siteLayout = require('../config/siteLayout.js');
var pages      = require('../config/sitePages.js');

// find last ten posts in database, render site homepage
exports.getHome = function (req, res, next){
    // populate page content
    var pageContent = {
        siteLayout : siteLayout,
        page : pages.homePage
    };
    // fetch 10 last posts from database
    Post.find().sort('-created').limit(10).exec(function(err, docs){
        if(err){
            return next(err);
        }
        // add posts to page content
        pageContent.page.posts = docs;
        res.render('siteViews/index', pageContent);
    });
};
// get post by id
exports.getPostById = function(req,res, next){
    // get post id from url
    var id = req.params.id;
    // populate page content
    var pageContent = {
        siteLayout :siteLayout,
        page : pages.postPage
    };
    // find post in database, render post page
    Post.findOne({_id : id}, function(err, doc){
        if(err){
            return next(err);
        }
        // add post to page content
        pageContent.page.post = doc;
        res.render('siteViews/post', pageContent);
    });
};
// get tags page
exports.getTags = function(req ,res){
    res.render('siteViews/tags', {
        siteLayout : siteLayout,
        page : pages.tagsPage
    });
};
// get archives page
exports.getArchives = function(req ,res){
    // populate page content
    var pageContent = {
        siteLayout : siteLayout,
        page : pages.archivesPage
    };
    // find all posts in database, render archives page
    Post.find().sort('-created').exec(function(err, docs){
        if(err){
            return next(err);
        }
        // add posts to pageContents
        pageContent.page.posts = docs;
        res.render('siteViews/archives', pageContent);
    });
};
// get about page
exports.getAbout = function(req, res){
    // render about page
    res.render('siteViews/about', {
        siteLayout : siteLayout,
        page : pages.aboutPage
    });
};
// get login page
exports.getLogin = function(req, res){
    // render login page
    res.render('siteViews/login', {
        siteLayout : siteLayout,
        page : pages.loginPage
    });
};