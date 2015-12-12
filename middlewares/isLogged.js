/**
 * Created by csensebe on 12/12/2015.
 */

// checks if user is authenticated
module.exports = function(req, res, next){

    if(req.isAuthenticated()){
        return next();
    }

    res.redirect('/admin/login');

}