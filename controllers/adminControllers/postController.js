/**
 * Created by csensebe on 30/01/2016.
 */
var express    = require('express');
var router     = express.Router();
var Post        = require('../../models/post');
var adminLayout = require('../../config/adminLayout');
var adminPages  = require('../../config/adminPages');

router.get('/getPost/:id', function(req ,res, next){

    var id = req.params.id;

    var pageContent = {
        adminLayout : adminLayout,
        page : adminPages.postPage
    };

    Post.findOne({_id : id}, function(err, doc){
        if(err){
            return next(err);
        }

        pageContent.page.post = doc;
        res.render('adminViews/editPost', pageContent);
    });
});

router.post('/savePost', function(req ,res, next){

    var id      = req.body.id;
    var title   = req.body.title;
    var post    = req.body.post;
    var tags    = req.body.tags.split(',');

    Post.findOne({_id : id}, function(err, doc){

        if(err){
            req.flash('danger', 'Error saving post in database');
            return next(err);
        }

        doc.title   = title;
        doc.post    = post;
        doc.tags    = tags;
        doc.updated = Date.now();

        doc.save(function(err){
            if(err){
                req.flash('danger', 'Error saving post in database');
                return next(err);
            }
            req.flash('success', 'Post successfully updated');
            res.redirect('/admin/');
        });
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