var mongoose = require('../mongoose');
var bcrypt   = require('../bcrypt');
var config   = require('../config.js');

var userSchema = mongoose.Schema({
	username     : String,
	email        : String,
	passwordhash : String,
	role         : String
});

userSchema.set('autoIndex', false);

// pre save function, salt & has user password
userSchema.pre('save', function(next){
	var user = this;
	if(!user.isModified('passwordhash')){
		return next();
	}
	bcrypt.genSalt(config.saltWorkFactor, function(err, salt){
		if(err){
			return next(err);
		}
		bcrypt.hash(user.passwordhash, salt, function(err, hash){
			if(err){
				return next(err);
			}
			user.passwordhash = hash;
			next();
		});
	});
});

// check if valid password
schema.methods.isValidPassword = function(password){
	return bcrypt.compareSync(password, this.passwordhash);
}

module.exports = mongoose.model('User', userSchema);