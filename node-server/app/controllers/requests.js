var User = require('../models/user');
var Request = require('../models/request');
var ff = require('ff');

module.exports = function(app) {

  app.post('/requests',function(req, res){
    var sender;
    var recipient;
    var f = ff(function(){
      User.findOne({
        _id: req.body.userId
      }).exec(f.slot());
    }, function(user) {
      if (!user) {
        return res.status(400).send('no user found');
      }
      sender = user;
      User.findOne({
        _id: req.body.recipientId
      }).exec(f.slot());
    }, function(user) {
      if (!user) {
        return res.status(400).send('no recipient found');
      }
      recipient = user;
      var request = new Request({
        requestSender: sender._id,
        requestRecipient: recipient._id
      });
      request.save(f.slot());
    }, function(request){
      sender.requests.addToSet(request._id);
      recipient.requests.addToSet(request._id);
      sender.save(f.wait());
      recipient.save(f.wait());
    }).onError(function(err){
      res.send(err);
    }).onSuccess(function(){
      res.status(200).send('completed');
    });
  });

  app.delete('/requests',function(req, res){
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

  app.get('/requests/:recipientId', function(req, res){
    var recipient;
    var f = ff(function(){
      Request.find({
        recipientId: req.params.recipientId
      }).exec(f.slot());
    }, function(requests){
      if (!requests) {
        return res.status(400).send('no requests')
      }
      res.send(requests)
    }).onError(function(err){
      res.send(err);
    }).onSuccess(function(){
      res.status(200).send('completed');
    });
  });

  app.get('/requests_sent/:senderId', function(req, res){
  var recipient;
  var f = ff(function(){
    Request.find({
      recipientId: req.params.recipientId
    }).exec(f.slot());
  }, function(requests){
    if (!requests) {
      return res.status(400).send('no requests')
    }
    res.send(requests)
  }).onError(function(err){
    res.send(err);
  }).onSuccess(function(){
    res.status(200).send('completed');
  });
});
}