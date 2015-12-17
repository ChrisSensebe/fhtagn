/**
 * Created by csensebe on 16/12/2015.
 */
var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
    title   : String,
    body    : String,
    author  : String,
    tags    : [String],
    created : Date,
    updated : Date
});

postSchema.set('autoIndex', false);

module.exports = mongoose.model('Post', postSchema);
