import React, { useState, useEffect, useRef } from 'react'

export default function Questions ({
  currentQuestion,
  setCorrectAnswer,
  activeQuestion,
  setActiveQuestion,
  setScore,
  score,
  time
}) {
  const [answer, setAnswer] = useState(currentQuestion?.answer)
  const [showAns, setShowAns] = useState(false)

  useEffect(() => {
    setAnswer(currentQuestion?.answer)
  }, [currentQuestion])
  return (
    <div className='text-center'>
      <div className='q-card'>
        <h3 className='points'>
          {currentQuestion?.score}{' '}
          {currentQuestion?.score > 1 ? 'Points' : 'Point'}
        </h3>
        <h2 className='d-block'>{currentQuestion?.question}</h2>
        {showAns ? answer : ''}
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
          Next
        </button>
      </div>
    </div>
  )
}
