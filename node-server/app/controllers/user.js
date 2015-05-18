var User = require('../models/user');
var Project = require('../models/project');
var Request = require('../models/request');
var ff = require('ff');

module.exports = function(app) {

  app.get('/users', function(req, res) {
    var f = ff(function() {
        User.findOne({
          _id: req.body.user
        }).exec(f.slot());
      }, function(user) {
        if (!user) {
          return res.send({});
        }
        User.find({
          _id: {
            $ne: user._id,
            $nin: user.collaborations
          }
        }).exec(f.slot());
      },
      function(users) {
        return res.send(users);
      });
  });

  app.delete('/users/:userId', function(req, res) {
    User.remove({
      _id: req.params.userId
    }).exec(function(err) {
      if (err) {
        console.log(err);
      }
      res.status(200).send('completed');
    });
  });

  app.get('/users/:userId/projects', function(req, res) {
    var f = ff(function() {
      User.findOne({
        _id: req.params.userId
      }).exec(f.slot());
    }, function(user) {
      if (!user) {
        return res.status(400).send('no user found');
      }
      Project.find({
        contributers: user._id
      }).exec(f.slot());
    }, function(projects) {
      if (!projects) {
        return res.send({});
      }
      res.send(projects);
    }).onError(function(err) {
      console.log(err);
    }).onSuccess(function() {
      console.log('success fetching user projects');
    });
  });

};
