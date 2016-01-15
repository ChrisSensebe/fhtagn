var express          = require('express');
var router           = express.Router();
var siteControllers  = require('./siteControllers.js');
var adminControllers = require('./adminControllers.js');
var User             = require('../models/user.js');
var Post             = require('../models/post.js');
var passport         = require('passport');
var isLogged         = require('../middlewares/isLogged.js');

/**
 * site routes
 */

router.get('/',         siteControllers.getHome);
router.get('/post/:id', siteControllers.getPostById);
router.get('/tags',     siteControllers.getTags);
router.get('/archives', siteControllers.getArchives);
router.get('/about',    siteControllers.getAbout);
router.get('/login',    siteControllers.getLogin);
router.post('/login',   passport.authenticate('local-login', {
    successRedirect  : '/admin/',
    failureRedirect : '/login',
    failureFlash    : true
}));

/**
 * admin routes
 * protected routes user must be logged
 */

router.all('/admin/*',            isLogged);
router.get('/admin/',             adminControllers.getAdminHome);
router.get('/admin/newPost',      adminControllers.getNewPost);
router.get('/admin/post/:id',     adminControllers.getEditPostById);
router.get('/admin/users',        adminControllers.getUsers);
router.get('/admin/newUser',      adminControllers.getNewUser);
router.get('/admin/user/:id',     adminControllers.getUserById);
router.get('/admin/files',        adminControllers.getFiles);
router.get('/admin/theme',        adminControllers.getTheme);
router.get('/admin/logout',       adminControllers.getLogout);
router.post('/admin/saveNewPost', adminControllers.postNewPost);
router.post('/admin/savePost',    adminControllers.postSavePost);
router.post('/admin/delPost',     adminControllers.postDelPost);
router.post('/admin/saveNewUser', adminControllers.postSaveNewUser);
router.post('/admin/saveUser',    adminControllers.postSaveUser);
router.post('/admin/delUser',     adminControllers.postDelUser);
router.post('/admin/upload',      adminControllers.postUpload);
router.post('/admin/delFile',     adminControllers.postDelFile);
router.post('/admin/theme',       adminControllers.postSaveTheme);

module.exports = router;