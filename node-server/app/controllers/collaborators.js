var User = require('../models/user');
var Request = require('../models/request');
var ff = require('ff');

module.exports = function(app) {

  app.get('/collaborators/:userId', function(req, res) {
    var f = ff(function() {
      User.find({
        collaborators: req.params.userId
      }).exec(f.slot());
    }, function(collaborators) {
      if (!collaborators) {
        return res.send({});
      }
      res.send(collaborators);

    }).onError(function(err) {
      console.log(err);
    }).onSuccess(function() {
      console.log('completed');
    });
  });

  app.post('/collaborators', function(req, res) {
    var recipient;
    var sender;
    var request;

    var f = ff(function() {
      User.findOne({
        _id: req.body.recipientId
      }).exec(f.slot());
    }, function(user) {
      if (!user) {
        return res.status(400).send('no user found');
      }
      recipient = user;
      User.findOne({
        _id: req.body.senderId
      }).exec(f.slot());
    }, function(user) {
      if (!user) {
        return res.status(400).send('no user found');
      }
      sender = user;
      Request.findOne({
        requestSender: sender._id,
        requestRecipient: recipient._id,
        resolved: {
          $ne: true
        }
      }).exec(f.slot());
    }, function(doc) {
      if (!doc) {
        return console.log('no request found');
      }
      request = doc;
    }, function() {
      sender.collaborators.addToSet(recipient._id);
      recipient.collaborators.addToSet(sender._id);

      sender.requestsSent.pull(request._id);
      recipient.requests.pull(request._id);

      sender.pendingRequestUsers.pull(recipient._id);
      recipient.pendingRequestUsers.pull(sender._id);

      request.resolved = true;

      sender.save(f.wait());
      recipient.save(f.wait());
      request.save(f.wait());
    }).onError(function(err) {
      console.log(err.stack);
    }).onSuccess(function() {
      console.log('completed');
    });
  });
};
