var mongoose = require('mongoose');

var projectSchema = mongoose.Schema({
  name: String,
  shortname: {
    type: String,
    unique: true
  }, // shortname should be a string with no spaces or special characters to potentially be used in urls as query param
  description: String,
  respository: String,
  url: String,
  screenshot: String,
  contributors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique: true
  }],
  activeProject: Boolean,
  helpWanted: Boolean,
  technologies: Array
});

projectSchema.index({
  shortname: 1
});
projectSchema.index({
  contributors: 1
});
projectSchema.index({
  technologies: 1
});
projectSchema.index({
  helpWanted: 1
});

module.exports = mongoose.model('Project', projectSchema);
