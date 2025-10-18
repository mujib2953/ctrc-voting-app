const express = require('express');
const Participant = require('../model/Participant');

const router = express.Router();

router.get('/all', async (req, res) => {
  try {
    const allParticipants = await Participant.find();
    res.status(200).json(allParticipants);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const newParticipant = new Participant({ name });
    await newParticipant.save();
    res.status(201).json(newParticipant);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
