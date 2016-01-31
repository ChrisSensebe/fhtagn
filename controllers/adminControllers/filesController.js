/**
 * Created by csensebe on 31/01/2016.
 */
var express     = require('express');
var router      = express.Router();
var adminLayout = require('../../config/adminLayout');
var adminPages  = require('../../config/adminPages');
var multer = require('multer');
var upload = multer({
    dest : '../../public/images',
    limits : {
        fileSize : 1000000,
        files    : 1
    }
});

router.get('/', function(req, res){
    res.render('adminViews/files', {
        adminLayout : adminLayout,
        page : adminPages.filesPage
    });
});

router.post('/', upload.single('image'), function(req, res){
    req.flash('success', 'File successfully saved');
    res.redirect('/admin/files');
});

module.exports = router;