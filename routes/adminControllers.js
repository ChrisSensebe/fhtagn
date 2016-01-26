var Post        = require('../models/post.js');
var User        = require('../models/user.js');
var adminLayout = require('../config/adminLayout.js');
var adminPages  = require('../config/adminPages.js');

// find all post in database, render admin homepage
exports.getAdminHome = function(req, res, next){
    // page content
    var pageContent = {
        adminLayout : adminLayout,
        page : adminPages.homePage
    };
    // find all posts in database
    Post.find().sort('-created').exec(function(err, docs){
        if(err){
            return next(err);
        }
        // add posts to page content, render page
        pageContent.page.posts = docs;
        res.render('adminViews/adminHome', pageContent);
    });
};
// set goodbye flash message, log user out, redirect to site homepage
exports.getLogout = function(req, res){
    req.flash('success', 'bye');
    req.logout();
    res.redirect('/');
};
// render create newpost page
exports.getNewPost = function(req, res){
    res.render('adminViews/createNewPost', {
        adminLayout : adminLayout,
        page : adminPages.newPostPage
    });
};
// save new post in database
exports.postNewPost = function(req, res, next){
    // get info from form
    var title  = req.body.title;
    var post   = req.body.post;
    var author = req.user.username;
    var tags   = req.body.tags.split(',');
    // create new post
    var newPost = Post({
        title   : title,
        post    : post,
        author  : author,
        tags    : tags,
        created : Date.now(),
        updated : Date.now()
    });
    // save post in database
    newPost.save(function(err){
        if(err){
            req.flash('danger', 'error saving post in database');
            return next(err);
        }
    });
    // all went well, set flash message, redirect to admin home
    req.flash('success', 'Post successfully saved.');
    res.redirect('/admin/');
};
// get post by id in database, render edit post page
exports.getEditPostById = function(req ,res, next){
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
};
// save post in database
exports.postSavePost = function(req ,res, next){
    // get info from form
    var id      = req.body.id;
    var title   = req.body.title;
    var post    = req.body.post;
    var tags    = req.body.tags.split(',');
    // find post in database
    Post.findOne({_id : id}, function(err, doc){

        if(err){
            req.flash('danger', 'Error saving post in database');
            return next(err);
        }
        // update post object
        doc.title   = title;
        doc.post    = post;
        doc.tags    = tags;
        doc.updated = Date.now();
        // save post in database, set flash message, redirect to admin homepage
        doc.save(function(err){

            if(err){
                req.flash('danger', 'Error saving post in database');
                return next(err);
            }
            req.flash('success', 'Post successfully updated');
            res.redirect('/admin/');
        });
    });
};
// find and delete post from database
exports.postDelPost = function(req, res, next){
    // get postId from request
    var postId = req.body.postId;
    //delete post in database
    Post.remove({_id : postId}, function(err){
        if(err){
            req.flash('danger', 'Error deleting post from database');
            return next(err);
        }
        req.flash('success', 'Post successfully deleted');
        res.redirect('/admin/');
    });
};
// find users in database, render users page
exports.getUsers = function(req, res, next){
    // page content
    var pageContent = {
        adminLayout : adminLayout,
        page : adminPages.usersPage
    };
    // find all users in database, render users page
    User.find().exec(function(err, docs){
        if(err){
            return next(err);
        }
        // add users to page content, render page
        pageContent.page.users = docs;
        res.render('adminViews/users', pageContent);
    });
};
// render new user page
exports.getNewUser = function(req, res){
    // render new user page
    res.render('adminViews/newUser', {
        adminLayout : adminLayout,
        page : adminPages.newUserPage
    });
};
// get user in database, render user page
exports.getUserById = function(req, res, next){
    // get user id from url
    var userId = req.params.id;
    // page content
    var pageContent = {
        adminLayout : adminLayout,
        page : adminPages.userPage
    }
    // find user in database, render edit user page
    User.findOne({_id : userId}, function(err, doc){
        if(err){
            return next(err);
        }
        // add user to page content, render page
        pageContent.page.user = doc;
        res.render('adminViews/user', pageContent);
    });
};
// save new user in database, redirect to users page
exports.postSaveNewUser = function(req, res, next){
    // get user info from form
    var username = req.body.username;
    var email    = req.body.email;
    var password = req.body.password;
    var role     = req.body.role;
    // create new user
    var newUser = new User({
        username     : username,
        email        : email,
        passwordHash : password,
        role         : role,
        created      : Date.now(),
        updated      : Date.now()
    });
    // save user in database, set flash messages, redirect to users
    newUser.save(function(err){
        if(err){
            req.flash('danger', 'Error saving user in database');
            return next(err);
        }
    });
    // all went well redirect to users
    req.flash('success', 'User successfully saved');
    res.redirect('/admin/users');
};
// find user in database, update user, redirect to users page
exports.postSaveUser = function(req, res, next){
    // get user info from form
    var id       = req.body.id;
    var username = req.body.username;
    var email    = req.body.email;
    if(req.body.password){
        var password = req.body.password;
    }
    var role = req.body.role;
    // find user in database
    User.findOne({_id : id}, function(err, doc){
        if(err){
            return next(err);
        }
        // update user
        doc.username = username;
        doc.email    = email;
        if(password){
            doc.passwordHash = password;
        }
        doc.role = role;
        doc.updated  = Date.now();
        // save user in database
        doc.save(function(err){
            if(err){
                req.flash('danger', 'Error saving user in database');
                return next(err);
            }
        });
        req.flash('success', 'User successfully saved');
        res.redirect('/admin/users');
    });
};
// del user from database, redirect to users
exports.postDelUser = function(req, res, next){
    // get user id
    var userId = req.body.delUser;
    // delete user from database
    User.remove({_id : userId}, function(err){
        if(err){
            req.flash('danger', 'Error deleting user from database');
            return next(err);
        }
        req.flash('success', 'User succesfully deleted');
        res.redirect('/admin/users');
    });
};
// render files page
exports.getFiles = function(req, res){
    res.render('adminViews/files', {
        adminLayout : adminLayout,
        page : adminPages.filesPage
    });
};
// upload file, redirect to files
exports.postUpload = function(req, res){
    res.redirect('/admin/files');
};
// delete file, redirect to files
exports.postDelFile = function(req, res){
    res.redirect('/admin/files');
};
// render theme page
exports.getSettings = function(req, res){
    res.render('adminViews/settings', {
        adminLayout : adminLayout,
        page : adminPages.themePage
    });
};
// save theme in db, redirect to them
exports.postSaveSettings = function(req, res){
    res.redirect('/admin/siteSettings');
};