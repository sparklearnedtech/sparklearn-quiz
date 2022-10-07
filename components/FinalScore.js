import React from 'react'

export default function FinalScore ({ finalScore, nickname }) {
  return (
    <div className='text-center'>
      <h1 className='score-title'>Congratulations, {nickname}!</h1>
      <div className='final-score-area'>
        <h1>{finalScore}</h1>
      </div>
    </div>
  )
}
