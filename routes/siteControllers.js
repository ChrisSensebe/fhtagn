var Post     = require('../models/post.js');
var siteConf = require('../config/siteConfig.js');

// find last ten posts in database, render site homepage
exports.getHome = function (req, res, next){
    // populate page content
    var pageContent = {
        siteTitle : siteConf.site.siteTitle,
        linkToAdminTitle : siteConf.site.linkToAdminTitle,
        menuTitles : siteConf.site.menuTitles,
        pageTitle : siteConf.site.homePage.pageTitle,
        createdText : siteConf.site.homePage.pageContent.createdText,
        authorText : siteConf.site.homePage.pageContent.authorText,
        tagsText : siteConf.site.homePage.pageContent.tagsText,
        footerText : siteConf.site.footerText
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
        siteTitle : siteConf.site.siteTitle,
        linkToAdminTitle : siteConf.site.linkToAdminTitle,
        menuTitles : siteConf.site.menuTitles,
        createdText : siteConf.site.postPage.pageContent.createdText,
        authorText : siteConf.site.postPage.pageContent.authorText,
        footerText : siteConf.site.footerText
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
            siteTitle : siteConf.site.siteTitle,
            linkToAdminTitle : siteConf.site.linkToAdminTitle,
            menuTitles : siteConf.site.menuTitles,
            pageTitle : siteConf.site.tagsPage.pageTitle,
            footerText : siteConf.site.footerText
        }
    });
};
// get archives page
exports.getArchives = function(req ,res){
    // populate page content
    var pageContent = {
        siteTitle : siteConf.site.siteTitle,
        linkToAdminTitle : siteConf.site.linkToAdminTitle,
        menuTitles : siteConf.site.menuTitles,
        pageTitle : siteConf.site.archivesPage.pageTitle,
        createdText : siteConf.site.archivesPage.pageContent.createdText,
        authorText : siteConf.site.archivesPage.pageContent.authorText,
        tagsText : siteConf.site.archivesPage.pageContent.tagsText,
        footerText : siteConf.site.footerText
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
            siteTitle : siteConf.site.siteTitle,
            linkToAdminTitle : siteConf.site.linkToAdminTitle,
            menuTitles : siteConf.site.menuTitles,
            pageTitle : siteConf.site.aboutPage.pageTitle,
            footerText : siteConf.site.footerText
        }
    });
};
// get login page
exports.getLogin = function(req, res){
    // render login page
    res.render('siteViews/login', {
        pageContent : {
            siteTitle : siteConf.site.siteTitle,
            linkToAdminTitle : siteConf.site.linkToAdminTitle,
            menuTitles : siteConf.site.menuTitles,
            pageTitle : siteConf.site.loginPage.pageTitle,
            labelForUsername : siteConf.site.loginPage.pageContent.labelForUsername,
            labelForPassword : siteConf.site.loginPage.pageContent.labelForPassword,
            loginButtonText : siteConf.site.loginPage.pageContent.loginButtonText,
            footerText : siteConf.site.footerText
        }
    });
};