module.exports = function(app) {
  require('./user')(app);
  require('./authentication')(app);
  require('./requests')(app);
  require('./collaborators')(app);
  require('./matches')(app);
};
