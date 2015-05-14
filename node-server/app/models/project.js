var mongoose = require('mongoose');

var projectSchema = mongoose.Schema({
  name: String,
  shortname: String, // shortname should be a string with no spaces or special characters to potentially be used in urls as query param
  contributers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique: true
  }],
  technologies: Array
});

projectSchema.index({
  shortname: 1
});
projectSchema.index({
  contributers: 1
});
projectSchema.index({
  technologies: 1
});

module.exports = mongoose.model('Project', projectSchema);