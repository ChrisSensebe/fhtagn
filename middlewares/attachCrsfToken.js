/**
 * Created by csensebe on 19/01/2016.
 */
module.exports = function attachCrfToken(req, res, next){
    res.locals.csrfTokenFunction = req.csrfToken;
    next();
}