const mongoose = require('mongoose');

const { Schema } = mongoose;
const alertSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
}, {timestamps: true});

const Alert = mongoose.model('Alert', alertSchema);

module.exports = Alert;
