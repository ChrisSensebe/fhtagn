/**
 * Created by csensebe on 19/01/2016.
 */
module.exports = function attachCsrfToken(req, res, next){
    res.locals.csrfToken = req.csrfToken();
    next();
}