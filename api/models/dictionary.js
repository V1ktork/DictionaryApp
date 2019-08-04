const mongoose = require('mongoose');

const dictionarySchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    translation: { type: String, required: true },
    partOfSpeech: { type: String, required: true },
    state: { type: String, default: 'study' },
    mistakeCounter: { type: Number, default: 0 },
    creator: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Words', dictionarySchema);
