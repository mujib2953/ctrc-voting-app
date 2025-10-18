const Participant = require('../model/Participant');

const participantName = [
  'Pritam Bhandari',
  'Sharad Sinha',
  'Ruchi Mayekar',
  'Samyuktha Reddy',
  'Praful Mathur',
  'Prashant Kadus',
  'Shreya Naik',
  'Omkar Joshi'
];

const addParticipants = async () => {
  try {
    for (const name of participantName) {
      const existingParticipant = await Participant.findOne({ name });

      if (!existingParticipant) {
        const newParticipant = new Participant({ name });
        await newParticipant.save();
        console.log(`Added participant: ${name}`);
      } else {
        console.log(`Participant already exists: ${name}`);
      }
    }
  } catch (error) {
    console.error("Error populating participants:", error);
  }
};

module.exports = {addParticipants}
