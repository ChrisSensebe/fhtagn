/**
 * Created by csensebe on 31/01/2016.
 */
var express = require('express');
var router  = express.Router();

router.get('/', function(req, res){
    req.flash('success', 'bye');
    req.logout();
    res.redirect('/admin/login');
});

module.exports = router;