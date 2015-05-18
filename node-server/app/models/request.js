var mongoose = require('mongoose');

var requestSchema = mongoose.Schema({
  created: Date,
  requestSender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  requestRecipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  senderName: String,
  recipientName: String,
  resolved: {
    type: Boolean,
    default: false
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
});

requestSchema.index({
  requestSender: 1
});

requestSchema.index({
  requestRecipient: 1
});

requestSchema.pre('save', function(next) {
  now = new Date();
  if (!this.created) {
    this.created = now;
  }
  next();
});

module.exports = mongoose.model('Request', requestSchema);
