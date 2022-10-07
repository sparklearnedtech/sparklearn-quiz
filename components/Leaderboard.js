import React from 'react'

export default function Leaderboard ({ topPlayers }) {
  console.log(topPlayers)
  return (
    <div className='leaderboard-area'>
      <table>
        <th>Rank</th>
        <th>Nickname</th>
        <th>Score</th>
        {topPlayers.slice(0,10).map((player, i) => {
          return (
            <tr key={player.date}>
              <td>{i + 1}</td>
              <td>{player.nickname}</td>
              <td>
                <div>{player.score}</div>
              </td>
            </tr>
          )
        })}
      </table>
    </div>
  )
}
