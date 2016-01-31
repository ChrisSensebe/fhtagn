/**
 * Created by csensebe on 31/01/2016.
 */
var express     = require('express');
var router      = express.Router();
var User        = require('../../models/user');
var adminLayout = require('../../config/adminLayout');
var adminPages  = require('../../config/adminPages');

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

module.exports = router;