module.exports = function(app) {
  require('./user')(app);
  require('./authentication')(app);
};
