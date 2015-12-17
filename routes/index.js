var express  = require('express');
var router   = express.Router();
var User     = require('../models/user.js');
var Post     = require('../models/post.js');
var passport = require('passport');
var isLogged = require('../middlewares/isLogged.js');

/**
 * site routes
 */

/**
 * get homepage
 */
router.get('/', function(req, res, next) {
    Post.find().sort('-created').exec(function(err, docs){
        if(err){
            return next(err);
        }
        res.render('siteViews/index', { posts : docs, title : 'Fhtagn' });
    });
});

/* posts routes */
router.get('/post', function(req, res){
	res.render('siteViews/post', { title : 'Fhtagn' });
});

/* tags routes */
router.get('/tags', function(req ,res){
	res.render('siteViews/tags', { title : 'Fhtagn' });
});
router.get('/tag', function(req, res){
	res.render('siteViews/tag', { title : 'Fhtagn' });
});

/* archives route */
router.get('/archives', function(req ,res){
	res.render('siteViews/archives', { title : 'Fhtagn' });
});

/* about route */
router.get('/about', function(req, res){
	res.render('siteViews/about', { title : 'Fhtagn' });
});

/**
 * Admin routes
 */

/**
 * unprotected routes
 */

/* login routes */
router.get('/admin/login', function(req ,res){
	res.render('adminViews/login', { title: 'Fhtagn | admin' });
});
router.post('/admin/login', passport.authenticate('local-login', {
    successRedirect  : '/admin',
    failureRedirect : '/admin/login',
    failureFlash    : true
}));

/**
 * protected routes
 */

/* logout route*/
router.get('/admin/logout', isLogged, function(req, res){
    req.flash('success', 'bye');
    req.logout();
	res.redirect('/');
});

/* admin home route */
router.get('/admin', isLogged, function(req ,res){
    Post.find().sort('-created').exec(function(err, docs){
        if(err){
            return next(err);
        }
        res.render('adminViews/adminHome', { posts : docs, title : 'Fhtagn | admin' });
    });
});

/* admin posts routes */
router.get('/admin/newPost', isLogged, function(req, res){
	res.render('adminViews/createNewPost', { title : 'Fhtagn | admin' });
});
router.post('/admin/saveNewPost', isLogged, function(req, res, next){

    var title  = req.body.title;
    var post   = req.body.post;
    var author = req.user.username;
    var tags   = req.body.tags.split(' ');

    var newPost = Post({
        title   : title,
        post    : post,
        author  : author,
        tags    : tags,
        created : Date.now(),
        updated : Date.now()
    });

    newPost.save(function(err){
        if(err){
            return next(err);
        }
    });

    req.flash('success', 'Post successfully saved.');
    res.redirect('/admin');
})
router.get('/admin/post', isLogged, function(req ,res){
	res.render('adminViews/editPost', { title: 'Fhtagn | admin' });
});
router.post('/admin/savePost', isLogged, function(req ,res){
	res.redirect('/admin');
});
router.post('/admin/delPost', isLogged, function(req, res){
	res.redirect('/admin');
});

/* users routes */
router.get('/admin/users', isLogged, function(req, res){
	res.render('adminViews/users', { title : 'Fhtagn | admin' });
});
router.get('/admin/user', isLogged, function(req, res){
	res.render('adminViews/user', { title : 'Fhtagn | admin' });
});
router.post('/admin/saveUser', isLogged, function(req, res, next){

	var username = req.body.username;
	var email    = req.body.email;
	var password = req.body.password;

	// create user
	var newUser = new User({
		username     : username,
		email        : email,
		passwordHash : password,
		role         : 'peon'
	});

	// save the user
	newUser.save(function(err){
		if(err){
			return next(err);
		}
		res.redirect('/admin/users');
	});
});
router.post('/admin/delUser', isLogged, function(req, res){
	res.redirect('/admin/users');
});

/* files routes */
router.get('/admin/files', isLogged, function(req, res){
	res.render('adminViews/files', { title : 'Fhtagn | admin' });
});
router.post('/admin/upload', isLogged, function(req, res){
	res.redirect('/admin/files');
});
router.post('/admin/delFile', isLogged, function(req, res){
	res.redirect('/admin/files');
});

/* theme routes */
router.get('/admin/theme', isLogged, function(req, res){
	res.render('adminViews/theme', { title : 'Fhtagn | admin' });
});
router.post('/admin/theme', isLogged, function(req, res){
	res.redirect('/admin/theme');
});

module.exports = router;
