/**
 * Created by csensebe on 29/01/2016.
 */
var express = require('express');
var router  = express.Router();

router.use('/',         require('./homeController.js'));
router.use('/post',     require('./postController.js'));
router.use('/tags',     require('./tagController.js'));
router.use('/archives', require('./archiveController.js'));

module.exports = router;