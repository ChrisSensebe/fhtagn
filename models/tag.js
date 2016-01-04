var mongoose = require('mongoose');

var tagSchema = mongoose.Schema({
   tag : String
});

tagSchema.set('autoindex', false);

module.exports = mongoose.model('Tag', tagSchema);