import React from 'react'

export default function Leaderboard ({ topPlayers }) {
  if (!topPlayers.length) return
  return (
    <div className='leaderboard-area'>
      <h3 style={{ margin: '0' }}>Leaderboard</h3>
      <table>
        <th>Rank</th>
        <th>Nickname</th>
        <th>Score</th>
        {topPlayers
          .slice(0, 10)
          .filter(player => player.score != 0)
          .map((player, i) => {
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
