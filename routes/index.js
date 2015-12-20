var express  = require('express');
var router   = express.Router();
var User     = require('../models/user.js');
var Post     = require('../models/post.js');
var passport = require('passport');
var isLogged = require('../middlewares/isLogged.js');
var siteConf = require('../config/siteConfig.js');

/**
 * site routes
 */

// get homepage
router.get('/', function(req, res, next) {
    // find last ten posts in database, render site homepage
    Post.find().sort('-created').limit(10).exec(function(err, docs){
        if(err){
            return next(err);
        }
        res.render('siteViews/index', {
            title : siteConf.siteTitle,
            pageTitle : siteConf.pagesTitles.homePage,
            posts : docs
        });
    });
});
// get post by id
router.get('/post/:id', function(req, res, next){
    // get post id from url
    var id = req.params.id;
    // find post in database, render post page
    Post.findOne({_id : id}, function(err, doc){
        if(err){
            return next(err);
        }
        res.render('siteViews/post', {
            title : siteConf.siteTitle,
            post : doc
        });
    });
});
// get tags page
router.get('/tags', function(req ,res){
	res.render('siteViews/tags', {
        title : siteConf.siteTitle,
        pageTitle : siteConf.pagesTitles.tagsPage
    });
});
// get archives page
router.get('/archives', function(req ,res){
    // find all posts in database, render archives page
    Post.find().sort('-created').exec(function(err, docs){
        if(err){
            return next(err);
        }
        res.render('siteViews/archives', {
            title : siteConf.siteTitle,
            pageTitle : siteConf.pagesTitles.archivesPages,
            posts : docs
        });
    });
});
// get about page
router.get('/about', function(req, res){
    // render about page
	res.render('siteViews/about', {
        title : siteConf.siteTitle,
        pageTitle : siteConf.pagesTitles.aboutPage
    });
});

/**
 * Admin routes
 */

/**
 * unprotected routes
 */

// get login page
router.get('/admin/login', function(req ,res){
    // render login page
	res.render('adminViews/login', {
        title : siteConf.adminTitle,
        pageTitle : siteConf.adminPagesTitles.loginPage
    });
});
// post login form
// use passport for authentication, failure redirect to login, success to admin homepage
router.post('/admin/login', passport.authenticate('local-login', {
    successRedirect  : '/admin',
    failureRedirect : '/admin/login',
    failureFlash    : true
}));

/**
 * protected routes user must be logged to acces route
 */

// get logout
router.get('/admin/logout', isLogged, function(req, res){
    // set goodbye flash message, log user out, redirect to site homepage
    req.flash('success', 'bye');
    req.logout();
	res.redirect('/');
});
// get admin homepage
router.get('/admin', isLogged, function(req ,res){
    // find all post in database, render admin homepage
    Post.find().sort('-created').exec(function(err, docs){
        if(err){
            return next(err);
        }
        res.render('adminViews/adminHome', {
            title : siteConf.adminTitle,
            pageTitle : siteConf.adminPagesTitles.homePage,
            posts : docs
        });
    });
});
// get new post page
router.get('/admin/newPost', isLogged, function(req, res){
    // render create newpost page
	res.render('adminViews/createNewPost', {
        title : siteConf.adminTitle,
        pageTitle : siteConf.adminPagesTitles.newPostPage
    });
});
// post save new post form
router.post('/admin/saveNewPost', isLogged, function(req, res, next){

    // get info from form
    var title  = req.body.title;
    var post   = req.body.post;
    var author = req.user.username;
    var tags   = req.body.tags.split(',');
    // create new post
    var newPost = Post({
        title   : title,
        post    : post,
        author  : author,
        tags    : tags,
        created : Date.now(),
        updated : Date.now()
    });
    // save post in database
    newPost.save(function(err){
        if(err){
            req.flash('danger', 'error saving post in database');
            return next(err);
        }
    });
    // all went well, set flash message, redirect to admin home
    req.flash('success', 'Post successfully saved.');
    res.redirect('/admin');
});
// get edit post by id
router.get('/admin/post/:id', isLogged, function(req ,res, next){
    // get post id from form
    var id = req.params.id;
    // find post in database, render edit post page
    Post.findOne({_id : id}, function(err, doc){
        if(err){
            return next(err);
        }
        res.render('adminViews/editPost', {
            title : siteConf.adminTitle,
            post : doc
        });
    });
});
// post save post form
router.post('/admin/savePost', isLogged, function(req ,res, next){
    // get info from form
    var id      = req.body.id;
    var title   = req.body.title;
    var post    = req.body.post;
    var tags    = req.body.tags.split(',');
    // find post in database
    Post.findOne({_id : id}, function(err, doc){

        if(err){
            req.flash('danger', 'Error saving post in database');
            return next(err);
        }
        // update post object
        doc.title   = title;
        doc.post    = post;
        doc.tags    = tags;
        doc.updated = Date.now();
        // save post in database, set flash message, redirect to admin homepage
        doc.save(function(err){

            if(err){
                req.flash('danger', 'Error saving post in database');
                return next(err);
            }
            req.flash('success', 'Post successfully updated');
            res.redirect('/admin');
        });
    });
});
// post del post
router.post('/admin/delPost', isLogged, function(req, res){
	res.redirect('/admin');
});
// get all users page
router.get('/admin/users', isLogged, function(req, res, next){
    // find all users in database, render users page
    User.find().exec(function(err, docs){
        if(err){
            return next(err);
        }
        res.render('adminViews/users', {
            title : siteConf.adminTitle,
            pageTitle : siteConf.adminPagesTitles.usersPage,
            users : docs
        });
    });
});
// get newUser page
router.get('/admin/newUser', isLogged, function(req, res){
    // render new user page
    res.render('adminViews/newUser', {
        title : siteConf.adminTitle,
        pageTitle : siteConf.adminPagesTitles.newUserPage
    });
});
// get user page by id
router.get('/admin/user/:id', isLogged, function(req, res, next){
    // get user id from url
    var userId = req.params.id;
    // find user in database, render edit user page
    User.findOne({_id : userId}, function(err, doc){
        if(err){
            return next(err);
        }
        res.render('adminViews/user', {
            title : siteConf.adminTitle,
            user : doc
        });
    });
});
//post save new user
router.post('/admin/saveNewUser', isLogged, function(req, res){
    // get user info from form
    var username = req.body.username;
    var email    = req.body.email;
    var password = req.body.password;
    // create new user
    var newUser = new User({
        username     : username,
        email        : email,
        passwordHash : password,
        role         : 'peon'
    });
    // save user in database, set flash messages, redirect to users
    newUser.save(function(err){
        if(err){
            if(err){
                req.flash('danger', 'Error saving user in database');
                return next(err);
            }
            req.flash('success', 'User successfully saved');
            res.redirect('/admin/users');
        }
    });
});
// post save user form
router.post('/admin/saveUser', isLogged, function(req, res, next){
    // get user info from form
    var id       = req.body.id;
	var username = req.body.username;
    var email    = req.body.email;
    if(req.body.password){
        var password = req.body.password;
    }
    // find user in database
    User.findOne({_id : id}, function(err, doc){
        if(err){
            return next(err);
        }
        // update user
        doc.username = username;
        doc.email    = email;
        doc.updated  = Date.now();
        if(password){
            doc.passwordHash = password;
        }
        // save user in database
        doc.save(function(err){
            if(err){
                req.flash('danger', 'Error saving user in database');
                return next(err);
            }
        })
        req.flash('success', 'User successfully saved');
        res.redirect('/admin/users');
    });
});
// post del user form
router.post('/admin/delUser', isLogged, function(req, res){
	res.redirect('/admin/users');
});
// get admin upload file file
router.get('/admin/files', isLogged, function(req, res){
	res.render('adminViews/files', {
        title : siteConf.adminTitle,
        pageTitle : siteConf.adminPagesTitles.filesPage
    });
});
// post save file
router.post('/admin/upload', isLogged, function(req, res){
	res.redirect('/admin/files');
});
// del file
router.post('/admin/delFile', isLogged, function(req, res){
	res.redirect('/admin/files');
});
// get admin themes page
router.get('/admin/theme', isLogged, function(req, res){
	res.render('adminViews/theme', {
        title : siteConf.adminTitle,
        pageTitle : siteConf.adminPagesTitles.themePage
    });
});
// post change theme
router.post('/admin/theme', isLogged, function(req, res){
	res.redirect('/admin/theme');
});

module.exports = router;
