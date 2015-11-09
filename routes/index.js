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

/* Protected routes */

/* GET adminHome */
/* GET createNewPost */
/* GET editPostById */
/* GET usersPage */
/* GET createUser */
/* GET editUserById */
/* GET uploadFile */
/* GET customize */ 
/* GET login */
/* GET signup */
/* POST createNewPost */
/* POST createUser */
/* POST editUserByID */
/* POST customize */
/* POST login */
/* POST signup */

module.exports = router;
