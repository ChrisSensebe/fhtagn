var Post     = require('../models/post.js');
var siteConf = require('../config/siteConfig.js');

// find last ten posts in database, render site homepage
exports.getHome = function (req, res, next){
    Post.find().sort('-created').limit(10).exec(function(err, docs){
        if(err){
            return next(err);
        }
        res.render('siteViews/index', {
            title : siteConf.siteConfig.homePage.pageTitle,
            pageTitle : siteConf.siteConfig.homePage.pageTitle,
            posts : docs
        });
    });
};
// get post by id
exports.getPostById = function(req,res, next){
    // get post id from url
    var id = req.params.id;
    // find post in database, render post page
    Post.findOne({_id : id}, function(err, doc){
        if(err){
            return next(err);
        }
        res.render('siteViews/post', {
            title : siteConf.siteConfig.siteTitle,
            post : doc
        });
    });
};
// get tags page
exports.getTags = function(req ,res){
    res.render('siteViews/tags', {
        title : siteConf.siteConfig.siteTitle,
        pageTitle : siteConf.siteConfig.tagsPage.pageTitle
    });
};
// get archives page
exports.getArchives = function(req ,res){
    // find all posts in database, render archives page
    Post.find().sort('-created').exec(function(err, docs){
        if(err){
            return next(err);
        }
        res.render('siteViews/archives', {
            title : siteConf.siteConfig.siteTitle,
            pageTitle : siteConf.siteConfig.archivesPage.pageTitle,
            posts : docs
        });
    });
};
// get about page
exports.getAbout = function(req, res){
    // render about page
    res.render('siteViews/about', {
        title : siteConf.siteConfig.siteTitle,
        pageTitle : siteConf.siteConfig.aboutPage.pageTitle
    });
};
// get login page
exports.getLogin = function(req, res){
    // render login page
    res.render('siteViews/login', {
        title : siteConf.adminConfig.siteTitle,
        pageTitle : siteConf.adminConfig.loginPage.pageTitle
    });
};