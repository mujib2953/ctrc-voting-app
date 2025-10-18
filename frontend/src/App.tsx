import { useEffect, useState } from 'react';
import './App.css';
import LeaderBoard from './LeaderBoard';
import CastVote from './CastVote';
import { API_BASE_URL } from './utils';

export type ParticipantType = {
  _id: string;
  name: string;
  total_votes: number;
  img_url: string;
};

function App() {

  const [allParticipants, setAllParticipants] = useState<ParticipantType[]>([]);

  useEffect(() => {
    const fetchParticipants = async () => {
      fetch(`${API_BASE_URL}/participant/all`)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data)
          const sortedData = data.sort((a: ParticipantType, b: ParticipantType) => b.total_votes - a.total_votes);
          setAllParticipants(sortedData);
        });
    };

    fetchParticipants();

    const timerId = setInterval(fetchParticipants, 10 * 1000); // Refresh every 10 seconds

    return () => clearInterval(timerId);
      
  }, []);


  return (
    <div className='app'>
      <h1>CTRC Diwali 2025</h1>
      <LeaderBoard participants={allParticipants} />
      <CastVote participants={allParticipants} />
    </div> 
  )
}

export default App
