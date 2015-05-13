var User = require('../models/user');
var ff = require('ff');

module.exports = function(app) {

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

};
