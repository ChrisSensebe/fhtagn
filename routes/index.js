var express = require('express');
var router = express.Router();

/*/
/*  Site routes
/*/

/* home route */
router.get('/', function(req, res, next) {
  res.render('siteViews/index', { title : 'Fhtagn' });
});

/* posts routes */
router.get('/post', function(req, res, next){
	res.render('siteViews/post', { title : 'Fhtagn' });
});
router.get('/post',function(req, res, next){
	res.render('siteViews/post', { title : 'Fhtagn' });
});

/* tags routes */
router.get('/tags', function(req ,res, next){
	res.render('siteViews/tags', { title : 'Fhtagn' });
});
router.get('/tag', function(req, res, next){
	res.render('siteViews/tag', { title : 'Fhtagn' });
});

/* archives route */
router.get('/archives', function(req ,res, next){
	res.render('siteViews/archives', { title : 'Fhtagn' });
});

/* about route */
router.get('/about', function(req, res, next){
	res.render('siteViews/about', { title : 'Fhtagn' });
});

/*/
/*  Admin routes
/*/

// unprotected routes

/* login routes */
router.get('/admin/login', function(req ,res, next){
	res.render('adminViews/login', { title: 'Fhtagn | admin' });
});
router.post('/admin/login', function(req, res, next){
	res.redirect('/admin');
});

// protected routes

/* logout route*/
router.get('/admin/logout', function(req, res, next){
	res.redirect('/');
});

/* admin home route */
router.get('/admin', function(req ,res, next){
	res.render('adminViews/adminHome', { title: 'Fhtagn | admin' });
});

/* admin posts routes */
router.get('/admin/newPost', function(req, res, next){
	res.render('adminViews/editPost', { title : 'Fhtagn | admin' });
});
router.get('/admin/post', function(req ,res, next){
	res.render('adminViews/editPost', { title: 'Fhtagn | admin' });
});
router.post('/admin/savePost', function(req ,res, next){
	res.redirect('/admin');
});
router.post('/admin/delPost', function(req, res, next){
	res.redirect('/admin');
});

/* admin tags routes */
router.get('/admin/tags', function(req, res, next){
	res.render('adminViews/tags', { title : 'Fhtagn | admin' });
});
router.post('/admin/addTag', function(req, res, next){
	res.redirect('/admin/tags');
});
router.post('/admin/delTag', function(req, res, next){
	res.redirect('/admin/tags');
});

/* users routes */

router.get('/admin/users', function(req, res, next){
	res.render('adminViews/users', { title : 'Fhtagn | admin' });
});
router.get('/admin/user', function(req, res, next){
	res.render('adminViews/user', { title : 'Fhtagn | admin' });
});
router.post('/admin/saveUser', function(req, res, next){
	res.redirect('/admin/users');
});
router.post('/admin/delUser', function(req, res, next){
	res.redirect('/admin/users');
});

module.exports = router;
