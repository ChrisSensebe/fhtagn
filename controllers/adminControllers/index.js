/**
 * Created by csensebe on 29/01/2016.
 */
var express              = require('express');
var router               = express.Router();
var isLogged             = require('../../middlewares/isLogged');
var attachAuthentication = require('../../middlewares/attachAuthentication');

router.use('/admin/login',    require('./loginController'));
router.use('/admin/*', isLogged, attachAuthentication);
router.use('/admin/',         require('./adminHomeController'));
router.use('/admin/post',     require('./postController'));
router.use('/admin/user',     require('./userController'));
router.use('/admin/files',    require('./filesController'));
router.use('/admin/settings', require('./settingsController'));
router.use('/admin/logout',   require('./logoutController'));

module.exports = router;