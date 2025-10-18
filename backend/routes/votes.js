const express = require('express');
const Vote = require('../model/Vote');
const Participant = require('../model/Participant');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { phone_no, name, voted_for, vote } = req.body;
    const participant = await Participant.findById(voted_for)
    if (!participant) {
      return res.status(400).json({ message: 'Voted participant not found' });
    }
    const newVote = new Vote({
      phone_no,
      name,
      voted_for: participant._id,
      vote,
    });
    await newVote.save();

    // Increment the vote count for the participant
    participant.total_votes += vote;
    await participant.save();

    res.status(201).json(newVote);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
