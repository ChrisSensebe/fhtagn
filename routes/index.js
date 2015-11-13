var express = require('express');
var router = express.Router();

/* GET home page */
router.get('/', function(req, res, next) {
  res.render('siteViews/index', { title : 'Fhtagn' });
});
/* GET post page */
router.get('/post', function(req, res, next){
	res.render('siteViews/post', { title : 'Fhtagn' });
});
/* GET post page */
router.get('/post',function(req, res, next){
	res.render('siteViews/post', { title : 'Fhtagn' });
});
/* GET tags page */
router.get('/tags', function(req ,res, next){
	res.render('siteViews/tags', { title : 'Fhtagn' });
});
/* GET tag page */
router.get('/tag', function(req, res, next){
	res.render('siteViews/tag', { title : 'Fhtagn' });
});
/* GET archives page */
router.get('/archives', function(req ,res, next){
	res.render('siteViews/archives', { title : 'Fhtagn' });
});
/* GET about page */
router.get('/about', function(req, res, next){
	res.render('siteViews/about', { title : 'Fhtagn' });
});

/* GET login */
router.get('/admin/login', function(req ,res, next){
	res.render('login', { title: 'Fhtagn | admin' });
});
/* GET newUser */
router.get('/admin/newUser', function(req ,res, next){
	res.render('newUser', { title: 'Fhtagn | admin' });
});
/* POST login */
router.post('/admin/login', function(req, res, next){
	res.redirect('/admin', { title: 'Fhtagn | admin'});
});
/* POST newUser */
router.post('/admin/newUser', function(req, res, next){
	res.redirect('/admin', { title: 'Fhtagn | admin'});
});

/* Protected routes */

/* GET adminHome */
router.get('/admin/', function(req ,res, next){
	res.render('adminHome', { title: 'Fhtagn | admin' });
});
/* GET editPostById */
router.get('/admin/editPost', function(req ,res, next){
	res.render('editPost', { title: 'Fhtagn | editPostById' });
});
/* GET admin/tags */
/* GET addNewTag */
/* GET editTag */
/* GET usersPage */
router.get('/admin/users', function(req ,res, next){
	res.render('users', { title: 'Fhtagn | admin' });
});
/* GET editUser */
router.get('/admin/editUser', function(req ,res, next){
	res.render('user', { title: 'Fhtagn | editUSer' });
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
/* POST savePost */
router.post('/admin/savePost', function(req ,res, next){
	res.redirect('/admin', { title: 'Fhtagn | admin' });
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
