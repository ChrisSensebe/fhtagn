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

/* adminHome route */
router.get('/admin', function(req ,res, next){
	res.render('adminViews/adminHome', { title: 'Fhtagn | admin' });
});

/* posts  routes */
router.get('admin/newPost', function(req, res, next){
	res.render('adminViews/editPost', { title : 'Fhtagn | admin' });
});
router.get('/admin/editPost', function(req ,res, next){
	res.render('adminViews/editPost', { title: 'Fhtagn | admin' });
});
router.post('/admin/savePost', function(req ,res, next){
	res.redirect('adminViews/admin');
});
/* GET admin/tags */
/* GET addNewTag */
/* GET editTag */
/* GET usersPage */
router.get('/admin/users', function(req ,res, next){
	res.render('users', { title: 'Fhtagn | admin' });
});
/* GET newUser */
router.get('/admin/newUser', function(req ,res, next){
	res.render('newUser', { title: 'Fhtagn | admin' });
});
/* GET editUser */
router.get('/admin/editUser', function(req ,res, next){
	res.render('user', { title: 'Fhtagn | editUSer' });
});
/* POST newUser */
router.post('/admin/newUser', function(req, res, next){
	res.redirect('/admin', { title: 'Fhtagn | admin'});
});
/* GET uploadFile */
router.get('/admin/uploadfile', function(req ,res, next){
	res.render('uploadFile', { title: 'Fhtagn | admin' });
});
/* GET themes */
router.get('/admin/themes', function(req ,res, next){
	res.render('themes', { title: 'Fhtagn | admin' });
});
/* GET logout */
router.get('/admin/logout', function(req, res, next){
	res.redirect('/', { title : 'Fhtagn' });
});

/* POST saveUser */
router.post('/admin/saveUser', function(req ,res, next){
	res.redirect('/admin', { title: 'Fhtagn | admin' });
});
/* POST saveFile */
router.post('/admin/uploadFile', function(req, res, next){
	res.redirect('/admin', { title: 'Fhtagn | admin' });
});
/* POST saveTheme */
router.post('/admin/themes', function(req, res, next){
	res.redirect('/admin', { title: 'Fhtagn | admin' });
});
/* POST saveTag */
router.post('/admin/saveTag', function(req, res, next){
	res.redirect('/admin', { title  : 'Fhtagn | admin' })
})

module.exports = router;
