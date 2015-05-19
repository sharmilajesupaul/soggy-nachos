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
  skillsDesired: Array,
  activeProject: Boolean,
  helpWanted: Boolean,
  technologies: Array,
  created: Date,
  updated: Date
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

projectSchema.pre('save', function(next) {
  now = new Date();
  this.updated = now;
  if (!this.created) {
    this.created = now;
  }
  next();
});

module.exports = mongoose.model('Project', projectSchema);
