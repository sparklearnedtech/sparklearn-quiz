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
  numQuestions
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
      correct()
    } else {
      setActiveQuestion(activeQuestion + 1)
    }
  }
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
        {choiceSet?.map(choice => (
          <button
            className='btn-choices'
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
