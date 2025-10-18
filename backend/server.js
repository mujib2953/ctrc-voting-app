const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch(error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
connectDB();

// --- populating initial participants (uncomment to use) ---
if (process.env.ADD_PARTICIPANTS === 'true') {
  const { addParticipants } = require('./populateData');
  addParticipants();
}
// --------------------------------------------------------


app.get("/ping", (_, res) => res.send("pong"));

const participantRoutes = require('./routes/participants');
app.use('/api/participant', participantRoutes);

const voteRoutes = require('./routes/votes');
app.use('/api/vote', voteRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
