 const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  name: {type: String, required: true},
  description: {type: String, default: 'Mixed'},
  date: {type: Date, default: Date.now},
  type: {type: String, required: true},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}, //embedding User
}, {
  timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);