/**
 * Created by csensebe on 26/11/2015.
 */
var localStrategy = require('passport-local');
var User          = require('../models/user.js');

module.exports = function(passport){

    /**
     * serialize user
     */
    passport.serializeUser(function(user, done){
        done(null, user.id);
    });

    /**
     * deserialize user
     */
    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user){
            done(err, user);
        });
    });

}


