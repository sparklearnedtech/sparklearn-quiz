import React from 'react'

export default function FinalScore ({ nickname, score }) {
  return (
    <div className='current-score-area'>
      <h2 className='head-nickname'>{nickname}</h2>
      <div className='d-flex j-content-end'>
        <h2 className='head-score'>{score}</h2>
      </div>
    </div>
  )
}
