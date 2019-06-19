const mongoose = require("mongoose");

const dictionarySchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, unique: true, required: true },
    translation: { type: String, required: true },
    partOfSpeech: { type: String, required: true },
    state: { type: String, default: "study" },
    mistakeCounter: { type: Number, default: 0 }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Words", dictionarySchema);
