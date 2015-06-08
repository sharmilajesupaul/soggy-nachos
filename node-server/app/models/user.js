var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var ff = require('ff');
var geocoder = require('geocoder');

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
  geo: {
    formattedAddress: String,
    lonlat: Array
  },
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
  var user = this;
  var f = ff(function() {
    now = new Date();
    user.updated = now;
    if (!user.created) {
      user.created = now;
    }
    if (user.location) {
      geocoder.geocode(user.location, f.slot());
    }
  }, function(data) {
    if (data) {
      var formattedAddress = data.results[0].formatted_address;
      var lon = data.results[0].geometry.location.lng;
      var lat = data.results[0].geometry.location.lat;
      var lonlat = [lon, lat];
      user.geo.lonlat = lonlat;
      user.geo.formattedAddress = formattedAddress;
    }
  }).onComplete(function(err) {
    if (err) {
      console.log(err.stack);
    }
    next();
  });
});

module.exports = mongoose.model('User', userSchema);
