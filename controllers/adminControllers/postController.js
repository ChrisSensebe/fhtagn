/**
 * Created by csensebe on 30/01/2016.
 */
var express    = require('express');
var router     = express.Router();
var Post        = require('../../models/post');
var adminLayout = require('../../config/adminLayout');
var adminPages  = require('../../config/adminPages');

router.get('/getPost/:id', function(req ,res, next){
    // get post id from form
    var id = req.params.id;
    // page content
    var pageContent = {
        adminLayout : adminLayout,
        page : adminPages.postPage
    };
    // find post in database, render edit post page
    Post.findOne({_id : id}, function(err, doc){
        if(err){
            return next(err);
        }
        // add doc to page content
        pageContent.page.post = doc;
        res.render('adminViews/editPost', pageContent);
    });
});

module.exports = router;