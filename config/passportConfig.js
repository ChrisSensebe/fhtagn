/**
 * Created by csensebe on 26/11/2015.
 */
var LocalStrategy = require('passport-local').Strategy;
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

    /**
     * local login
     */
    passport.use('local-login', new LocalStrategy({
        usernameField     : 'username',
        passwordField     : 'password',
        passReqToCallback : true
    }, function(req, email, password, done){

        user.findOne({'email' : email}, function(err, user){
            if(err){
                return done(err);
            } else if(!user){
                return done(null, false, req.flash('loginMessage', 'User not found'));
            } else if(!user.isValidPassword(password)){
                return done(null, false, req.flash('loginMessage', 'Invalid password'));
            }
            return(null, user);
        });
    }));
}


