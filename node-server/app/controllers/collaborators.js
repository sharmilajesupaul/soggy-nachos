var User = require('../models/user');
var Request = require('../models/request');
var ff = require('ff');

module.exports = function(app) {

  app.get('/collaborators/:userId', function(req, res) {
    var f = ff(function(){
      User.find({
        collaborators: req.body.userId
      }).exec(f.slot());
    }, function(collaborators) {
      if (!collaborators) {
        return res.status(400).send('no users found');
      }
      res.send(collaborators)

    }).onError(function(err){
      res.send(err);
    }).onSuccess(function(){
      res.status(200).send('completed');
    });
  });

  app.post('/collaborators',function(req, res){
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
        return res.status(400).send('no request found');
      }
      request = doc;
    }, function() {
      sender.collaborators.addToSet(recipient._id)
      recipient.collaborators.addToSet(sender._id)
      var senderIndex = sender.requests.indexOf(request._id);
      var recipientIndex = recipient.requests.indexOf(request._id);
      sender.requests.splice(senderIndex, 1);
      recipient.requests.splice(recipientIndex, 1);
      request.resolved = true;
      sender.save(f.wait());
      recipient.save(f.wait());
      request.save(f.wait());
    }).onError(function(err) {
      res.send(err);
    }).onSuccess(function() {
      res.status(200).send('completed');
    })
  });

}