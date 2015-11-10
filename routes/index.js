var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Fhtagn' });
});

/* GET tags page. */
router.get('/tags', function(req ,res, next){
	res.render('tags', { title: 'Fhtagn' });
});

/* GET archives page */
router.get('/archives', function(req ,res, next){
	res.render('archives', { title: 'Fhtagn' });
});

/* GET login */
router.get('/admin/login', function(req ,res, next){
	res.render('login', { title: 'Fhtagn | admin' });
});
/* GET signup */
router.get('/admin/signup', function(req ,res, next){
	res.render('signup', { title: 'Fhtagn | admin' });
});
/* POST login */
router.post('/admin/login', function(req, res, next){
	res.redirect('/admin', { title: 'Fhtagn | admin'});
});
/* POST signup */
router.post('/admin/signup', function(req, res, next){
	res.redirect('/admin', { title: 'Fhtagn | admin'});
});

/* Protected routes */

/* GET adminHome */
router.get('/admin/', function(req ,res, next){
	res.render('adminHome', { title: 'Fhtagn | admin' });
});
/* GET newPost */
router.get('/admin/newPost', function(req ,res, next){
	res.render('newPost', { title: 'Fhtagn | admin' });
});
/* GET editPostById */
router.get('/admin/editPostById', function(req ,res, next){
	res.render('editPostById', { title: 'Fhtagn | editPostById' });
});
/* GET usersPage */
router.get('/admin/users', function(req ,res, next){
	res.render('users', { title: 'Fhtagn | admin' });
});
/* GET createUser */
router.get('/admin/createUser', function(req ,res, next){
	res.render('createUser', { title: 'Fhtagn | admin' });
});
/* GET editUserById */
router.get('/admin/editUserById', function(req ,res, next){
	res.render('editPostById', { title: 'Fhtagn | editPostById' });
});
/* GET uploadFile */
router.get('/admin/uploadfile', function(req ,res, next){
	res.render('uploadFile', { title: 'Fhtagn | admin' });
});
/* GET themes */ 
router.get('/admin/themes', function(req ,res, next){
	res.render('themes', { title: 'Fhtagn | admin' });
});
/* POST createNewPost */
router.post('/admin/newPost', function(req, res, next){
	res.redirect('/admin', { title: 'Fhtagn | admin'});
});
/* POST createUser */
router.post('/admin/newUser', function(req, res, next){
	res.redirect('/admin', { title: 'Fhtagn | admin'});
});
/* POST editPostById */
router.post('/admin/editPostById', function(req ,res, next){
	res.render('adminHome', { title: 'Fhtagn | admin' });
});
/* POST editUserByID */
router.get('/admin/editUserById', function(req ,res, next){
	res.render('editUserById', { title: 'Fhtagn | admin' });
});
/* POST uploadFile */
router.post('/admin/uploadFile', function(req, res, next){
	res.redirect('/admin', { title: 'Fhtagn | admin'});
});
/* POST Themes */
router.post('/admin/themes', function(req, res, next){
	res.redirect('/admin', { title: 'Fhtagn | admin'});
});

module.exports = router;
