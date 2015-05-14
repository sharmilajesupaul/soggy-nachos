var User = require('../models/user');
var Project = require('../models/project');
var Request = require('../models/request');
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

  app.post('/users/:userId/add/:recipientId',function(req, res){
  	var sender;
    var recipient;
    var f = ff(function(){
      User.findOne({
        _id: req.params.userId
      }).exec(f.slot());
    }, function(user) {
      if (!user) {
        return res.status(400).send('no user found');
      }
      sender = user;
      User.findOne({
        _id: req.params.recipientId
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

  app.post('/users/:userId/accept/:requestId',function(req, res){
    var recipient;
    var sender;
    var request;

    var f = ff(function() {
      User.findOne({
        _id: req.params.userId
      }).exec(f.slot());
    }, function(user) {
      if (!user) {
        return res.status(400).send('no user found');
      }
      recipient = user;
      Request.findOne({
        _id: req.params.requestId,
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
      User.findOne({
        _id: sender._id
      }).exec(f.slot());
    }, function(user) {
      sender = user;
      sender.friends.addToSet(recipient._id)
      recipient.friends.addToSet(sender._id)
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

  app.post('/users/:userId/decline/:requestId',function(req, res){
    var recipient;
    var sender;
    var request;

    var f = ff(function() {
      User.findOne({
        _id: req.params.userId
      }).exec(f.slot());
    }, function(user) {
      if (!user) {
        return res.status(400).send('no user found');
      }
      recipient = user;
      Request.findOne({
        _id: req.params.requestId,
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
      User.findOne({
        _id: sender._id
      }).exec(f.slot());
    }, function(user) {
      sender = user;
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

  app.get('/users/:userId/projects',function(req, res){
    var f = ff(function(){
      User.findOne({
        _id: req.params.userId
      }).exec(f.slot());
    }, function(user){
      if (!user) {
        return res.status(400).send('no user found');
      }
      Project.find({
        contributers: user._id
      }).exec(f.slot());
    }, function(projects){
      if (!projects) {
        return res.send({});
      }
      res.send(projects);
    }).onError(function(err){
      res.send(err);
    }).onSuccess(function(){
      console.log('success fetching user projects');
    });
  });

};
