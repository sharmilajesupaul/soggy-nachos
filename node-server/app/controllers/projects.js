var User = require('../models/user');
var Project = require('../models/project');
var ff = require('ff');

module.exports = function(app) {

  app.post('/projects', function(req, res) {
    var project = req.body.project;
    // req.body.project should include name, shortname, description, respository, url, screenshot, contributers(array), activeProject(boolean), helpWanted(boolean), technologies(array)
    if (!project) {
      return res.send(400);
    }
    var f = ff(function() {
      var newProject = new Project(project);
      newProject.save(f.slot());
    }).onError(function(err) {
      console.log(err.stack);
    }).onSuccess(function() {
      console.log('success');
    });
  });

  app.get('/projects', function(req, res) {
    var f = ff(function() {
      Project.find({}).exec(f.slot());
    }, function(projects) {
      if (!projects) {
        return res.send({});
      }
      res.send(projects);
    }).onError(function(err) {
      console.log(err.stack);
    }).onSuccess(function() {
      console.log('success');
    });
  });

  app.get('/projects/:userId', function(req, res) {
    var f = ff(function() {
      Project.find({
        _id: req.params.userId
      }).exec(f.slot());
    }, function(projects) {
      if (!projects) {
        return res.send({});
      }
      res.send(projects);
    }).onError(function(err) {
      console.log(err.stack);
    }).onSuccess(function() {
      console.log('success');
    });
  });
};
