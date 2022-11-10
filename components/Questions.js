import React, { useState, useEffect, useRef } from 'react'

import { v4 as uuidV4 } from 'uuid'

export default function Questions ({
  currentQuestion,
  setCorrectAnswer,
  activeQuestion,
  setActiveQuestion,
  setScore,
  score,
  timer,
  correct,
  showAns,
  randomizer,
  setStatus,
  status,
  setTimerOn,
  numQuestions,
  btnStatus,
  setBtnStatus
}) {
  const numChoices = 4
  const [answer, setAnswer] = useState(currentQuestion?.answer)
  const [choiceSet, setChoiceSet] = useState()

  useEffect(() => {
    setAnswer(currentQuestion?.answer)
    if (activeQuestion < numQuestions) {
      randomizer(numChoices, currentQuestion.choices, setChoiceSet)
    }
  }, [currentQuestion])
  const answerChecker = e => {
    if (e.target.textContent === answer) {
      console.log('correct')
      setStatus(true)
      correct()
    } else {
      setTimerOn(false)
      setStatus(false)
      setBtnStatus('btn-disabled')
      setTimeout(() => {
        setActiveQuestion(activeQuestion + 1)
      }, 2000)
    }
  }
  return (
    <div className='text-center'>
      <span
        className={
          typeof status === 'undefined'
            ? btnStatus === 'btn-disabled'
              ? 'status wrong'
              : ''
            : status
            ? 'status correct'
            : 'status wrong'
        }
      >
        {typeof status === 'undefined'
          ? btnStatus === 'btn-disabled'
            ? 'No Answer!'
            : ''
          : status
          ? 'Correct answer!'
          : 'Wrong answer!'}
      </span>

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
        {choiceSet?.map(choice => (
          <button
            className={`btn-choices ${btnStatus}`}
            key={uuidV4()}
            onClick={e => answerChecker(e)}
          >
            {choice}
          </button>
        ))}
      </div>
    </div>
  )
}
