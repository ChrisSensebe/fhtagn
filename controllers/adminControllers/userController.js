/**
 * Created by csensebe on 31/01/2016.
 */
var express     = require('express');
var router      = express.Router();
var User        = require('../../models/user');
var adminLayout = require('../../config/adminLayout');
var adminPages  = require('../../config/adminPages');

router.get('/getUser/:id', function(req, res){

    res.render('adminViews/newUser', {
        adminLayout : adminLayout,
        page : adminPages.newUserPage
    });
});

router.get('/getAll', function(req, res, next){

    var pageContent = {
        adminLayout : adminLayout,
        page : adminPages.usersPage
    };

    User.find().exec(function(err, docs){
        if(err){
            return next(err);
        }

        pageContent.page.users = docs;
        res.render('adminViews/users', pageContent);
    });
});

router.get('/newUser', function(req, res){

    res.render('adminViews/newUser', {
        adminLayout : adminLayout,
        page : adminPages.newUserPage
    });
});

router.post('/newUser', function(req, res, next){

    var username = req.body.username;
    var email    = req.body.email;
    var password = req.body.password;
    var role     = req.body.role;

    var newUser = new User({
        username     : username,
        email        : email,
        passwordHash : password,
        role         : role,
        created      : Date.now(),
        updated      : Date.now()
    });

    newUser.save(function(err){
        if(err){
            req.flash('danger', 'Error saving user in database');
            return next(err);
        }
    });

    req.flash('success', 'User successfully saved');
    res.redirect('/admin/user/getAll');
})

module.exports = router;