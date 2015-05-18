var User = require('../models/user');
var ff = require('ff');
module.exports = function(app) {

  app.get('/matches/:userId', function(req, res) {
    var f = ff(function() {
      User.findOne({
        _id: req.params.userId
      }).exec(f.slot());
    }, function(user) {
      if (!user) {
        return res.status(400).send({});
      }
      var alreadyConnected = user.collaborators.concat(user.pendingRequestUsers);
      if (!req.query.skills || req.query.skills === '[]') {
        User.find({
          _id: {
            $ne: user._id,
            $nin: alreadyConnected
          }
        }).exec(f.slot());
      } else {
        User.find({
          _id: {
            $ne: user._id,
            $nin: alreadyConnected
          },
          skills: {
            $in: JSON.parse(req.query.skills)
          }
        }).exec(f.slot());
      }
    }, function(users) {
      if (!users) {
        res.send({});
      } else {
        res.send(users);
      }
    }).onError(function(err) {
      console.log(err.stack);
    }).onSuccess(function() {
      console.log('success');
    });
  });
};
