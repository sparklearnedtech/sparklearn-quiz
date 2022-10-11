import React, { useState, useEffect, useRef } from 'react'

export default function Questions ({
  currentQuestion,
  setCorrectAnswer,
  activeQuestion,
  setActiveQuestion,
  setScore,
  score,
  timer,
  correct,
  showAns
}) {
  const [answer, setAnswer] = useState(currentQuestion?.answer)

  useEffect(() => {
    setAnswer(currentQuestion?.answer)
  }, [currentQuestion])
  return (
    <div className='text-center'>
      <div className='q-card d-flex'>
        {timer()}
        <div
          style={{ marginLeft: '100px', width: '100%' }}
          className={'j-content-center'}
        >
          <h3 className='points'>
            {currentQuestion?.score}{' '}
            {currentQuestion?.score > 1 ? 'Points' : 'Point'}
          </h3>
          <h2 className='d-block'>{currentQuestion?.question}</h2>
          {showAns ? currentQuestion?.answer : ''}
        </div>
      </div>

      <div className='d-flex j-content-center'>
        <button
          className={`d-block mx-auto ${
            showAns ? 'btn-disabled' : 'btn-correct'
          }`}
          disabled={showAns}
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
          Next
        </button>
      </div>
    </div>
  )
}
