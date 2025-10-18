const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  phone_no: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  // voted_for references the name of the participant
  voted_for: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Participant" },
  vote: { type: Number, default: 1 },
  created_at: { type: Date, default: Date.now },
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
