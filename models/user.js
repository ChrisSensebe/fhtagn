var mongoose = require('mongoose');
var bcrypt   = require('bcryptjs');
var config   = require('../config/appConfig.js');

var userSchema = mongoose.Schema({
	username     : String,
	email        : String,
	passwordHash : String,
	role         : String
});

userSchema.set('autoIndex', false);

/**
 * pre save function: salt & hash user password
 */
userSchema.pre('save', function(next){
	var user = this;
	if(!user.isModified('passwordHash')){
		return next();
	}
	bcrypt.genSalt(config.saltWorkFactor, function(err, salt){
		if(err){
			return next(err);
		}
		bcrypt.hash(user.passwordHash, salt, function(err, hash){
			if(err){
				return next(err);
			}
			user.passwordHash = hash;
			next();
		});
	});
});

/**
 * check if valid password
 * @param password submited by user
 */
userSchema.methods.isValidPassword = function(password){
	return bcrypt.compare(password, function(err, res){});
}

module.exports = mongoose.model('User', userSchema);