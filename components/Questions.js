import React, { useEffect, useRef } from 'react'

export default function Questions ({
  currentQuestion,
  activeQuestion,
  setActiveQuestion,
  setScore,
  score,
  timer,
  correct
}) {
  return (
    <div className='text-center'>
      <div className='q-card'>
        {timer()}
        <h2 className='d-block'>{currentQuestion?.question}</h2>
        <h3 className='points'>
          {currentQuestion?.score}{' '}
          {currentQuestion?.score > 1 ? 'Points' : 'Point'}
        </h3>
      </div>

      <div className='d-flex j-content-center'>
        <button
          className='d-block mx-auto btn-correct'
          onClick={() => {
            correct()
          }}
        >
          Correct
        </button>
        <button
          className='d-block mx-auto btn-wrong'
          onClick={() => {
            setActiveQuestion(activeQuestion + 1)
          }}
        >
          Wrong
        </button>
      </div>
    </div>
  )
}
