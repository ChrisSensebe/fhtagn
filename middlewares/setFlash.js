/**
 * Created by csensebe on 15/12/2015.
 */
module.exports = function(req, res, next){
    res.locals.flash = {
        default : req.flash('default'),
        primary : req.flash('primary'),
        success : req.flash('success'),
        info    : req.flash('info'),
        warning : req.flash('warning'),
        danger  : req.flash('danger')
    };
    next();
}