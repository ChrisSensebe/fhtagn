/**
 * Created by csensebe on 29/01/2016.
 */
var express = require('express');
var router  = express.Router();

router.use('/admin/login', require('./loginController'));
router.use('/admin/',      require('./adminHomeController'));
router.use('/admin/post',  require('./postController'));

module.exports = router;