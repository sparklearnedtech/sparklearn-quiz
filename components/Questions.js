import React, { useEffect, useRef } from 'react'

export default function Questions ({
  currentQuestion,
  activeQuestion,
  setActiveQuestion,
  setScore,
  score
}) {
  console.log(currentQuestion)
  return (
    <div className='text-center'>
      <div className='q-card'>
        <h2 className='d-block'>{currentQuestion.question}</h2>
        <h3 className='points'>
          {currentQuestion.score}{' '}
          {currentQuestion.score > 1 ? 'Points' : 'Point'}
        </h3>
      </div>

      <div className='d-flex j-content-center'>
        <button
          className='d-block mx-auto btn-correct'
          onClick={() => {
            setActiveQuestion(activeQuestion + 1)
            setScore(score + currentQuestion.score)
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
