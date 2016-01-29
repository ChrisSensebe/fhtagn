/**
 * Created by csensebe on 29/01/2016.
 */
var express = require('express');
var router  = express.Router();

router.use('/',         require('./homeController'));
router.use('/post',     require('./postController'));
router.use('/tags',     require('./tagController'));
router.use('/archives', require('./archiveController'));
router.use('/about',    require('./aboutController'));

module.exports = router;