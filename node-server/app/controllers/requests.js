var User = require('../models/user');
var Request = require('../models/request');
var ff = require('ff');

module.exports = function(app) {

  app.post('/requests', function(req, res) {
    var sender;
    var recipient;
    var f = ff(function() {
      User.findOne({
        _id: req.body.senderId
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
      Request.find({
        $or: [{
          requestSender: sender._id,
          requestRecipient: recipient._id
        }, {
          requestSender: recipient._id,
          requestRecipient: sender._id
        }],
        resolved: {
          $ne: true
        }
      }).exec(f.slot());
    }, function(request) {
      if (request.length > 0 || recipient.collaborators.indexOf(sender._id) > -1) {
        return res.status(400).send('users are already friends or has a pending request to this user');
      }
      request = new Request({
        requestSender: sender._id,
        requestRecipient: recipient._id,
        senderName: sender.name,
        recipientName: recipient.name
      });
      request.save(f.wait());
      sender.requestsSent.addToSet(request._id);
      recipient.requests.addToSet(request._id);
      sender.pendingRequestUsers.addToSet(recipient._id);
      recipient.pendingRequestUsers.addToSet(sender._id);
      sender.save(f.wait());
      recipient.save(f.wait());
    }).onError(function(err) {
      console.log(err.stack);
    }).onSuccess(function() {
      console.log('completed');
    });
  });

  app.delete('/requests/:requestId', function(req, res) {
    var recipient;
    var sender;
    var request;

    var f = ff(function() {
        Request.findOne({
          _id: req.params.requestId,
          resolved: {
            $ne: true
          }
        }).exec(f.slot());
      }, function(doc) {
        if (!doc) {
          console.log('no request found');
          return res.status(400);
        }
        request = doc;
      }, function() {
        User.findOne({
          _id: request.requestRecipient
        }).exec(f.slot());
      }, function(user) {
        if (!user) {
          console.log('no user found');
          return res.status(400);
        }
        recipient = user;
        User.findOne({
          _id: request.requestSender
        }).exec(f.slot());
      }, function(user) {
        if (!user) {
          console.log('no user found');
          return res.status(400);
        }
        sender = user;
      },
      function() {

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

  app.get('/requests/:recipientId', function(req, res) {
    var f = ff(function() {
      User.findOne({
        _id: req.params.recipientId
      }).populate('requests').exec(f.slot());
    }, function(user) {
      if (!user) {
        return res.status(400).send('no user found');
      }
      if (user.requests.length < 1) {
        return res.send([]);
      }
      res.send(user.requests);
    }).onError(function(err) {
      console.log(err.stack);
    }).onSuccess(function() {
      console.log('completed');
    });
  });

  app.get('/requests_sent/:senderId', function(req, res) {
    var f = ff(function() {
      User.findOne({
        _id: req.params.senderId
      }).populate('requestsSent').exec(f.slot());
    }, function(user) {
      if (!user) {
        return res.status(400).send('no user found');
      }
      if (user.requestsSent.length < 1) {
        return res.send([]);
      }
      res.send(user.requestsSent);
    }).onError(function(err) {
      console.log(err.stack);
    }).onSuccess(function() {
      console.log('completed');
    });
  });
};
