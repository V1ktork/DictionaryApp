const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    login: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true, minlength: 4, trim: true }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', userSchema);
