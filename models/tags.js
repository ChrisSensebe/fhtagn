var mongoose = require('mongoose');

var tagsSchema = mongoose.Schema({
   tags : [String]
});

tagsSchema.set('autoindex', false);

module.exports = mongoose.model('Tags', tagsSchema);