/**
 * Created by csensebe on 31/01/2016.
 */
var express     = require('express');
var router      = express.Router();
var User        = require('../../models/user');
var adminLayout = require('../../config/adminLayout');
var adminPages  = require('../../config/adminPages');

router.get('/getUser/:id', function(req, res, next){

    var id = req.params.id;

    var pageContent = {
        adminLayout : adminLayout,
        page : adminPages.newUserPage
    };

    User.findOne({_id : id}, function(err, doc){
        if(err){
            return next(err);
        }
        pageContent.user = doc;
        res.render('adminViews/newUser', pageContent);
    });
});

router.post('/saveUser', function(req, res, next){

    var id       = req.body.id;
    var username = req.body.username;
    var email    = req.body.email;
    if(req.body.password){
        var password = req.body.password;
    }
    var role = req.body.role;

    User.findOne({_id : id}, function(err, doc){
        if(err){
            return next(err);
        }

        doc.username = username;
        doc.email    = email;
        if(password){
            doc.passwordHash = password;
        }
        doc.role = role;
        doc.updated  = Date.now();

        doc.save(function(err){
            if(err){
                req.flash('danger', 'Error saving user in database');
                return next(err);
            }
        });
        req.flash('success', 'User successfully saved');
        res.redirect('/admin/user/getAll');
    });
})

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
});

router.post('/delUser', function(req, res, next){

    var userId = req.body.delUser;

    User.remove({_id : userId}, function(err){
        if(err){
            req.flash('danger', 'Error deleting user from database');
            return next(err);
        }
        req.flash('success', 'User succesfully deleted');
        res.redirect('/admin/user/getAll');
    });
});

module.exports = router;