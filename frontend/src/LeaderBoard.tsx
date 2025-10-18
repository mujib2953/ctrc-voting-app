import type { ParticipantType } from "./App"

const LeaderBoard = ({ participants = [] }: {participants: ParticipantType[]}) => {

  return (<div>
    <h3>Leaderboard</h3>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Votes</th>
        </tr>
      </thead>
      <tbody>
        {participants.map((item) => (
          <tr key={item._id}>
            <td>{item.name}</td>
            <td>{item.total_votes}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>)
}

export default LeaderBoard
