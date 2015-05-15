var mongoose = require('mongoose');

var skillSchema = new mongoose.Schema({
	name: String,
	shortname: String,
	userAdded: {
		type: Boolean,
		default: false
	}
});

skillSchema.index({
  shortname: 1
});
skillSchema.index({
  userAdded: 1
});

module.exports = mongoose.model('Skill', skillSchema);