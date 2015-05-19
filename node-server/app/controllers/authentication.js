var User = require('../models/user');
var ff = require('ff');

module.exports = function(app) {

  app.post('/login', function(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.send(400, 'missing parameters');
    }
    User.findOne({
      email: req.body.email
    }).exec(function(err, user) {
      if (err) {
        return res.send(err);
      }
      if (!user || !user.validPassword(req.body.password)) {
        return res.send(400);
      }
      res.send({
        user: user
      });
      console.log('login call completed');
    });
  });

  app.post('/signup', function(req, res) {
    if (!req.body.user || !req.body.skills || !req.body.user.name || !req.body.user.email || !req.body.user.password) {
      return res.send(400, 'missing parameters');
    }
    var newUser = req.body.user;
    newUser.skills = req.body.skills;
    var f = ff(function() {
      User.findOne({
        email: newUser.email
      }).exec(f.wait());
    }, function(user) {
      if (user) {
        return res.send(400, 'email already registered');
      }
      user = new User(newUser);
      user.password = user.generateHash(newUser.password);
      user.save();
      return res.status(200).send({
        user: user
      });
    }).onComplete(function(err) {
      if (err) {
        return res.send(err);
      }
      console.log('signup call completed');
    });

  });

};
