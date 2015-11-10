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
/* POST signup */

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
/* GET usersPage */
router.get('/admin/users', function(req ,res, next){
	res.render('users', { title: 'Fhtagn | admin' });
});
/* GET createUser */
router.get('/admin/createUser', function(req ,res, next){
	res.render('createUser', { title: 'Fhtagn | admin' });
});
/* GET editUserById */
/* GET uploadFile */
router.get('/admin/uploadfile', function(req ,res, next){
	res.render('uploadFile', { title: 'Fhtagn | admin' });
});
/* GET themes */ 
router.get('/admin/themes', function(req ,res, next){
	res.render('themes', { title: 'Fhtagn | admin' });
});
/* POST createNewPost */
/* POST createUser */
/* POST editUserByID */
/* POST uploadFile */
/* POST customize */

module.exports = router;
