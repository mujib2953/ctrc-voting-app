const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  img_url: { type: String, default: "" },
  total_votes: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
});

const Participant = mongoose.model('Participant', participantSchema);

module.exports = Participant;
