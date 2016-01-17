var Post      = require('../models/post.js');
var siteTexts = require('../config/siteTexts.js');

// find last ten posts in database, render site homepage
exports.getHome = function (req, res, next){
    // populate page content
    var pageContent = {
        siteTitle : siteTexts.siteTitle,
        linkToAdminTitle : siteTexts.linkToAdminTitle,
        menuTitles : siteTexts.menuTitles,
        pageTitle : siteTexts.homePage.pageTitle,
        createdText : siteTexts.homePage.pageContent.createdText,
        authorText : siteTexts.homePage.pageContent.authorText,
        tagsText : siteTexts.homePage.pageContent.tagsText,
        footerText : siteTexts.footerText
    };
    // fetch 10 last posts from database
    Post.find().sort('-created').limit(10).exec(function(err, docs){
        if(err){
            return next(err);
        }
        // add posts to page content
        pageContent.posts = docs;
        res.render('siteViews/index', {
            pageContent : pageContent
        });
    });
};
// get post by id
exports.getPostById = function(req,res, next){
    // get post id from url
    var id = req.params.id;
    // populate page content
    var pageContent = {
        siteTitle : siteTexts.siteTitle,
        linkToAdminTitle : siteTexts.linkToAdminTitle,
        menuTitles : siteTexts.menuTitles,
        createdText : siteTexts.postPage.pageContent.createdText,
        authorText : siteTexts.postPage.pageContent.authorText,
        footerText : siteTexts.footerText
    };
    // find post in database, render post page
    Post.findOne({_id : id}, function(err, doc){
        if(err){
            return next(err);
        }
        // add post to page content
        pageContent.post = doc;
        res.render('siteViews/post', {
            pageContent : pageContent
        });
    });
};
// get tags page
exports.getTags = function(req ,res){
    res.render('siteViews/tags', {
        pageContent : {
            siteTitle : siteTexts.siteTitle,
            linkToAdminTitle : siteTexts.linkToAdminTitle,
            menuTitles : siteTexts.menuTitles,
            pageTitle : siteTexts.tagsPage.pageTitle,
            footerText : siteTexts.footerText
        }
    });
};
// get archives page
exports.getArchives = function(req ,res){
    // populate page content
    var pageContent = {
        siteTitle : siteTexts.siteTitle,
        linkToAdminTitle : siteTexts.linkToAdminTitle,
        menuTitles : siteTexts.menuTitles,
        pageTitle : siteTexts.archivesPage.pageTitle,
        createdText : siteTexts.archivesPage.pageContent.createdText,
        authorText : siteTexts.archivesPage.pageContent.authorText,
        tagsText : siteTexts.archivesPage.pageContent.tagsText,
        footerText : siteTexts.footerText
    }
    // find all posts in database, render archives page
    Post.find().sort('-created').exec(function(err, docs){
        if(err){
            return next(err);
        }
        // add posts to pageContents
        pageContent.posts = docs;
        res.render('siteViews/archives', {
            pageContent : pageContent
        });
    });
};
// get about page
exports.getAbout = function(req, res){
    // render about page
    res.render('siteViews/about', {
        pageContent : {
            siteTitle : siteTexts.siteTitle,
            linkToAdminTitle : siteTexts.linkToAdminTitle,
            menuTitles : siteTexts.menuTitles,
            pageTitle : siteTexts.aboutPage.pageTitle,
            footerText : siteTexts.footerText
        }
    });
};
// get login page
exports.getLogin = function(req, res){
    // render login page
    res.render('siteViews/login', {
        pageContent : {
            siteTitle : siteTexts.siteTitle,
            linkToAdminTitle : siteTexts.linkToAdminTitle,
            menuTitles : siteTexts.menuTitles,
            pageTitle : siteTexts.loginPage.pageTitle,
            labelForUsername : siteTexts.loginPage.pageContent.labelForUsername,
            labelForPassword : siteTexts.loginPage.pageContent.labelForPassword,
            loginButtonText : siteTexts.loginPage.pageContent.loginButtonText,
            footerText : siteTexts.footerText
        }
    });
};