import React, { useEffect, useRef } from 'react'

export default function Questions ({
  currentQuestion,
  activeQuestion,
  setActiveQuestion
}) {
  console.log(currentQuestion)
  return (
    <div className='text-center'>
      <h3 className='d-block'>{currentQuestion.question}</h3>

      <button
        className='d-block mx-auto'
        onClick={() => {
          setActiveQuestion(activeQuestion + 1)
        }}
      >
        Answer
      </button>
    </div>
  )
}
