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

    /**
     * local signup
     */
    passport.use('local-signup', new LocalStrategy({
        usernameField     : 'username',
        passwordField     : 'password',
        passReqToCallback : true
    }, function(req, email, password, next){

        process.nextTick(function(){

            User.findOne({'email' : email}, function(err, user){

                if(err){
                    return next(err);
                } else if(user){
                    return done(null, false, req.flash('signupMessage', 'That user is already in use'));
                } else {
                    var newUser = new user();
                    newUser.passwordHash = password;

                    newUser.save(function(err){
                        if(err){
                            return next(err);
                        }
                        return done(null, newUser);
                    })
                }
            })

        })

    }));
}


