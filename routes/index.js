var express  = require('express');
var router   = express.Router();
var User     = require('../models/user.js');
var passport = require('passport');
var isLogged = require('../middlewares/isLogged.js');

/**
 * site routes
 */

/**
 * get homepage
 */
router.get('/', function(req, res) {
    res.render('siteViews/index', { title : 'Fhtagn' });
});

/* posts routes */
router.get('/post', function(req, res){
	res.render('siteViews/post', { title : 'Fhtagn' });
});
router.get('/post',function(req, res){
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
	res.render('adminViews/adminHome', { title: 'Fhtagn | admin' });
});

/* admin posts routes */
router.get('/admin/newPost', isLogged, function(req, res){
	res.render('adminViews/editPost', { title : 'Fhtagn | admin' });
});
router.get('/admin/post', isLogged, function(req ,res){
	res.render('adminViews/editPost', { title: 'Fhtagn | admin' });
});
router.post('/admin/savePost', isLogged, function(req ,res){
	res.redirect('/admin');
});
router.post('/admin/delPost', isLogged, function(req, res){
	res.redirect('/admin');
});

/* admin tags routes */
router.get('/admin/tags', isLogged, function(req, res){
	res.render('adminViews/tags', { title : 'Fhtagn | admin' });
});
router.post('/admin/addTag', isLogged, function(req, res){
	res.redirect('/admin/tags');
});
router.post('/admin/delTag', isLogged, function(req, res){
	res.redirect('/admin/tags');
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
