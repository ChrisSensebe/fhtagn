/**
 * Created by csensebe on 12/12/2015.
 */

// checks if user is authenticated
module.exports = function(req, res, next){

    if(req.isAuthenticated()){
        return next();
    }
    req.flash('danger', 'You must be logged to do that');
    res.redirect('/login');

}