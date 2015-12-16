/**
 * Created by csensebe on 16/12/2015.
 */
var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
    title   : String,
    body    : String,
    author  : String,
    created : {type : Date, default : Date.now},
    updated : {type : Date, default : Date.now}
});

postSchema.set('autoIndex', false);

module.exports = mongoose.model('Post', postSchema);
