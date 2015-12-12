/**
 * Created by csensebe on 12/12/2015.
 */

// attach authentication to response object
module.exports = function(req, res, next){

    res.locals.isAuthenticated = req.isAuthenticated();

    if(req.isAuthenticated()){
        res.locals.currentUser = req.user;
    }

    next();
}