var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true
  },
  password: String,
  name: String,
  created: Date,
  updated: Date,
  skills: Array,
  location: String, // formatted like: "San Francisco, CA" -- will be using this to calculate geolocation to find nearby matches
  bio: String,
  remote: Boolean,
  profilePicture: String,
  collaborators: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique: true
  }],
  requests: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Request'
  }],
  requestsSent: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Request'
  }],
  pendingRequestUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  projects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  }]
});

// sets a hashed _id
userSchema.index({
  _id: 'hashed'
});
userSchema.index({
  projects: 1
});
userSchema.index({
  location: 1
});
userSchema.index({
  skills: 1
});
userSchema.index({
  collaborators: 1
});

// methods ======================
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

// pre-save hook ================
userSchema.pre('save', function(next) {
  now = new Date();
  this.updated = now;
  if (!this.created) {
    this.created = now;
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
