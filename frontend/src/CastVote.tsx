import { useState } from "react";
import type { ParticipantType } from "./App";
import { API_BASE_URL } from "./utils";

const CastVote = ({participants}: {
  participants: ParticipantType[]
}) => {

  const [sliderValue, setSliderValue] = useState<number>(1);
  const [selectedParticipant, setSelectedParticipant] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [name, setName] = useState<string>("");

  const handleSelectChange = ({ target: { value } }: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(value);
    const selectedParticipant = participants.find((p) => p._id === value) || null;

    console.log(selectedParticipant);
    setSelectedParticipant(value);
  };

  const handlePhoneChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    const phoneRegex = /^[0-9-]{0,12}$/;
    
    if (phoneNumber.length === 12 && !phoneRegex.test(value)) {
      alert("Invalid phone number format. Please use 507-XXX-XXXX");
      return;
    }

    if (phoneRegex.test(value)) {
      setPhoneNumber(value);
    }

  }

  const handleCastClick = () => {
    if (!selectedParticipant || sliderValue < 1) {
      alert("Please select a participant and votes");
      return;
    }

    if (phoneNumber.length !== 12) {
      alert("Please enter a valid phone number in the format 507-XXX-XXXX");
      return;
    }

    if (name.trim().length === 0) {
      alert("Please enter your name");
      return;
    }

    fetch(`${API_BASE_URL}/vote`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
        phone_no: phoneNumber,
        name: name,
        voted_for: selectedParticipant,
        vote: sliderValue
      }),
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      alert("Vote cast successfully!");
      // Reset form
      setSelectedParticipant(null);
      setSliderValue(1);
      setPhoneNumber("");
      setName("");
    })
    .catch((err) => {
      console.error(err);
      alert("Error casting vote. Please try again.");
    });
  };

  return (
    <div>
      <h3>Cast Votes</h3>

      <select onChange={handleSelectChange} value={selectedParticipant || ""}>
        <option value="">Select Participant</option>
        {participants.map((item) => (
          <option key={item._id} value={item._id}>{item.name}</option>
        ))}
      </select>

      <div className="slider-container">
        <input 
          type="range" 
          min={1} 
          max={5} 
          value={sliderValue || 1}
          onChange={({ target: { value } }) => setSliderValue(Number(value)) } 
        />
        <span>{sliderValue}</span>
      </div>

      <input 
        type="text" 
        value={phoneNumber}
        onChange={handlePhoneChange} 
        placeholder="Phone Number 507-XXX-XXXX" 
      />
      <input 
        type="text" 
        placeholder="Name" 
        value={name}
        onChange={({ target: { value } }) => setName(value)}
      />

      <button onClick={handleCastClick}>Submit</button>
    </div>
  )
}

export default CastVote;
