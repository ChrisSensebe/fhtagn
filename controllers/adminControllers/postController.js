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

router.get('/newPost', function(req, res){
    res.render('adminviews/createNewPost', {
        adminLayout : adminLayout,
        page : adminPages.newPostPage
    });
});

router.post('/newPost', function(req, res, next){

    var title  = req.body.title;
    var post   = req.body.post;
    // need attach authentication
    var author = req.user.username;
    var tags   = req.body.tags.split(',');

    var newPost = Post({
        title   : title,
        post    : post,
        author  : author,
        tags    : tags,
        created : Date.now(),
        updated : Date.now()
    });

    newPost.save(function(err){
        if(err){
            req.flash('danger', 'error saving post in database');
            return next(err);
        }
    });

    req.flash('success', 'Post successfully saved.');
    res.redirect('/admin/');
});

module.exports = router;